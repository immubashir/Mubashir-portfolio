export type CaseStudyCard = {
  title: string;
  description?: string;
  pros?: string[];
  cons?: string[];
  outcome?: string;
};

export type CaseStudyChapter = {
  id: string;
  label: string;
  title: string;
  content?: string[];
  bullets?: string[];
  quote?: string;
  cards?: CaseStudyCard[];
  images?: string[];
};

export type CaseStudyMediaItem = {
  id: string;
  title: string;
  type: "image" | "video";
  src: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  link:string;
  category: string;
  status: string;
  tint?: string;
  tintLow?: string;
  role: string;
  timeline?: string;
  tools?: string[];
  heroImage: string;
  overview: string;
  developmentNote?: string;
  highlights?: string[];
  mediaShowcase?: CaseStudyMediaItem[];
  chapters?: CaseStudyChapter[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hourflow",
    title: "Hourflow",
    subtitle: "Designing a distraction-free, AI-assisted study workspace",
    link: "",
    category: "Product Design · Interaction Design · System Thinking",
    status: "Ongoing",
    role: "Product Designer + Engineer",
    timeline: "Research & Design Phase",
    tools: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    heroImage: "/hourflow/Hourflow-Hero.png",
    tint: "rgb(144, 93, 211)",
    tintLow: "rgb(144, 93, 211, 0.1)",
    overview:
      "Hourflow is a note-first study workspace designed to eliminate context switching. Notes remain the permanent primary surface while PDFs, AI, and reference material appear temporarily — on demand, without restructuring the layout or disrupting deep focus.",
    developmentNote:
      "Hourflow is currently in active design and development. The visuals shown here represent early Figma explorations of the interface and interaction model.",
    highlights: [
      "Note-first workspace that never resizes to accommodate supporting tools",
      "Hybrid snap + float panel model — positions change, windows don't",
      "The Board: a session-scoped screenshot tray for direct AI attachment",
      "AI invoked intentionally, never left open as ambient noise",
    ],

    mediaShowcase: [
      {
        id: "0.1",
        title: "Sample UI components",
        type: "image",
        src: "/hourflow/Hourflow-Hero.png",
      },
      {
        id: "0.2",
        title: "Mobile homepage",
        type: "image",
        src: "/hourflow/Hourflow-mobile-interface.png",
      },
      {
        id: "0.3",
        title: "Core component catalogue",
        type: "image",
        src: "/hourflow/Hourflow-Interface.png",
      },
      {
        id: "0.4",
        title: "Wireframe exploration",
        type: "image",
        src: "/hourflow/Hourflow-Wireframe.png",
      },
    ],

    chapters: [
      {
        id: "what-youre-seeing",
        label: "00",
        title: "What You're Seeing",
        content: [
          "Hourflow is a note-first study workspace where writing remains the permanent primary surface.",
          "Supporting tools — PDFs, AI, reference material — are designed to appear temporarily, giving quick access without restructuring the layout or displacing what the user was doing.",
        ],
      },
      {
        id: "context",
        label: "01",
        title: "Context",
        content: [
          "Modern studying is fragmented by design. Notes live in one app, lecture slides sit in a browser tab, AI tutoring happens in a separate window, and screenshots pile up on the desktop folder, disconnected from everything else.",
          "After talking to roughly ten students who shared the same frustration — and experiencing it myself — a consistent pattern emerged: it wasn't any individual tool that was the problem. It was the transitions between them.",
          "One thing kept coming up: students were pasting screenshots into ChatGPT or Claude, re-explaining the same context every single time, and losing the thread the moment they needed a follow-up. The AI was useful. The workflow around it was destroying the focus it was supposed to support.",
          "Hourflow started as an attempt to fix the workflow — not add another tool to it.",
        ],
      },
      {
        id: "problem",
        label: "02",
        title: "Problem",
        bullets: [
          "Switching between notes, PDFs, AI, and browser tabs breaks focus and resets mental context",
          "Students re-explain the same context to AI tools every time they change windows",
          "Screenshots get saved to desktop folders and disconnected from the AI workflow entirely",
          "Persistent sidebars and split layouts permanently shrink the writing surface",
          "Every tool assumes it deserves permanent screen real estate — and none of them are right",
        ],
      },
      {
        id: "principles",
        label: "03",
        title: "Design Principles",
        cards: [
          {
            title: "Focus first",
            description:
              "Notes are always the primary surface. Supporting tools must never compete for that position or permanently displace writing space.",
          },
          {
            title: "Temporary by default",
            description:
              "Most tool interactions during study are brief. The interface should support fast entry and fast exit without altering the layout permanently.",
          },
          {
            title: "Low-friction recovery",
            description:
              "After any supporting panel interaction, the workspace returns to exactly the state the user left it in — no mental reset required.",
          },
          {
            title: "Context preservation",
            description:
              "The system should hold context so users don't have to re-explain or re-locate. Cognitive cost lives in the transitions, not the tools.",
          },
        ],
      },
      {
        id: "insight",
        label: "04",
        title: "Key Insight",
        quote:
          "Students don't need every tool open all the time. They need the right tool available for a moment — without losing where they were.",
      },
      {
        id: "exploration",
        label: "05",
        title: "Exploration",
        cards: [
          {
            title: "Concept 1 · Fixed split layout",
            description:
              "Notes on one side, supporting panel on the other — the conventional split. The failure was personal: resizing the notes window to fit a PDF, then resizing back to write, then doing it again for another reference. Every resize asked me to re-orient to a slightly different surface. The 'used-to-ability' disappears the moment your workspace changes shape.",
            pros: ["Predictable and familiar", "Easy to understand at a glance", "No interaction complexity"],
            cons: [
              "Permanently shrinks the writing surface",
              "Layout cost is disproportionate to short reference tasks",
              "Breaks muscle memory every time a panel opens or closes",
            ],
            outcome: "Rejected as the primary direction",
          },
          {
            title: "Concept 2 · Floating panels",
            description:
              "Panels appear as overlays when invoked, floating above the notes surface without restructuring it. The writing area is preserved completely — panels appear, do their job, and dismiss without leaving a mark on the layout.",
            pros: [
              "Writing surface is never displaced",
              "Panels can be dismissed cleanly without layout cost",
              "Supports quick-reference tasks naturally",
            ],
            cons: [
              "Needs clear behavioral rules to avoid interaction chaos",
              "Stacking and dismissal patterns need explicit design",
            ],
            outcome: "Strong direction — needed more structure",
          },
          {
            title: "Concept 3 · Hybrid snap + float",
            description:
              "Panels can float for quick reference or snap to a fixed position for extended interaction. The notes surface never resizes. Only the panel's position changes — not the workspace geometry. This distinction became the core interaction principle: positions snap, windows don't.",
            pros: [
              "Writing surface is always preserved",
              "Adapts to both quick glances and extended sessions",
              "Snapping provides stability without permanent layout change",
            ],
            cons: ["Snap and float rules need careful definition to feel intuitive"],
            outcome:
              "Selected direction — balances flexibility with focus without permanently reducing writing space",
          },
        ],
        images: [
          "/hourflow/Concept-1.png",
          "/hourflow/Concept-2.png",
        ],
      },
      {
        id: "interaction-model",
        label: "06",
        title: "Interaction Model",
        content: [
          "The interaction model is built around temporary intent rather than persistent tool visibility. Notes remain the primary surface at all times, while supporting panels appear only when actively needed and disappear without a trace when dismissed.",
          "The AI panel in particular is invoked intentionally — it does not persist as an open sidebar. An always-visible AI panel competes for attention even when not in use. Invoked AI draws focus only when the user chooses.",
        ],
        bullets: [
          "Notes remain visually dominant at all times — never resized, never displaced",
          "Supporting panels are invoked via keyboard shortcut or command input",
          "Panels float for temporary tasks and snap to position for extended interaction",
          "Dismissing a panel returns the workspace to exactly the state it was in before",
          "AI is drawn into the workflow intentionally, not left open as ambient noise",
        ],
      },
      {
        id: "the-board",
        label: "07",
        title: "The Board — Context-Preserving Clipboard",
        content: [
          "The most painful friction point surfaced in research: students constantly switching to ChatGPT or Claude, pasting screenshots, re-explaining context each time, and losing the thread entirely when they had a follow-up question.",
          "The Board is Hourflow's answer to this. It's a persistent, lightweight tray — accessible via a '+' button in the toolbar or a keyboard shortcut — that stores up to ten recent screenshots captured from within the app.",
          "Unlike system screenshots that save to a desktop folder and get lost, Board captures are scoped to the current study session and remain immediately available. Screenshots can be dragged directly into the AI tutor panel, or selected in multiples and submitted together with a question. Context travels with the image — no re-explaining required.",
          "The Board collapses a workflow that currently requires three separate apps and a system clipboard into a single drag-and-drop gesture inside one workspace.",
        ],
      },
      {
        id: "visual-design",
        label: "08",
        title: "Visual Design",
        content: [
          "The visual system is designed to feel like a physical notebook — warm, quiet, and easy to inhabit for long stretches. The background is off-white with a slight warm tone. Not clinical white: the warmth signals 'notes environment' rather than 'productivity dashboard,' and was chosen by asking what this should feel like at 10pm after a long study session.",
          "Panels use glass-like borders with a very slight shadow — the only depth cue in the system. The shadow communicates that panels float above the notes surface rather than sitting beside it. Interaction affordances appear on hover only, keeping the resting state as quiet as possible.",
          "Typography pairs a readable serif for note content (Lora or Source Serif 4) with a clean sans-serif for UI chrome (DM Sans). Hierarchy is created through size and weight alone — color is kept out of it. Notes text is slightly larger than UI labels to reinforce which surface is primary without any explicit visual separation.",
          "An earlier version used a cooler color temperature and harder panel borders. It looked like a productivity app. It felt like work. The warmth and the glass panels came from a single reframe: this isn't a tool for getting things done — it's a space for thinking.",
        ],
      },
      {
        id: "layout-patterns",
        label: "09",
        title: "Layout Patterns",
        content: [
          "The system is built around a note-first layout where the primary writing area is always preserved regardless of what supporting panels are open.",
          "When a single support panel opens, it should feel like a quick extension of the workspace rather than a structural change — a floating layer over the same canvas, not a new column beside it.",
          "When two panels are open, hierarchy becomes critical: notes remain primary, while PDF and AI layers act as temporary assistants rather than equal surfaces competing for the same space.",
        ],
      },
      {
        id: "open-questions",
        label: "10",
        title: "Open Questions — Still Solving",
        content: [
          "These are the problems I haven't fully resolved yet — and I think they're the right ones to be sitting with at this stage of the project.",
        ],
        cards: [
          {
            title: "Performance and memory",
            description:
              "Running a notes editor, PDF renderer, and AI panel simultaneously in a browser environment carries real memory overhead. The snap + float model helps by avoiding multiple persistent panels at once, but the performance budget for this interaction model needs to be validated in code — not just in Figma.",
          },
          {
            title: "Cognitive load — does it actually work?",
            description:
              "The design is built on the premise that floating panels reduce cognitive load compared to split layouts. That premise comes from personal experience and informal research, not formal testing. Structured usability testing with real students in real study sessions is the next critical step — to verify what the model promises, and find where it doesn't deliver.",
          },
          {
            title: "Interaction schema and keyboard shortcuts",
            description:
              "The full command and keyboard shortcut system is not yet designed. For users in deep focus, every mouse-required action is a friction point. The keyboard layer needs to be designed as intentionally as the visual interface — which commands, which keys, how conflicts resolve, and how new users discover the system without documentation.",
          },
        ],
      },
      {
        id: "current-status",
        label: "11",
        title: "Current Status",
        content: [
          "Hourflow is in active Figma design with parallel frontend development in Next.js. The current focus is refining the panel interaction system and designing the Board component.",
          "The next phase is a functional prototype covering the core note-taking surface, AI invocation flow, and the Board — the three features that most directly address the context-switching problem this project set out to solve.",
        ],
      },
      {
        id: "reflection",
        label: "12",
        title: "Reflection",
        content: [
          "This project changed how I think about interface design. The hardest decisions weren't about what to show — they were about when things should appear, how long they should stay, and how quickly a user should be able to return to what they were doing.",
          "The clarifying moment was a frustrating personal experience: resizing my notes window to make room for Chrome, then resizing again to get back to writing, then again for a PDF. Every resize asked me to re-orient to a slightly different surface. Small cost, but cumulative — and over a long study session, it added up to a genuinely fragmented experience.",
          "Hourflow's core interaction principle — positions snap, windows don't — came directly from that moment. Not from a principle on a whiteboard, but from a real and specific friction that needed solving.",
          "The strongest design decisions in this project emerged when I stopped trying to design a workspace and started trying to protect an experience: the feeling of being inside a thought, undisturbed.",
        ],
      },
    ],
  },

  {
    slug: "gesturedrive",
    title: "GestureDrive",
    subtitle: "Reducing driver distraction with gesture-based infotainment control",
    link:"https://github.com/immubashir/GestureDrive-DL",
    category: "AI · Computer Vision · Human-Centered Interaction",
    status: "Built + hosted",
    tint: "rgb(13, 26, 99)",
    role: "ML Engineer + Full-Stack Developer",
    timeline: "Academic / Personal Project",
    tools: ["PyTorch", "MediaPipe", "Flask", "Next.js", "Tailwind CSS"],
    heroImage: "/gesturedrive/GestureDrive-Hero.png",
    overview:
      "GestureDrive is a hand gesture recognition system designed to reduce physical interaction with in-car infotainment controls by enabling touchless media actions.",

    highlights: [
      "Touchless control for core media interactions",
      "Custom gesture recognition pipeline trained from scratch",
      "Real-time hand tracking with MediaPipe integration",
      "Interface designed to minimize visual distraction",
    ],

    mediaShowcase: [
      // {
      //   id: "0.1",
      //   title: "System demo video",
      //   type: "video",
      //   src: "/case-studies/gesturedrive/demo.mp4",
      // },
      {
        id: "0.1",
        title: "Landing page / product interface",
        type: "image",
        src: "/gesturedrive/GestureDrive-landing.png",
      },
      {
        id: "0.2",
        title: "Gesture recognition flow",
        type: "image",
        src: "/gesturedrive/GestureDrive-userflow.png",
      },
      // {
      //   id: "0.3",
      //   title: "Supported gesture set",
      //   type: "image",
      //   src: "/case-studies/gesturedrive/gesture-set.png",
      // },
      {
        id: "0.3",
        title: "Realtime control experience",
        type: "image",
        src: "/gesturedrive/GestureDrive-interface.png",
      },
    ],

    chapters: [
      {
        id: "context",
        label: "01",
        title: "Context",
        content: [
          "In-car infotainment systems often require repeated physical interaction for simple actions like changing volume, pausing media, or answering calls.",
          "Even small touch interactions can pull attention away from the road, especially when drivers need to locate controls visually before acting.",
          "GestureDrive began as an exploration of whether common infotainment actions could be triggered through simple hand gestures instead of direct touch.",
        ],
      },
      {
        id: "problem",
        label: "02",
        title: "Problem",
        bullets: [
          "Physical interaction with infotainment controls increases distraction",
          "Drivers often need to glance away from the road to locate buttons or screens",
          "Traditional media controls interrupt driving flow during simple actions",
          "Touch-based systems do not always feel natural in fast, attention-sensitive contexts",
        ],
      },
      {
        id: "principles",
        label: "03",
        title: "Design Principles",
        cards: [
          {
            title: "Minimize distraction",
            description:
              "The system should reduce the need for visual confirmation and physical interaction during common media tasks.",
          },
          {
            title: "Keep gestures simple",
            description:
              "Commands should be mapped to gestures that are easy to perform, easy to distinguish, and practical in a driving environment.",
          },
          {
            title: "Design for realtime use",
            description:
              "Recognition speed and interaction clarity matter as much as model accuracy because the system operates in a live, high-attention context.",
          },
        ],
      },
      {
        id: "insight",
        label: "04",
        title: "Key Insight",
        quote:
          "In a driving environment, the best interaction is not the one with the most features. It is the one that asks for the least attention.",
      },
      {
        id: "exploration",
        label: "05",
        title: "Exploration",
        cards: [
          {
            title: "Concept 1 · Touch-first companion UI",
            description:
              "A conventional interface where gestures act only as a secondary input method alongside on-screen controls.",
            pros: ["Easy fallback", "Familiar interaction model", "Simple to understand"],
            cons: [
              "Still depends heavily on touch",
              "Does not meaningfully reduce distraction",
              "Gesture interaction feels secondary",
            ],
            outcome: "Rejected as the primary direction",
          },
          {
            title: "Concept 2 · Static gesture command system",
            description:
              "A focused set of hand gestures mapped to common infotainment actions such as volume control, play/pause, and call response.",
            pros: [
              "Clear command mapping",
              "Faster to implement reliably",
              "Works well for high-frequency actions",
            ],
            cons: [
              "Limited gesture vocabulary",
              "Requires strong classification consistency",
            ],
            outcome: "Selected for the first implementation",
          },
          {
            title: "Concept 3 · Dynamic gesture expansion",
            description:
              "An extended system using motion-based gestures for actions like next track and previous track.",
            pros: [
              "More expressive interaction space",
              "Could support richer control patterns",
            ],
            cons: [
              "Harder to train robustly",
              "Greater risk of ambiguity in realtime use",
            ],
            outcome: "Planned future direction",
          },
        ],
        // images: [
        //   "/case-studies/gesturedrive/exploration-1.png",
        //   "/case-studies/gesturedrive/exploration-2.png",
        //   "/case-studies/gesturedrive/exploration-3.png",
        // ],
      },
      {
        id: "system-design",
        label: "06",
        title: "System Design",
        bullets: [
          "Hand landmarks are detected in realtime using MediaPipe",
          "Gesture classification is handled through a custom PyTorch model",
          "Recognized gestures are mapped to infotainment commands",
          "Flask manages backend inference flow and system communication",
          "Next.js provides the frontend layer for the product interface and demo experience",
        ],
      },
      {
        id: "modeling-approach",
        label: "07",
        title: "Modeling Approach",
        content: [
          "Instead of relying entirely on a pretrained recognition stack, the classification pipeline was built and trained specifically for this interaction problem.",
          "The initial version focused on static hand gestures for commands such as volume up, volume down, play/pause, answer call, and reject call.",
          "Training was conducted on a reduced gesture dataset suited for experimentation, with the goal of building a responsive proof of concept before expanding toward more complex dynamic gestures.",
        ],
      },
      {
        id: "realtime-experience",
        label: "08",
        title: "Realtime Experience",
        content: [
          "Because this system operates in a live environment, usability depends on more than classification accuracy. The experience also needs to feel immediate, predictable, and low-friction.",
          "The interface was therefore kept visually clean and lightweight, allowing the gesture system to remain the main interaction layer rather than competing with heavy interface chrome.",
        ],
      },
      {
        id: "outcome",
        label: "09",
        title: "Outcome",
        bullets: [
          "Built a working gesture-controlled infotainment prototype",
          "Achieved strong recognition performance for the initial gesture set",
          "Established a base pipeline for future dynamic gesture support",
          "Demonstrated a human-centered interaction approach for safer media control",
        ],
      },
      {
        id: "reflection",
        label: "10",
        title: "Reflection",
        content: [
          "GestureDrive pushed me to think beyond model training and focus on interaction design in a safety-sensitive environment. A technically correct prediction is not enough if the interaction still feels slow, unclear, or distracting.",
          "The biggest lesson from this project was that human-centered AI systems need both strong recognition and strong behavioral design. The most valuable part was finding the balance between technical performance, realtime responsiveness, and interface restraint.",
        ],
      },
    ],
  },

  {
    slug: "sleepsense",
    title: "SleepSense",
    subtitle: "Using wellness signals to predict academic performance",
    link:"https://github.com/immubashir/sleepsense",
    category: "Applied AI · Data Systems · Product Design",
    status: "Built + Hosted",
    tint: "rgb(202, 89, 149)",
    role: "ML Engineer + Full-Stack Developer",
    timeline: "Academic Project",
    tools: ["Next.js", "Flask", "MongoDB", "PySpark", "Scikit-learn"],
    heroImage: "/sleepsense/SleepSense-Hero.png",
    overview:
      "SleepSense is an AI-powered wellness dashboard that analyzes sleep and health data to predict GPA and generate actionable recommendations.",

    highlights: [
      "Combines sleep and wellness metrics with GPA prediction",
      "Supports both manual input and dataset-driven workflows",
      "Integrates data visualization with AI-assisted recommendations",
      "Built as a user-friendly applied AI product",
    ],

    mediaShowcase: [
      {
        id: "0.1",
        title: "Product demo",
        type: "video",
        src: "/sleepsense/SleepSenseDemo.mp4",
      },
      {
        id: "0.2",
        title: "Dashboard overview",
        type: "image",
        src: "/sleepsense/SleepSense-1.png",
      },
      {
        id: "0.4",
        title: "Prediction workflow",
        type: "image",
        src: "/sleepsense/SleepSense-Prediction-workflow.png",
      }
      // {
      //   id: "0.4",
      //   title: "Data visualization system",
      //   type: "image",
      //   src: "/case-studies/sleepsense/data-visualization.png",
      // },
      // {
      //   id: "0.5",
      //   title: "Model insights and recommendations",
      //   type: "image",
      //   src: "/case-studies/sleepsense/recommendations.png",
      // },
    ],

    chapters: [
      {
        id: "context",
        label: "01",
        title: "Context",
        content: [
          "Students often have access to wellness data through wearables and health platforms, but that data rarely becomes part of a meaningful academic feedback loop.",
          "SleepSense began as an exploration of whether patterns in sleep, heart rate, SPO2, and related wellness signals could be transformed into useful academic predictions and recommendations.",
          "The project combined applied machine learning, dashboard design, and data processing into a single system focused on student outcomes.",
        ],
      },
      {
        id: "problem",
        label: "02",
        title: "Problem",
        bullets: [
          "Wellness data is often fragmented and underused in academic contexts",
          "Students lack clear feedback connecting daily habits to academic performance",
          "Raw health metrics are difficult to interpret without context",
          "Most prediction systems do not make outputs actionable for users",
        ],
      },
      {
        id: "principles",
        label: "03",
        title: "Design Principles",
        cards: [
          {
            title: "Make data understandable",
            description:
              "Predictions should be supported by a dashboard experience that makes wellness signals easy to read and compare.",
          },
          {
            title: "Keep outputs actionable",
            description:
              "The system should move beyond prediction and help users understand how to improve outcomes.",
          },
          {
            title: "Bridge ML and product usability",
            description:
              "The interface should make machine learning feel useful, not opaque or overly technical.",
          },
        ],
      },
      {
        id: "system-design",
        label: "04",
        title: "System Design",
        bullets: [
          "Next.js powers the frontend dashboard and prediction flows",
          "Flask serves model inference and backend APIs",
          "MongoDB stores user and health-related data",
          "PySpark supports preprocessing and distributed data workflows",
          "Scikit-learn powers the predictive modeling pipeline",
        ],
      },
      {
        id: "modeling-approach",
        label: "05",
        title: "Modeling Approach",
        content: [
          "The modeling process explored multiple supervised learning approaches to predict GPA from wellness and behavioral signals.",
          "The broader pipeline included data cleaning, preprocessing, feature selection, training, and evaluation before being integrated into a user-facing product experience.",
          "This made the project both a machine learning system and a product design exercise in how predictive insights are communicated.",
        ],
      },
      {
        id: "product-experience",
        label: "06",
        title: "Product Experience",
        content: [
          "SleepSense was designed as more than a prediction tool. It also acts as a dashboard where users can review trends, manually enter values, and explore wellness patterns over time.",
          "A key part of the experience was making model outputs feel understandable and useful rather than purely technical.",
        ],
      },
      {
        id: "outcome",
        label: "07",
        title: "Outcome",
        bullets: [
          "Built an end-to-end wellness analytics and GPA prediction platform",
          "Integrated predictive models into a usable dashboard experience",
          "Combined data visualization, data systems, and applied ML in one product",
          "Positioned the system as a practical tool for student self-awareness and improvement",
        ],
      },
      {
        id: "reflection",
        label: "08",
        title: "Reflection",
        content: [
          "SleepSense reinforced the importance of connecting technical models to user value. A model can perform well statistically, but it only becomes meaningful when users can understand its outputs and act on them.",
          "The project also pushed me to think across the full stack: data collection, preprocessing, modeling, storage, and interface design all had to work together as one system.",
        ],
      },
    ],
  },

  {
    slug: "fashionista",
    title: "Fashionista",
    subtitle: "Designing a polished, modern e-commerce experience",
    link:"https://fashionista-6og1.vercel.app/",
    category: "Frontend Engineering · UI Design · Commerce UX",
    status: "Built + hosted",
    tint: "rgb(255, 176, 144)",
    role: "Frontend Developer + UI Designer",
    timeline: "Personal Project",
    tools: ["Next.js", "Tailwind CSS", "Sanity", "Stripe"],
    heroImage: "/fashionista/Fashionista-Hero.jpg",
    overview:
      "Fashionista is a modern fashion e-commerce experience focused on discoverability, clean interaction design, and a polished checkout journey.",

    highlights: [
      "Designed for discoverability through search, filters, and sorting",
      "Built a polished product browsing and detail experience",
      "Integrated cart and checkout flows with Stripe",
      "Focused on a clean, modern visual system for commerce",
    ],

    mediaShowcase: [
      {
        id: "0.1",
        title: "Homepage experience",
        type: "image",
        src: "/fashionista/Fashionista-01.png",
      },
      {
        id: "0.2",
        title: "Collection browsing",
        type: "image",
        src: "/fashionista/Fashionista_categories.png",
      },
      {
        id: "0.3",
        title: "Product detail page",
        type: "image",
        src: "/fashionista/Fashionista_product_page.png",
      },
      {
        id: "0.4",
        title: "Cart and checkout flow",
        type: "image",
        src: "/fashionista/Fashionista_checkout_page.png",
      },
      // {
      //   id: "0.5",
      //   title: "Responsive mobile views",
      //   type: "image",
      //   src: "/case-studies/fashionista/mobile.png",
      // },
    ],

    chapters: [
      {
        id: "context",
        label: "01",
        title: "Context",
        content: [
          "Fashion e-commerce experiences often balance two competing needs: visual appeal and frictionless shopping.",
          "Fashionista was built as a frontend-focused project exploring how a clean, modern interface could support both product discovery and conversion.",
          "The project emphasized browsing flow, product presentation, and checkout clarity rather than backend marketplace complexity.",
        ],
      },
      {
        id: "problem",
        label: "02",
        title: "Problem",
        bullets: [
          "Large product catalogs can become difficult to browse efficiently",
          "Poorly structured filters and navigation can slow down discovery",
          "Commerce interfaces often feel visually dense or repetitive",
          "Checkout friction can reduce confidence and conversion",
        ],
      },
      {
        id: "principles",
        label: "03",
        title: "Design Principles",
        cards: [
          {
            title: "Make discovery effortless",
            description:
              "Users should be able to narrow products quickly through intuitive search, filtering, and sorting.",
          },
          {
            title: "Let the product lead",
            description:
              "The interface should support the products visually without overwhelming them with unnecessary chrome.",
          },
          {
            title: "Keep purchasing friction low",
            description:
              "Cart and checkout flows should feel clear, direct, and trustworthy.",
          },
        ],
      },
      {
        id: "experience-design",
        label: "04",
        title: "Experience Design",
        content: [
          "The browsing experience was designed around clarity and pace. Collection views help users scan quickly, while product pages provide enough detail to support decision-making without clutter.",
          "A consistent visual system helped maintain cohesion across landing pages, product pages, and transactional flows.",
        ],
      },
      {
        id: "system-design",
        label: "05",
        title: "System Design",
        bullets: [
          "Next.js powers the storefront experience",
          "Tailwind CSS supports a consistent visual system and rapid UI development",
          "Sanity manages product content and structured catalog data",
          "Stripe handles secure checkout and payment processing",
        ],
      },
      {
        id: "outcome",
        label: "06",
        title: "Outcome",
        bullets: [
          "Built a polished fashion commerce interface from storefront to checkout",
          "Created a responsive browsing experience with strong product presentation",
          "Integrated product data and payments into a coherent end-to-end flow",
          "Strengthened frontend engineering through design-led implementation",
        ],
      },
      {
        id: "reflection",
        label: "07",
        title: "Reflection",
        content: [
          "Fashionista reinforced how much good commerce design depends on rhythm, hierarchy, and clarity. Small interface choices around spacing, filters, and product presentation have a large impact on how premium and usable the experience feels.",
          "It also pushed me to think about frontend engineering as a tool for shaping product perception, not just implementing layouts.",
        ],
      },
    ],
  },
];