// watsonx Orchestrate v1.4 - Jobs-First Approach (Customer Care Focus)

let selectedPersona = "admin"; // Default persona - user can change via badge click
let selectedJob = null;
let selectedDomain = "customercare"; // Default domain for connection recommendations
let selectedIndustry = "customer-care";
let assessmentAnswers = { q1: null, q2: null, q3: null };
let currentQuestion = 1;
let currentJobs = []; // Store current jobs globally for modal access
let chatConnectionFlow = null;

// Initialize app on page load
document.addEventListener("DOMContentLoaded", () => {
  // Load dashboard with default persona
  showJobsDashboard();
});

const personaContent = {
  builder: {
    badge: "🔨 Builder",
    hero: {
      title: "What do you want to accomplish?",
      subtitle: "Choose a customer care challenge to solve with AI agents",
    },
    chat: {
      message:
        "Hi! I'm here to help you solve customer care challenges. Tell me what problem you're facing, and I'll recommend the best solution.",
      suggestions: [
        "How can I reduce support ticket volume?",
        "What's the fastest way to handle order inquiries?",
        "Can I automate returns processing?",
      ],
    },
    banner: {
      title: "💡 Need integrations?",
      message:
        "Work with your admin to set up Salesforce Service Cloud or Zendesk credentials before building agents that need them.",
    },
  },
  admin: {
    badge: "⚙️ Admin",
    hero: {
      title: "Platform Setup",
      subtitle:
        "Before your team can build agents, let's set up the essentials",
    },
    chat: {
      message:
        "Hi! I'm here to help you set up connections and configure the platform. I can explain environments, recommend integrations, and guide you through setup.",
      suggestions: [
        "What's the difference between Draft and Live environments?",
        "How do I connect to Salesforce?",
        "Who should create connections - admins or builders?",
        "Show me recommended connections for my domain",
      ],
    },
    setupCards: [
      {
        priority: true,
        badge: "PRIORITY",
        title: "Connect your first app",
        description:
          "Start building and testing agents safely with draft credentials",
        meta: ["⏱️ 5-10 min", "🔗 Integration"],
        action: "showConnectionModal",
      },
      {
        title: "Configure AI models",
        description: "Add models and set usage policies for your organization",
        meta: ["⏱️ 10-15 min", "🤖 AI Models"],
      },
      {
        title: "Invite team members",
        description: "Add users and assign roles (Admin, Builder, SME)",
        meta: ["⏱️ 5 min", "👥 RBAC"],
      },
      {
        title: "Explore Platform First",
        description:
          "Take a tour to understand platform capabilities before setup",
        meta: ["⏱️ 5-10 min", "📚 Learning"],
      },
    ],
    banner: {
      title: "Getting Started",
      message:
        "Complete these 3 setup steps to enable your team to start building agents. You can always come back and adjust settings later.",
    },
  },
  sme: {
    badge: "💡 Subject Matter Expert",
    hero: {
      title: "Validate Customer Care Solutions",
      subtitle: "Help improve agents with your customer service expertise",
    },
    chat: {
      message:
        "Hi! I can help you review customer care agents and provide feedback on their accuracy and effectiveness.",
      suggestions: [
        "Show me agents awaiting review",
        "How do I test a customer support agent?",
        "What should I look for when validating responses?",
      ],
    },
    banner: {
      title: "💡 What happens next?",
      message:
        "When builders create customer care agents that need your expertise, they'll assign them to you for review.",
    },
  },
};
// Domain-Specific OOTB Connections
const domainConnections = {
  customercare: {
    name: "Customer Care",
    ootbConnections: [
      {
        id: "salesforce-service-cloud",
        name: "Salesforce Service Cloud",
        icon: "☁️",
        description:
          "Manage cases, look up customer data, and deflect tickets with automated workflows",
        toolCount: 18,
        documentation:
          "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=connections-salesforce",
        popular: true,
      },
      {
        id: "zendesk",
        name: "Zendesk",
        icon: "🎫",
        description:
          "Automate ticket management, handle customer inquiries, and streamline support workflows",
        toolCount: 12,
        documentation:
          "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=connections-zendesk",
        popular: true,
      },
      {
        id: "servicenow",
        name: "ServiceNow",
        icon: "🔧",
        description:
          "Track incidents, manage service requests, and access your knowledge base",
        toolCount: 15,
        documentation:
          "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=connections-servicenow",
        popular: false,
      },
      {
        id: "genesys-cloud",
        name: "Genesys Cloud",
        icon: "☎️",
        description:
          "Route calls intelligently and provide real-time agent assistance",
        toolCount: 8,
        documentation:
          "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=managing-app-connections-credentials",
        popular: false,
      },
    ],
  },
  procurement: {
    name: "Procurement",
    ootbConnections: [
      {
        id: "sap-ariba",
        name: "SAP Ariba",
        icon: "🔷",
        description:
          "Connect to SAP Ariba for procurement workflows, supplier management, and purchase orders",
        difficulty: "Intermediate",
        setupTime: "10-15 min",
        required: ["API key", "Realm", "Environment"],
        useCases: [
          "Purchase orders",
          "Supplier management",
          "Invoice processing",
        ],
        documentation:
          "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=connections-sap",
        popular: true,
      },
      {
        id: "coupa",
        name: "Coupa",
        icon: "💼",
        description:
          "Integrate with Coupa for spend management and procurement automation",
        difficulty: "Intermediate",
        setupTime: "10-15 min",
        required: ["API key", "Instance URL", "OAuth credentials"],
        useCases: ["Requisitions", "Purchase orders", "Supplier management"],
        documentation:
          "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=connections-coupa",
        popular: true,
      },
      {
        id: "oracle-procurement",
        name: "Oracle Procurement",
        icon: "🏛️",
        description:
          "Connect to Oracle Procurement Cloud for enterprise procurement processes",
        difficulty: "Advanced",
        setupTime: "15-20 min",
        required: ["Username", "Password", "Instance URL", "Security token"],
        useCases: [
          "Purchase requisitions",
          "Supplier management",
          "Contract management",
        ],
        documentation:
          "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=connections-oracle",
        popular: false,
      },
    ],
  },
  custom: {
    name: "Custom Domain",
    ootbConnections: [
      {
        id: "rest-api",
        name: "REST API",
        icon: "🔌",
        description: "Connect to any REST API endpoint for custom integrations",
        difficulty: "Intermediate",
        setupTime: "10-20 min",
        required: ["API endpoint", "Authentication method", "Headers"],
        useCases: [
          "Custom workflows",
          "Third-party services",
          "Internal systems",
        ],
        documentation:
          "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=connections-rest-api",
        popular: true,
      },
      {
        id: "database",
        name: "Database Connection",
        icon: "🗄️",
        description: "Connect to SQL databases for data access and queries",
        difficulty: "Advanced",
        setupTime: "15-20 min",
        required: ["Connection string", "Credentials", "Database name"],
        useCases: ["Data queries", "Record updates", "Custom reporting"],
        documentation:
          "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=connections-database",
        popular: false,
      },
    ],
  },
};

// Environment Education Content
const environmentEducation = {
  title: "Understanding Draft vs Live Environments",
  description:
    "watsonx Orchestrate uses two environments to help you safely develop and test before deploying to production.",
  environments: [
    {
      name: "Draft",
      icon: "📝",
      purpose: "Development & Testing",
      description:
        "A safe space to build, test, and refine your agents and connections without affecting production",
      features: [
        "Test connections and agents safely",
        "Iterate and make changes freely",
        "No impact on live users",
        "Share with team for review",
      ],
      whenToUse:
        "Use Draft when setting up new connections, building agents, or testing changes",
    },
    {
      name: "Live",
      icon: "🚀",
      purpose: "Production",
      description:
        "Your production environment where end users interact with deployed agents",
      features: [
        "Stable, tested agents only",
        "Real user interactions",
        "Monitored performance",
        "Version controlled",
      ],
      whenToUse: "Promote to Live only after thorough testing in Draft",
    },
  ],
  workflow: [
    "1. Create connection in Draft environment",
    "2. Test with sample data",
    "3. Build and test agents using the connection",
    "4. Promote to Live when ready",
    "5. Monitor performance in Live",
  ],
  documentation:
    "https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=agents-environments",
};

// Jobs-First Data Structure - Customer Care Domain Only
const customerCareJobs = {
  builder: [
    {
      id: "reduce-ticket-volume",
      featured: true,
      badge: "MOST POPULAR",
      icon: "🎯",
      title: "Reduce Support Ticket Volume",
      description:
        "Deflect repetitive questions and provide instant answers 24/7",
      meta: ["⏱️ 10-15 min", "🎯 Customer Care"],

      // Compact view data
      compact: {
        topMetrics: [
          { icon: "📊", label: "Deflection", value: "65%" },
          { icon: "⏱️", label: "Response", value: "Instant" },
          { icon: "💰", label: "Saved/year", value: "$75K" },
        ],
        proofLine: "Acme Corp: 68% reduction in 30 days",
      },

      // Expanded view data
      expanded: {
        painPoints: [
          "500+ tickets/day, 60% repetitive",
          "4-hour response time frustrates customers",
        ],
        solution: {
          template: "Customer Support Agent",
          buildTime: "15 min",
          difficulty: "Beginner",
          integrations: [
            { name: "Salesforce Service Cloud", required: true },
            { name: "Zendesk", required: false },
          ],
        },
        allMetrics: [
          { icon: "📊", label: "Ticket Deflection", value: "65%" },
          { icon: "⏱️", label: "Response Time", value: "Instant" },
          { icon: "😊", label: "CSAT Score", value: "4.6/5" },
          { icon: "💰", label: "Cost Savings", value: "$75K/year" },
        ],
        fullProof: {
          text: "Acme Corp reduced ticket volume by 68% in 30 days using this agent",
          metric: "2,400 tickets deflected per month",
        },
      },
    },

    {
      id: "speed-up-order-inquiries",
      icon: "⚡",
      title: "Speed Up Order Status Inquiries",
      description:
        "Provide real-time order tracking without agent intervention",
      meta: ["⏱️ 8-12 min", "🎯 Customer Care"],

      compact: {
        topMetrics: [
          { icon: "⚡", label: "Response", value: "Instant" },
          { icon: "📈", label: "Self-Service", value: "80%" },
          { icon: "⏱️", label: "Time Saved", value: "40%" },
        ],
        proofLine: "RetailCo: 85% of inquiries automated",
      },

      expanded: {
        painPoints: [
          "300+ order inquiries daily, hours-long waits",
          "Agents spend 40% of time on lookups",
        ],
        solution: {
          template: "Order Status Lookup Agent",
          buildTime: "10 min",
          difficulty: "Beginner",
          integrations: [
            { name: "Salesforce", required: true },
            { name: "SAP", required: false },
          ],
        },
        allMetrics: [
          { icon: "⚡", label: "Response Time", value: "Instant" },
          { icon: "📈", label: "Self-Service Rate", value: "80%" },
          { icon: "⏱️", label: "Agent Time Saved", value: "40%" },
          { icon: "😊", label: "Customer Satisfaction", value: "+25%" },
        ],
        fullProof: {
          text: "RetailCo automated 85% of order inquiries, freeing agents for complex issues",
          metric: "6,000 automated lookups per month",
        },
      },
    },

    {
      id: "automate-returns",
      icon: "🔄",
      title: "Automate Returns Processing",
      description: "Process return requests and refunds automatically",

      compact: {
        topMetrics: [
          { icon: "⏱️", label: "Processing", value: "Same day" },
          { icon: "✓", label: "Automation", value: "90%" },
          { icon: "💰", label: "Saved/year", value: "$50K" },
        ],
        proofLine: "E-commerce leader: 95% returns automated",
      },

      expanded: {
        painPoints: [
          "Manual returns take 3-5 days with high error rate",
          "Agents spend 30% time on returns processing",
        ],
        solution: {
          template: "Returns Processing Agent",
          buildTime: "15 min",
          difficulty: "Intermediate",
          integrations: [
            { name: "Salesforce", required: true },
            { name: "SAP", required: true },
          ],
        },
        allMetrics: [
          { icon: "⏱️", label: "Processing Time", value: "Same day" },
          { icon: "✓", label: "Automation Rate", value: "90%" },
          { icon: "📉", label: "Error Rate", value: "-75%" },
          { icon: "💰", label: "Cost Reduction", value: "$50K/year" },
        ],
        fullProof: {
          text: "E-commerce leader processes 95% of returns automatically",
          metric: "1,200 returns automated monthly",
        },
      },
    },

    {
      id: "24-7-faq-support",
      icon: "💬",
      title: "Provide 24/7 FAQ Support",
      description: "Answer frequently asked questions anytime, anywhere",

      compact: {
        topMetrics: [
          { icon: "🌍", label: "Availability", value: "24/7" },
          { icon: "✓", label: "Resolution", value: "70%" },
          { icon: "⚡", label: "Response", value: "Instant" },
        ],
        proofLine: "Global SaaS: 80% of FAQs automated",
      },

      expanded: {
        painPoints: [
          "Support only 9-5, after-hours inquiries pile up",
          "International customers underserved",
        ],
        solution: {
          template: "FAQ Assistant Agent",
          buildTime: "10 min",
          difficulty: "Beginner",
          integrations: [
            { name: "Zendesk", required: false },
            { name: "Intercom", required: false },
          ],
        },
        allMetrics: [
          { icon: "🌍", label: "Availability", value: "24/7" },
          { icon: "✓", label: "Resolution Rate", value: "70%" },
          { icon: "⚡", label: "Response Time", value: "Instant" },
          { icon: "📊", label: "Coverage", value: "100%" },
        ],
        fullProof: {
          text: "Global SaaS company handles 80% of FAQs automatically",
          metric: "4,500 questions answered monthly",
        },
      },
    },
  ],

  admin: [
    {
      id: "setup-integrations",
      featured: true,
      badge: "PRIORITY",
      icon: "🔌",
      title: "Set Up Customer Care Integrations",
      description: "Connect Salesforce Service Cloud and Zendesk for your team",

      compact: {
        topMetrics: [
          { icon: "🚀", label: "Team Unblocked", value: "100%" },
          { icon: "🔒", label: "Security", value: "Enterprise" },
          { icon: "⏱️", label: "Setup Time", value: "20 min" },
        ],
        proofLine: "Reduces builder wait time by 90%",
      },

      expanded: {
        painPoints: [
          "Builders blocked without connections",
          "Manual credential management with security concerns",
        ],
        solution: {
          template: "Integration Setup Wizard",
          buildTime: "20 min",
          difficulty: "Intermediate",
          integrations: [
            { name: "Salesforce Service Cloud", required: true },
            { name: "Zendesk", required: true },
          ],
        },
        allMetrics: [
          { icon: "🚀", label: "Team Unblocked", value: "100%" },
          { icon: "🔒", label: "Secure Access", value: "Enterprise" },
          { icon: "👁️", label: "Visibility", value: "Full" },
          { icon: "⏱️", label: "Setup Time", value: "20 min" },
        ],
        fullProof: {
          text: "Set up integrations first to enable your team to build immediately",
          metric: "Reduces builder wait time by 90%",
        },
      },
    },
  ],

  sme: [
    {
      id: "validate-responses",
      featured: true,
      badge: "RECOMMENDED",
      icon: "✓",
      title: "Validate Agent Response Accuracy",
      description: "Ensure customer care agents provide correct information",

      compact: {
        topMetrics: [
          { icon: "✓", label: "Accuracy", value: "99.5%" },
          { icon: "🎯", label: "Quality", value: "4.8/5" },
          { icon: "🔍", label: "Issues Found", value: "Early" },
        ],
        proofLine: "Catches 95% of issues before production",
      },

      expanded: {
        painPoints: [
          "No systematic validation process",
          "Quality varies by agent, customer trust at risk",
        ],
        solution: {
          template: "Agent Testing Framework",
          buildTime: "30 min",
          difficulty: "Beginner",
          integrations: [],
        },
        allMetrics: [
          { icon: "✓", label: "Accuracy Rate", value: "99.5%" },
          { icon: "🎯", label: "Quality Score", value: "4.8/5" },
          { icon: "🔍", label: "Issues Found", value: "Early" },
          { icon: "😊", label: "Customer Trust", value: "High" },
        ],
        fullProof: {
          text: "SME validation catches 95% of issues before production",
          metric: "Prevents 200+ incorrect responses monthly",
        },
      },
    },
  ],
};

// Persona card selection
document.querySelectorAll(".persona-card").forEach((card) => {
  card.addEventListener("click", function () {
    document
      .querySelectorAll(".persona-card")
      .forEach((c) => c.classList.remove("selected"));
    this.classList.add("selected");
    selectedPersona = this.dataset.persona;
    document.getElementById("continueBtn").disabled = false;
  });
});

// Assessment option selection
document.querySelectorAll(".assessment-option").forEach((option) => {
  option.addEventListener("click", function () {
    const radio = this.querySelector('input[type="radio"]');
    radio.checked = true;
    this.parentElement.querySelectorAll(".assessment-option").forEach((opt) => {
      opt.classList.remove("selected");
    });
    this.classList.add("selected");
    document.getElementById("assessmentNextBtn").disabled = false;
  });
});

function showScreen(screenId) {
  document.getElementById("personaScreen").style.display = "none";
  document.getElementById("assessmentScreen").style.display = "none";
  document.getElementById("assessmentResultScreen").style.display = "none";
  document.getElementById(screenId).style.display = "block";
}

function showAssessment() {
  showScreen("assessmentScreen");
  currentQuestion = 1;
}

function backToPersona() {
  showScreen("personaScreen");
  currentQuestion = 1;
  assessmentAnswers = { q1: null, q2: null, q3: null };
}

function nextAssessmentQuestion() {
  const selectedOption = document.querySelector(
    `input[name="q${currentQuestion}"]:checked`,
  );
  if (selectedOption) {
    assessmentAnswers[`q${currentQuestion}`] = selectedOption.value;
  }

  if (currentQuestion < 3) {
    document.getElementById(`question-${currentQuestion}`).style.display =
      "none";
    currentQuestion++;
    document.getElementById(`question-${currentQuestion}`).style.display =
      "block";
    document
      .getElementById(`progress-${currentQuestion}`)
      .classList.add("active");
    document.getElementById("assessmentNextBtn").disabled = true;

    if (currentQuestion === 3) {
      document.getElementById("assessmentNextBtn").textContent =
        "See Recommendation";
    }
  } else {
    showAssessmentResult();
  }
}

function showAssessmentResult() {
  const scores = { admin: 0, builder: 0, sme: 0 };
  Object.values(assessmentAnswers).forEach((answer) => {
    if (answer) scores[answer]++;
  });

  const recommended = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b,
  );
  selectedPersona = recommended;

  const roleNames = {
    admin: "⚙️ Admin",
    builder: "🔨 Builder",
    sme: "💡 Subject Matter Expert",
  };

  const roleReasons = {
    admin:
      "Based on your answers, you're focused on platform management and enabling your team. The Admin role will help you set up integrations and manage access for customer care agents.",
    builder:
      "Based on your answers, you're focused on solving customer care challenges. The Builder role will help you create agents that reduce tickets, speed up inquiries, and automate processes.",
    sme: "Based on your answers, you're focused on ensuring quality and accuracy. The SME role will help you validate customer care agents and provide expert feedback.",
  };

  document.getElementById("recommended-role").textContent =
    roleNames[recommended];
  document.getElementById("recommendation-reason").textContent =
    roleReasons[recommended];
  showScreen("assessmentResultScreen");
}

function acceptRecommendation() {
  showJobsDashboard();
}

function continueToLanding() {
  if (!selectedPersona) return;
  // Hide persona overlay
  document.getElementById("personaOverlay").classList.add("hidden");
  showJobsDashboard();
}

function skipOnboarding() {
  selectedPersona = "builder";
  showJobsDashboard();
}

function showRoleGuide() {
  alert(
    "Role guide would open here with detailed information about each role, responsibilities, and typical workflows for customer care.",
  );
}

// Persona badge click to change role
document.getElementById("personaBadge").addEventListener("click", () => {
  document.getElementById("personaOverlay").classList.remove("hidden");
  showScreen("personaScreen");
});

function showJobsDashboard() {
  if (!selectedPersona) {
    console.error("selectedPersona is not set!");
    return;
  }

  document.getElementById("personaOverlay").classList.add("hidden");
  document.getElementById("appContent").style.display = "flex";

  const content = personaContent[selectedPersona];
  const jobs = customerCareJobs[selectedPersona] || [];
  currentJobs = jobs; // Store globally for modal access

  if (!content) {
    console.error(`No content found for persona: ${selectedPersona}`);
    return;
  }

  // Update badge
  document.getElementById("personaBadge").textContent =
    `${content.badge} • 🎧 CUSTOMER CARE`;

  // Update chat with enhanced welcome message
  const chatMessages = document.getElementById("chatMessages");

  // Persona-specific welcome messages
  const welcomeMessages = {
    builder: {
      greeting: "👋 Welcome, Builder!",
      intro:
        "I'm your Control Plane Agent, here to help you solve customer care challenges with AI agents.",
      context:
        "I can guide you through building agents, recommend templates, and help you understand which solutions work best for specific problems.",
    },
    admin: {
      greeting: "👋 Welcome, Admin!",
      intro:
        "I'm your Control Plane Agent, here to help you set up and manage the platform.",
      context:
        "I can guide you through connections, model configuration, user management, and platform settings.",
    },
    sme: {
      greeting: "👋 Welcome, Subject Matter Expert!",
      intro:
        "I'm your Control Plane Agent, here to help you validate and improve customer care agents.",
      context:
        "I can guide you through testing agents, providing feedback, and ensuring quality responses.",
    },
  };

  const welcome = welcomeMessages[selectedPersona];

  const starterCardsByPersona = {
    admin: [
      {
        title: "Setup your team",
        description: "Invite your team mates and set up role based access",
      },
      {
        title: "Setup connections",
        description: "Connect your applications so that you can try out agents",
      },
      {
        title: "Suggested agents for you",
        description:
          "Tell us more about your needs so that we can help you get started",
      },
    ],
    builder: [
      {
        title: "Explore starter agents",
        description:
          "Review recommended agents you can use as your starting point",
      },
      {
        title: "Setup connections",
        description: "Connect your applications so that you can try out agents",
      },
      {
        title: "Suggested agents for you",
        description:
          "Tell us more about your needs so that we can help you get started",
      },
    ],
    sme: [
      {
        title: "Review pending agents",
        description: "See which agents are ready for validation and feedback",
      },
      {
        title: "Setup connections",
        description: "Connect your applications so that you can try out agents",
      },
      {
        title: "Suggested agents for you",
        description:
          "Tell us more about your needs so that we can help you get started",
      },
    ],
  };

  const panelIntroByPersona = {
    admin:
      "Let's help you get started by inviting your team, connecting with your enterprise applications, and trying out you first agent.",
    builder:
      "Let's help you get started by exploring starter agents, connecting your applications, and trying out your first workflow.",
    sme: "Let's help you get started by reviewing agents, connecting your applications, and validating your first experience.",
  };

  const starterCards =
    starterCardsByPersona[selectedPersona] || starterCardsByPersona.admin;
  const panelIntro =
    panelIntroByPersona[selectedPersona] || panelIntroByPersona.admin;

  chatMessages.innerHTML = `
    <div class="chat-message">
      <div class="chat-avatar" aria-hidden="true">
        <img src="icons/wxo.svg" alt="" />
      </div>
      <div class="chat-content">
        <div class="chat-source">
          <span class="chat-source-name">watsonx</span>
          <span class="chat-source-time">12:46</span>
        </div>
        <div class="chat-text">
          <span class="chat-title">Welcome to watsonx orchestrate</span>
          <p>${panelIntro}</p>
          <span class="chat-section-title">Quick starters</span>
        </div>
        <div class="chat-suggestions">
          ${starterCards
            .map(
              (card) => `
                <div class="suggestion-card" onclick="handleChatSuggestion('${card.title.replace(/'/g, "\\'")}')">
                  <div class="suggestion-card-content">
                    <div class="suggestion-title">${card.title}</div>
                    <div class="suggestion-description">${card.description}</div>
                  </div>
                  <div class="suggestion-arrow" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M18.59 24.59L20 26l10-10-10-10-1.41 1.41L26.17 15H4v2h22.17l-7.58 7.59z"></path>
                    </svg>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  // Update hero - this becomes the main section title
  const heroContent = document.getElementById("heroContent");
  heroContent.innerHTML = `
    <h1>${content.hero.title}</h1>
    <p class="subtitle">${content.hero.subtitle}</p>
  `;

  // Update page header with getting started cards
  const pageHeaderCards = document.getElementById("pageHeaderCards");
  if (content.setupCards) {
    // Admin gets setup cards in page header
    pageHeaderCards.innerHTML = `
      <div class="getting-started-grid">
        ${content.setupCards
          .map(
            (card) => `
          <div class="getting-started-card ${card.priority ? "priority" : ""}" onclick="alert('Setup: ${card.title}')">
            <div class="getting-started-card-header">
              <h3 class="getting-started-card-title">${card.title}</h3>
              ${card.badge ? `<span class="getting-started-card-badge">${card.badge}</span>` : ""}
            </div>
            <p class="getting-started-card-description">${card.description}</p>
            <div class="getting-started-card-meta">
              ${card.meta.map((m) => `<span>${m}</span>`).join("")}
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
      ${
        content.banner
          ? `
      <div class="page-header-banner">
        <div class="page-header-banner-icon">💡</div>
        <div class="page-header-banner-content">
          <div class="page-header-banner-title">${content.banner.title}</div>
          <p class="page-header-banner-message">${content.banner.message}</p>
        </div>
      </div>
      `
          : ""
      }
    `;
  } else {
    // Builder/SME get contextual quick actions
    pageHeaderCards.innerHTML = `
      <div class="getting-started-grid">
        <div class="getting-started-card" onclick="alert('View Templates')">
          <div class="getting-started-card-header">
            <h3 class="getting-started-card-title">Browse All Templates</h3>
          </div>
          <p class="getting-started-card-description">Explore all available agent templates for Customer Care</p>
          <div class="getting-started-card-meta">
            <span>📚 Learning</span>
          </div>
        </div>
        <div class="getting-started-card" onclick="alert('View Documentation')">
          <div class="getting-started-card-header">
            <h3 class="getting-started-card-title">Documentation</h3>
          </div>
          <p class="getting-started-card-description">Learn best practices for building effective agents</p>
          <div class="getting-started-card-meta">
            <span>📖 Guides</span>
          </div>
        </div>
        <div class="getting-started-card" onclick="alert('Get Help')">
          <div class="getting-started-card-header">
            <h3 class="getting-started-card-title">Get Help</h3>
          </div>
          <p class="getting-started-card-description">Connect with support or community resources</p>
          <div class="getting-started-card-meta">
            <span>💬 Support</span>
          </div>
        </div>
      </div>
    `;
  }

  // Update main content with jobs or setup cards
  const mainContent = document.getElementById("mainContent");

  // Check if this persona has setup cards (admin) or jobs (builder/sme)
  if (content.setupCards) {
    // Render admin setup cards
    mainContent.innerHTML = `
      <div class="getting-started-grid">
        ${content.setupCards
          .map(
            (card) => `
          <div class="getting-started-card ${card.priority ? "priority" : ""}" onclick="${card.action ? card.action + "('" + selectedDomain + "')" : "alert('Setup: " + card.title + "')"}">
            <div class="getting-started-card-header">
              <h3 class="getting-started-card-title">${card.title}</h3>
              ${card.badge ? `<span class="getting-started-card-badge">${card.badge}</span>` : ""}
            </div>
            <p class="getting-started-card-description">${card.description}</p>
            <div class="getting-started-card-meta">
              ${card.meta.map((m) => `<span>${m}</span>`).join("")}
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  } else {
    // Render jobs for builder/sme
    mainContent.innerHTML = `
      <div class="jobs-grid">
        ${jobs
          .map(
            (job) => `
          <div class="job-card job-card-compact ${job.featured ? "featured" : ""}" data-job-id="${job.id}">
            <div class="job-header">
              <h3 class="job-title">
                ${job.title}
                ${job.badge ? `<span class="job-badge">${job.badge}</span>` : ""}
              </h3>
            </div>
            
            <p class="job-description">${job.description}</p>
            
            <!-- Metadata Section -->
            ${
              job.meta
                ? `
            <div class="job-meta">
              ${job.meta.map((item) => `<span class="job-meta-item">${item}</span>`).join("")}
            </div>
            `
                : ""
            }
            
            <!-- Compact View Content -->
            <div class="job-compact-content">
              <div class="job-metrics-compact">
                ${job.compact.topMetrics
                  .map(
                    (metric) => `
                  <div class="metric-compact">
                    <span class="metric-compact-icon">${metric.icon}</span>
                    <span class="metric-compact-value">${metric.value}</span>
                    <span class="metric-compact-label">${metric.label}</span>
                  </div>
                `,
                  )
                  .join("")}
              </div>
              
              <div class="job-proof-compact">
                <strong>Success Story:</strong> ${job.compact.proofLine} <span class="external-link-icon">↗</span>
              </div>
              
              <div class="job-actions">
                <button class="job-cta primary" onclick="startBuildingJob('${job.id}')">
                  Get Started →
                </button>
                <button class="job-cta secondary" onclick="showJobModal('${job.id}')">
                  Learn More
                </button>
              </div>
            </div>
            
            <!-- Expanded View Content (Hidden by default) -->
            <div class="job-expanded-content" style="display: none;">
              <div class="job-expanded-divider"></div>
              
              <div class="job-expanded-section">
                <div class="job-expanded-header">💡 Why This Matters</div>
                <ul class="job-expanded-list">
                  ${job.expanded.painPoints.map((point) => `<li>${point}</li>`).join("")}
                </ul>
              </div>
              
              <div class="job-expanded-section">
                <div class="job-expanded-header">🔧 What You'll Build</div>
                <div class="job-expanded-solution">
                  <strong>${job.expanded.solution.template}</strong>
                  <span class="solution-meta-inline">
                    ${job.expanded.solution.buildTime} • ${job.expanded.solution.difficulty}
                  </span>
                  ${
                    job.expanded.solution.integrations.length > 0
                      ? `
                  <div class="solution-integrations-inline">
                    <strong>Requires:</strong>
                    ${job.expanded.solution.integrations
                      .map(
                        (int) =>
                          `<span class="integration-tag-inline ${int.required ? "required" : ""}">${int.name}${int.required ? " ✓" : ""}</span>`,
                      )
                      .join("")}
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
              
              <div class="job-expanded-section">
                <div class="job-expanded-header">📊 Full Impact</div>
                <div class="job-metrics-expanded">
                  ${job.expanded.allMetrics
                    .map(
                      (metric) => `
                    <span class="metric-expanded">${metric.icon} ${metric.value} ${metric.label}</span>
                  `,
                    )
                    .join("")}
                </div>
              </div>
              
              <div class="job-expanded-section">
                <div class="job-expanded-header">✨ Proven Results</div>
                <div class="job-expanded-proof">
                  <p>"${job.expanded.fullProof.text}"</p>
                  <div class="proof-metric-expanded">${job.expanded.fullProof.metric}</div>
                </div>
              </div>
              
              <div class="job-actions">
                <button class="job-cta primary" onclick="startBuildingJob('${job.id}')">
                  Start Building This Agent →
                </button>
                <button class="job-cta secondary" onclick="toggleJobExpand('${job.id}')">
                  Show Less ↑
                </button>
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  }
}

function startBuildingJob(jobId) {
  selectedJob = jobId;
  alert(
    `Starting guided builder for job: ${jobId}\n\nThis would launch the agent builder with pre-configured settings for this specific use case.`,
  );
}
// Show job details in modal
window.showJobModal = function (jobId) {
  console.log("showJobModal called with jobId:", jobId);
  console.log("currentJobs:", currentJobs);

  const job = currentJobs.find((j) => j.id === jobId);
  if (!job) {
    console.error(
      "Job not found:",
      jobId,
      "Available jobs:",
      currentJobs.map((j) => j.id),
    );
    alert("Job not found: " + jobId);
    return;
  }

  const modal = document.getElementById("jobModal");
  const modalTitle = document.getElementById("jobModalTitle");
  const modalContent = document.getElementById("jobModalContent");

  console.log("Modal elements:", { modal, modalTitle, modalContent });

  if (!modal || !modalTitle || !modalContent) {
    console.error("Modal elements not found in DOM");
    alert("Modal elements not found");
    return;
  }

  modalTitle.textContent = job.title;
  modalContent.innerHTML = `
    <div class="job-modal-section">
      <h3>💡 Why This Matters</h3>
      <ul>
        ${job.expanded.painPoints.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    </div>
    
    <div class="job-modal-section">
      <h3>🔧 What You'll Build</h3>
      <p><strong>${job.expanded.solution.template}</strong></p>
      <p class="job-modal-meta">${job.expanded.solution.buildTime} • ${job.expanded.solution.difficulty}</p>
      <p>${job.expanded.solution.description}</p>
    </div>
    
    <div class="job-modal-section">
      <h3>📊 Expected Impact</h3>
      <div class="job-modal-metrics">
        ${job.expanded.metrics
          .map(
            (metric) => `
          <div class="job-modal-metric">
            <div class="job-modal-metric-icon">${metric.icon}</div>
            <div class="job-modal-metric-value">${metric.value}</div>
            <div class="job-modal-metric-label">${metric.label}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    
    <div class="job-modal-section">
      <h3>🎯 Key Features</h3>
      <ul>
        ${job.expanded.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
    </div>
    
    <div class="job-modal-actions">
      <button class="job-cta primary" onclick="startBuildingJob('${job.id}'); closeJobModal();">
        Get Started →
      </button>
    </div>
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

// Close job modal
window.closeJobModal = function () {
  const modal = document.getElementById("jobModal");
  modal.style.display = "none";
  document.body.style.overflow = "";
};

// Close modal on overlay click and Escape key
window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const jobModal = document.getElementById("jobModal");
    const connectionModal = document.getElementById("connectionModal");

    if (e.target === jobModal) {
      closeJobModal();
    }
    if (e.target === connectionModal) {
      closeConnectionModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeJobModal();
      closeConnectionModal();
    }
  });
});

// Connection Setup Modal Functions
let selectedConnectionId = null;
let openConnectionModalAfterSettings = false;

window.showConnectionModal = function (domain) {
  const modal = document.getElementById("connectionModal");
  const modalContent = document.getElementById("connectionModalContent");

  // Reset selection state
  selectedConnectionId = null;

  // Get domain-specific connections
  const domainKey = domain || selectedDomain || "custom";
  const connections = domainConnections[domainKey];

  if (!connections) {
    console.error("No connections found for domain:", domainKey);
    return;
  }

  modalContent.innerHTML = `
    <div class="connection-modal-container">
      <!-- Optional Help Panel (Hidden by default) -->
      <div class="connection-help-panel" id="connectionHelpPanel" style="display: none;">
        <div class="help-panel-header">
          <div class="help-panel-title">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" style="margin-right: 8px;">
              <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
              <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
            </svg>
            <span style="font-size: 14px; font-weight: 600;">Understanding Environments</span>
          </div>
          <button class="help-panel-close" onclick="toggleConnectionHelp()" aria-label="Close help panel">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
              <path d="M14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6 4 16l10 10z"/>
            </svg>
          </button>
        </div>
        <div class="help-panel-content">
          <h3>💡 ${environmentEducation.title}</h3>
          <p style="margin-bottom: 16px;">${environmentEducation.description}</p>
          
          <div class="environment-grid">
            ${environmentEducation.environments
              .map(
                (env) => `
              <div class="environment-card">
                <div class="environment-card-header">
                  <span style="font-size: 24px;">${env.icon}</span>
                  <h4>${env.name}</h4>
                </div>
                <div class="environment-card-purpose">${env.purpose}</div>
                <p>${env.description}</p>
                <ul>
                  ${env.features.map((feature) => `<li>${feature}</li>`).join("")}
                </ul>
              </div>
            `,
              )
              .join("")}
          </div>
          
          <div style="margin-top: 16px; padding: 12px; background: #f4f4f4; border-radius: 4px;">
            <strong>Recommended Workflow:</strong>
            <ol style="margin: 8px 0 0 20px; padding: 0;">
              ${environmentEducation.workflow.map((step) => `<li style="margin: 4px 0;">${step}</li>`).join("")}
            </ol>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="connection-main-content" id="connectionMainContent">
        <!-- Search Bar -->
        <div class="connection-search-container">
          <input
            type="text"
            id="connectionSearch"
            class="connection-search-input"
            placeholder="Search for an app or integration..."
            oninput="filterConnections(this.value)"
          />
          <span class="search-icon">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
              <path d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9 9.01 9.01 0 0 1-9-9z"/>
            </svg>
          </span>
        </div>
        
        <!-- Recommended Section Label -->
        <div class="section-label">
          <h3>Recommended for Customer Care</h3>
        </div>
        
        <!-- OOTB Connections -->
        <div class="ootb-connections" id="ootbConnectionsSection">
          <div class="connections-grid">
            ${connections.ootbConnections
              .map(
                (conn) => `
              <div class="connection-card" data-connection-id="${conn.id}" data-connection-name="${conn.name.toLowerCase()}" onclick="selectConnectionCard('${conn.id}')">
                <div class="connection-card-header">
                  <span class="connection-icon">${conn.icon}</span>
                  <div class="connection-title-group">
                    <h4>${conn.name}</h4>
                    <span class="tool-count-badge">Unlock ${conn.toolCount} tools</span>
                  </div>
                </div>
                <p>${conn.description}</p>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
        
        <!-- Custom Connection Section -->
        <div class="custom-connection-section">
          <div class="section-divider">
            <span>or</span>
          </div>
          <button class="custom-connection-card" onclick="showCustomConnectionOption()">
            <span class="custom-icon">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                <path d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1 2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1 2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1 2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51zM25.21 24l-3.43-1.16a8.86 8.86 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.36 9.36 0 0 1-2.7-1.57L6.79 24 4.5 20l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.5 12 6.8 8l3.43 1.16a8.86 8.86 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.36 9.36 0 0 1 2.7 1.57L25.21 8 27.5 12l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.5 20z"/>
                <path d="M16 22a6 6 0 1 1 6-6 5.94 5.94 0 0 1-6 6zm0-10a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4z"/>
              </svg>
            </span>
            <div class="custom-content">
              <h4>Custom Integration</h4>
              <p>Connect to any REST API or custom system</p>
            </div>
            <span class="arrow-icon">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                <path d="M18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z"/>
              </svg>
            </span>
          </button>
        </div>
        
        <div class="connection-modal-actions">
          <div class="connection-actions-left">
            <a href="${environmentEducation.documentation}" target="_blank" class="persona-btn tertiary">
              View Documentation
            </a>
            <button class="persona-btn tertiary" onclick="toggleConnectionHelp()">
              Understanding Draft vs Live
            </button>
          </div>
          <div class="connection-actions-right">
            <button class="persona-btn primary" id="connectionNextBtn" disabled onclick="proceedWithConnection()">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.selectConnectionCard = function (connectionId) {
  // Update selection state
  selectedConnectionId = connectionId;

  // Update visual selection
  const cards = document.querySelectorAll(".connection-card");
  cards.forEach((card) => {
    if (card.dataset.connectionId === connectionId) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  });

  // Enable the Next button
  const nextBtn = document.getElementById("connectionNextBtn");
  if (nextBtn) {
    nextBtn.disabled = false;
  }
};

window.filterConnections = function (searchTerm) {
  const cards = document.querySelectorAll(".connection-card");
  const lowerSearch = searchTerm.toLowerCase();

  cards.forEach((card) => {
    const name = card.dataset.connectionName || "";
    const description =
      card.querySelector("p")?.textContent.toLowerCase() || "";
    const useCases =
      card.querySelector(".connection-use-cases")?.textContent.toLowerCase() ||
      "";

    const matches =
      name.includes(lowerSearch) ||
      description.includes(lowerSearch) ||
      useCases.includes(lowerSearch);

    card.style.display = matches ? "block" : "none";
  });
};

window.showCustomConnectionOption = function () {
  showConnectionSettingsPage(false);
};

window.showConnectionSettingsPage = function (openModalAfter = false) {
  const settingsPage = document.getElementById("connectionSettingsPage");
  const heroSection = document.querySelector(".hero-section");
  const mainContent = document.getElementById("mainContent");
  const pageHeader = document.getElementById("pageHeader");

  if (!settingsPage || !heroSection || !mainContent || !pageHeader) return;

  openConnectionModalAfterSettings = openModalAfter;
  heroSection.style.display = "none";
  mainContent.style.display = "none";
  pageHeader.style.display = "none";
  settingsPage.style.display = "flex";

  closeNavDrawer();

  if (openModalAfterSettings) {
    setTimeout(() => {
      showConnectionModal(selectedDomain);
      openConnectionModalAfterSettings = false;
    }, 0);
  }
};

window.hideConnectionSettingsPage = function () {
  const settingsPage = document.getElementById("connectionSettingsPage");
  const heroSection = document.querySelector(".hero-section");
  const mainContent = document.getElementById("mainContent");
  const pageHeader = document.getElementById("pageHeader");

  if (!settingsPage || !heroSection || !mainContent || !pageHeader) return;

  settingsPage.style.display = "none";
  heroSection.style.display = "";
  mainContent.style.display = "";
  pageHeader.style.display = "";
};

window.proceedWithConnection = function () {
  if (!selectedConnectionId) return;

  console.log("Proceeding with connection:", selectedConnectionId);

  // Get the selected connection details
  const selectedConnection = getConnectionById(selectedConnectionId);

  // Show the connection details form
  showConnectionDetailsForm(selectedConnection);
};

// Helper function to get connection by ID
function getConnectionById(connectionId) {
  // Search through all domain connections
  for (const domain in domainConnections) {
    const connections = domainConnections[domain].ootbConnections;
    const found = connections.find((conn) => conn.id === connectionId);
    if (found) return found;
  }
  return null;
}

// Store current step and connection data
let currentConnectionStep = 1;
let currentConnection = null;

// Show the connection details form
function showConnectionDetailsForm(connection) {
  currentConnection = connection;
  currentConnectionStep = 1;

  // Update modal title
  const modalTitle = document.getElementById("connectionModalTitle");
  modalTitle.textContent = "Add new connection";

  renderConnectionStep(1);
}

// Render specific step - Updated to match Figma design
function renderConnectionStep(step) {
  currentConnectionStep = step;
  const modalContent = document.getElementById("connectionModalContent");
  const defaultDisplayName = currentConnection ? currentConnection.name : "";
  const appName = currentConnection ? currentConnection.name : "App";
  const connectionId = defaultDisplayName.toLowerCase().replace(/\s+/g, "-");
  const defaultSubdomain = currentConnection
    ? getSubdomainForApp(currentConnection.name)
    : "companyname.example.com";

  modalContent.innerHTML = `
    <div class="connection-details-container-new">
      <!-- Left Progress Indicator -->
      <div class="connection-progress-sidebar">
        <div class="progress-step ${step === 1 ? "current" : step > 1 ? "complete" : ""}" onclick="scrollToStep(1)">
          <div class="progress-step-indicator">
            ${step > 1 ? '<span class="step-check">✓</span>' : '<span class="step-number">1</span>'}
          </div>
          <div class="progress-step-label">
            <div class="step-label-text">Get started</div>
          </div>
        </div>
        <div class="progress-connector ${step > 1 ? "complete" : ""}"></div>
        <div class="progress-step ${step === 2 ? "current" : step > 2 ? "complete" : ""}" onclick="scrollToStep(2)">
          <div class="progress-step-indicator">
            ${step > 2 ? '<span class="step-check">✓</span>' : '<span class="step-number">2</span>'}
          </div>
          <div class="progress-step-label">
            <div class="step-label-text">Draft configuration</div>
            <div class="step-label-subtitle">Build and test</div>
          </div>
        </div>
        <div class="progress-connector ${step > 2 ? "complete" : ""}"></div>
        <div class="progress-step ${step === 3 ? "current" : ""}" onclick="scrollToStep(3)">
          <div class="progress-step-indicator">
            <span class="step-number">3</span>
          </div>
          <div class="progress-step-label">
            <div class="step-label-text">Live configuration</div>
            <div class="step-label-subtitle">Deploy to production</div>
          </div>
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div class="connection-form-content">
        <div class="connection-form-scroll">
          <!-- Header Section -->
          <div class="connection-form-header">
            <h2 class="connection-form-title">Connect [${appName}]</h2>
            <p class="connection-form-subtitle">
              Provide credentials to draft environment of your connection for building and testing the agent.
            </p>
          </div>

          <!-- Step 1: Connection Details -->
          <div class="connection-step-section" id="step-section-1">
            <div class="step-section-header">
              <span class="step-section-number">1</span>
              <h3 class="step-section-title">Define app details</h3>
            </div>
            
            <div class="form-field">
              <label for="connectionName" class="form-label">Connection name</label>
              <input
                type="text"
                id="connectionName"
                class="form-input"
                value="${defaultDisplayName}"
                placeholder="Enter display name"
                oninput="updateConnectionIdFromName(this.value)"
              />
              <p class="form-helper-text">
                A friendly name for this connection. You can change this anytime.
              </p>
            </div>

            <div class="form-field">
              <label for="connectionId" class="form-label">Connection ID</label>
              <input
                type="text"
                id="connectionId"
                class="form-input"
                value="${connectionId}"
                placeholder="Enter connection ID"
                readonly
              />
              <p class="form-helper-text">Auto-generated identifier</p>
            </div>
          </div>

          <!-- Step 2: Draft Configuration -->
          <div class="connection-step-section" id="step-section-2">
            <div class="step-section-header">
              <span class="step-section-number">2</span>
              <h3 class="step-section-title">Draft configuration</h3>
              <button class="tooltip-trigger" title="Information about draft configuration" style="margin-left: auto;">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                  <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
                </svg>
              </button>
            </div>

            <!-- Who can use this -->
            <div class="form-field">
              <label class="form-label">Who can use this?</label>
              <div class="radio-button-group">
                <label class="radio-button-label">
                  <input type="radio" name="whoCanUse" value="team" checked />
                  <span class="radio-button-text">Team (Shared)</span>
                </label>
                <label class="radio-button-label">
                  <input type="radio" name="whoCanUse" value="member" />
                  <span class="radio-button-text">Member (Private)</span>
                </label>
              </div>
            </div>

            <!-- Authentication Method -->
            <div class="form-field">
              <label for="authMethod" class="form-label">Authentication method</label>
              <select id="authMethod" class="form-select">
                <option value="api-key">API Key (recommended)</option>
                <option value="oauth">OAuth 2.0</option>
                <option value="basic">Basic Auth</option>
              </select>
            </div>

            <!-- Subdomain -->
            <div class="form-field">
              <label for="subdomain" class="form-label">Subdomain</label>
              <input
                type="text"
                id="subdomain"
                class="form-input"
                value="${defaultSubdomain}"
                placeholder="Enter subdomain"
              />
            </div>

            <!-- API Key -->
            <div class="form-field">
              <label for="apiKey" class="form-label">API Key</label>
              <div class="password-input-wrapper">
                <input
                  type="password"
                  id="apiKey"
                  class="form-input"
                  placeholder="Enter API key"
                />
                <button class="password-toggle-btn" onclick="togglePasswordVisibility('apiKey')">
                  <span class="eye-icon">
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M30.94 15.66A16.69 16.69 0 0 0 16 5 16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66 1 1 0 0 0 0-.68zM16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25z"/>
                      <path d="M16 10a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <!-- Advanced Options Accordion -->
            <div class="form-field">
              <ul class="cds--accordion">
                <li class="cds--accordion__item">
                  <button class="cds--accordion__heading" aria-expanded="false" aria-controls="advanced-draft-content" onclick="toggleAccordion('draft')">
                    <svg class="cds--accordion__arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M11 8L6 13 5.3 12.3 9.6 8 5.3 3.7 6 3z"/>
                    </svg>
                    <div class="cds--accordion__title">Advanced options</div>
                  </button>
                  <div id="advanced-draft-content" class="cds--accordion__content">
                    <div class="form-field">
                      <label for="timeout" class="form-label">Request timeout (seconds)</label>
                      <input
                        type="number"
                        id="timeout"
                        class="form-input"
                        value="30"
                        placeholder="Enter timeout value"
                      />
                      <p class="form-helper-text">Maximum time to wait for API response</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Step 3: Live Configuration -->
          <div class="connection-step-section" id="step-section-3">
            <div class="step-section-header">
              <span class="step-section-number">3</span>
              <h3 class="step-section-title">Live configuration</h3>
              <button class="tooltip-trigger" title="Information about live configuration" style="margin-left: auto;">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                  <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
                </svg>
              </button>
            </div>

            <!-- Same as draft toggle -->
            <div class="form-field">
              <label class="toggle-label">
                <input type="checkbox" id="sameAsDraft" class="toggle-input" checked onchange="toggleLiveConfig(this.checked)" />
                <span class="toggle-text">Same as draft configuration</span>
              </label>
            </div>

            <!-- Info notification - shown when toggle is ON -->
            <div class="inline-notification info" id="liveConfigNote">
              <div class="notification-icon">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                  <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
                </svg>
              </div>
              <div class="notification-content">
                <div class="notification-title">Note</div>
                <div class="notification-subtitle">
                  You can always edit this later when your agent is ready to go live
                </div>
              </div>
            </div>

            <!-- Live configuration fields - shown when toggle is OFF -->
            <div id="liveConfigFields" style="display: none;">
              <!-- Who can use this -->
              <div class="form-field">
                <label class="form-label">Who can use this?</label>
                <div class="radio-button-group">
                  <label class="radio-button-label">
                    <input type="radio" name="whoCanUseLive" value="team" checked />
                    <span class="radio-button-text">Team (Shared)</span>
                  </label>
                  <label class="radio-button-label">
                    <input type="radio" name="whoCanUseLive" value="member" />
                    <span class="radio-button-text">Member (Private)</span>
                  </label>
                </div>
              </div>

              <!-- Authentication Method -->
              <div class="form-field">
                <label for="authMethodLive" class="form-label">Authentication method</label>
                <select id="authMethodLive" class="form-select">
                  <option value="api-key">API Key (recommended)</option>
                  <option value="oauth">OAuth 2.0</option>
                  <option value="basic">Basic Auth</option>
                </select>
              </div>

              <!-- Subdomain -->
              <div class="form-field">
                <label for="subdomainLive" class="form-label">Subdomain</label>
                <input
                  type="text"
                  id="subdomainLive"
                  class="form-input"
                  value="${defaultSubdomain}"
                  placeholder="Enter subdomain"
                />
              </div>

              <!-- API Key -->
              <div class="form-field">
                <label for="apiKeyLive" class="form-label">API Key</label>
                <div class="password-input-wrapper">
                  <input
                    type="password"
                    id="apiKeyLive"
                    class="form-input"
                    placeholder="Enter API key"
                  />
                  <button class="password-toggle-btn" onclick="togglePasswordVisibility('apiKeyLive')">
                    <span class="eye-icon">
                      <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                        <path d="M30.94 15.66A16.69 16.69 0 0 0 16 5 16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66 1 1 0 0 0 0-.68zM16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25z"/>
                        <path d="M16 10a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              <!-- Advanced Options Accordion -->
              <div class="form-field">
                <ul class="cds--accordion">
                  <li class="cds--accordion__item">
                    <button class="cds--accordion__heading" aria-expanded="false" aria-controls="advanced-live-content" onclick="toggleAccordion('live')">
                      <svg class="cds--accordion__arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M11 8L6 13 5.3 12.3 9.6 8 5.3 3.7 6 3z"/>
                      </svg>
                      <div class="cds--accordion__title">Advanced options</div>
                    </button>
                    <div id="advanced-live-content" class="cds--accordion__content">
                      <div class="form-field">
                        <label for="timeoutLive" class="form-label">Request timeout (seconds)</label>
                        <input
                          type="number"
                          id="timeoutLive"
                          class="form-input"
                          value="30"
                          placeholder="Enter timeout value"
                        />
                        <p class="form-helper-text">Maximum time to wait for API response</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="connection-form-footer">
          <div class="footer-links">
            <a href="#" class="footer-link" onclick="alert('Help documentation would open here'); return false;">Need help?</a>
          </div>
          <div class="footer-buttons">
            <button class="btn-ghost" onclick="showConnectionSelection()">Back</button>
            <button class="btn-primary" onclick="handleConnectionNext()">Continue</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById("connectionModal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

// Helper function to toggle live configuration fields
window.toggleLiveConfig = function (isSameAsDraft) {
  const liveConfigNote = document.getElementById("liveConfigNote");
  const liveConfigFields = document.getElementById("liveConfigFields");

  if (isSameAsDraft) {
    // Show note, hide fields
    liveConfigNote.style.display = "flex";
    liveConfigFields.style.display = "none";
  } else {
    // Hide note, show fields
    liveConfigNote.style.display = "none";
    liveConfigFields.style.display = "block";
  }
};
// Helper function to toggle accordion
window.toggleAccordion = function (section) {
  const button = event.currentTarget;
  const content = document.getElementById("advanced-" + section + "-content");
  const isExpanded = button.getAttribute("aria-expanded") === "true";

  if (isExpanded) {
    button.setAttribute("aria-expanded", "false");
    button.parentElement.classList.remove("cds--accordion__item--active");
    content.style.maxHeight = "0";
  } else {
    button.setAttribute("aria-expanded", "true");
    button.parentElement.classList.add("cds--accordion__item--active");
    content.style.maxHeight = content.scrollHeight + "px";
  }
};

// Helper function to toggle password visibility
window.togglePasswordVisibility = function (inputId) {
  const input = document.getElementById(inputId);
  const type = input.getAttribute("type") === "password" ? "text" : "password";
  input.setAttribute("type", type);
};

// Helper function to handle connection next button
window.handleConnectionNext = function () {
  showConnectionSuccess();
};

// Show connection success page
function showConnectionSuccess() {
  const modalContent = document.getElementById("connectionModalContent");
  const modalTitle = document.getElementById("connectionModalTitle");
  const appName = currentConnection ? currentConnection.name : "App";
  const toolCount = 18; // Mock tool count - in real app, this would come from API

  modalTitle.innerHTML = `
    Great work! You've unlocked ${toolCount} tools 🎉
    <div class="success-subtitle">Your ${appName} connection is ready!</div>
  `;

  // Trigger confetti animation
  setTimeout(() => {
    createConfetti();
  }, 100);

  modalContent.innerHTML = `
    <div class="connection-success-container">
      <div class="connection-success-content">
        
        <!-- Tool Preview Section -->
        <div class="tool-preview-section">
          <div class="tool-preview-header">
            <div class="tool-preview-title">
              <h3>Preview connected tools</h3>
            </div>
            <span class="tool-count">${toolCount} tools</span>
          </div>
          
          <div class="tool-preview-grid">
            <!-- Tool Cards -->
            <div class="tool-preview-card" onclick="openToolChat('Get Customer Data', 'Retrieve customer information and history')">
              <div class="tool-card-icon">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M26 24v4H6v-4H4v4a2 2 0 002 2h20a2 2 0 002-2v-4zM26 14l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10 10-10z"/>
                </svg>
              </div>
              <div class="tool-card-content">
                <div class="tool-card-label-row">
                  <h4>Get Customer Data</h4>
                  <span class="tool-card-preview-hint" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M18 6v2h4.59L16 14.59 17.41 16 24 9.41V14h2V6z"></path>
                      <path d="M24 24H8V8h8V6H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8h-2z"></path>
                    </svg>
                  </span>
                </div>
                <p>Retrieve customer information and history</p>
              </div>
            </div>
            
            <div class="tool-preview-card" onclick="openToolChat('Create Records', 'Add new records to ${appName}')">
              <div class="tool-card-icon">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M28 6H4a2 2 0 00-2 2v16a2 2 0 002 2h24a2 2 0 002-2V8a2 2 0 00-2-2zm0 18H4V8h24z"/>
                  <path d="M7 11h10v2H7zM7 15h14v2H7zM7 19h10v2H7z"/>
                </svg>
              </div>
              <div class="tool-card-content">
                <div class="tool-card-label-row">
                  <h4>Create Records</h4>
                  <span class="tool-card-preview-hint" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M18 6v2h4.59L16 14.59 17.41 16 24 9.41V14h2V6z"></path>
                      <path d="M24 24H8V8h8V6H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8h-2z"></path>
                    </svg>
                  </span>
                </div>
                <p>Add new records to ${appName}</p>
              </div>
            </div>
            
            <div class="tool-preview-card" onclick="openToolChat('Update Information', 'Modify existing records and data')">
              <div class="tool-card-icon">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M27.6 20.6L24 24.2V4h-2v20.2l-3.6-3.6L17 22l6 6 6-6-1.4-1.4zM9 4l-6 6 1.4 1.4L8 7.8V28h2V7.8l3.6 3.6L15 10 9 4z"/>
                </svg>
              </div>
              <div class="tool-card-content">
                <div class="tool-card-label-row">
                  <h4>Update Information</h4>
                  <span class="tool-card-preview-hint" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M18 6v2h4.59L16 14.59 17.41 16 24 9.41V14h2V6z"></path>
                      <path d="M24 24H8V8h8V6H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8h-2z"></path>
                    </svg>
                  </span>
                </div>
                <p>Modify existing records and data</p>
              </div>
            </div>
            
            <div class="tool-preview-card" onclick="openToolChat('Search & Filter', 'Find specific records using queries')">
              <div class="tool-card-icon">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M22 16h2v6h-2zM8 16h2v6H8z"/>
                  <path d="M30 8h-4V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2H2v2h4v14a2 2 0 002 2h16a2 2 0 002-2V10h4zM8 6h16v2H8zm16 20H8V10h16z"/>
                </svg>
              </div>
              <div class="tool-card-content">
                <div class="tool-card-label-row">
                  <h4>Search & Filter</h4>
                  <span class="tool-card-preview-hint" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M18 6v2h4.59L16 14.59 17.41 16 24 9.41V14h2V6z"></path>
                      <path d="M24 24H8V8h8V6H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8h-2z"></path>
                    </svg>
                  </span>
                </div>
                <p>Find specific records using queries</p>
              </div>
            </div>
          </div>
          
          <div class="tool-preview-more">
            <span>+ ${toolCount - 4} more tools available</span>
          </div>
        </div>
        
        <!-- Connection Details Card -->
        <div class="connection-success-card">
          <div class="success-card-header">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
              <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
            </svg>
            <h3>What's next?</h3>
          </div>
          <ul class="success-card-list">
            <li>
              <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                <circle cx="16" cy="16" r="4" fill="currentColor"/>
              </svg>
              <span>Start building your first agent using ${appName} tools</span>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                <circle cx="16" cy="16" r="4" fill="currentColor"/>
              </svg>
              <span>Test your agent in the draft environment</span>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                <circle cx="16" cy="16" r="4" fill="currentColor"/>
              </svg>
              <span>When ready, configure live credentials to deploy</span>
            </li>
          </ul>
        </div>
        
      </div>
      
      <!-- Footer Actions -->
      <div class="connection-success-footer">
        <button class="btn-ghost" onclick="closeConnectionModal()">Connect another app</button>
        <button class="btn-primary" onclick="closeConnectionModal()">
          Build an agent with these tools
          <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" style="margin-left: 8px;">
            <path d="M16 8l-1.43 1.393L20.15 15H8v2h12.15l-5.58 5.573L16 24l8-8-8-8z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

// Confetti animation
function createConfetti() {
  const colors = ["#0f62fe", "#24a148", "#8a3ffc", "#ff832b"];
  const confettiCount = 50;
  const container = document.querySelector(".connection-modal");

  if (!container) return;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
    container.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

// Open tool chat panel
window.openToolChat = function (toolName, toolDescription) {
  const appName = currentConnection ? currentConnection.name : "App";
  const modalContent = document.getElementById("connectionModalContent");

  // Add chat panel to the modal
  const existingPanel = document.querySelector(".tool-chat-panel");
  if (existingPanel) {
    existingPanel.remove();
  }

  const chatPanel = document.createElement("div");
  chatPanel.className = "tool-chat-panel";
  chatPanel.innerHTML = `
    <div class="tool-chat-header">
      <div class="tool-chat-title">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
          <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
        </svg>
        <span>${appName} tool preview</span>
      </div>
      <button class="tool-chat-close" onclick="closeToolChat()">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
          <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"/>
        </svg>
      </button>
    </div>
    
    <div class="tool-chat-content">
      <div class="tool-chat-message ai-message">
        <div class="message-avatar">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
          </svg>
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-source">${appName} tool</span>
            <span class="message-time">12:46</span>
          </div>
          <div class="message-text">
            <strong>${toolName}</strong><br/>
            ${toolDescription}<br/><br/>
            Hello! Try asking these things:
          </div>
          <div class="message-actions">
            <button class="quick-action-btn" onclick="handleQuickAction(this, 'Who are my top customers?')">"Who are my top customers?"</button>
            <button class="quick-action-btn">"Show me recent deals"</button>
            <button class="quick-action-btn">"Create a new contact"</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="tool-chat-input">
      <input type="text" placeholder="Type something..." />
      <button class="send-btn">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
          <path d="M27.71 4.29a1 1 0 00-1.05-.23l-22 8a1 1 0 000 1.87l8.59 3.43L19.59 11 14 16.41l3.44 8.59a1 1 0 001.87 0l8-22a1 1 0 00-.6-1.71z"/>
        </svg>
      </button>
    </div>
  `;

  modalContent.parentElement.appendChild(chatPanel);

  // Animate panel in
  setTimeout(() => {
    chatPanel.classList.add("open");
  }, 10);
};

// Handle quick action button click
window.handleQuickAction = function (button, question) {
  const appName = currentConnection ? currentConnection.name : "App";
  const chatContent = document.querySelector(".tool-chat-content");

  if (!chatContent) return;

  // Disable the button
  button.disabled = true;
  button.style.opacity = "0.5";

  // Add user message
  const userMessage = document.createElement("div");
  userMessage.className = "tool-chat-message user-message";
  userMessage.innerHTML = `
    <div class="message-content user-content">
      <div class="message-bubble">${question}</div>
    </div>
  `;
  chatContent.appendChild(userMessage);

  // Scroll to bottom
  chatContent.scrollTop = chatContent.scrollHeight;

  // Show typing indicator
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "tool-chat-message ai-message typing-indicator";
  typingIndicator.innerHTML = `
    <div class="message-avatar">
      <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
      </svg>
    </div>
    <div class="message-content">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  chatContent.appendChild(typingIndicator);
  chatContent.scrollTop = chatContent.scrollHeight;

  // Simulate AI response after 1.5 seconds
  setTimeout(() => {
    typingIndicator.remove();

    const aiResponse = document.createElement("div");
    aiResponse.className = "tool-chat-message ai-message";
    aiResponse.innerHTML = `
      <div class="message-avatar">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
        </svg>
      </div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-source">${appName} tool</span>
          <span class="message-time">12:47</span>
        </div>
        <div class="message-text">
          Here is a list of clients with more than 1 million employees:
        </div>
        <div class="response-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Revenue</th>
                <th>Employee count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Walmart</td>
                <td>USD 648 billion</td>
                <td>2.1 million</td>
              </tr>
              <tr>
                <td>Amazon</td>
                <td>USD 575 billion</td>
                <td>1.5 million</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
    chatContent.appendChild(aiResponse);
    chatContent.scrollTop = chatContent.scrollHeight;
  }, 1500);
};

// Close tool chat panel
window.closeToolChat = function () {
  const chatPanel = document.querySelector(".tool-chat-panel");
  if (chatPanel) {
    chatPanel.classList.remove("open");
    setTimeout(() => {
      chatPanel.remove();
    }, 300);
  }
};

// Navigate to previous step (back to connection selection)
window.showConnectionSelection = function () {
  showConnectionModal(selectedDomain);
};

// Close connection modal
window.closeConnectionModal = function () {
  const modal = document.getElementById("connectionModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

// Navigate to a specific step
window.navigateToStep = function (step) {
  if (step >= 1 && step <= 3) {
    renderConnectionStep(step);
  }
};

// Scroll to a specific step section
window.scrollToStep = function (stepNumber) {
  const stepSection = document.getElementById(`step-section-${stepNumber}`);
  if (stepSection) {
    stepSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Toggle SSO
window.toggleSSO = function (enabled) {
  const toggleStatus = document.querySelector(
    "#ssoToggle + .toggle-slider + .toggle-status",
  );
  if (toggleStatus) {
    toggleStatus.textContent = enabled ? "On" : "Off";
  }
};

// Toggle live environment fields
window.toggleLiveEnvironment = function (sameAsDraft) {
  const liveFields = document.getElementById("liveEnvironmentFields");
  if (liveFields) {
    liveFields.style.display = sameAsDraft ? "none" : "block";
  }
};

// Auto-generate connection ID from display name
window.updateConnectionId = function (displayName) {
  const connectionIdInput = document.getElementById("connectionId");
  const saveBtn = document.getElementById("saveAndContinueBtn");

  if (!displayName || displayName.trim() === "") {
    connectionIdInput.value = "";
    saveBtn.disabled = true;
    return;
  }

  // Convert display name to valid connection ID
  // Replace spaces with hyphens, remove special characters, convert to lowercase
  const connectionId = displayName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  connectionIdInput.value = connectionId;

  // Enable save button if connection ID is valid
  saveBtn.disabled = connectionId.length === 0;
};

// New function to update connection ID from name input
window.updateConnectionIdFromName = function (displayName) {
  const connectionIdInput = document.getElementById("connectionId");
  const subdomainInput = document.getElementById("subdomain");
  const subdomainLiveInput = document.getElementById("subdomainLive");

  if (!displayName || displayName.trim() === "") {
    connectionIdInput.value = "";
    return;
  }

  // Convert display name to valid connection ID
  // Replace spaces with hyphens, remove special characters, convert to lowercase
  const connectionId = displayName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  connectionIdInput.value = connectionId;

  // Update subdomain dynamically based on the app name
  const subdomain = getSubdomainForApp(displayName);
  if (subdomainInput) {
    subdomainInput.value = subdomain;
  }
  if (subdomainLiveInput) {
    subdomainLiveInput.value = subdomain;
  }
};

// Function to get subdomain based on app
window.getSubdomainForApp = function (appName) {
  const subdomainMap = {
    Zendesk: "companyname.zendesk.com",
    Salesforce: "companyname.salesforce.com",
    ServiceNow: "companyname.service-now.com",
    Jira: "companyname.atlassian.net",
    Slack: "companyname.slack.com",
    "Microsoft Teams": "companyname.teams.microsoft.com",
    HubSpot: "companyname.hubspot.com",
    Intercom: "companyname.intercom.com",
  };

  return subdomainMap[appName] || "companyname.example.com";
};

// Go back to connection selection
window.showConnectionSelection = function () {
  // Reset modal title
  const modalTitle = document.getElementById("connectionModalTitle");
  const modalSubtitle = document.querySelector(".connection-header p");

  modalTitle.textContent = "Connect your first app";
  if (modalSubtitle) {
    modalSubtitle.textContent = "";
  }

  // Re-render the connection selection modal
  showConnectionModal();
};

// Save connection details and proceed
window.saveConnectionDetails = function () {
  const displayName = document.getElementById("displayName").value;
  const connectionId = document.getElementById("connectionId").value;

  console.log("Saving connection details:", { displayName, connectionId });

  // TODO: Proceed to next step (Configure draft environment)
  alert(
    `Connection details saved!\n\nDisplay Name: ${displayName || connectionId}\nConnection ID: ${connectionId}\n\nNext: Configure draft environment`,
  );
};

window.toggleConnectionHelp = function () {
  const helpPanel = document.getElementById("connectionHelpPanel");
  const mainContent = document.getElementById("connectionMainContent");

  if (helpPanel.style.display === "none") {
    helpPanel.style.display = "block";
    mainContent.style.marginLeft = "416px";
  } else {
    helpPanel.style.display = "none";
    mainContent.style.marginLeft = "0";
  }
};

window.closeConnectionModal = function () {
  const modal = document.getElementById("connectionModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
    selectedConnectionId = null;
  }
};

// Made with Bob

// Page Header Toggle Function
function togglePageHeader() {
  const pageHeader = document.getElementById("pageHeader");
  pageHeader.classList.toggle("collapsed");
  pageHeader.classList.toggle("expanded");
}

function toggleChatPanel() {
  const chatPanel = document.getElementById("aiChatPanel");
  if (!chatPanel) return;

  chatPanel.classList.toggle("chat-panel-hidden");
}

function toggleNavDrawer() {
  const drawer = document.getElementById("navDrawer");
  const overlay = document.getElementById("navDrawerOverlay");
  const hamburger = document.getElementById("hamburgerMenu");
  if (!drawer || !overlay || !hamburger) return;

  const isOpen = drawer.classList.toggle("open");
  overlay.classList.toggle("open", isOpen);
  drawer.setAttribute("aria-hidden", String(!isOpen));
  hamburger.setAttribute("aria-expanded", String(isOpen));
}

function openNavDrawer() {
  const drawer = document.getElementById("navDrawer");
  const overlay = document.getElementById("navDrawerOverlay");
  const hamburger = document.getElementById("hamburgerMenu");
  if (!drawer || !overlay || !hamburger) return;

  drawer.classList.add("open");
  overlay.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  hamburger.setAttribute("aria-expanded", "true");
}

function closeNavDrawer() {
  const drawer = document.getElementById("navDrawer");
  const overlay = document.getElementById("navDrawerOverlay");
  const hamburger = document.getElementById("hamburgerMenu");
  if (!drawer || !overlay || !hamburger) return;

  drawer.classList.remove("open");
  overlay.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  hamburger.setAttribute("aria-expanded", "false");
}

function openChatPanelFromDrawer() {
  const chatPanel = document.getElementById("aiChatPanel");
  if (chatPanel) {
    chatPanel.classList.remove("chat-panel-hidden");
  }

  closeNavDrawer();
}

function appendUserChatMessage(message) {
  const chatMessages = document.getElementById("chatMessages");
  if (!chatMessages) return;

  const userMessage = document.createElement("div");
  userMessage.className = "chat-message user-message";
  userMessage.innerHTML = `
    <div class="chat-avatar">v</div>
    <div class="chat-content">
      <div class="chat-source">You</div>
      <div class="chat-text">${message}</div>
    </div>
  `;
  chatMessages.appendChild(userMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendAgentChatMessage(message, options = []) {
  const chatMessages = document.getElementById("chatMessages");
  if (!chatMessages) return;

  const optionsMarkup = options.length
    ? `
      <div class="chat-inline-options">
        ${options
          .map(
            (option) => `
              <button class="chat-inline-option" onclick="${option.action}">
                ${option.label}
              </button>
            `,
          )
          .join("")}
      </div>
    `
    : "";

  const aiMessage = document.createElement("div");
  aiMessage.className = "chat-message";
  aiMessage.innerHTML = `
    <div class="chat-avatar" aria-hidden="true">
      <img src="icons/wxo.svg" alt="" />
    </div>
    <div class="chat-content">
      <div class="chat-source">watsonx</div>
      <div class="chat-text">${message}</div>
      ${optionsMarkup}
    </div>
  `;
  chatMessages.appendChild(aiMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function startSetupConnectionsFlow() {
  chatConnectionFlow = { step: "domain" };
  appendAgentChatMessage(
    "Absolutely — I can help you get your connections set up. To recommend the right apps and configuration, what domain are you planning to build agents for?",
    [
      {
        label: "Customer care",
        action: "selectChatConnectionDomain('customercare', 'Customer care')",
      },
      {
        label: "Procurement",
        action: "selectChatConnectionDomain('procurement', 'Procurement')",
      },
      {
        label: "Custom",
        action: "selectChatConnectionDomain('custom', 'Custom')",
      },
    ],
  );
}

function handleChatSuggestion(suggestion) {
  const chatInput = document.getElementById("chatInput");
  if (chatInput) {
    chatInput.value = suggestion;
  }

  appendUserChatMessage(suggestion);

  if (suggestion === "Setup connections") {
    startSetupConnectionsFlow();
    return;
  }

  setTimeout(() => {
    appendAgentChatMessage(
      `I understand you're asking about: "${suggestion}". This is a prototype, so I can't provide a real response yet, but in the full version I would help you with this specific question based on your role and context.`,
    );
  }, 500);
}

function selectChatConnectionDomain(domainKey, domainLabel) {
  selectedDomain = domainKey;
  chatConnectionFlow = { step: "industry", domain: domainKey };

  appendUserChatMessage(domainLabel);
  appendAgentChatMessage(
    "Got it. Which industry best matches the agents you want to create?",
    [
      {
        label: "Retail",
        action: "selectChatConnectionIndustry('retail', 'Retail')",
      },
      {
        label: "Banking",
        action: "selectChatConnectionIndustry('banking', 'Banking')",
      },
      {
        label: "Technology",
        action: "selectChatConnectionIndustry('technology', 'Technology')",
      },
    ],
  );
}

function selectChatConnectionIndustry(industryKey, industryLabel) {
  selectedIndustry = industryKey;
  appendUserChatMessage(industryLabel);
  appendAgentChatMessage(
    `Great — that gives me enough context to tailor the setup. I’ll use <strong>${industryLabel}</strong> as your industry context and get your connection flow ready next.`,
    [
      {
        label: "Open connection setup",
        action: "openConnectionSetupFromChat()",
      },
    ],
  );
}

function openConnectionSetupFromChat() {
  appendUserChatMessage("Open connection setup");
  appendAgentChatMessage(
    "Opening the connections page and taking you into the setup flow now.",
  );
  showConnectionSettingsPage(true);
}
