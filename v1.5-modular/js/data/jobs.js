// Jobs-First Data Structure - Customer Care Domain
export const customerCareJobs = {
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
      compact: {
        topMetrics: [
          { icon: "📊", label: "Deflection", value: "65%" },
          { icon: "⏱️", label: "Response", value: "Instant" },
          { icon: "💰", label: "Saved/year", value: "$75K" },
        ],
        proofLine: "Acme Corp: 68% reduction in 30 days",
      },
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
      meta: ["⏱️ 15 min", "🎯 Customer Care"],
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
      meta: ["⏱️ 10 min", "🎯 Customer Care"],
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
      meta: ["⏱️ 20 min", "🔗 Integration"],
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
      meta: ["⏱️ 30 min", "✓ Quality"],
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

// Made with Bob
