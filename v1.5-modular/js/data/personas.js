// Persona content data
export const personaContent = {
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
      title: "💡 Getting Started",
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

// Made with Bob
