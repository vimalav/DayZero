# Persona-Based Onboarding Specification

## Overview

After selecting their role, each persona lands on a customized experience tailored to their specific needs and workflows.

---

## 🔨 BUILDER Persona Landing Experience

### What They See After Selection:

**Hero Section:**

```
Welcome back, [Name]! 🔨
Let's build something amazing today
```

**Primary Action Cards (4 cards):**

1. **Create Agent from Template** ⭐ FEATURED
   - Description: "Start with proven Client Zero patterns: Ask HR, Ask IT, or Ask Procurement"
   - Time: ⏱️ 10-15 min
   - Level: 📊 Beginner
   - Tag: 🎯 Client Zero
   - CTA: "Choose Template"

2. **Explore Agent Catalog**
   - Description: "Browse 300+ pre-built agents ready to deploy"
   - Time: ⏱️ 2-5 min
   - Level: 📊 All levels
   - Tag: 🔍 Discovery
   - CTA: "Browse Catalog"

3. **Build from Scratch**
   - Description: "Create a custom agent with full control over tools, knowledge, and behavior"
   - Time: ⏱️ 30-45 min
   - Level: 📊 Advanced
   - Tag: 🛠️ Custom
   - CTA: "Start Building"

4. **Import External Agent**
   - Description: "Bring agents from other platforms and add governance & monitoring"
   - Time: ⏱️ 15-20 min
   - Level: 📊 Intermediate
   - Tag: 🔗 Integration
   - CTA: "Import Agent"

**Left Sidebar: AI Assistant**

- Control Plane Agent available for contextual help
- Suggestions:
  - "What's the fastest way to get started?"
  - "Show me Client Zero templates"
  - "How do I connect to ServiceNow?"

**Info Banners:**

- 🟡 "Need connections? Work with your admin to set up ServiceNow, Salesforce, or SAP credentials"
- 🔵 "After creating your first agent, you'll see real-time analytics here"

**Quick Start Guide (4 steps):**

1. Choose a Client Zero template
2. Set up connections (if needed)
3. Configure & test
4. Deploy & monitor

**Hidden from Builders:**

- ❌ Connection management UI
- ❌ Model configuration
- ❌ User access controls
- ❌ Platform-wide analytics

---

## ⚙️ ADMIN Persona Landing Experience

### What They See After Selection:

**Hero Section:**

```
Platform Overview ⚙️
Manage connections, models, and team access
```

**Primary Action Cards (4 cards):**

1. **Manage Connections** ⭐ FEATURED
   - Description: "Set up and maintain integrations with ServiceNow, Salesforce, SAP, and other systems"
   - Time: ⏱️ 5-10 min per connection
   - Level: 📊 Admin
   - Tag: 🔗 Integration
   - CTA: "View Connections"

2. **Configure Models**
   - Description: "Add AI models and set usage policies for your organization"
   - Time: ⏱️ 10-15 min
   - Level: 📊 Admin
   - Tag: 🤖 AI Models
   - CTA: "Manage Models"

3. **User Access & Roles**
   - Description: "Invite users, assign roles (Admin/Builder/SME), and manage permissions"
   - Time: ⏱️ 5 min per user
   - Level: 📊 Admin
   - Tag: 👥 RBAC
   - CTA: "Manage Users"

4. **Platform Analytics**
   - Description: "Monitor usage, performance, costs, and compliance across all agents"
   - Time: ⏱️ Ongoing
   - Level: 📊 Admin
   - Tag: 📊 Monitoring
   - CTA: "View Analytics"

**Dashboard Widgets (Visible immediately):**

- **Active Connections:** 12 connected, 3 need attention
- **Model Usage:** Granite 45%, GPT-4 30%, Claude 25%
- **User Activity:** 47 active users this week
- **Agent Status:** 23 deployed, 8 in testing, 5 draft

**Left Sidebar: Admin Tools**

- Quick actions:
  - "Add new connection"
  - "Invite user"
  - "View audit logs"
  - "Configure policies"

**Info Banners:**

- 🟡 "3 connections need credential renewal - ServiceNow, Salesforce, SAP"
- 🔵 "New model available: Granite 3.1 - Configure now"

**Quick Start Guide (4 steps):**

1. Set up enterprise connections
2. Configure AI models & policies
3. Invite team members & assign roles
4. Monitor platform health

**Hidden from Admins:**

- ❌ Agent building UI (they can view, not build)
- ❌ Template selection
- ❌ Agent testing interface

---

## 💡 SME (Subject Matter Expert) Persona Landing Experience

### What They See After Selection:

**Hero Section:**

```
Your Agents to Review 💡
Help improve agents with your domain expertise
```

**Primary Action Cards (4 cards):**

1. **Agents Awaiting Review** ⭐ FEATURED
   - Description: "3 agents need your validation: Ask HR v2, Benefits Bot, Onboarding Assistant"
   - Time: ⏱️ 15-20 min per agent
   - Level: 📊 SME
   - Tag: ✅ Review
   - CTA: "Start Review"

2. **Test Agent Responses**
   - Description: "Run test queries and evaluate response quality for accuracy"
   - Time: ⏱️ 10-15 min
   - Level: 📊 SME
   - Tag: 🧪 Testing
   - CTA: "Test Agents"

3. **Knowledge Base Review**
   - Description: "Review and improve domain-specific knowledge for your department"
   - Time: ⏱️ 20-30 min
   - Level: 📊 SME
   - Tag: 📚 Knowledge
   - CTA: "Review Knowledge"

4. **Provide Feedback**
   - Description: "Share insights with builders on agent improvements and edge cases"
   - Time: ⏱️ 5-10 min
   - Level: 📊 SME
   - Tag: 💬 Collaboration
   - CTA: "Give Feedback"

**Dashboard Widgets:**

- **Pending Reviews:** 3 agents waiting
- **Your Feedback:** 12 suggestions implemented
- **Test Results:** 87% accuracy on last review
- **Active Collaborations:** Working with 4 builders

**Left Sidebar: Review Tools**

- Quick actions:
  - "View assigned agents"
  - "Run test scenarios"
  - "Submit feedback"
  - "Chat with builder"

**Info Banners:**

- 🟡 "Ask HR v2 needs your review by Friday - Builder: Sarah Chen"
- 🔵 "Your feedback on Benefits Bot was implemented - Test the updates"

**Quick Start Guide (4 steps):**

1. Review assigned agents
2. Test with real-world scenarios
3. Provide detailed feedback
4. Validate improvements

**Hidden from SMEs:**

- ❌ Agent creation UI
- ❌ Connection management
- ❌ Model configuration
- ❌ User management

---

## Navigation & Switching

### Header (All Personas)

```
[IBM watsonx Orchestrate]  [Role Badge: 🔨 Builder]  [Switch Role ▼]  [Profile]
```

**Switch Role Dropdown:**

- Current: 🔨 Builder ✓
- Switch to: ⚙️ Admin
- Switch to: 💡 SME
- Settings

### Persistent Elements (All Personas)

- AI Assistant (left sidebar) - Adapts responses to persona
- Header navigation
- Search
- Notifications

---

## Key Differences Summary

| Feature            | Builder              | Admin                | SME                    |
| ------------------ | -------------------- | -------------------- | ---------------------- |
| **Primary Focus**  | Create agents        | Manage platform      | Validate agents        |
| **First Action**   | Choose template      | Set up connections   | Review assigned agents |
| **Dashboard**      | Agent creation tools | Platform analytics   | Review queue           |
| **Permissions**    | Build & deploy       | Full platform access | Test & feedback only   |
| **Time to Value**  | 10-15 min            | 30-45 min (setup)    | 15-20 min (per review) |
| **Success Metric** | Agent deployed       | Platform configured  | Feedback provided      |

---

## Implementation Notes

### Routing Logic

```javascript
if (persona === "builder") {
  showBuilderDashboard();
  hideAdminTools();
  hideSMEReviewQueue();
} else if (persona === "admin") {
  showAdminDashboard();
  hideBuilderTemplates();
  hideSMEReviewQueue();
} else if (persona === "sme") {
  showSMEDashboard();
  hideBuilderTemplates();
  hideAdminTools();
}
```

### Data Persistence

- Store selected persona in user profile
- Remember choice across sessions
- Allow switching via header dropdown
- Track persona usage analytics

### Progressive Disclosure

- Start with persona-specific essentials
- Reveal advanced features as needed
- Provide "Learn more" links to full capabilities
- Allow temporary access to other persona views (read-only)

---

## Research Alignment

✅ **Joseph's RBAC feedback** - Separate admin vs. builder experiences
✅ **Cameron's Client Zero emphasis** - Featured for builders
✅ **Dana's analytics focus** - Prominent for admins
✅ **Richard's orchestrator agent visibility** - Clear in all views
✅ **Time-to-value targets** - 10-15 min for builders, clear for all

---

## Next Steps

1. Build full HTML prototypes for each persona landing page
2. User test with actual admins, builders, and SMEs
3. Refine action cards based on feedback
4. Implement role-based routing
5. Add persona switching capability
