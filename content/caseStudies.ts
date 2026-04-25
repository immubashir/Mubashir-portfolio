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
    category: "Product Design · UX Research · System Thinking",
    status: "Ongoing",
    role: "Product Designer + Engineer",
    timeline: "Research & Design Phase",
    tools: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    heroImage: "/hourflow/Hourflow-Hero.png",
    tint: "rgb(144, 93, 211)",
    tintLow: "rgb(144, 93, 211, 0.1)",
    overview:
      "Hourflow is a unified study workspace designed to reduce context switching across notes, reference material, and AI. It explores a note-first interaction model where supporting tools appear only when needed, helping users stay focused on the task instead of managing multiple apps.",
    developmentNote:
      "Hourflow is currently in active development. The visuals shown here represent early explorations of the interface and interaction model.",

    highlights: [
      "Note-first workspace built around deep focus",
      "Transient PDF and AI panels for quick access",
      "Hybrid snap + float interaction model",
      "Designed to reduce workflow fragmentation",
    ],

    mediaShowcase: [
      // {
      //   id: "0.1",
      //   title: "Homepage motion concept",
      //   type: "video",
      //   src: "/case-studies/hourflow/motion-concept.mp4",
      // },
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
        src: "/hourflow/Hourflow-interface.png",
      },
      {
        id: "0.4",
        title: "Illustrations showcase",
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
          "The interface shown here represents a note-first workspace where writing remains the primary surface.",
          "Supporting tools like PDFs and AI are designed to appear temporarily, allowing quick access without permanently disrupting the layout.",
        ],
      },
      {
        id: "context",
        label: "01",
        title: "Context",
        content: [
          "Modern study workflows are fragmented across multiple tools. Notes live in one place, lecture slides in another, AI in another, and quick lookups often happen through browser tabs.",
          "This fragmented behavior creates constant context switching. Even when each tool works well on its own, the overall workflow feels broken.",
          "Hourflow began as an attempt to rethink that flow as one continuous workspace instead of a collection of separate applications.",
        ],
      },
      {
        id: "problem",
        label: "02",
        title: "Problem",
        bullets: [
          "Switching between notes, PDFs, AI, and browser tabs interrupts focus",
          "Persistent sidebars and rigid layouts reduce the writing surface",
          "Too many simultaneously visible tools compete for attention",
          "Quick reference tasks often require disproportionate UI disruption",
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
              "The writing surface should remain primary. Supporting tools must never overpower the notes experience.",
          },
          {
            title: "Temporary by default",
            description:
              "Users often need a PDF, slide, or AI response only for a short moment. The interface should support fast entry and fast exit.",
          },
          {
            title: "Low-friction recovery",
            description:
              "After any interaction with a supporting panel, the user should return to their notes without having to mentally reset.",
          },
        ],
      },
      {
        id: "insight",
        label: "04",
        title: "Key Insight",
        quote:
          "Users do not need every tool open all the time. They need fast, temporary access to the right tool at the right moment.",
      },
      {
        id: "exploration",
        label: "05",
        title: "Exploration",
        cards: [
          {
            title: "Concept 1 · Fixed split layout",
            description:
              "A conventional workspace with notes and supporting tools placed side by side.",
            pros: ["Predictable", "Easy to understand", "Familiar pattern"],
            cons: [
              "Shrinks the writing area",
              "Feels rigid",
              "Too similar to existing tools",
            ],
            outcome: "Rejected as the primary direction",
          },
          {
            title: "Concept 2 · Floating support panels",
            description:
              "Panels appear temporarily over the workspace when users need them.",
            pros: [
              "Preserves the main writing surface",
              "Supports quick reference",
              "Feels lightweight",
            ],
            cons: [
              "Needs strong interaction rules",
              "Can become messy if unmanaged",
            ],
            outcome: "Strong direction",
          },
          {
            title: "Concept 3 · Hybrid snap + float",
            description:
              "Panels can float for quick use or snap into place for extended interaction.",
            pros: [
              "Balances flexibility with structure",
              "Adapts to different behaviors",
              "Supports both short and long tasks",
            ],
            cons: ["Slightly more complex to implement well"],
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
          "The interaction model is designed around temporary intent rather than persistent tool visibility. Notes remain the primary surface, while supporting panels appear only when they are actively needed.",
        ],
        bullets: [
          "Notes remain visually dominant at all times",
          "Supporting panels are secondary and dismissible",
          "Panels can float for temporary tasks",
          "Panels can snap for extended reading or interaction",
          "AI is invoked intentionally instead of remaining permanently open",
        ],
      },
      {
        id: "layout-patterns",
        label: "07",
        title: "Layout Patterns",
        content: [
          "The system is built around a note-first layout, with the primary writing area always preserved.",
          "When a single support panel opens, it should feel like a quick extension of the workspace rather than a permanent structural change.",
          "When two panels are open, hierarchy becomes critical: notes remain primary, while the PDF and AI layers act as temporary assistants rather than equal surfaces.",
        ],
      },
      {
        id: "visual-design",
        label: "08",
        title: "Visual Design",
        content: [
          "The visual language is designed to feel quiet, spacious, and cognitively light. Instead of dense interface chrome or aggressive contrast, Hourflow uses soft surfaces, restrained borders, and generous spacing to support long study sessions.",
          "The goal is not to impress through ornamentation, but to reduce visual fatigue and keep attention anchored to the primary writing surface.",
        ],
      },
      {
        id: "selected-direction",
        label: "09",
        title: "Selected Direction",
        content: [
          "The final direction centers on a note-first workspace supported by temporary, on-demand tools. Instead of permanently allocating space to every feature, Hourflow treats PDFs and AI as secondary layers that can appear briefly or expand when needed.",
          "The hybrid snap + float model emerged as the strongest direction because it preserves writing focus while still supporting both quick reference tasks and longer interactions.",
        ],
      },
      {
        id: "current-status",
        label: "10",
        title: "Current Status",
        content: [
          "Hourflow is currently in active development, with ongoing exploration around panel behavior, workspace customization, and AI-assisted study workflows.",
          "The current direction focuses on refining interaction systems before expanding the product into a broader functional prototype.",
        ],
      },
      {
        id: "reflection",
        label: "11",
        title: "Reflection",
        content: [
          "This project shifted my thinking from designing screens to designing behavior. The main challenge was not arranging panels, but deciding when interfaces should appear, how long they should stay, and how quickly users should be able to return to focus.",
          "The strongest direction emerged when the system began adapting to temporary intent rather than assuming every tool needed permanent visibility.",
        ],
      },
    ],
  },

  {
    slug: "gesturedrive",
    title: "GestureDrive",
    subtitle: "Reducing driver distraction with gesture-based infotainment control",
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