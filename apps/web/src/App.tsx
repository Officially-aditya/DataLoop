import { useEffect, useMemo, useState, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react";

import { Panel } from "./components/Panel";
import { StatusNotice } from "./components/StatusNotice";
import {
    ApiClientError,
    createTask,
    getApiBaseUrl,
    getDatasetHistory,
    getLatestDatasetVersion,
    getTask,
    getTaskCorrections,
    registerDatasetVersion,
    submitCorrection,
    type CorrectionResource,
    type DatasetHistoryResult,
    type DatasetVersionResource,
    type LatestDatasetVersionResult,
    type TaskResource
} from "./lib/api";
import { generateBytes32Hex, hasMetadataReference, isAddress, isBytes32, isUintString } from "./lib/validation";
import { getWalletConfig } from "./lib/wallet/config";
import {
    getInjectedWallet,
    getWalletAccounts,
    getWalletChainId,
    parseHexChainId,
    requestWalletAccounts,
    switchWalletChain
} from "./lib/wallet/provider";
import "./styles.css";

interface NoticeState {
  tone: "neutral" | "success" | "error";
  message: string;
}

interface TaskFormState {
  taskId: string;
  metadataUri: string;
  metadataHash: string;
  stakeAmountWei: string;
}

interface CorrectionFormState {
  taskId: string;
  metadataUri: string;
  metadataHash: string;
  stakeAmountWei: string;
}

interface DatasetEntryDraft {
  id: string;
  sourceType: "TASK" | "CORRECTION";
  referenceId: string;
  metadataUri: string;
  metadataHash: string;
}

interface DatasetFormState {
  datasetId: string;
  metadataUri: string;
  metadataHash: string;
  immutableRef: string;
  entries: DatasetEntryDraft[];
}

const RECENT_TASKS_KEY = "dataloop.week1.recentTasks";
const RECENT_DATASETS_KEY = "dataloop.week1.recentDatasets";

export default function App() {
  const walletConfig = getWalletConfig();
  const injectedWallet = useMemo(() => getInjectedWallet(), []);
  const [walletAccount, setWalletAccount] = useState<string | null>(null);
  const [walletChainIdHex, setWalletChainIdHex] = useState<string | null>(null);
  const [walletNotice, setWalletNotice] = useState<NoticeState | null>(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const [taskForm, setTaskForm] = useState<TaskFormState>(() => createEmptyTaskForm());
  const [correctionForm, setCorrectionForm] = useState<CorrectionFormState>(createEmptyCorrectionForm);
  const [datasetForm, setDatasetForm] = useState<DatasetFormState>(() => createEmptyDatasetForm());

  const [taskNotice, setTaskNotice] = useState<NoticeState | null>(null);
  const [correctionNotice, setCorrectionNotice] = useState<NoticeState | null>(null);
  const [datasetNotice, setDatasetNotice] = useState<NoticeState | null>(null);
  const [taskViewerNotice, setTaskViewerNotice] = useState<NoticeState | null>(null);
  const [datasetViewerNotice, setDatasetViewerNotice] = useState<NoticeState | null>(null);

  const [recentTaskIds, setRecentTaskIds] = useState<string[]>(() => readStoredIds(RECENT_TASKS_KEY));
  const [recentDatasetIds, setRecentDatasetIds] = useState<string[]>(() =>
    readStoredIds(RECENT_DATASETS_KEY)
  );

  const [taskLookupId, setTaskLookupId] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskResource | null>(null);
  const [selectedCorrections, setSelectedCorrections] = useState<CorrectionResource[]>([]);
  const [isLoadingTask, setIsLoadingTask] = useState(false);

  const [datasetLookupId, setDatasetLookupId] = useState("");
  const [datasetHistory, setDatasetHistory] = useState<DatasetHistoryResult | null>(null);
  const [latestDatasetVersion, setLatestDatasetVersion] = useState<LatestDatasetVersionResult | null>(null);
  const [isLoadingDatasetHistory, setIsLoadingDatasetHistory] = useState(false);
  const [isLoadingLatestDataset, setIsLoadingLatestDataset] = useState(false);

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isSubmittingCorrection, setIsSubmittingCorrection] = useState(false);
  const [isRegisteringDataset, setIsRegisteringDataset] = useState(false);

  useEffect(() => {
    writeStoredIds(RECENT_TASKS_KEY, recentTaskIds);
  }, [recentTaskIds]);

  useEffect(() => {
    writeStoredIds(RECENT_DATASETS_KEY, recentDatasetIds);
  }, [recentDatasetIds]);

  useEffect(() => {
    if (injectedWallet === null) {
      return;
    }

    const syncWallet = async () => {
      try {
        const [accounts, chainId] = await Promise.all([
          getWalletAccounts(injectedWallet),
          getWalletChainId(injectedWallet)
        ]);

        setWalletAccount(accounts[0] ?? null);
        setWalletChainIdHex(chainId);
      } catch (error) {
        setWalletNotice({
          tone: "error",
          message: formatError(error)
        });
      }
    };

    const handleAccountsChanged = (accounts: unknown) => {
      if (Array.isArray(accounts)) {
        const nextAccount = accounts.find((value): value is string => typeof value === "string") ?? null;
        setWalletAccount(nextAccount);
      }
    };

    const handleChainChanged = (chainId: unknown) => {
      setWalletChainIdHex(typeof chainId === "string" ? chainId : null);
    };

    void syncWallet();
    injectedWallet.on?.("accountsChanged", handleAccountsChanged);
    injectedWallet.on?.("chainChanged", handleChainChanged);

    return () => {
      injectedWallet.removeListener?.("accountsChanged", handleAccountsChanged);
      injectedWallet.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [injectedWallet]);

  const walletChainId = parseHexChainId(walletChainIdHex);
  const hasWalletConnection = walletAccount !== null && isAddress(walletAccount);
  const chainMismatch = walletChainId !== null && walletChainId !== walletConfig.chainId;

  async function connectWallet() {
    if (injectedWallet === null) {
      setWalletNotice({
        tone: "error",
        message: "No injected wallet detected. Install MetaMask or another EVM wallet."
      });
      return;
    }

    setIsConnectingWallet(true);
    setWalletNotice({
      tone: "neutral",
      message: "Requesting wallet access..."
    });

    try {
      const [accounts, chainId] = await Promise.all([
        requestWalletAccounts(injectedWallet),
        getWalletChainId(injectedWallet)
      ]);

      setWalletAccount(accounts[0] ?? null);
      setWalletChainIdHex(chainId);
      setWalletNotice({
        tone: "success",
        message: accounts[0] ? `Connected ${shortId(accounts[0])}` : "Wallet connected."
      });
    } catch (error) {
      setWalletNotice({
        tone: "error",
        message: formatError(error)
      });
    } finally {
      setIsConnectingWallet(false);
    }
  }

  async function handleSwitchNetwork() {
    if (injectedWallet === null) {
      return;
    }

    try {
      await switchWalletChain(injectedWallet, walletConfig.chainId);
      setWalletChainIdHex(await getWalletChainId(injectedWallet));
      setWalletNotice({
        tone: "success",
        message: `Switched wallet to ${walletConfig.chainName}.`
      });
    } catch (error) {
      setWalletNotice({
        tone: "error",
        message: formatError(error)
      });
    }
  }

  const latestVersion = latestDatasetVersion?.version ?? null;
  const currentDatasetHistory = datasetHistory?.versions ?? [];
  const connectedStateLabel = hasWalletConnection ? shortId(walletAccount ?? "") : "Not connected";

  async function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasWalletConnection || walletAccount === null) {
      setTaskNotice({ tone: "error", message: "Connect a wallet before creating a task." });
      return;
    }

    const validationError = validateTaskForm(taskForm);
    if (validationError !== null) {
      setTaskNotice({ tone: "error", message: validationError });
      return;
    }

    setIsCreatingTask(true);
    setTaskNotice({ tone: "neutral", message: "Creating task via backend and contract..." });

    try {
      const result = await createTask({
        taskId: taskForm.taskId.trim(),
        creatorAddress: walletAccount,
        ...optionalField("metadataUri", taskForm.metadataUri),
        ...optionalField("metadataHash", taskForm.metadataHash),
        ...optionalField("stakeAmountWei", taskForm.stakeAmountWei)
      });

      setTaskNotice({
        tone: "success",
        message: `Task ${shortId(result.contractTaskId)} created successfully.`
      });
      setTaskForm(createEmptyTaskForm());
      setCorrectionForm((current) => ({ ...current, taskId: result.task.taskId }));
      setTaskLookupId(result.task.taskId);
      appendRecentId(setRecentTaskIds, result.task.taskId);
      await loadTaskDetail(result.task.taskId);
    } catch (error) {
      setTaskNotice({ tone: "error", message: formatError(error) });
    } finally {
      setIsCreatingTask(false);
    }
  }

  async function handleSubmitCorrection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasWalletConnection || walletAccount === null) {
      setCorrectionNotice({ tone: "error", message: "Connect a wallet before submitting a correction." });
      return;
    }

    const validationError = validateCorrectionForm(correctionForm);
    if (validationError !== null) {
      setCorrectionNotice({ tone: "error", message: validationError });
      return;
    }

    setIsSubmittingCorrection(true);
    setCorrectionNotice({ tone: "neutral", message: "Submitting correction..." });

    try {
      const result = await submitCorrection(correctionForm.taskId.trim(), {
        submitterAddress: walletAccount,
        ...optionalField("metadataUri", correctionForm.metadataUri),
        ...optionalField("metadataHash", correctionForm.metadataHash),
        ...optionalField("stakeAmountWei", correctionForm.stakeAmountWei)
      });

      setCorrectionNotice({
        tone: "success",
        message: `Correction #${result.correction.correctionId} saved successfully.`
      });
      setCorrectionForm((current) => ({ ...createEmptyCorrectionForm(), taskId: current.taskId }));
      appendRecentId(setRecentTaskIds, result.correction.taskId);
      setTaskLookupId(result.correction.taskId);
      await loadTaskDetail(result.correction.taskId);
    } catch (error) {
      setCorrectionNotice({ tone: "error", message: formatError(error) });
    } finally {
      setIsSubmittingCorrection(false);
    }
  }

  async function handleRegisterDatasetVersion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasWalletConnection || walletAccount === null) {
      setDatasetNotice({ tone: "error", message: "Connect a wallet before registering a dataset version." });
      return;
    }

    const validationError = validateDatasetForm(datasetForm);
    if (validationError !== null) {
      setDatasetNotice({ tone: "error", message: validationError });
      return;
    }

    setIsRegisteringDataset(true);
    setDatasetNotice({ tone: "neutral", message: "Registering dataset version..." });

    try {
      const result = await registerDatasetVersion(datasetForm.datasetId.trim(), {
        registeredBy: walletAccount,
        ...optionalField("metadataUri", datasetForm.metadataUri),
        ...optionalField("metadataHash", datasetForm.metadataHash),
        ...optionalField("immutableRef", datasetForm.immutableRef),
        entries: datasetForm.entries.map((entry) =>
          entry.sourceType === "TASK"
            ? {
                sourceType: "TASK" as const,
                taskId: entry.referenceId.trim(),
                ...optionalField("metadataUri", entry.metadataUri),
                ...optionalField("metadataHash", entry.metadataHash)
              }
            : {
                sourceType: "CORRECTION" as const,
                correctionId: entry.referenceId.trim(),
                ...optionalField("metadataUri", entry.metadataUri),
                ...optionalField("metadataHash", entry.metadataHash)
              }
        )
      });

      setDatasetNotice({
        tone: "success",
        message: `Dataset ${shortId(result.dataset.datasetId)} version ${result.version.versionNumber} registered.`
      });
      setDatasetForm((current) => ({ ...createEmptyDatasetForm(), datasetId: current.datasetId }));
      setDatasetLookupId(result.dataset.datasetId);
      appendRecentId(setRecentDatasetIds, result.dataset.datasetId);
      await Promise.all([
        loadDatasetHistoryView(result.dataset.datasetId),
        loadLatestDatasetView(result.dataset.datasetId)
      ]);
    } catch (error) {
      setDatasetNotice({ tone: "error", message: formatError(error) });
    } finally {
      setIsRegisteringDataset(false);
    }
  }

  async function loadTaskDetail(taskIdValue: string) {
    setIsLoadingTask(true);
    setTaskViewerNotice({
      tone: "neutral",
      message: `Loading task ${shortId(taskIdValue)}...`
    });

    try {
      const [task, correctionData] = await Promise.all([getTask(taskIdValue), getTaskCorrections(taskIdValue)]);

      setSelectedTask(task);
      setSelectedCorrections(correctionData.corrections);
      setTaskViewerNotice({
        tone: "success",
        message: `Loaded task ${shortId(task.taskId)} and ${correctionData.corrections.length} correction(s).`
      });
      appendRecentId(setRecentTaskIds, task.taskId);
      setCorrectionForm((current) => ({ ...current, taskId: task.taskId }));
    } catch (error) {
      setTaskViewerNotice({ tone: "error", message: formatError(error) });
      setSelectedTask(null);
      setSelectedCorrections([]);
    } finally {
      setIsLoadingTask(false);
    }
  }

  async function loadDatasetHistoryView(datasetIdValue: string) {
    setIsLoadingDatasetHistory(true);
    setDatasetViewerNotice({
      tone: "neutral",
      message: `Loading dataset history for ${shortId(datasetIdValue)}...`
    });

    try {
      const history = await getDatasetHistory(datasetIdValue);
      setDatasetHistory(history);
      setDatasetViewerNotice({
        tone: "success",
        message: `Loaded ${history.versions.length} dataset version(s).`
      });
      appendRecentId(setRecentDatasetIds, datasetIdValue);
    } catch (error) {
      setDatasetViewerNotice({ tone: "error", message: formatError(error) });
      setDatasetHistory(null);
    } finally {
      setIsLoadingDatasetHistory(false);
    }
  }

  async function loadLatestDatasetView(datasetIdValue: string) {
    setIsLoadingLatestDataset(true);

    try {
      const latest = await getLatestDatasetVersion(datasetIdValue);
      setLatestDatasetVersion(latest);
      appendRecentId(setRecentDatasetIds, datasetIdValue);
    } catch (error) {
      setDatasetViewerNotice({ tone: "error", message: formatError(error) });
      setLatestDatasetVersion(null);
    } finally {
      setIsLoadingLatestDataset(false);
    }
  }

  function updateDatasetEntry(entryId: string, updates: Partial<DatasetEntryDraft>) {
    setDatasetForm((current) => ({
      ...current,
      entries: current.entries.map((entry) =>
        entry.id === entryId ? { ...entry, ...updates } : entry
      )
    }));
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Week 1 Frontend</p>
          <h1>DataLoop base platform demo console</h1>
          <p className="copy">
            Create tasks, submit corrections, register dataset versions, and inspect the
            canonical records persisted through the Week 1 API and contract flow.
          </p>
        </div>

        <div className="hero-meta">
          <div className="meta-card">
            <span className="label">API</span>
            <strong>{getApiBaseUrl()}</strong>
          </div>
          <div className="meta-card">
            <span className="label">Configured Chain</span>
            <strong>
              {walletConfig.chainName} ({walletConfig.chainId})
            </strong>
          </div>
          <div className="meta-card">
            <span className="label">Wallet</span>
            <strong>{connectedStateLabel}</strong>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <div className="column">
          <Panel
            title="Wallet Connection"
            eyebrow="Session"
            action={
              <button className="button button-primary" onClick={connectWallet} disabled={isConnectingWallet}>
                {isConnectingWallet ? "Connecting..." : hasWalletConnection ? "Reconnect" : "Connect Wallet"}
              </button>
            }
          >
            {walletNotice ? <StatusNotice tone={walletNotice.tone} message={walletNotice.message} /> : null}
            <div className="detail-grid compact-grid">
              <Detail label="Injected provider" value={injectedWallet === null ? "Not found" : "Detected"} />
              <Detail label="Connected account" value={walletAccount ?? "Not connected"} mono />
              <Detail
                label="Wallet chain"
                value={walletChainId === null ? "Unknown" : `${walletChainId} (${walletChainIdHex})`}
                mono
              />
            </div>
            {chainMismatch ? (
              <div className="inline-actions">
                <StatusNotice
                  tone="error"
                  message={`Wallet is on chain ${walletChainId}. Switch to ${walletConfig.chainName} to match the configured demo network.`}
                />
                <button className="button button-secondary" onClick={handleSwitchNetwork}>
                  Switch to {walletConfig.chainName}
                </button>
              </div>
            ) : null}
          </Panel>

          <Panel title="Create Task" eyebrow="Write Flow">
            {taskNotice ? <StatusNotice tone={taskNotice.tone} message={taskNotice.message} /> : null}
            <form className="stack" onSubmit={handleCreateTask}>
              <Field label="Task ID" helper="Use a bytes32 hex value.">
                <div className="field-row">
                  <input
                    value={taskForm.taskId}
                    onChange={(event) => setTaskForm((current) => ({ ...current, taskId: event.target.value }))}
                    placeholder="0x..."
                  />
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => setTaskForm((current) => ({ ...current, taskId: generateBytes32Hex() }))}
                  >
                    Generate
                  </button>
                </div>
              </Field>
              <Field label="Metadata URI">
                <input
                  value={taskForm.metadataUri}
                  onChange={(event) => setTaskForm((current) => ({ ...current, metadataUri: event.target.value }))}
                  placeholder="ipfs://task-metadata"
                />
              </Field>
              <Field label="Metadata Hash">
                <input
                  value={taskForm.metadataHash}
                  onChange={(event) => setTaskForm((current) => ({ ...current, metadataHash: event.target.value }))}
                  placeholder="0x..."
                />
              </Field>
              <Field label="Stake Amount (wei)" helper="Optional. Use a whole-number wei string.">
                <input
                  value={taskForm.stakeAmountWei}
                  onChange={(event) => setTaskForm((current) => ({ ...current, stakeAmountWei: event.target.value }))}
                  placeholder="0"
                />
              </Field>
              <button className="button button-primary" type="submit" disabled={isCreatingTask}>
                {isCreatingTask ? "Creating..." : "Create Task"}
              </button>
            </form>
          </Panel>

          <Panel title="Submit Correction" eyebrow="Write Flow">
            {correctionNotice ? <StatusNotice tone={correctionNotice.tone} message={correctionNotice.message} /> : null}
            <form className="stack" onSubmit={handleSubmitCorrection}>
              <Field label="Task ID">
                <input
                  value={correctionForm.taskId}
                  onChange={(event) =>
                    setCorrectionForm((current) => ({ ...current, taskId: event.target.value }))
                  }
                  placeholder="0x..."
                />
              </Field>
              <Field label="Correction Metadata URI">
                <input
                  value={correctionForm.metadataUri}
                  onChange={(event) =>
                    setCorrectionForm((current) => ({ ...current, metadataUri: event.target.value }))
                  }
                  placeholder="ipfs://correction-metadata"
                />
              </Field>
              <Field label="Correction Metadata Hash">
                <input
                  value={correctionForm.metadataHash}
                  onChange={(event) =>
                    setCorrectionForm((current) => ({ ...current, metadataHash: event.target.value }))
                  }
                  placeholder="0x..."
                />
              </Field>
              <Field label="Stake Amount (wei)" helper="Optional.">
                <input
                  value={correctionForm.stakeAmountWei}
                  onChange={(event) =>
                    setCorrectionForm((current) => ({ ...current, stakeAmountWei: event.target.value }))
                  }
                  placeholder="0"
                />
              </Field>
              <button className="button button-primary" type="submit" disabled={isSubmittingCorrection}>
                {isSubmittingCorrection ? "Submitting..." : "Submit Correction"}
              </button>
            </form>
          </Panel>

          <Panel title="Register Dataset Version" eyebrow="Write Flow">
            {datasetNotice ? <StatusNotice tone={datasetNotice.tone} message={datasetNotice.message} /> : null}
            <form className="stack" onSubmit={handleRegisterDatasetVersion}>
              <Field label="Dataset ID">
                <div className="field-row">
                  <input
                    value={datasetForm.datasetId}
                    onChange={(event) => setDatasetForm((current) => ({ ...current, datasetId: event.target.value }))}
                    placeholder="0x..."
                  />
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() =>
                      setDatasetForm((current) => ({ ...current, datasetId: generateBytes32Hex() }))
                    }
                  >
                    Generate
                  </button>
                </div>
              </Field>
              <Field label="Dataset Metadata URI">
                <input
                  value={datasetForm.metadataUri}
                  onChange={(event) => setDatasetForm((current) => ({ ...current, metadataUri: event.target.value }))}
                  placeholder="ipfs://dataset-version"
                />
              </Field>
              <Field label="Dataset Metadata Hash">
                <input
                  value={datasetForm.metadataHash}
                  onChange={(event) => setDatasetForm((current) => ({ ...current, metadataHash: event.target.value }))}
                  placeholder="0x..."
                />
              </Field>
              <Field label="Immutable Reference" helper="Optional override.">
                <input
                  value={datasetForm.immutableRef}
                  onChange={(event) => setDatasetForm((current) => ({ ...current, immutableRef: event.target.value }))}
                  placeholder="dataset-v1-cid"
                />
              </Field>
              <div className="subsection">
                <div className="subsection-header">
                  <div>
                    <p className="label">Dataset Entries</p>
                    <p className="helper-copy">Reference existing tasks or corrections in order.</p>
                  </div>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() =>
                      setDatasetForm((current) => ({
                        ...current,
                        entries: [...current.entries, createDatasetEntryDraft()]
                      }))
                    }
                  >
                    Add Entry
                  </button>
                </div>
                <div className="stack">
                  {datasetForm.entries.map((entry, index) => (
                    <div className="entry-card" key={entry.id}>
                      <div className="entry-topline">
                        <strong>Entry {index + 1}</strong>
                        {datasetForm.entries.length > 1 ? (
                          <button
                            type="button"
                            className="link-button"
                            onClick={() =>
                              setDatasetForm((current) => ({
                                ...current,
                                entries: current.entries.filter((candidate) => candidate.id !== entry.id)
                              }))
                            }
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                      <div className="entry-grid">
                        <label className="field">
                          <span>Source Type</span>
                          <select
                            value={entry.sourceType}
                            onChange={(event) =>
                              updateDatasetEntry(entry.id, {
                                sourceType: event.target.value as "TASK" | "CORRECTION",
                                referenceId: ""
                              })
                            }
                          >
                            <option value="TASK">Task</option>
                            <option value="CORRECTION">Correction</option>
                          </select>
                        </label>
                        <label className="field">
                          <span>{entry.sourceType === "TASK" ? "Task ID" : "Correction ID"}</span>
                          <input
                            value={entry.referenceId}
                            onChange={(event) => updateDatasetEntry(entry.id, { referenceId: event.target.value })}
                            placeholder={entry.sourceType === "TASK" ? "0x..." : "1"}
                          />
                        </label>
                        <label className="field">
                          <span>Entry Metadata URI</span>
                          <input
                            value={entry.metadataUri}
                            onChange={(event) => updateDatasetEntry(entry.id, { metadataUri: event.target.value })}
                            placeholder="Optional override"
                          />
                        </label>
                        <label className="field">
                          <span>Entry Metadata Hash</span>
                          <input
                            value={entry.metadataHash}
                            onChange={(event) => updateDatasetEntry(entry.id, { metadataHash: event.target.value })}
                            placeholder="Optional override"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="button button-primary" type="submit" disabled={isRegisteringDataset}>
                {isRegisteringDataset ? "Registering..." : "Register Dataset Version"}
              </button>
            </form>
          </Panel>
        </div>

        <div className="column">
          <Panel title="Task Explorer" eyebrow="Read Flow">
            {taskViewerNotice ? <StatusNotice tone={taskViewerNotice.tone} message={taskViewerNotice.message} /> : null}
            <div className="stack">
              <div className="field-row">
                <input value={taskLookupId} onChange={(event) => setTaskLookupId(event.target.value)} placeholder="Enter task ID to load" />
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => taskLookupId.trim().length > 0 && void loadTaskDetail(taskLookupId.trim())}
                  disabled={isLoadingTask}
                >
                  {isLoadingTask ? "Loading..." : "Load"}
                </button>
              </div>
              <RecentIdList title="Recent Tasks" ids={recentTaskIds} onSelect={(value) => { setTaskLookupId(value); void loadTaskDetail(value); }} />
              {selectedTask ? renderSelectedTask(selectedTask, selectedCorrections) : <EmptyState message="Load a task to inspect its canonical record and corrections." />}
            </div>
          </Panel>

          <Panel title="Dataset Explorer" eyebrow="Read Flow">
            {datasetViewerNotice ? <StatusNotice tone={datasetViewerNotice.tone} message={datasetViewerNotice.message} /> : null}
            <div className="stack">
              <div className="field-row">
                <input value={datasetLookupId} onChange={(event) => setDatasetLookupId(event.target.value)} placeholder="Enter dataset ID to inspect" />
                <button className="button button-secondary" type="button" onClick={() => datasetLookupId.trim().length > 0 && void loadDatasetHistoryView(datasetLookupId.trim())} disabled={isLoadingDatasetHistory}>
                  History
                </button>
                <button className="button button-primary" type="button" onClick={() => datasetLookupId.trim().length > 0 && void loadLatestDatasetView(datasetLookupId.trim())} disabled={isLoadingLatestDataset}>
                  Latest
                </button>
              </div>
              <RecentIdList title="Recent Datasets" ids={recentDatasetIds} onSelect={(value) => { setDatasetLookupId(value); void Promise.all([loadDatasetHistoryView(value), loadLatestDatasetView(value)]); }} />
              {latestVersion && latestDatasetVersion ? renderLatestDataset(latestDatasetVersion) : <EmptyState message="Load the latest dataset version to inspect its canonical entry set." />}
              {datasetHistory ? renderDatasetHistory(datasetHistory, currentDatasetHistory) : <EmptyState message="Load dataset history to review version progression." />}
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}

function createEmptyTaskForm(): TaskFormState {
  return {
    taskId: generateBytes32Hex(),
    metadataUri: "",
    metadataHash: "",
    stakeAmountWei: ""
  };
}

function createEmptyCorrectionForm(): CorrectionFormState {
  return {
    taskId: "",
    metadataUri: "",
    metadataHash: "",
    stakeAmountWei: ""
  };
}

function createDatasetEntryDraft(): DatasetEntryDraft {
  return {
    id: `entry-${crypto.randomUUID()}`,
    sourceType: "TASK",
    referenceId: "",
    metadataUri: "",
    metadataHash: ""
  };
}

function createEmptyDatasetForm(): DatasetFormState {
  return {
    datasetId: "",
    metadataUri: "",
    metadataHash: "",
    immutableRef: "",
    entries: [createDatasetEntryDraft()]
  };
}

function formatError(error: unknown) {
  if (error instanceof ApiClientError) {
    return `${mapApiErrorMessage(error)} (${error.code})`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error";
}

function mapApiErrorMessage(error: ApiClientError) {
  switch (error.code) {
    case "TASK_NOT_FOUND":
      return "Task ID was not found. Create the task first, then submit corrections.";
    case "INVALID_REQUEST":
      return "Malformed request. Check address format, bytes32 IDs, and required fields.";
    case "RELATED_RECORD_NOT_FOUND":
      return "Storage reference is missing. Ensure referenced task and correction records exist.";
    case "DATASET_NOT_FOUND":
      return "Dataset ID was not found.";
    default:
      return error.message;
  }
}

function shortId(value: string) {
  if (value.length <= 14) {
    return value;
  }

  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

function readStoredIds(key: string) {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(key);
  if (rawValue === null) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

function writeStoredIds(key: string, ids: string[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(ids));
  }
}

function validateTaskForm(form: TaskFormState) {
  if (!isBytes32(form.taskId)) {
    return "Task ID must be a valid bytes32 hex string.";
  }

  if (!hasMetadataReference(form.metadataUri, form.metadataHash)) {
    return "Provide either a metadata URI or metadata hash.";
  }

  if (form.metadataHash.trim().length > 0 && !isBytes32(form.metadataHash)) {
    return "Task metadata hash must be a bytes32 hex string.";
  }

  if (form.stakeAmountWei.trim().length > 0 && !isUintString(form.stakeAmountWei)) {
    return "Stake amount must be a whole-number wei string.";
  }

  return null;
}

function validateCorrectionForm(form: CorrectionFormState) {
  if (!isBytes32(form.taskId)) {
    return "Correction task ID must be a valid bytes32 hex string.";
  }

  if (!hasMetadataReference(form.metadataUri, form.metadataHash)) {
    return "Provide either a correction metadata URI or metadata hash.";
  }

  if (form.metadataHash.trim().length > 0 && !isBytes32(form.metadataHash)) {
    return "Correction metadata hash must be a bytes32 hex string.";
  }

  if (form.stakeAmountWei.trim().length > 0 && !isUintString(form.stakeAmountWei)) {
    return "Correction stake amount must be a whole-number wei string.";
  }

  return null;
}

function validateDatasetForm(form: DatasetFormState) {
  if (!isBytes32(form.datasetId)) {
    return "Dataset ID must be a valid bytes32 hex string.";
  }

  if (!hasMetadataReference(form.metadataUri, form.metadataHash)) {
    return "Provide either a dataset metadata URI or metadata hash.";
  }

  if (form.metadataHash.trim().length > 0 && !isBytes32(form.metadataHash)) {
    return "Dataset metadata hash must be a bytes32 hex string.";
  }

  if (form.entries.length === 0) {
    return "Add at least one dataset entry.";
  }

  for (const [index, entry] of form.entries.entries()) {
    if (entry.sourceType === "TASK" && !isBytes32(entry.referenceId)) {
      return `Dataset entry ${index + 1} requires a valid task ID.`;
    }

    if (entry.sourceType === "CORRECTION" && !isUintString(entry.referenceId)) {
      return `Dataset entry ${index + 1} requires a numeric correction ID.`;
    }

    if (entry.metadataHash.trim().length > 0 && !isBytes32(entry.metadataHash)) {
      return `Dataset entry ${index + 1} metadata hash must be a bytes32 hex string.`;
    }
  }

  return null;
}

function optionalField<T extends string>(key: T, value: string) {
  const normalized = value.trim();

  if (normalized.length === 0) {
    return {};
  }

  return {
    [key]: normalized
  } as Record<T, string>;
}

function appendRecentId(setter: Dispatch<SetStateAction<string[]>>, id: string) {
  setter((current) => [id, ...current.filter((candidate) => candidate !== id)].slice(0, 8));
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString();
}

function renderSelectedTask(task: TaskResource, corrections: CorrectionResource[]) {
  return (
    <div className="record-card">
      <RecordHeader title={task.taskId} subtitle="Task" />
      <div className="detail-grid">
        <Detail label="Storage ID" value={task.storageId} mono />
        <Detail label="Creator" value={task.creatorAddress} mono />
        <Detail label="Chain creator" value={task.chainCreatorAddress ?? "Not returned"} mono />
        <Detail label="Created at" value={formatDateTime(task.createdAt)} />
        <Detail label="Metadata URI" value={task.metadataUri ?? "Not set"} mono />
        <Detail label="Metadata Hash" value={task.metadataHash ?? "Not set"} mono />
        <Detail label="Transaction" value={task.chain.transactionHash ?? "Not set"} mono />
        <Detail label="Block" value={task.chain.blockNumber ?? "Not set"} mono />
      </div>

      <div className="subsection">
        <div className="subsection-header">
          <div>
            <p className="label">Corrections</p>
            <p className="helper-copy">{corrections.length} correction(s) linked to this task.</p>
          </div>
        </div>
        <div className="stack">
          {corrections.length === 0 ? (
            <EmptyState message="No corrections stored for this task yet." />
          ) : (
            corrections.map((correction) => (
              <div className="nested-card" key={correction.storageId}>
                <RecordHeader title={`#${correction.correctionId}`} subtitle={formatDateTime(correction.submittedAt)} />
                <div className="detail-grid compact-grid">
                  <Detail label="Submitter" value={correction.submitterAddress} mono />
                  <Detail label="Metadata URI" value={correction.metadataUri ?? "Not set"} mono />
                  <Detail label="Metadata Hash" value={correction.metadataHash ?? "Not set"} mono />
                  <Detail label="Transaction" value={correction.chain.transactionHash ?? "Not set"} mono />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function renderLatestDataset(version: LatestDatasetVersionResult) {
  return (
    <div className="record-card">
      <RecordHeader title={`Latest Version v${version.version.versionNumber}`} subtitle={version.dataset.datasetId} />
      <div className="detail-grid">
        <Detail label="Storage ID" value={version.version.storageId} mono />
        <Detail label="Registered by" value={version.version.registeredBy} mono />
        <Detail label="Chain registrar" value={version.version.chainRegistrarAddress ?? "Not returned"} mono />
        <Detail label="Registered at" value={formatDateTime(version.version.registeredAt)} />
        <Detail label="Immutable ref" value={version.version.immutableRef} mono />
        <Detail label="Transaction" value={version.version.chain.transactionHash ?? "Not set"} mono />
      </div>
      <DatasetEntries entries={version.version.entries} />
    </div>
  );
}

function renderDatasetHistory(dataset: DatasetHistoryResult, versions: DatasetVersionResource[]) {
  return (
    <div className="record-card">
      <RecordHeader title={`History (${versions.length} version${versions.length === 1 ? "" : "s"})`} subtitle={dataset.dataset.datasetId} />
      <div className="stack">
        {versions.map((version) => (
          <div className="nested-card" key={version.storageId}>
            <RecordHeader title={`Version ${version.versionNumber}`} subtitle={formatDateTime(version.registeredAt)} />
            <div className="detail-grid compact-grid">
              <Detail label="Immutable ref" value={version.immutableRef} mono />
              <Detail label="Registered by" value={version.registeredBy} mono />
              <Detail label="Metadata Hash" value={version.metadataHash ?? "Not set"} mono />
              <Detail label="Entries" value={String(version.entries.length)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, helper, children }: { label: string; helper?: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {helper ? <small>{helper}</small> : null}
    </label>
  );
}

function Detail({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="detail">
      <span className="label">{label}</span>
      <strong className={mono ? "mono-text" : undefined}>{value}</strong>
    </div>
  );
}

function RecordHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="record-header">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <div className="empty-state">{message}</div>;
}

function RecentIdList({
  title,
  ids,
  onSelect
}: {
  title: string;
  ids: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="subsection">
      <div className="subsection-header">
        <div>
          <p className="label">{title}</p>
          <p className="helper-copy">Stored locally in this browser for quick reloads.</p>
        </div>
      </div>
      {ids.length === 0 ? (
        <EmptyState message="Nothing loaded yet." />
      ) : (
        <div className="list-stack">
          {ids.map((id) => (
            <button className="list-item" key={id} type="button" onClick={() => onSelect(id)}>
              <span className="mono-text">{id}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DatasetEntries({ entries }: { entries: DatasetVersionResource["entries"] }) {
  return (
    <div className="subsection">
      <div className="subsection-header">
        <div>
          <p className="label">Entries</p>
          <p className="helper-copy">{entries.length} item(s) in this version.</p>
        </div>
      </div>
      {entries.length === 0 ? (
        <EmptyState message="No dataset entries stored in this version." />
      ) : (
        <div className="stack">
          {entries.map((entry) => (
            <div className="nested-card" key={entry.id}>
              <RecordHeader
                title={`${entry.sourceType} @ position ${entry.position}`}
                subtitle={entry.taskId ?? entry.correctionId ?? "Unresolved reference"}
              />
              <div className="detail-grid compact-grid">
                <Detail label="Task ID" value={entry.taskId ?? "Not set"} mono />
                <Detail label="Correction ID" value={entry.correctionId ?? "Not set"} mono />
                <Detail label="Metadata URI" value={entry.metadataUri ?? "Not set"} mono />
                <Detail label="Metadata Hash" value={entry.metadataHash ?? "Not set"} mono />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
