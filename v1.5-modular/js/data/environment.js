// Environment Education Content
export const environmentEducation = {
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

// Made with Bob
