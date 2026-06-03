export type LabStatus = "in-progress" | "completed";

export type Lab = {
  slug: string;
  title: string;
  status: LabStatus;
  eyebrow: string;
  description: string;
  year: string;
  type: string;

  problem: string;
  direction: string;

  decisions: {
    title: string;
    problem: string;
    solution: string;
    impact: string;
    image: string;
  }[];

  interfaces: {
    title: string;
    description: string;
    image: string;
    alt: string;
  }[];

  timeline: {
    title: string;
    description: string;
    image: string;
  }[];

  learnings: {
    title: string;
    body: string;
  }[];
};

export const labs: Lab[] = [
  {
    slug: "spanlens",

    title: "SpanLens",

    status: "in-progress",

    eyebrow: "Text Inspection · Context Systems · AI UX",

    year: "2026",

    type: "Interface Experiment",

    description:
      "An experiment exploring how AI systems can expose retrieval, reasoning, and execution without overwhelming the user.",

    problem:
      "Most AI products behave like black boxes. A prompt goes in, a response comes out, and users are left guessing what happened in between. As AI systems become more agentic, this lack of visibility creates uncertainty and weakens trust.",

    direction:
      "SpanLens explores a different model. Instead of treating AI output as a single event, it visualizes the entire execution lifecycle — prompt processing, retrieval, generation, tool usage, and rendering — turning opaque workflows into understandable systems.",

      decisions: [
        {
          title: "Making critical information persistent",
      
          problem:
            "Execution details were separated from the trace. Users had to repeatedly scroll back and forth to understand latency, token usage, or the current state of a span.",
      
          solution:
            "A persistent inspection panel remains visible while users explore the timeline. The panel updates dynamically based on the selected execution stage.",
      
          impact:
            "Users can investigate execution flow without losing access to important context. The interface behaves more like an inspection tool than a document.",
      
          image: "/labs/spanlens/02-overview-dashboard.png",
        },
      
        {
          title: "Reducing visual noise",
      
          problem:
            "Early iterations used multiple accent colors to represent different execution stages. While visually interesting, it made scanning harder and pulled attention away from the actual information.",
      
          solution:
            "The interface was reduced to a near-monochromatic palette with a single reddish-pink accent used only for progress, focus, and active execution.",
      
          impact:
            "Hierarchy became significantly clearer. Attention naturally follows the execution flow instead of competing UI elements.",
      
          image: "/labs/spanlens/05-llm-generation.png",
        },
      
        {
          title: "Making Agent Mode understandable",
      
          problem:
            "Agent Mode often behaves like a mysterious switch. Users rarely understand what changes when it is enabled.",
      
          solution:
            "Instead of explaining Agent Mode through documentation, SpanLens reveals its effects directly through the execution timeline and inspector.",
      
          impact:
            "Users immediately understand the cost and behavior of agentic workflows because the execution path becomes visible.",
      
          image: "/labs/spanlens/09-agent-mode.png",
        },
      ],

    interfaces: [
  {
    title: "Execution Overview",
    description:
      "A single surface that visualizes the entire lifecycle of an AI response, from prompt ingestion to final rendering.",
    image: "/labs/spanlens/02-overview-dashboard.png",
    alt: "SpanLens overview dashboard",
  },

  {
    title: "Prompt Input",
    description:
      "Every execution begins with prompt normalization and validation. The inspector immediately exposes token counts, latency, and execution metadata.",
    image: "/labs/spanlens/03-prompt-input.png",
    alt: "Prompt Input stage",
  },

  {
    title: "Context Retrieval",
    description:
      "Retrieved context is displayed as a first-class step instead of hidden infrastructure. Users can inspect search, ranking, and retrieval behavior directly.",
    image: "/labs/spanlens/04-context-retrieval.png",
    alt: "Context Retrieval stage",
  },

  {
    title: "LLM Generation",
    description:
      "Generation is broken into observable phases including prefill, streaming, and finalization, exposing what is normally hidden behind a loading spinner.",
    image: "/labs/spanlens/05-llm-generation.png",
    alt: "LLM Generation stage",
  },

  {
    title: "Tool Execution",
    description:
      "External tools appear as their own execution layer, making parallel actions and orchestration visible instead of opaque.",
    image: "/labs/spanlens/06-tool-execution.png",
    alt: "Tool Execution stage",
  },

  {
    title: "Post Processing",
    description:
      "Formatting, citation injection, validation, and safety transformations remain inspectable after generation completes.",
    image: "/labs/spanlens/07-post-processing.png",
    alt: "Post Processing stage",
  },

  {
    title: "Response Rendering",
    description:
      "The final delivery phase reveals how structured outputs become user-facing interfaces and content streams.",
    image: "/labs/spanlens/08-response-rendering.png",
    alt: "Response Rendering stage",
  },

  {
    title: "Agent Mode",
    description:
      "A dedicated execution mode that expands the system beyond generation into planning, orchestration, and multi-step workflows.",
    image: "/labs/spanlens/09-agent-mode.png",
    alt: "Agent Mode",
  },
],

timeline: [
    {
      title: "Idle State",
  
      description:
        "Before execution begins, the system presents a calm overview of the workflow. Users can understand the pipeline structure before any tokens are processed.",
  
      image: "/labs/spanlens/01-idle-state.png",
    },
  
    {
      title: "Prompt Input",
  
      description:
        "Incoming requests are normalized and prepared before entering the pipeline. SpanLens exposes token counts, latency, and preprocessing metadata.",
  
      image: "/labs/spanlens/03-prompt-input.png",
    },
  
    {
      title: "Context Retrieval",
  
      description:
        "Relevant information is retrieved, reranked, and assembled. Users can inspect retrieval latency, chunk counts, and search metadata.",
  
      image: "/labs/spanlens/04-context-retrieval.png",
    },
  
    {
      title: "LLM Generation",
  
      description:
        "The model generates its response while exposing throughput, token usage, and generation stages such as prefill and streaming.",
  
      image: "/labs/spanlens/05-llm-generation.png",
    },
  
    {
      title: "Tool Execution",
  
      description:
        "External systems are called when needed. SpanLens visualizes which tools were used, how long they took, and how their outputs contribute to the final response.",
  
      image: "/labs/spanlens/06-tool-execution.png",
    },
  
    {
      title: "Post Processing",
  
      description:
        "Generated content is formatted, validated, sanitized, and enriched before delivery.",
  
      image: "/labs/spanlens/07-post-processing.png",
    },
  
    {
      title: "Response Rendering",
  
      description:
        "The final output is assembled and delivered. Rendering metrics provide visibility into the last stage of the pipeline.",
  
      image: "/labs/spanlens/08-response-rendering.png",
    },
  ],
    learnings: [
      {
        title: "Transparency builds trust",

        body:
          "Users don't necessarily want raw logs. They want confidence. Showing the right information at the right time is often more valuable than exposing everything.",
      },

      {
        title: "AI should feel inspectable",

        body:
          "As AI systems become increasingly autonomous, visibility becomes just as important as capability. Users need to understand what happened, not just receive an answer.",
      },

      {
        title: "Execution can become a story",

        body:
          "Breaking AI workflows into understandable stages transforms an opaque process into a narrative users can follow, inspect, and trust.",
      },
    ],
  },
];

export function getLabBySlug(slug: string) {
  return labs.find((lab) => lab.slug === slug);
}