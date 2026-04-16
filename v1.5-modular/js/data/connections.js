// Domain-Specific OOTB Connections
export const domainConnections = {
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

// Helper function to get subdomain for app
export function getSubdomainForApp(appName) {
  const subdomainMap = {
    Zendesk: "companyname.zendesk.com",
    Salesforce: "companyname.salesforce.com",
    "Salesforce Service Cloud": "companyname.salesforce.com",
    ServiceNow: "companyname.service-now.com",
    "Genesys Cloud": "companyname.mypurecloud.com",
    "SAP Ariba": "companyname.ariba.com",
    Coupa: "companyname.coupahost.com",
    "Oracle Procurement": "companyname.oraclecloud.com",
  };
  return subdomainMap[appName] || "your-instance.example.com";
}

// Made with Bob
