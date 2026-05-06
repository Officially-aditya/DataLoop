import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type ReactNode,
  type SetStateAction
} from "react";

import { Panel } from "./components/Panel";
import { StatusNotice } from "./components/StatusNotice";
import {
    ApiClientError,
    addAgentArtifactToLibrary,
    compareAgentQuestion,
    createTask,
    getAgentLibrary,
    getAgentMarketplaceArtifacts,
    getApiBaseUrl,
    getDatasetHistory,
    getLatestDatasetVersion,
    getTask,
    getTaskCorrections,
    removeAgentArtifactFromLibrary,
    registerDatasetVersion,
    submitCorrection,
    uploadAgentArtifact,
    type AgentAnswerResource,
    type AgentArtifactResource,
    type AgentArtifactStorageProof,
    type AgentComparisonResult,
    type AgentProviderStatus,
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
    switchOrAddWalletChain
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

type WorkspaceKey = "tasks" | "datasets" | "agent";
type TaskSectionKey = "details" | "create" | "correction" | "session";
type DatasetSectionKey = "latest" | "register" | "history" | "session";
type AgentSectionKey = "ask" | "marketplace" | "library" | "upload";

interface DemoArtifact {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  questionPattern: string;
  formulaPattern: string;
  concepts: string[];
  answer: string;
  rawFormula?: string;
  rawAnswer: string;
  source: "marketplace" | "upload";
  creator?: string;
  version?: string;
  usageCount?: number;
  benchmarkScore?: number | null;
  storage?: AgentArtifactStorageProof;
}

interface AgentAnswer {
  label: string;
  formula: string;
  explanation: string;
  confidence: number;
  artifactIds: string[];
  matchedArtifactTitle: string;
  provider?: AgentProviderStatus;
}

interface AgentComparison {
  raw: AgentAnswer;
  augmented: AgentAnswer;
  retrievedArtifacts?: DemoArtifact[];
  runId?: string;
}

interface BackendAgentComparisonState {
  question: string;
  result: AgentComparison;
}

interface UploadArtifactFormState {
  title: string;
  questionPattern: string;
  formulaPattern: string;
  concepts: string;
  answer: string;
}

type AgentAnswerMode = "raw" | "artifact";

const RECENT_TASKS_KEY = "dataloop.week1.recentTasks";
const RECENT_DATASETS_KEY = "dataloop.week1.recentDatasets";
const AGENT_LIBRARY_KEY = "dataloop.agent.artifactLibrary";
const AGENT_UPLOADS_KEY = "dataloop.agent.uploadedArtifacts";
const DEFAULT_AGENT_ARTIFACT_ID = "sumifs-multi-condition";
const DEFAULT_AGENT_QUESTION =
  "In a sales table with dates in A, regions in B, amounts in C, what formula sums sales in 'North' region after 2024-01-01?";

const MARKETPLACE_ARTIFACTS: DemoArtifact[] = [
  {
    id: "sumifs-multi-condition",
    title: "SUMIFS with multiple criteria",
    difficulty: "medium",
    tags: ["aggregation", "sumifs", "date criteria"],
    questionPattern:
      "In a sales table with dates in A, regions in B, amounts in C, what formula sums sales in 'North' region after 2024-01-01?",
    formulaPattern: '=SUMIFS(C:C, B:B, "North", A:A, ">2024-01-01")',
    concepts: ["SUMIFS", "date criteria"],
    answer: "Use SUMIFS with date criteria for multi-condition aggregation.",
    rawFormula: '=SUMIFS(C:C,B:B,"North",A:A,">2024-01-01")',
    rawAnswer: "Sums North region sales after Jan 1, 2024 using date criteria.",
    source: "marketplace"
  },
  {
    id: "xlookup-basics",
    title: "Basic XLOOKUP lookup",
    difficulty: "easy",
    tags: ["lookup", "xlookup", "exact match"],
    questionPattern:
      "Given employee names in column A and salaries in column B, what formula looks up the salary for John Doe from A1:B10?",
    formulaPattern: '=XLOOKUP("John Doe", A1:A10, B1:B10)',
    concepts: ["XLOOKUP", "exact match"],
    answer: "Use XLOOKUP to find the salary for the exact match.",
    rawFormula: '=XLOOKUP("John Doe",A1:A10,B1:B10)',
    rawAnswer: "XLOOKUP finds the salary for John Doe.",
    source: "marketplace"
  },
  {
    id: "filter-dynamic-array",
    title: "FILTER spilled array",
    difficulty: "medium",
    tags: ["dynamic arrays", "filter", "spill"],
    questionPattern: "Filter sales table A:C for amounts over 1000 and return region and amount columns.",
    formulaPattern: "=FILTER(B:C, C:C>1000)",
    concepts: ["FILTER", "spill"],
    answer: "Use dynamic array FILTER; the result will spill into adjacent cells.",
    rawFormula: "=FILTER(B:C,C:C>1000)",
    rawAnswer: "Filters rows where amounts are over 1000.",
    source: "marketplace"
  },
  {
    id: "absolute-ref-mistake",
    title: "Fix absolute reference error",
    difficulty: "medium",
    tags: ["debugging", "absolute references", "$ syntax"],
    questionPattern: "Formula =A$1*B1 copied down changes wrong. Why and how to fix for column totals?",
    formulaPattern: "=A$1*B1 for row copy, =$A1*B1 for column copy, =$A$1*$B1 for fixed.",
    concepts: ["absolute references", "$ syntax"],
    answer: "Use absolute references with $ syntax to control whether rows, columns, or both stay fixed.",
    rawAnswer: "Use $ to lock row or column when copying.",
    source: "marketplace"
  },
  {
    id: "vlookup-limitations",
    title: "When not to use VLOOKUP",
    difficulty: "easy",
    tags: ["explanation", "vlookup", "xlookup"],
    questionPattern: "Why avoid VLOOKUP? When should I use XLOOKUP instead?",
    formulaPattern: "",
    concepts: ["VLOOKUP limitations", "XLOOKUP advantages"],
    answer:
      "VLOOKUP limitations include one-way lookup direction and fragile column indexes; XLOOKUP advantages include exact-match defaults, left/right lookup, and cleaner return arrays.",
    rawAnswer: "VLOOKUP is older and XLOOKUP is usually easier.",
    source: "marketplace"
  },
  {
    id: "text-numbers-sum",
    title: "Sum text-formatted numbers",
    difficulty: "easy",
    tags: ["debugging", "value", "text numbers"],
    questionPattern: "Column A looks like numbers but SUM(A:A) is 0. Fix the formula.",
    formulaPattern: "=SUM(VALUE(A:A))",
    concepts: ["VALUE"],
    answer: "Use VALUE for text to number conversion before summing.",
    rawFormula: "=SUM(A:A)",
    rawAnswer: "Try SUM on the column after checking formatting.",
    source: "marketplace"
  }
];

export default function App() {
  const walletConfig = getWalletConfig();
  const injectedWallet = useMemo(() => getInjectedWallet(), []);
  const [walletAccount, setWalletAccount] = useState<string | null>(null);
  const [walletChainIdHex, setWalletChainIdHex] = useState<string | null>(null);
  const [walletNotice, setWalletNotice] = useState<NoticeState | null>(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceKey>("tasks");
  const [activeTaskSection, setActiveTaskSection] = useState<TaskSectionKey>("details");
  const [activeDatasetSection, setActiveDatasetSection] = useState<DatasetSectionKey>("latest");
  const [activeAgentSection, setActiveAgentSection] = useState<AgentSectionKey>("ask");
  const [agentAnswerMode, setAgentAnswerMode] = useState<AgentAnswerMode>("artifact");
  const [agentQuestion, setAgentQuestion] = useState(DEFAULT_AGENT_QUESTION);
  const [agentNotice, setAgentNotice] = useState<NoticeState | null>(null);
  const [marketplaceArtifacts, setMarketplaceArtifacts] = useState<DemoArtifact[]>(MARKETPLACE_ARTIFACTS);
  const [selectedMarketplaceArtifactId, setSelectedMarketplaceArtifactId] = useState(DEFAULT_AGENT_ARTIFACT_ID);
  const [agentLibraryIds, setAgentLibraryIds] = useState<string[]>(() => {
    const storedIds = readStoredIds(AGENT_LIBRARY_KEY);
    return storedIds.length > 0 ? storedIds : [DEFAULT_AGENT_ARTIFACT_ID];
  });
  const [uploadedArtifacts, setUploadedArtifacts] = useState<DemoArtifact[]>(readStoredArtifacts);
  const [backendAgentComparison, setBackendAgentComparison] = useState<BackendAgentComparisonState | null>(null);
  const [uploadArtifactForm, setUploadArtifactForm] = useState<UploadArtifactFormState>(() =>
    createEmptyUploadArtifactForm()
  );

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
  const [isLoadingAgentWorkspace, setIsLoadingAgentWorkspace] = useState(false);
  const [isRunningAgent, setIsRunningAgent] = useState(false);
  const [isUploadingAgentArtifact, setIsUploadingAgentArtifact] = useState(false);

  useEffect(() => {
    writeStoredIds(RECENT_TASKS_KEY, recentTaskIds);
  }, [recentTaskIds]);

  useEffect(() => {
    writeStoredIds(RECENT_DATASETS_KEY, recentDatasetIds);
  }, [recentDatasetIds]);

  useEffect(() => {
    writeStoredIds(AGENT_LIBRARY_KEY, agentLibraryIds);
  }, [agentLibraryIds]);

  useEffect(() => {
    writeStoredArtifacts(uploadedArtifacts);
  }, [uploadedArtifacts]);

  useEffect(() => {
    let isMounted = true;

    async function loadAgentWorkspace() {
      setIsLoadingAgentWorkspace(true);

      try {
        const [marketplaceResult, libraryResult] = await Promise.all([
          getAgentMarketplaceArtifacts(),
          getAgentLibrary()
        ]);

        if (!isMounted) {
          return;
        }

        const nextMarketplaceArtifacts = marketplaceResult.artifacts.map(toDemoArtifact);
        const nextLibraryArtifacts = libraryResult.artifacts.map(toDemoArtifact);
        const nextUploadedArtifacts = nextLibraryArtifacts.filter((artifact) => artifact.source === "upload");

        setMarketplaceArtifacts(nextMarketplaceArtifacts.length > 0 ? nextMarketplaceArtifacts : MARKETPLACE_ARTIFACTS);
        setUploadedArtifacts((current) => mergeDemoArtifacts(nextUploadedArtifacts, current).filter((artifact) => artifact.source === "upload"));
        setAgentLibraryIds(
          nextLibraryArtifacts.length > 0 ? nextLibraryArtifacts.map((artifact) => artifact.id) : [DEFAULT_AGENT_ARTIFACT_ID]
        );
      } catch (error) {
        if (isMounted) {
          setAgentNotice({
            tone: "neutral",
            message: `Agent API unavailable; using local demo state. ${formatError(error)}`
          });
        }
      } finally {
        if (isMounted) {
          setIsLoadingAgentWorkspace(false);
        }
      }
    }

    void loadAgentWorkspace();

    return () => {
      isMounted = false;
    };
  }, []);

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
      await switchOrAddWalletChain(injectedWallet, walletConfig);
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
  const allAgentArtifacts = useMemo(
    () => mergeDemoArtifacts(marketplaceArtifacts, uploadedArtifacts),
    [marketplaceArtifacts, uploadedArtifacts]
  );
  const agentLibraryArtifacts = useMemo(
    () =>
      agentLibraryIds
        .map((artifactId) => allAgentArtifacts.find((artifact) => artifact.id === artifactId))
        .filter((artifact): artifact is DemoArtifact => artifact !== undefined),
    [agentLibraryIds, allAgentArtifacts]
  );
  const selectedMarketplaceArtifact =
    allAgentArtifacts.find((artifact) => artifact.id === selectedMarketplaceArtifactId) ?? allAgentArtifacts[0] ?? null;
  const localAgentComparison = useMemo(
    () => buildAgentComparison(agentQuestion, agentLibraryArtifacts, marketplaceArtifacts),
    [agentQuestion, agentLibraryArtifacts, marketplaceArtifacts]
  );
  const agentComparison =
    backendAgentComparison !== null && backendAgentComparison.question === agentQuestion
      ? backendAgentComparison.result
      : localAgentComparison;
  const activeAgentAnswer = agentAnswerMode === "artifact" ? agentComparison.augmented : agentComparison.raw;

  async function addArtifactToLibrary(artifactId: string) {
    setBackendAgentComparison(null);
    setAgentLibraryIds((current) =>
      current.includes(artifactId) ? current : [artifactId, ...current].slice(0, 12)
    );

    try {
      const result = await addAgentArtifactToLibrary(artifactId);
      const nextLibraryArtifacts = result.library.map(toDemoArtifact);
      const nextUploadedArtifacts = nextLibraryArtifacts.filter((artifact) => artifact.source === "upload");

      setAgentLibraryIds(nextLibraryArtifacts.map((artifact) => artifact.id));
      setUploadedArtifacts((current) =>
        mergeDemoArtifacts(nextUploadedArtifacts, current).filter((artifact) => artifact.source === "upload")
      );
      setAgentNotice({
        tone: "success",
        message: "Artifact added to library."
      });
    } catch (error) {
      setAgentNotice({
        tone: "success",
        message: `Artifact added locally. Backend sync unavailable: ${formatError(error)}`
      });
    }
  }

  async function removeArtifactFromLibrary(artifactId: string) {
    setBackendAgentComparison(null);
    setAgentLibraryIds((current) => current.filter((candidate) => candidate !== artifactId));

    try {
      const result = await removeAgentArtifactFromLibrary(artifactId);
      setAgentLibraryIds(result.library.map((artifact) => artifact.id));
      setAgentNotice({
        tone: "neutral",
        message: "Artifact removed from library."
      });
    } catch (error) {
      setAgentNotice({
        tone: "neutral",
        message: `Artifact removed locally. Backend sync unavailable: ${formatError(error)}`
      });
    }
  }

  function useArtifactWithAgent(artifact: DemoArtifact) {
    setAgentQuestion(artifact.questionPattern);
    setActiveWorkspace("agent");
    setActiveAgentSection("ask");
    setAgentAnswerMode("artifact");
    void addArtifactToLibrary(artifact.id);
  }

  async function handleAgentQuestionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = agentQuestion.trim();

    if (trimmedQuestion.length === 0) {
      setAgentNotice({ tone: "error", message: "Enter a question before running the agent." });
      return;
    }

    setIsRunningAgent(true);
    setAgentNotice({ tone: "neutral", message: "Running raw and artifact-backed paths through the backend..." });

    try {
      const result = await compareAgentQuestion(trimmedQuestion);
      const comparison = toDemoComparison(result);
      setBackendAgentComparison({
        question: trimmedQuestion,
        result: comparison
      });
      setAgentQuestion(trimmedQuestion);
      setAgentNotice(
        result.retrievedArtifacts.length > 0
          ? { tone: "success", message: `Artifact context loaded: ${result.retrievedArtifacts[0]?.title ?? "library artifact"}.` }
          : { tone: "neutral", message: "Raw answer is available. Add a matching artifact for the augmented path." }
      );
    } catch (error) {
      const matchedArtifact = findBestArtifact(trimmedQuestion, agentLibraryArtifacts);
      setBackendAgentComparison(null);
      setAgentNotice(
        matchedArtifact
          ? {
              tone: "success",
              message: `Using local artifact fallback: ${matchedArtifact.title}. Backend sync unavailable: ${formatError(error)}`
            }
          : {
              tone: "neutral",
              message: `Using local raw fallback. Add a matching artifact for the augmented path. ${formatError(error)}`
            }
      );
    } finally {
      setIsRunningAgent(false);
    }
  }

  async function handleArtifactFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file === undefined) {
      return;
    }

    const text = await file.text();
    setUploadArtifactForm((current) => ({
      ...current,
      title: current.title || file.name.replace(/\.[^.]+$/, ""),
      answer: current.answer || text.slice(0, 900)
    }));
  }

  async function handleUploadArtifact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = uploadArtifactForm.title.trim();
    const answer = uploadArtifactForm.answer.trim();

    if (title.length === 0 || answer.length === 0) {
      setAgentNotice({ tone: "error", message: "Uploaded artifacts need a title and answer." });
      return;
    }

    setIsUploadingAgentArtifact(true);
    setBackendAgentComparison(null);

    try {
      const result = await uploadAgentArtifact({
        title,
        ...optionalField("questionPattern", uploadArtifactForm.questionPattern),
        ...optionalField("formulaPattern", uploadArtifactForm.formulaPattern),
        concepts: splitCsv(uploadArtifactForm.concepts),
        answer
      });
      const artifact = toDemoArtifact(result.artifact);
      const nextLibraryArtifacts = result.library.map(toDemoArtifact);
      const nextUploadedArtifacts = nextLibraryArtifacts.filter((candidate) => candidate.source === "upload");

      setUploadedArtifacts((current) =>
        mergeDemoArtifacts([artifact, ...nextUploadedArtifacts], current).filter((candidate) => candidate.source === "upload")
      );
      setAgentLibraryIds(nextLibraryArtifacts.map((candidate) => candidate.id));
      setSelectedMarketplaceArtifactId(artifact.id);
      setUploadArtifactForm(createEmptyUploadArtifactForm());
      setAgentQuestion(artifact.questionPattern);
      setAgentAnswerMode("artifact");
      setActiveAgentSection("library");
      setAgentNotice({ tone: "success", message: "Uploaded artifact stored and added to library." });
      return;
    } catch (error) {
      setAgentNotice({
        tone: "neutral",
        message: `Backend upload unavailable; storing artifact locally. ${formatError(error)}`
      });
    } finally {
      setIsUploadingAgentArtifact(false);
    }

    const artifact: DemoArtifact = {
      id: `upload-${crypto.randomUUID()}`,
      title,
      difficulty: "medium",
      tags: splitCsv(uploadArtifactForm.concepts).slice(0, 6),
      questionPattern: uploadArtifactForm.questionPattern.trim() || title,
      formulaPattern: uploadArtifactForm.formulaPattern.trim(),
      concepts: splitCsv(uploadArtifactForm.concepts),
      answer,
      rawAnswer: "The raw model does not have this uploaded artifact in context.",
      source: "upload"
    };

    setUploadedArtifacts((current) => [artifact, ...current].slice(0, 12));
    setAgentLibraryIds((current) => [artifact.id, ...current.filter((candidate) => candidate !== artifact.id)].slice(0, 12));
    setSelectedMarketplaceArtifactId(artifact.id);
    setUploadArtifactForm(createEmptyUploadArtifactForm());
    setAgentQuestion(artifact.questionPattern);
    setAgentAnswerMode("artifact");
    setActiveAgentSection("library");
    setAgentNotice({ tone: "success", message: "Uploaded artifact added to library." });
  }

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
      setActiveWorkspace("tasks");
      setActiveTaskSection("details");
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
      setActiveWorkspace("tasks");
      setActiveTaskSection("details");
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
      setActiveWorkspace("datasets");
      setActiveDatasetSection("latest");
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
      setActiveWorkspace("tasks");
      setActiveTaskSection("details");
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
      setActiveWorkspace("datasets");
      setActiveDatasetSection("history");
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
      setActiveWorkspace("datasets");
      setActiveDatasetSection("latest");
      setDatasetViewerNotice({
        tone: "success",
        message: `Loaded latest dataset version v${latest.version.versionNumber}.`
      });
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

  const latestDatasetLabel =
    latestVersion === null ? "Not loaded" : `v${latestVersion.versionNumber}`;
  const walletStatusLabel = chainMismatch ? "Action needed" : hasWalletConnection ? "Connected" : "Wallet offline";
  const workspaceTitle =
    activeWorkspace === "tasks"
      ? "Task workspace"
      : activeWorkspace === "datasets"
        ? "Dataset workspace"
        : "Agent workspace";
  const workspaceCopy =
    activeWorkspace === "tasks"
      ? "Create base tasks, attach corrections, and inspect the canonical task record without leaving the same surface."
      : activeWorkspace === "datasets"
        ? "Register new dataset versions and review version lineage through a focused glass explorer."
        : "Compare raw model output with library-backed artifact retrieval in one demo flow.";
  const taskSectionItems: WorkspaceSectionNavItem<TaskSectionKey>[] = [
    { key: "details", label: "Task Details" },
    { key: "create", label: "Create Task" },
    { key: "correction", label: "Correction" },
    { key: "session", label: "Session" }
  ];
  const datasetSectionItems: WorkspaceSectionNavItem<DatasetSectionKey>[] = [
    { key: "latest", label: "Latest View" },
    { key: "history", label: "History" },
    { key: "register", label: "Register" },
    { key: "session", label: "Session" }
  ];
  const agentSectionItems: WorkspaceSectionNavItem<AgentSectionKey>[] = [
    { key: "ask", label: "Ask Agent" },
    { key: "marketplace", label: "Marketplace" },
    { key: "library", label: "Library" },
    { key: "upload", label: "Upload" }
  ];

  const sessionPanel = (
    <Panel
      title="Session Status"
      eyebrow="Access"
      action={
        <button type="button" className="button button-secondary" onClick={connectWallet} disabled={isConnectingWallet}>
          {hasWalletConnection ? "Reconnect" : "Connect"}
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
        <Detail label="Configured network" value={`${walletConfig.chainName} (${walletConfig.chainId})`} />
      </div>
      {chainMismatch ? (
        <div className="inline-actions">
          <StatusNotice
            tone="error"
            message={`Wallet is on chain ${walletChainId}. Switch to ${walletConfig.chainName} to match the configured demo network.`}
          />
          <button type="button" className="button button-secondary" onClick={handleSwitchNetwork}>
            Switch Network
          </button>
        </div>
      ) : null}
    </Panel>
  );

  const taskSectionPanel =
    activeTaskSection === "create" ? (
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
    ) : activeTaskSection === "correction" ? (
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
    ) : activeTaskSection === "session" ? (
      sessionPanel
    ) : (
      <Panel title="Task Explorer" eyebrow="Read Flow">
        {taskViewerNotice ? <StatusNotice tone={taskViewerNotice.tone} message={taskViewerNotice.message} /> : null}
        <div className="stack">
          <div className="field-row">
            <input
              value={taskLookupId}
              onChange={(event) => setTaskLookupId(event.target.value)}
              placeholder="Enter task ID to load"
            />
            <button
              className="button button-primary"
              type="button"
              onClick={() => taskLookupId.trim().length > 0 && void loadTaskDetail(taskLookupId.trim())}
              disabled={isLoadingTask}
            >
              {isLoadingTask ? "Loading..." : "Load"}
            </button>
          </div>
          <RecentIdList
            title="Recent Tasks"
            ids={recentTaskIds}
            onSelect={(value) => {
              setTaskLookupId(value);
              void loadTaskDetail(value);
            }}
          />
          {isLoadingTask && selectedTask === null ? (
            <LoadingState message="Fetching the latest task record..." />
          ) : selectedTask ? (
            renderSelectedTask(selectedTask, selectedCorrections)
          ) : (
            <EmptyState message="Load a task to inspect its canonical record and corrections." />
          )}
        </div>
      </Panel>
    );

  const datasetSectionPanel =
    activeDatasetSection === "register" ? (
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
    ) : activeDatasetSection === "history" ? (
      <Panel title="Dataset History" eyebrow="Read Flow">
        {datasetViewerNotice ? <StatusNotice tone={datasetViewerNotice.tone} message={datasetViewerNotice.message} /> : null}
        <div className="stack">
          <div className="field-row">
            <input
              value={datasetLookupId}
              onChange={(event) => setDatasetLookupId(event.target.value)}
              placeholder="Enter dataset ID to inspect"
            />
            <button
              className="button button-primary"
              type="button"
              onClick={() => datasetLookupId.trim().length > 0 && void loadDatasetHistoryView(datasetLookupId.trim())}
              disabled={isLoadingDatasetHistory}
            >
              {isLoadingDatasetHistory ? "Loading..." : "Load History"}
            </button>
          </div>
          <RecentIdList
            title="Recent Datasets"
            ids={recentDatasetIds}
            onSelect={(value) => {
              setDatasetLookupId(value);
              void loadDatasetHistoryView(value);
            }}
          />
          {isLoadingDatasetHistory && datasetHistory === null ? (
            <LoadingState message="Loading version history..." />
          ) : datasetHistory ? (
            renderDatasetHistory(datasetHistory, currentDatasetHistory)
          ) : (
            <EmptyState message="Load dataset history to review version progression." />
          )}
        </div>
      </Panel>
    ) : activeDatasetSection === "session" ? (
      sessionPanel
    ) : (
      <Panel title="Latest Dataset Version" eyebrow="Read Flow">
        {datasetViewerNotice ? <StatusNotice tone={datasetViewerNotice.tone} message={datasetViewerNotice.message} /> : null}
        <div className="stack">
          <div className="field-row">
            <input
              value={datasetLookupId}
              onChange={(event) => setDatasetLookupId(event.target.value)}
              placeholder="Enter dataset ID to inspect"
            />
            <button
              className="button button-primary"
              type="button"
              onClick={() => datasetLookupId.trim().length > 0 && void loadLatestDatasetView(datasetLookupId.trim())}
              disabled={isLoadingLatestDataset}
            >
              {isLoadingLatestDataset ? "Loading..." : "Load Latest"}
            </button>
          </div>
          <RecentIdList
            title="Recent Datasets"
            ids={recentDatasetIds}
            onSelect={(value) => {
              setDatasetLookupId(value);
              void loadLatestDatasetView(value);
            }}
          />
          {isLoadingLatestDataset && latestDatasetVersion === null ? (
            <LoadingState message="Resolving the latest dataset version..." />
          ) : latestVersion && latestDatasetVersion ? (
            renderLatestDataset(latestDatasetVersion)
          ) : (
            <EmptyState message="Load the latest dataset version to inspect its canonical entry set." />
          )}
        </div>
      </Panel>
    );

  const agentSectionPanel =
    activeAgentSection === "marketplace" ? (
      <div className="agent-grid">
        <Panel
          title="Artifact Marketplace"
          eyebrow="Browse"
          action={
            selectedMarketplaceArtifact ? (
              <button
                type="button"
                className="button button-secondary"
                onClick={() => void addArtifactToLibrary(selectedMarketplaceArtifact.id)}
              >
                Add Selected
              </button>
            ) : null
          }
        >
          {agentNotice ? <StatusNotice tone={agentNotice.tone} message={agentNotice.message} /> : null}
          <div className="artifact-list">
            {allAgentArtifacts.map((artifact) => {
              const inLibrary = agentLibraryIds.includes(artifact.id);
              return (
                <button
                  className={`artifact-card ${selectedMarketplaceArtifactId === artifact.id ? "artifact-card-active" : ""}`}
                  key={artifact.id}
                  type="button"
                  onClick={() => setSelectedMarketplaceArtifactId(artifact.id)}
                >
                  <span className="artifact-card-topline">
                    <span className="label">{artifact.source === "upload" ? "Uploaded" : artifact.difficulty}</span>
                    <span className={`library-badge ${inLibrary ? "library-badge-on" : ""}`}>
                      {inLibrary ? "In Library" : "Marketplace"}
                    </span>
                  </span>
                  <strong>{artifact.title}</strong>
                  <span className="helper-copy">{artifact.formulaPattern || artifact.answer}</span>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel
          title={selectedMarketplaceArtifact?.title ?? "Artifact Detail"}
          eyebrow="Selection"
          action={
            selectedMarketplaceArtifact ? (
              <button
                type="button"
                className="button button-primary"
                onClick={() => useArtifactWithAgent(selectedMarketplaceArtifact)}
              >
                Use with Agent
              </button>
            ) : null
          }
        >
          {selectedMarketplaceArtifact ? (
            <ArtifactDetail artifact={selectedMarketplaceArtifact} />
          ) : (
            <EmptyState message="Select an artifact to inspect it." />
          )}
        </Panel>
      </div>
    ) : activeAgentSection === "library" ? (
      <Panel
        title="Artifact Library"
        eyebrow="Context"
        action={
          <button type="button" className="button button-secondary" onClick={() => setActiveAgentSection("marketplace")}>
            Browse Marketplace
          </button>
        }
      >
        {agentNotice ? <StatusNotice tone={agentNotice.tone} message={agentNotice.message} /> : null}
        {agentLibraryArtifacts.length === 0 ? (
          <EmptyState message="No artifacts are available in this library." />
        ) : (
          <div className="artifact-library-grid">
            {agentLibraryArtifacts.map((artifact) => (
              <div className="record-card artifact-library-card" key={artifact.id}>
                <RecordHeader title={artifact.title} subtitle={artifact.source === "upload" ? "Uploaded artifact" : "Marketplace artifact"} />
                <ArtifactDetail artifact={artifact} compact />
                <div className="inline-actions">
                  <button type="button" className="button button-primary" onClick={() => useArtifactWithAgent(artifact)}>
                    Use with Agent
                  </button>
                  <button type="button" className="button button-tertiary" onClick={() => void removeArtifactFromLibrary(artifact.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    ) : activeAgentSection === "upload" ? (
      <Panel title="Upload Artifact" eyebrow="Library">
        {agentNotice ? <StatusNotice tone={agentNotice.tone} message={agentNotice.message} /> : null}
        <form className="stack" onSubmit={handleUploadArtifact}>
          <Field label="Artifact File">
            <input type="file" accept=".md,.txt,.json" onChange={(event) => void handleArtifactFileUpload(event)} />
          </Field>
          <Field label="Title">
            <input
              value={uploadArtifactForm.title}
              onChange={(event) => setUploadArtifactForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Custom Excel artifact"
            />
          </Field>
          <Field label="Question Pattern">
            <textarea
              value={uploadArtifactForm.questionPattern}
              onChange={(event) =>
                setUploadArtifactForm((current) => ({ ...current, questionPattern: event.target.value }))
              }
              placeholder="Question this artifact should match"
            />
          </Field>
          <Field label="Formula Pattern">
            <input
              value={uploadArtifactForm.formulaPattern}
              onChange={(event) =>
                setUploadArtifactForm((current) => ({ ...current, formulaPattern: event.target.value }))
              }
              placeholder="=FORMULA(...)"
            />
          </Field>
          <Field label="Concepts">
            <input
              value={uploadArtifactForm.concepts}
              onChange={(event) => setUploadArtifactForm((current) => ({ ...current, concepts: event.target.value }))}
              placeholder="SUMIFS, date criteria"
            />
          </Field>
          <Field label="Answer">
            <textarea
              value={uploadArtifactForm.answer}
              onChange={(event) => setUploadArtifactForm((current) => ({ ...current, answer: event.target.value }))}
              placeholder="Artifact-backed answer"
            />
          </Field>
          <button className="button button-primary" type="submit" disabled={isUploadingAgentArtifact}>
            {isUploadingAgentArtifact ? "Adding..." : "Add to Library"}
          </button>
        </form>
      </Panel>
    ) : (
      <div className="agent-grid">
        <Panel title="Ask Excel Agent" eyebrow="Question">
          {agentNotice ? <StatusNotice tone={agentNotice.tone} message={agentNotice.message} /> : null}
          <form className="stack" onSubmit={handleAgentQuestionSubmit}>
            <Field label="Question">
              <textarea
                value={agentQuestion}
                onChange={(event) => setAgentQuestion(event.target.value)}
                placeholder="Ask an Excel formula or debugging question"
              />
            </Field>
            <div className="quick-question-grid">
              {marketplaceArtifacts.slice(0, 4).map((artifact) => (
                <button
                  type="button"
                  className="list-item"
                  key={artifact.id}
                  onClick={() => setAgentQuestion(artifact.questionPattern)}
                >
                  <span>{artifact.title}</span>
                </button>
              ))}
            </div>
            <div className="agent-option-bar" role="tablist" aria-label="Agent answer mode">
              <button
                type="button"
                className={`agent-option ${agentAnswerMode === "raw" ? "agent-option-active" : ""}`}
                onClick={() => setAgentAnswerMode("raw")}
              >
                Raw LLM
              </button>
              <button
                type="button"
                className={`agent-option ${agentAnswerMode === "artifact" ? "agent-option-active" : ""}`}
                onClick={() => setAgentAnswerMode("artifact")}
              >
                With Artifacts
              </button>
            </div>
            <button className="button button-primary" type="submit" disabled={isRunningAgent}>
              {isRunningAgent ? "Running..." : "Run Comparison"}
            </button>
          </form>
        </Panel>

        <Panel
          title={activeAgentAnswer.label}
          eyebrow="Selected Output"
          action={
            activeAgentAnswer.artifactIds.length > 0 ? (
              <button type="button" className="button button-secondary" onClick={() => setActiveAgentSection("library")}>
                View Library
              </button>
            ) : (
              <button type="button" className="button button-secondary" onClick={() => setActiveAgentSection("marketplace")}>
                Add Artifact
              </button>
            )
          }
        >
          <AgentAnswerCard answer={activeAgentAnswer} featured />
        </Panel>

        <div className="answer-comparison-grid">
          <AgentAnswerCard answer={agentComparison.raw} />
          <AgentAnswerCard answer={agentComparison.augmented} />
        </div>
      </div>
    );

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-lockup">
            <div className="brand-mark" aria-hidden="true" />
            <div>
              <p className="eyebrow">DataLoop</p>
              <strong>Base Platform</strong>
            </div>
          </div>

          <WorkspaceToggle activeWorkspace={activeWorkspace} onChange={setActiveWorkspace} />

          <div className="topbar-meta">
            <div className={`network-pill ${chainMismatch ? "network-pill-alert" : hasWalletConnection ? "network-pill-live" : ""}`}>
              <span className="network-dot" aria-hidden="true" />
              <div>
                <span className="micro-label">Network</span>
                <strong>{chainMismatch ? "Mismatch" : walletConfig.chainName}</strong>
              </div>
            </div>

            <div className="account-pill">
              <span className="micro-label">Wallet</span>
              <strong className="mono-text">{connectedStateLabel}</strong>
            </div>

            <button
              type="button"
              className={`button button-primary topbar-button ${hasWalletConnection && !chainMismatch ? "button-connected" : ""}`}
              onClick={connectWallet}
              disabled={isConnectingWallet}
            >
              {isConnectingWallet ? "Connecting..." : hasWalletConnection ? "Reconnect" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </header>

      <main className="app-shell">
        <section className="hero-shell">
          <div className="hero-copy-block">
            <p className="eyebrow">Minimal Glass Workspace</p>
            <h1>Curate tasks and datasets through a calmer control surface.</h1>
            <p className="copy">
              Create task records, attach corrections, register dataset versions, and inspect canonical state
              through a single glassmorphism workspace tuned for the Week 1 API and contract flow.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="button button-primary"
                onClick={() => setActiveWorkspace(getNextWorkspace(activeWorkspace))}
              >
                Open {workspaceLabel(getNextWorkspace(activeWorkspace))} Workspace
              </button>
              <button
                type="button"
                className="button button-tertiary"
                onClick={() => {
                  if (activeWorkspace === "tasks" && activeTaskSection === "details" && taskLookupId.trim().length > 0) {
                    void loadTaskDetail(taskLookupId.trim());
                  }
                  if (activeWorkspace === "datasets" && activeDatasetSection === "latest" && datasetLookupId.trim().length > 0) {
                    void loadLatestDatasetView(datasetLookupId.trim());
                  }
                  if (activeWorkspace === "datasets" && activeDatasetSection === "history" && datasetLookupId.trim().length > 0) {
                    void loadDatasetHistoryView(datasetLookupId.trim());
                  }
                }}
              >
                Refresh Active Explorer
              </button>
            </div>
          </div>

          <div className="hero-meta">
            <MetricCard label="API Endpoint" value={getApiBaseUrl()} mono />
            <div className="hero-stat-grid">
              <MetricCard label="Configured Chain" value={`${walletConfig.chainName} (${walletConfig.chainId})`} />
              <MetricCard label="Recent Tasks" value={String(recentTaskIds.length)} />
              <MetricCard label="Recent Datasets" value={String(recentDatasetIds.length)} />
              <MetricCard label="Latest Dataset" value={latestDatasetLabel} />
            </div>
          </div>
        </section>

        {chainMismatch ? (
          <section className="network-banner">
            <div>
              <p className="eyebrow">Wallet Action</p>
              <h2>Switch to {walletConfig.chainName} before writing on-chain state.</h2>
              <p className="section-copy">
                The connected wallet is currently on chain {walletChainId ?? "unknown"}. Align it with the configured
                demo network to keep task, correction, and dataset transactions consistent.
              </p>
            </div>
            <button type="button" className="button button-secondary" onClick={handleSwitchNetwork}>
              Switch Network
            </button>
          </section>
        ) : null}

        <section className="workspace-shell">
          <div className="workspace-heading">
            <div>
              <p className="eyebrow">{workspaceLabel(activeWorkspace)}</p>
              <h2>{workspaceTitle}</h2>
              <p className="section-copy">{workspaceCopy}</p>
            </div>
            <div className="workspace-summary">
              <MetricCard label="Session" value={walletStatusLabel} />
              {activeWorkspace === "agent" ? (
                <MetricCard label="Library Artifacts" value={String(agentLibraryArtifacts.length)} />
              ) : (
                <MetricCard label="Corrections Loaded" value={String(selectedCorrections.length)} />
              )}
            </div>
          </div>

          <div className="workspace-content">
            {activeWorkspace === "tasks" ? (
              <>
                <WorkspaceSectionNav
                  title="Task Sections"
                  items={taskSectionItems}
                  activeKey={activeTaskSection}
                  onChange={setActiveTaskSection}
                />
                {taskSectionPanel}
              </>
            ) : activeWorkspace === "datasets" ? (
              <>
                <WorkspaceSectionNav
                  title="Dataset Sections"
                  items={datasetSectionItems}
                  activeKey={activeDatasetSection}
                  onChange={setActiveDatasetSection}
                />
                {datasetSectionPanel}
              </>
            ) : (
              <>
                <WorkspaceSectionNav
                  title="Agent Sections"
                  items={agentSectionItems}
                  activeKey={activeAgentSection}
                  onChange={setActiveAgentSection}
                />
                {agentSectionPanel}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

interface WorkspaceSectionNavItem<T extends string> {
  key: T;
  label: string;
}

function WorkspaceSectionNav<T extends string>({
  title,
  items,
  activeKey,
  onChange
}: {
  title: string;
  items: WorkspaceSectionNavItem<T>[];
  activeKey: T;
  onChange: (key: T) => void;
}) {
  return (
    <div className="workspace-section-nav" role="tablist" aria-label={title}>
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          role="tab"
          aria-selected={item.key === activeKey}
          className={`workspace-section-link ${item.key === activeKey ? "workspace-section-link-active" : ""}`}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function WorkspaceToggle({
  activeWorkspace,
  onChange
}: {
  activeWorkspace: WorkspaceKey;
  onChange: (workspace: WorkspaceKey) => void;
}) {
  return (
    <div className="segmented-control" role="tablist" aria-label="Workspace switcher">
      <button
        type="button"
        className={`segment ${activeWorkspace === "tasks" ? "segment-active" : ""}`}
        onClick={() => onChange("tasks")}
      >
        Tasks
      </button>
      <button
        type="button"
        className={`segment ${activeWorkspace === "datasets" ? "segment-active" : ""}`}
        onClick={() => onChange("datasets")}
      >
        Datasets
      </button>
      <button
        type="button"
        className={`segment ${activeWorkspace === "agent" ? "segment-active" : ""}`}
        onClick={() => onChange("agent")}
      >
        Agent
      </button>
    </div>
  );
}

function workspaceLabel(workspace: WorkspaceKey) {
  switch (workspace) {
    case "tasks":
      return "Task";
    case "datasets":
      return "Dataset";
    case "agent":
      return "Agent";
  }
}

function getNextWorkspace(workspace: WorkspaceKey): WorkspaceKey {
  switch (workspace) {
    case "tasks":
      return "datasets";
    case "datasets":
      return "agent";
    case "agent":
      return "tasks";
  }
}

function MetricCard({
  label,
  value,
  mono = false
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="meta-card">
      <span className="label">{label}</span>
      <strong className={mono ? "mono-text" : undefined}>{value}</strong>
    </div>
  );
}

function ArtifactDetail({ artifact, compact = false }: { artifact: DemoArtifact; compact?: boolean }) {
  return (
    <div className="artifact-detail">
      <div className="detail-grid compact-grid">
        <Detail label="Formula" value={artifact.formulaPattern || "No formula"} mono />
        <Detail label="Concepts" value={artifact.concepts.join(", ") || "None"} />
        {!compact ? <Detail label="Difficulty" value={artifact.difficulty} /> : null}
        {!compact ? <Detail label="Source" value={artifact.source === "upload" ? "Uploaded" : "Marketplace"} /> : null}
        {artifact.storage ? <Detail label="Storage" value={`${artifact.storage.provider} ${artifact.storage.status}`} /> : null}
        {artifact.storage?.network ? <Detail label="Network" value={artifact.storage.network} /> : null}
        {artifact.storage?.rootHash ? <Detail label="Root Hash" value={shortId(artifact.storage.rootHash)} mono /> : null}
        {artifact.storage?.transactionHash ? (
          <Detail label="Storage TX" value={shortId(artifact.storage.transactionHash)} mono />
        ) : null}
      </div>
      <div className="artifact-answer-block">
        <span className="label">Answer</span>
        <p>{artifact.answer}</p>
      </div>
    </div>
  );
}

function AgentAnswerCard({ answer, featured = false }: { answer: AgentAnswer; featured?: boolean }) {
  return (
    <div className={`agent-answer-card ${featured ? "agent-answer-card-featured" : ""}`}>
      <div className="agent-answer-header">
        <div>
          <p className="label">{answer.label}</p>
          <h3>{answer.matchedArtifactTitle}</h3>
        </div>
        <span className="confidence-pill">{Math.round(answer.confidence * 100)}%</span>
      </div>
      <div className="agent-answer-body">
        {answer.formula ? (
          <pre className="formula-block">
            <code>{answer.formula}</code>
          </pre>
        ) : null}
        <p>{answer.explanation}</p>
      </div>
      <div className="agent-answer-footer">
        <span>{answer.artifactIds.length > 0 ? `${answer.artifactIds.length} artifact used` : "No artifact context"}</span>
        {answer.artifactIds.length > 0 ? <span className="mono-text">{shortId(answer.artifactIds[0] ?? "")}</span> : null}
      </div>
      {answer.provider ? (
        <div className="agent-answer-footer">
          <span>{answer.provider.mode === "0g-compute" ? "0G Compute" : "Mock provider"}</span>
          <span className="mono-text">{answer.provider.traceId ? shortId(answer.provider.traceId) : answer.provider.modelName}</span>
        </div>
      ) : null}
      {answer.provider?.errorMessage ? (
        <p className="helper-copy">Provider fallback: {answer.provider.errorMessage}</p>
      ) : null}
    </div>
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

function createEmptyUploadArtifactForm(): UploadArtifactFormState {
  return {
    title: "",
    questionPattern: "",
    formulaPattern: "",
    concepts: "",
    answer: ""
  };
}

function toDemoArtifact(artifact: AgentArtifactResource): DemoArtifact {
  return {
    id: artifact.id,
    title: artifact.title,
    difficulty: artifact.difficulty,
    tags: artifact.tags,
    questionPattern: artifact.questionPattern,
    formulaPattern: artifact.formulaPattern,
    concepts: artifact.concepts,
    answer: artifact.answer,
    ...(artifact.rawFormula !== null ? { rawFormula: artifact.rawFormula } : {}),
    rawAnswer: artifact.rawAnswer,
    source: artifact.source,
    creator: artifact.creator,
    version: artifact.version,
    usageCount: artifact.usageCount,
    benchmarkScore: artifact.benchmarkScore,
    storage: artifact.storage
  };
}

function toDemoComparison(result: AgentComparisonResult): AgentComparison {
  return {
    raw: toDemoAnswer(result.raw),
    augmented: toDemoAnswer(result.augmented),
    retrievedArtifacts: result.retrievedArtifacts.map(toDemoArtifact),
    runId: result.run.id
  };
}

function toDemoAnswer(answer: AgentAnswerResource): AgentAnswer {
  return {
    label: answer.label,
    formula: answer.formula,
    explanation: answer.explanation,
    confidence: answer.confidence,
    artifactIds: answer.artifactIds,
    matchedArtifactTitle: answer.matchedArtifactTitle,
    provider: answer.provider
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
    case "ARTIFACT_NOT_FOUND":
      return "Artifact was not found in the marketplace or upload set.";
    case "ARTIFACT_NOT_IN_LIBRARY":
      return "Artifact is not currently installed in the library.";
    case "INVALID_AGENT_QUESTION":
      return "Enter a question before running the agent.";
    case "INVALID_AGENT_ARTIFACT":
      return "Uploaded artifacts need a title and answer.";
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

function readStoredArtifacts() {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(AGENT_UPLOADS_KEY);
  if (rawValue === null) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isDemoArtifact);
  } catch {
    return [];
  }
}

function writeStoredArtifacts(artifacts: DemoArtifact[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AGENT_UPLOADS_KEY, JSON.stringify(artifacts));
  }
}

function isDemoArtifact(value: unknown): value is DemoArtifact {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<DemoArtifact>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.questionPattern === "string" &&
    typeof candidate.formulaPattern === "string" &&
    typeof candidate.answer === "string" &&
    typeof candidate.rawAnswer === "string" &&
    Array.isArray(candidate.tags) &&
    Array.isArray(candidate.concepts) &&
    candidate.source === "upload"
  );
}

function mergeDemoArtifacts(baseArtifacts: DemoArtifact[], uploadedArtifacts: DemoArtifact[]) {
  const artifactsById = new Map<string, DemoArtifact>();

  for (const artifact of [...uploadedArtifacts, ...baseArtifacts]) {
    artifactsById.set(artifact.id, artifact);
  }

  return [...artifactsById.values()];
}

function splitCsv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function buildAgentComparison(
  question: string,
  libraryArtifacts: DemoArtifact[],
  marketplaceArtifacts: DemoArtifact[]
): AgentComparison {
  const marketplaceMatch = findBestArtifact(question, marketplaceArtifacts);
  const libraryMatch = findBestArtifact(question, libraryArtifacts);
  const raw: AgentAnswer = {
    label: "Raw LLM",
    formula: marketplaceMatch?.rawFormula ?? "",
    explanation:
      marketplaceMatch?.rawAnswer ??
      "The raw model gives a general Excel answer, but no curated artifact is available for this exact pattern.",
    confidence: marketplaceMatch ? 0.74 : 0.58,
    artifactIds: [],
    matchedArtifactTitle: marketplaceMatch?.title ?? "General response"
  };
  const augmented: AgentAnswer = libraryMatch
    ? {
        label: "With Artifacts",
        formula: libraryMatch.formulaPattern,
        explanation: libraryMatch.answer,
        confidence: 0.93,
        artifactIds: [libraryMatch.id],
        matchedArtifactTitle: libraryMatch.title
      }
    : {
        label: "With Artifacts",
        formula: "",
        explanation: "No matching artifact is in the library yet. Add one from the marketplace or upload a custom artifact.",
        confidence: 0.41,
        artifactIds: [],
        matchedArtifactTitle: "Library context unavailable"
      };

  return { raw, augmented };
}

function findBestArtifact(question: string, artifacts: DemoArtifact[]) {
  const queryTokens = tokenizeAgentText(question);
  let bestArtifact: DemoArtifact | null = null;
  let bestScore = 0;

  for (const artifact of artifacts) {
    const candidateTokens = tokenizeAgentText(
      `${artifact.title} ${artifact.questionPattern} ${artifact.formulaPattern} ${artifact.concepts.join(" ")} ${artifact.tags.join(" ")}`
    );
    const score = countAgentTokenOverlap(queryTokens, candidateTokens);

    if (score > bestScore) {
      bestArtifact = artifact;
      bestScore = score;
    }
  }

  return bestScore >= 2 ? bestArtifact : null;
}

function tokenizeAgentText(value: string) {
  return new Set(
    value
      .toLowerCase()
      .split(/[^a-z0-9]+/g)
      .filter((token) => token.length >= 4 && !["with", "from", "what", "where", "when", "into"].includes(token))
  );
}

function countAgentTokenOverlap(queryTokens: Set<string>, candidateTokens: Set<string>) {
  let score = 0;

  for (const token of queryTokens) {
    if (candidateTokens.has(token)) {
      score += 1;
    }
  }

  return score;
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
  return (
    <div className="empty-state">
      <div className="empty-state-art" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p>{message}</p>
    </div>
  );
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="loading-state" aria-live="polite" aria-busy="true">
      <div className="loading-bar loading-bar-wide" />
      <div className="loading-bar" />
      <div className="loading-grid">
        <div className="loading-chip" />
        <div className="loading-chip" />
        <div className="loading-chip" />
      </div>
      <p>{message}</p>
    </div>
  );
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
