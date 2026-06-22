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
    subtitle: "Designing a workspace that protects focus instead of competing for it.",
    link: "",
    category: "Product Design · Interaction Design · System Thinking",
    status: "Ongoing",
    role: "Product Designer + Engineer",
    timeline: "Active Prototype",
    tools: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    heroImage: "/hourflow/hourflow_current_overview.png",
  
    tint: "rgb(191, 103, 70)",
    tintLow: "rgba(191, 103, 70, 0.12)",
  
    overview:
      "Hourflow is a notes-first study workspace built around focus preservation. Instead of forcing students to constantly resize windows, switch tabs, and re-explain context to AI, Hourflow keeps notes as the primary surface while supporting tools — AI, references, and the Board — appear temporarily when needed.",
  
    developmentNote:
      "Hourflow is currently in active design and frontend prototyping. The current iteration focuses on the note surface, focus mode, contextual AI, and the session Board interaction model.",
  
    highlights: [
      "Notes remain the primary surface — never resized to accommodate supporting tools",
      "Focus Mode reduces peripheral noise through a ripple transition and softened workspace state",
      "Contextual AI appears intentionally instead of remaining open as ambient distraction",
      "Session Board stores useful captures, quotes, and AI outputs without breaking the study flow",
    ],
  
    mediaShowcase: [
      {
        id: "0.1",
        title: "The Primary Surface",
        type: "image",
        src: "/hourflow/hourflow_current_workspace.png",
      },
      {
        id: "0.2",
        title: "A Transition into Focus",
        type: "image",
        src: "/hourflow/focus_mode.png",
      },
      {
        id: "0.3",
        title: "AI without displacement",
        type: "image",
        src: "/hourflow/ai_panel.png",
      },
      {
        id: "0.4",
        title: "Session-scoped memory",
        type: "image",
        src: "/hourflow/session_board.png",
      },
    ],
  
    chapters: [
      {
        id: "what-youre-seeing",
        label: "00",
        title: "What You're Seeing",
        content: [
          "Hourflow is a notes-first workspace for focused study. The current prototype centers on one idea: the note should remain the stable surface, while everything else appears only when needed.",
          "The interface is intentionally quiet — warm surfaces, restrained controls, soft panels, and minimal chrome. AI, session memory, and focus tools support the note instead of competing with it.",
        ],
      },
      {
        id: "context",
        label: "01",
        title: "Context",
        content: [
          "Most study workflows are fragmented across too many surfaces. Notes live in one place, PDFs in another, AI in a separate chat window, and useful screenshots usually end up buried on the desktop.",
          "The issue is not that any single tool is broken. The problem is the transition cost between them — every window switch, every resize, every repeated explanation to AI.",
          "Hourflow started from that friction: what would a study workspace look like if the interface protected continuity instead of constantly asking the learner to reconstruct it?",
        ],
      },
      {
        id: "problem",
        label: "02",
        title: "Problem",
        bullets: [
          "Students lose focus when notes, PDFs, references, tasks, and AI chats live in separate places",
          "Split layouts often shrink the writing surface even when the supporting tool is only needed briefly",
          "AI tools are useful, but persistent chat panels can become another competing surface",
          "Screenshots and references lose context when they leave the study session",
          "The workspace often forces the learner to adapt to the interface instead of adapting to the learner",
        ],
      },
      {
        id: "insight",
        label: "03",
        title: "Key Insight",
        quote:
          "The problem was not the tools themselves. It was the transitions between them.",
      },
      {
        id: "principles",
        label: "04",
        title: "Design Principles",
        cards: [
          {
            title: "Notes stay primary",
            description:
              "The writing surface remains the anchor of the workspace. Supporting tools can appear, but they should never permanently displace the note.",
          },
          {
            title: "Tools appear temporarily",
            description:
              "AI, captures, references, and board items should enter the workspace for a specific task, then recede when no longer needed.",
          },
          {
            title: "Positions snap. Windows don't.",
            description:
              "Panels can move into stable positions, but the workspace should not constantly reshape itself around them.",
          },
          {
            title: "Focus is a state change",
            description:
              "Focus Mode is not just hiding buttons. It changes the atmosphere of the workspace so the learner feels a clear shift into deep work.",
          },
        ],
      },
      {
        id: "workspace-model",
        label: "05",
        title: "Workspace Model",
        content: [
          "Hourflow uses a note-first spatial model. The note is treated as the permanent surface, while AI and session memory act as temporary layers above it.",
          "This creates a different hierarchy from traditional productivity software. The interface does not ask every tool to be visible at all times. Instead, it gives each tool a moment, a role, and a way to leave.",
        ],
        bullets: [
          "Primary layer: notes and study content",
          "Support layer: AI assistant, references, commands, and board items",
          "Focus layer: reduced peripheral UI, softened text, and ripple transition",
          "Memory layer: session Board for captured quotes, AI outputs, and study fragments",
        ],
      },
      {
        id: "focus-mode",
        label: "06",
        title: "Focus Mode",
        content: [
          "Most focus modes simply hide UI. Hourflow treats focus as a transition in the workspace.",
          "When Focus Mode is activated, a ripple expands across the page. Peripheral controls recede, the note becomes visually quieter, and the environment shifts from an editing state into a reading and thinking state.",
          "The ripple is important because it gives the action a sense of ceremony. It announces that the workspace has changed modes, instead of making focus feel like a passive toggle.",
        ],
        bullets: [
          "Ripple transition marks entry into focus",
          "Top navigation and controls become secondary",
          "The note remains centered as the dominant object",
          "Visual noise is reduced without making the interface feel empty",
        ],
      },
      {
        id: "contextual-ai",
        label: "07",
        title: "Contextual AI",
        content: [
          "AI in Hourflow is intentionally treated as a supporting tool, not the destination. The assistant appears as a floating panel connected to the current note, helping the learner ask questions without leaving the study surface.",
          "This avoids the common pattern where AI becomes a second workspace. The goal is not to keep chat open forever. The goal is to make AI available at the moment of need, then let the learner return to the note.",
        ],
        bullets: [
          "AI panel opens beside the current note without resizing it",
          "Suggested prompts are scoped to the active study context",
          "The assistant can be minimized or dismissed without changing the workspace",
          "AI remains available, but not ambient",
        ],
      },
      {
        id: "session-board",
        label: "08",
        title: "Session Board",
        content: [
          "The Session Board is a temporary memory layer for the study flow. It stores useful captures, quotes, references, and AI outputs that matter during the current session.",
          "Instead of forcing students to save screenshots, paste them into another app, or manually reconstruct context later, the Board keeps study fragments close to the note.",
          "The Board is deliberately session-scoped. It is not another permanent database. It acts more like a tray: collect now, organize later.",
        ],
        bullets: [
          "Captures important fragments without leaving the workspace",
          "Keeps quotes, references, and AI outputs tied to the session",
          "Opens as a panel rather than a full destination",
          "Supports temporary collection without cluttering permanent notes",
        ],
      },
      {
        id: "visual-system",
        label: "09",
        title: "Visual System",
        content: [
          "The current visual direction moved away from the earlier purple SaaS aesthetic toward a warmer, editorial study environment.",
          "The palette uses off-white backgrounds, soft peach accents, warm brown controls, and low-contrast borders. This makes the interface feel more like a calm thinking surface than a dashboard.",
          "Purple is no longer the dominant identity color. The system now leans on warmth, restraint, and soft layering to communicate focus.",
        ],
        cards: [
          {
            title: "Warm canvas",
            description:
              "The background uses a soft paper-like tone to reduce harsh contrast during long study sessions.",
          },
          {
            title: "Quiet chrome",
            description:
              "Navigation, buttons, and utility controls are present, but visually secondary to the note.",
          },
          {
            title: "Soft panels",
            description:
              "AI and Board panels use rounded surfaces, subtle borders, and light shadows to feel layered rather than intrusive.",
          },
          {
            title: "Focused accent",
            description:
              "The brown-peach accent system is used sparingly for active states, tags, and session controls.",
          },
        ],
      },
      {
        id: "interaction-details",
        label: "10",
        title: "Interaction Details",
        content: [
          "The strongest design decisions in Hourflow happen at the interaction level: how panels enter, how focus mode begins, how the Board expands, and how the workspace returns to rest.",
          "The interface is designed around reversibility. Every supporting surface should be easy to invoke, easy to dismiss, and should leave the learner exactly where they were.",
        ],
        bullets: [
          "Focus mode uses a ripple effect on entry",
          "AI appears as a floating contextual panel",
          "Board expands from the bottom-right session control",
          "Active states use warm accents instead of loud color shifts",
          "The note remains visually dominant across every mode",
        ],
      },
      {
        id: "open-questions",
        label: "11",
        title: "Open Questions",
        content: [
          "Hourflow is still in active development, and the current prototype is being used to test the interaction model before expanding the full product system.",
        ],
        cards: [
          {
            title: "Does Focus Mode improve retention?",
            description:
              "The visual transition feels strong, but the next step is testing whether it actually helps students stay engaged longer.",
          },
          {
            title: "How much should the Board remember?",
            description:
              "The Board needs to feel useful without becoming another inbox. The boundary between temporary memory and permanent notes still needs refinement.",
          },
          {
            title: "When should AI disappear?",
            description:
              "AI should be available without becoming ambient. The dismissal, minimize, and recall behavior needs careful tuning.",
          },
        ],
      },
      {
        id: "current-status",
        label: "12",
        title: "Current Status",
        content: [
          "Hourflow is currently being prototyped in Next.js with Tailwind CSS and Framer Motion. The main implemented flows are the notes surface, Focus Mode, contextual AI panel, and Session Board.",
          "The next phase is refining the snap-and-float panel behavior, strengthening keyboard interactions, and testing the workspace model with real study sessions.",
        ],
      },
      {
        id: "reflection",
        label: "13",
        title: "Reflection",
        content: [
          "The biggest shift in Hourflow was realizing that the product is not about adding more tools to studying. It is about protecting the continuity of thought.",
          "The best version of the interface is not the one with the most visible features. It is the one that knows when to disappear.",
          "That changed how I approached the product: every interaction now has to justify whether it preserves focus, interrupts it, or helps the learner recover it quickly.",
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