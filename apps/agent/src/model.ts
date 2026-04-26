import type { AgentBenchmarkCase, AgentKnowledgeArtifact } from "@dataloop/shared";

import type { AgentConfig } from "./config";

export interface AgentModel {
  generate(input: {
    systemPrompt: string;
    benchmarkCase: AgentBenchmarkCase;
    retrievedArtifacts: AgentKnowledgeArtifact[];
  }): Promise<string>;
}

interface OpenAiChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
  }>;
}

export function createAgentModel(config: AgentConfig): AgentModel {
  if (config.modelMode === "openai-compatible") {
    return new OpenAiCompatibleAgentModel(config);
  }

  return new MockAgentModel();
}

export function buildRetrievedArtifactContext(retrievedArtifacts: AgentKnowledgeArtifact[]) {
  if (retrievedArtifacts.length === 0) {
    return "No retrieved artifacts were found for this task.";
  }

  return retrievedArtifacts
    .map((artifact, index) => {
      const escalationRule = artifact.frontmatter.requiresHuman ? "Escalate to a human." : "No human escalation required.";
      const resolutionSteps = artifact.frontmatter.resolutionSteps.join(" ");

      return [
        `Artifact ${index + 1}`,
        `artifactId: ${artifact.artifactId}`,
        `title: ${artifact.frontmatter.title}`,
        `issuePattern: ${artifact.frontmatter.issuePattern}`,
        `classification: ${artifact.frontmatter.classification}`,
        `severity: ${artifact.frontmatter.severity}`,
        `escalation: ${escalationRule}`,
        `resolutionSteps: ${resolutionSteps}`
      ].join("\n");
    })
    .join("\n\n");
}

class MockAgentModel implements AgentModel {
  async generate(input: {
    systemPrompt: string;
    benchmarkCase: AgentBenchmarkCase;
    retrievedArtifacts: AgentKnowledgeArtifact[];
  }) {
    void input.systemPrompt;

    const matchedArtifact = input.retrievedArtifacts.find(
      (artifact) => artifact.benchmarkCaseId === input.benchmarkCase.id
    );

    if (matchedArtifact !== undefined) {
      return JSON.stringify(input.benchmarkCase.expected);
    }

    return input.benchmarkCase.mockResponse;
  }
}

class OpenAiCompatibleAgentModel implements AgentModel {
  constructor(private readonly config: AgentConfig) {}

  async generate(input: {
    systemPrompt: string;
    benchmarkCase: AgentBenchmarkCase;
    retrievedArtifacts: AgentKnowledgeArtifact[];
  }) {
    const artifactContext = buildRetrievedArtifactContext(input.retrievedArtifacts);

    const response = await fetch(`${this.config.modelBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.config.modelApiKey ? { Authorization: `Bearer ${this.config.modelApiKey}` } : {})
      },
      body: JSON.stringify({
        model: this.config.modelName,
        temperature: 0.2,
        messages: [
          { role: "system", content: input.systemPrompt },
          {
            role: "system",
            content: [
              "Retrieved markdown artifacts follow.",
              "Use them as specialist knowledge before answering.",
              artifactContext
            ].join("\n\n")
          },
          { role: "user", content: input.benchmarkCase.userPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Model request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as OpenAiChatCompletionResponse;
    const choice = payload.choices?.[0]?.message?.content;

    if (typeof choice === "string") {
      return choice;
    }

    if (Array.isArray(choice)) {
      return choice
        .map((part) => (typeof part.text === "string" ? part.text : ""))
        .join("")
        .trim();
    }

    throw new Error("Model response did not include a usable message");
  }
}
