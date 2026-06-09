type ImprovementCase = {
  id?: string;
  input?: string;
  output?: string;
  expected?: string;
  feedback?: string;
  score?: number;
  trace?: string;
};

type VistaSpec = {
  seed?: string;
  objective?: string;
  cases?: ImprovementCase[];
  maxHypotheses?: number;
  epsilon?: number;
  seedNumber?: number;
  minibatchSize?: number;
  maxIterations?: number;
  restartCount?: number;
};

type NormalizedCase = Required<ImprovementCase> & { id: string };

type NormalizedSpec = {
  seed: string;
  objective: string;
  cases: NormalizedCase[];
  maxHypotheses: number;
  epsilon: number;
  seedNumber: number;
  minibatchSize: number;
  maxIterations: number;
  restartCount: number;
};

type Minibatch = {
  id: string;
  caseIds: string[];
  cases: NormalizedCase[];
};

type Hypothesis = {
  id: string;
  label: string;
  rationale: string;
  cases: string[];
  minibatchIds: string[];
  priority: number;
  semanticTags: string[];
  proposedChange: string;
};

type Candidate = {
  id: string;
  hypothesisId: string;
  source: "hypothesis" | "random-restart";
  minibatchId: string;
  text: string;
  patchPlan: Array<{ op: string; target: string; rationale: string }>;
  scores: Record<string, number>;
  meanScore: number;
  verification?: {
    strategy: string;
    verifier: string;
    minibatchScores: Array<{
      minibatchId: string;
      caseIds: string[];
      scores: Record<string, number>;
      meanScore: number;
    }>;
    passedCaseIds: string[];
    failedCaseIds: string[];
    meanScore: number;
  };
};

type Selection = {
  selected: Candidate;
  rankedCandidateIds: string[];
  epsilonDraw: number;
  explorationCandidateId: string;
  explored: boolean;
  selectionRule: string;
};

const LABELS = [
  {
    label: "output-schema",
    tags: ["format", "parser", "contract"],
    patterns: ["json", "schema", "parse", "format", "field", "xml", "yaml"],
    rationale: "The artifact needs stricter output-shape instructions and parser-facing examples.",
    proposedChange: "Add explicit output contract, field-level acceptance criteria, and malformed-output recovery rules.",
  },
  {
    label: "tool-sequencing",
    tags: ["tools", "trace", "order"],
    patterns: ["tool", "trace", "call", "lookup", "search", "after final", "order"],
    rationale: "The workflow needs explicit tool ordering, stop conditions, and evidence capture.",
    proposedChange: "Add tool preconditions, call order, stop criteria, and trace evidence requirements.",
  },
  {
    label: "context-grounding",
    tags: ["grounding", "retrieval", "citations"],
    patterns: ["hallucinat", "unsupported", "context", "ground", "source", "citation", "retrieval"],
    rationale: "The artifact needs stronger grounding rules and fallback behavior for missing evidence.",
    proposedChange: "Require cited evidence for claims and define a fallback when needed context is missing.",
  },
  {
    label: "coverage-gap",
    tags: ["coverage", "regression", "cases"],
    patterns: ["miss", "edge", "case", "regression", "not covered", "coverage"],
    rationale: "The improvement loop needs broader test coverage and targeted regression cases.",
    proposedChange: "Add examples or gates for the missing scenario and protect known-good behavior from regression.",
  },
  {
    label: "efficiency",
    tags: ["latency", "tokens", "cost"],
    patterns: ["latency", "slow", "token", "cost", "timeout", "expensive"],
    rationale: "The artifact needs cheaper branching, earlier exits, or narrower context loading.",
    proposedChange: "Add early exits, narrower context loading rules, and explicit budget gates.",
  },
  {
    label: "instruction-clarity",
    tags: ["clarity", "priority", "constraints"],
    patterns: ["ambiguous", "unclear", "confusing", "vague", "ignored", "instruction"],
    rationale: "The prompt or workflow needs clearer priorities, constraints, and examples.",
    proposedChange: "Rewrite priorities as ordered rules with concrete examples and conflict resolution.",
  },
];

function runVista(spec: VistaSpec) {
  const normalized = normalizeSpec(spec);
  const minibatches = makeMinibatches(normalized.cases, normalized.minibatchSize);
  const evidence = collectEvidence(normalized.cases);
  const hypotheses = deriveHypotheses(normalized, minibatches, evidence);
  const hypothesisCandidates = hypotheses.map((hypothesis, index) => makeCandidate(normalized, hypothesis, minibatches[index % minibatches.length], index));
  const restartCandidates = makeRestartCandidates(normalized, minibatches, hypothesisCandidates.length);
  const allCandidates = [...hypothesisCandidates, ...restartCandidates].map((candidate) => scoreCandidate(candidate, minibatches));
  const selection = chooseCandidate(normalized, allCandidates);
  const agentPrompts = makeAgentPrompts(normalized, minibatches, hypotheses, allCandidates);
  const loop = makeLoop(normalized, minibatches, hypotheses, allCandidates, selection);

  return sortJson({
    algorithm: "vista",
    mode: "orchestrated-loop",
    objective: normalized.objective,
    seed: normalized.seed,
    roles: {
      hypothesisAgent: {
        owner: "calling-agent",
        purpose: "Generate semantically labeled hypotheses from evidence without rewriting the artifact.",
      },
      rewriteAgent: {
        owner: "calling-agent",
        purpose: "Rewrite the seed artifact only after a hypothesis is selected.",
      },
      verificationAgent: {
        owner: "calling-agent",
        purpose: "Verify candidates against minibatches, traces, eval criteria, and policy gates.",
      },
      selectionPolicy: {
        owner: "script",
        purpose: "Apply deterministic random restart and epsilon-greedy selection over scored candidates.",
      },
    },
    parameters: {
      epsilon: normalized.epsilon,
      maxHypotheses: normalized.maxHypotheses,
      maxIterations: normalized.maxIterations,
      minibatchSize: normalized.minibatchSize,
      restartCount: normalized.restartCount,
      seedNumber: normalized.seedNumber,
    },
    state: {
      current: "ready-for-agent-review",
      completed: [
        "read-cases",
        "derive-hypothesis-seeds",
        "scaffold-candidate-rewrites",
        "run-deterministic-proxy-verification",
        "select-candidate",
      ],
      next: [
        "agent-completes-hypothesis-generation",
        "agent-rewrites-candidates",
        "agent-verifies-candidates",
        "human-accepts-or-repeats",
      ],
      loopCursor: loop.iterations[0]?.id || "iteration-1",
    },
    minibatches: minibatches.map((batch) => ({
      id: batch.id,
      caseIds: batch.caseIds,
    })),
    hypotheses,
    candidates: allCandidates,
    selectedCandidate: selection.selected,
    agentPrompts,
    loop,
    trace: {
      evidenceToHypotheses: hypotheses.map((hypothesis) => ({
        hypothesisId: hypothesis.id,
        label: hypothesis.label,
        evidenceCaseIds: hypothesis.cases,
        minibatchIds: hypothesis.minibatchIds,
        semanticTags: hypothesis.semanticTags,
      })),
      hypothesisToCandidates: allCandidates.map((candidate) => ({
        candidateId: candidate.id,
        hypothesisId: candidate.hypothesisId,
        source: candidate.source,
        minibatchId: candidate.minibatchId,
        meanScore: candidate.meanScore,
      })),
      exploreExploit: {
        epsilon: normalized.epsilon,
        epsilonDraw: selection.epsilonDraw,
        explored: selection.explored,
        randomRestartIncluded: restartCandidates.length > 0,
        explorationCandidateId: selection.explorationCandidateId,
        rankedCandidateIds: selection.rankedCandidateIds,
        selectedCandidateId: selection.selected.id,
        selectionRule: selection.selectionRule,
      },
      audit: loop.iterations,
    },
  });
}

function normalizeSpec(spec: VistaSpec): NormalizedSpec {
  const cases = Array.isArray(spec.cases) && spec.cases.length > 0
    ? spec.cases
    : [{ id: "baseline", feedback: "No cases supplied; start with instruction clarity and coverage." }];
  const normalizedCases = cases.map((item, index) => ({
    id: typeof item.id === "string" && item.id.trim() ? item.id : `case-${index + 1}`,
    input: item.input || "",
    output: item.output || "",
    expected: item.expected || "",
    feedback: item.feedback || "",
    score: typeof item.score === "number" ? item.score : 0,
    trace: item.trace || "",
  }));
  const defaultMinibatchSize = Math.max(1, Math.min(3, normalizedCases.length));
  return {
    seed: typeof spec.seed === "string" && spec.seed.trim() ? spec.seed : "Replace with the current prompt, skill, code, agent, or workflow artifact.",
    objective: typeof spec.objective === "string" && spec.objective.trim() ? spec.objective : "Improve the artifact against observed eval and trace feedback.",
    cases: normalizedCases,
    maxHypotheses: Math.max(1, Math.min(12, Math.floor(spec.maxHypotheses || 4))),
    epsilon: Math.max(0, Math.min(1, Number(spec.epsilon ?? 0.15))),
    seedNumber: Number.isFinite(spec.seedNumber) ? Number(spec.seedNumber) : 17,
    minibatchSize: Math.max(1, Math.min(normalizedCases.length, Math.floor(spec.minibatchSize || defaultMinibatchSize))),
    maxIterations: Math.max(1, Math.min(12, Math.floor(spec.maxIterations || 3))),
    restartCount: Math.max(1, Math.min(4, Math.floor(spec.restartCount || 1))),
  };
}

function makeMinibatches(cases: NormalizedCase[], size: number): Minibatch[] {
  const batches: Minibatch[] = [];
  for (let index = 0; index < cases.length; index += size) {
    const batchCases = cases.slice(index, index + size);
    batches.push({
      id: `minibatch-${batches.length + 1}`,
      caseIds: batchCases.map((item) => item.id),
      cases: batchCases,
    });
  }
  return batches;
}

function collectEvidence(cases: NormalizedCase[]) {
  return cases.map((item) => {
    const text = caseText(item);
    return {
      caseId: item.id,
      text,
      signals: detectLabels(text).map((label) => label.label),
    };
  });
}

function deriveHypotheses(spec: NormalizedSpec, minibatches: Minibatch[], evidence: ReturnType<typeof collectEvidence>): Hypothesis[] {
  const labels = new Map<string, { cases: string[]; weight: number; label: typeof LABELS[number] }>();
  for (const item of evidence) {
    const matched = detectLabels(item.text);
    for (const label of matched) {
      const current = labels.get(label.label) || { cases: [], weight: 0, label };
      current.cases.push(item.caseId);
      current.weight += signalWeight(item.text, label.patterns);
      labels.set(label.label, current);
    }
  }
  if (labels.size === 0) {
    const fallback = LABELS.find((item) => item.label === "instruction-clarity") || LABELS[LABELS.length - 1];
    labels.set(fallback.label, {
      cases: spec.cases.map((item) => item.id),
      weight: 1,
      label: fallback,
    });
  }
  return Array.from(labels.values())
    .map((value, index) => {
      const caseIds = Array.from(new Set(value.cases)).sort();
      return {
        id: `h${index + 1}`,
        label: value.label.label,
        rationale: value.label.rationale,
        cases: caseIds,
        minibatchIds: minibatches
          .filter((batch) => batch.caseIds.some((caseId) => caseIds.includes(caseId)))
          .map((batch) => batch.id),
        priority: value.weight,
        semanticTags: value.label.tags.slice().sort(),
        proposedChange: value.label.proposedChange,
      };
    })
    .sort((left, right) => right.priority - left.priority || left.label.localeCompare(right.label))
    .slice(0, spec.maxHypotheses)
    .map((hypothesis, index) => ({ ...hypothesis, id: `h${index + 1}` }));
}

function makeCandidate(spec: NormalizedSpec, hypothesis: Hypothesis, minibatch: Minibatch, index: number): Candidate {
  const text = [
    spec.seed.trim(),
    "",
    `Improvement focus: ${hypothesis.label}.`,
    `Hypothesis: ${hypothesis.rationale}`,
    `Proposed change: ${hypothesis.proposedChange}`,
    "Apply only changes that are measurable against evals or trace observations.",
    "Preserve existing behavior unless a failing case or trace justifies changing it.",
    `Verification minibatch: ${minibatch.id} (${minibatch.caseIds.join(", ")}).`,
  ].join("\n");
  return {
    id: `c${index + 1}`,
    hypothesisId: hypothesis.id,
    source: "hypothesis",
    minibatchId: minibatch.id,
    text,
    patchPlan: [
      {
        op: "preserve",
        target: "existing public contract",
        rationale: "VISTA keeps behavior stable unless evidence justifies a change.",
      },
      {
        op: "add",
        target: hypothesis.label,
        rationale: hypothesis.proposedChange,
      },
      {
        op: "gate",
        target: "evals and traces",
        rationale: "Accept only if verification improves the target minibatch without protected regressions.",
      },
    ],
    scores: {},
    meanScore: 0,
  };
}

function makeRestartCandidates(spec: NormalizedSpec, minibatches: Minibatch[], offset: number): Candidate[] {
  return Array.from({ length: spec.restartCount }, (_, index) => {
    const minibatch = minibatches[index % minibatches.length];
    return {
      id: `c${offset + index + 1}`,
      hypothesisId: "restart",
      source: "random-restart" as const,
      minibatchId: minibatch.id,
      text: [
        spec.seed.trim(),
        "",
        "Improvement focus: random-restart.",
        "Hypothesis: Reframe the artifact from the objective and all observed failures rather than editing only local wording.",
        "Proposed change: rebuild the instruction flow around objective, constraints, examples, and acceptance gates.",
        "Apply a minimal rewrite that keeps the public contract stable and adds explicit measurable success criteria.",
        `Verification minibatch: ${minibatch.id} (${minibatch.caseIds.join(", ")}).`,
      ].join("\n"),
      patchPlan: [
        {
          op: "restart",
          target: "artifact structure",
          rationale: "Escape a local optimum by rebuilding from objective and evidence.",
        },
        {
          op: "gate",
          target: "all observed failures",
          rationale: "Accept only if broad verification beats local edits.",
        },
      ],
      scores: {},
      meanScore: 0,
    };
  });
}

function scoreCandidate(candidate: Candidate, minibatches: Minibatch[]): Candidate {
  const minibatchScores = minibatches.map((batch) => {
    const scores: Record<string, number> = {};
    for (const item of batch.cases) {
      scores[item.id] = scoreCase(candidate, item);
    }
    return {
      minibatchId: batch.id,
      caseIds: batch.caseIds,
      scores,
      meanScore: mean(Object.values(scores)),
    };
  });
  const scores = Object.assign({}, ...minibatchScores.map((item) => item.scores));
  const meanScore = mean(Object.values(scores));
  const passedCaseIds = Object.entries(scores)
    .filter(([, score]) => score >= 0.7)
    .map(([caseId]) => caseId)
    .sort();
  const failedCaseIds = Object.entries(scores)
    .filter(([, score]) => score < 0.7)
    .map(([caseId]) => caseId)
    .sort();
  return {
    ...candidate,
    scores,
    meanScore,
    verification: {
      strategy: "parallel-minibatch-deterministic-proxy",
      verifier: "improve-cli",
      minibatchScores,
      passedCaseIds,
      failedCaseIds,
      meanScore,
    },
  };
}

function scoreCase(candidate: Candidate, item: NormalizedCase): number {
  let score = 0.45;
  const text = caseText(item);
  const candidateText = candidate.text.toLowerCase();
  if (candidateText.includes("measurable")) score += 0.1;
  if (candidateText.includes("preserve existing behavior")) score += 0.05;
  if (candidateText.includes("verification minibatch")) score += 0.05;
  for (const label of LABELS) {
    const hasCaseSignal = label.patterns.some((pattern) => text.includes(pattern));
    const hasCandidateFocus = candidateText.includes(label.label);
    if (hasCaseSignal && hasCandidateFocus) score += 0.3;
  }
  if (candidate.source === "random-restart") {
    score += 0.05;
  }
  return Number(Math.min(1, score).toFixed(3));
}

function chooseCandidate(spec: NormalizedSpec, candidates: Candidate[]): Selection {
  const ranked = candidates
    .slice()
    .sort((left, right) => right.meanScore - left.meanScore || left.id.localeCompare(right.id));
  const restarts = ranked.filter((candidate) => candidate.source === "random-restart");
  const explorationCandidate = restarts[0] || ranked[ranked.length - 1];
  const epsilonDraw = Number(seededFraction(`${spec.objective}:${spec.seedNumber}:epsilon`).toFixed(6));
  const explored = epsilonDraw < spec.epsilon;
  const selected = explored ? explorationCandidate : ranked[0];
  return {
    selected,
    rankedCandidateIds: ranked.map((candidate) => candidate.id),
    epsilonDraw,
    explorationCandidateId: explorationCandidate.id,
    explored,
    selectionRule: "epsilon-greedy over deterministic proxy verification with stable id tie-breaks",
  };
}

function makeAgentPrompts(spec: NormalizedSpec, minibatches: Minibatch[], hypotheses: Hypothesis[], candidates: Candidate[]) {
  return {
    hypothesis: [
      "# VISTA Hypothesis Agent",
      "",
      "Generate semantically labeled hypotheses from the objective, seed artifact, eval failures, and trace observations.",
      "Do not rewrite the artifact in this step. Produce hypotheses only.",
      "",
      "## Objective",
      "",
      spec.objective,
      "",
      "## Seed",
      "",
      spec.seed.trim(),
      "",
      "## Minibatches",
      "",
      ...minibatches.map((batch) => `- ${batch.id}: ${batch.caseIds.join(", ")}`),
      "",
      "## Output JSON",
      "",
      '{"hypotheses":[{"id":"h-agent-1","label":"short-semantic-label","rationale":"why evidence supports this","caseIds":["case-id"],"proposedChange":"what to change later"}]}',
      "",
    ].join("\n"),
    rewrite: [
      "# VISTA Rewrite Agent",
      "",
      "Rewrite the seed artifact for exactly one selected hypothesis. Preserve unrelated behavior.",
      "Return the full rewritten artifact plus a compact patch rationale.",
      "",
      "## Candidate Seeds",
      "",
      ...candidates.map((candidate) => `- ${candidate.id}: ${candidate.hypothesisId} (${candidate.source})`),
      "",
      "## Output JSON",
      "",
      '{"candidateId":"c1","artifact":"full rewritten artifact","patchRationale":["evidence-backed edit"]}',
      "",
    ].join("\n"),
    verify: [
      "# VISTA Verification Agent",
      "",
      "Verify one candidate against its assigned minibatch and any protected regression cases.",
      "Return scores, pass/fail decisions, cited evidence, and regression notes. Do not select a winner.",
      "",
      "## Verification Contract",
      "",
      "- Score each case from 0 to 1.",
      "- Cite eval output, trace spans, or fixture evidence for every score.",
      "- Mark any policy, safety, or compatibility regression.",
      "",
      "## Output JSON",
      "",
      '{"candidateId":"c1","scores":{"case-id":0.0},"passedCaseIds":[],"failedCaseIds":[],"evidence":["trace or eval citation"],"regressions":[]}',
      "",
    ].join("\n"),
  };
}

function makeLoop(spec: NormalizedSpec, minibatches: Minibatch[], hypotheses: Hypothesis[], candidates: Candidate[], selection: Selection) {
  const iterations = Array.from({ length: spec.maxIterations }, (_, index) => {
    const minibatch = minibatches[index % minibatches.length];
    const iterationHypotheses = hypotheses.filter((hypothesis) => hypothesis.minibatchIds.includes(minibatch.id));
    const iterationCandidates = candidates.filter((candidate) => candidate.minibatchId === minibatch.id);
    return {
      id: `iteration-${index + 1}`,
      minibatchId: minibatch.id,
      status: index === 0 ? "scaffolded" : "pending",
      steps: [
        {
          name: "read",
          owner: "script",
          status: "completed",
          outputs: ["inputs/seed.md", "inputs/cases.jsonl", `vista/minibatches/${minibatch.id}.json`],
        },
        {
          name: "hypothesize",
          owner: "calling-agent",
          status: "prompted",
          promptRef: "vista/prompts/hypothesis-agent.md",
          outputs: [`vista/hypotheses/${index + 1}.json`],
          hypothesisIds: iterationHypotheses.map((hypothesis) => hypothesis.id),
        },
        {
          name: "rewrite",
          owner: "calling-agent",
          status: "prompted",
          promptRef: "vista/prompts/rewrite-agent.md",
          outputs: iterationCandidates.map((candidate) => `vista/candidates/${candidate.id}.md`),
          candidateIds: iterationCandidates.map((candidate) => candidate.id),
        },
        {
          name: "verify",
          owner: "calling-agent",
          status: "prompted",
          promptRef: "vista/prompts/verification-agent.md",
          outputs: iterationCandidates.map((candidate) => `vista/verification/${candidate.id}.json`),
          candidateIds: iterationCandidates.map((candidate) => candidate.id),
        },
        {
          name: "select",
          owner: "script",
          status: index === 0 ? "completed" : "pending",
          selectedCandidateId: selection.selected.id,
          rule: selection.selectionRule,
        },
        {
          name: "summarize",
          owner: "calling-agent",
          status: "pending",
          outputs: [`vista/summaries/${index + 1}.md`],
        },
        {
          name: "repeat",
          owner: "human-or-agent",
          status: "pending",
          condition: "Continue only if eval delta, trace evidence, or human review requests another VISTA iteration.",
        },
      ],
    };
  });
  return {
    style: "sensei-like-progress-loop",
    states: ["read", "hypothesize", "rewrite", "verify", "select", "summarize", "repeat"],
    iterations,
  };
}

function detectLabels(text: string) {
  const lower = text.toLowerCase();
  return LABELS.filter((label) => label.patterns.some((pattern) => lower.includes(pattern)));
}

function signalWeight(text: string, patterns: string[]): number {
  const lower = text.toLowerCase();
  return patterns.reduce((total, pattern) => total + (lower.includes(pattern) ? 1 : 0), 0);
}

function caseText(item: NormalizedCase): string {
  return `${item.input} ${item.output} ${item.expected} ${item.feedback} ${item.trace}`.toLowerCase();
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(3));
}

function seededFraction(text: string): number {
  let hash = 2166136261;
  for (const char of text) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function sortJson(value: any): any {
  if (Array.isArray(value)) return value.map(sortJson);
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(value).sort()) {
      result[key] = sortJson(value[key]);
    }
    return result;
  }
  return value;
}

module.exports = { runVista };
