# watsonx Orchestrate User Research Analysis Report

**Date:** April 7, 2026  
**Research Focus:** Landing Page & Onboarding Experience  
**Participants:** 3 interviews with Client Engineering team members and Account Technical Leaders

---

## Executive Summary

Four user research interviews were conducted to evaluate the watsonx Orchestrate landing page and day-zero onboarding experience. The research revealed critical insights about user needs, pain points, and opportunities for improvement. Key findings indicate that **integration challenges** and **time to value** are the most significant barriers, with users requiring 10-30 minutes to understand product value (target: under 5-10 minutes). A new critical insight from experienced users emphasizes the need for **issue-first dashboards** that prioritize critical problems over general analytics.

---

## Interview Participants

| Interview | Participant(s)                             | Role                     | Duration              |
| --------- | ------------------------------------------ | ------------------------ | --------------------- |
| 1         | Cameron Seitz, Joseph Kozhaya, Ankitha T C | Client Engineering       | 59 minutes            |
| 2         | Richard Shannon                            | Account Technical Leader | ~44 minutes (excerpt) |
| 3         | Dana Abu Ali                               | User                     | 42 minutes            |
| 4         | Sai Bezawada                               | Technology Sales Leader  | ~51 minutes (excerpt) |

---

## Key Findings

### 1. 🚀 Onboarding & First-Time User Experience

#### Pain Points

- Users struggle to understand Orchestrate's capabilities quickly
- Current "chat with documents" examples feel outdated and don't showcase agentic AI capabilities
- Confusion between similar options: "Create my first agent" vs "Guide me to create an agent"
- Time to preview an agent is too long
- Landing page has too many options (4 tiles) causing decision paralysis

#### Positive Feedback

- Simplified, streamlined approach is appreciated (Dana)
- Control plane view with analytics at the center is valuable for frequent users
- Users like the concept of reducing complexity

#### User Quote

> "I like this, honestly... I always found that orchestrates in the current orchestrate, the AI chat part is very confusing... I feel like this is more streamlined." - Dana Abu Ali

---

### 2. 🔌 Integration Challenges (Critical Issue)

#### The #1 Pain Point

**Connections to external systems** is the most significant barrier users face:

- ServiceNow, Salesforce, SAP, Workday, Milvus integrations
- Unclear ownership: Who creates connections (admin vs AI engineer)?
- No RBAC separation causes role confusion
- AI engineers often lack credentials to create connections themselves

#### Impact

When AI engineers can't create connections, they're completely blocked from building agents that integrate with backend systems.

#### User Quote

> "The AI engineer typically does not have the credentials to connect to the back end systems... they're stuck. They can't do anything right." - Joseph Kozhaya

#### Recommendations

- Clarify connection workflow and admin vs builder roles
- Provide visibility into existing connections
- Create integration cookbooks for common systems
- Consider connection templates or guided setup

---

### 3. ⚙️ Agent Configuration Complexity

#### Key Issues

Users don't understand the differences between:

- **Instructions** vs **Guardrails** vs **Behavior**
- Various configuration options and their purposes
- When to use each configuration element

#### Documentation Gap

- Documentation exists but users don't read it
- Need contextual, step-by-step guidance
- Require examples for each configuration element

#### User Quote

> "What's the difference between instructions and guardrails? It's still not clear to me." - Joseph Kozhaya

#### Recommendations

- Provide in-context tooltips and examples
- Create interactive tutorials for configuration
- Add "why this matters" explanations for each field
- Show impact of different configurations

---

### 4. 🎯 Use Case Clarity & Examples

#### Current Problems

- "Chat with documents" is seen as old news, not agentic AI
- Invoice extractor is too specific
- Examples don't showcase Orchestrate's full capabilities
- Missing multi-agent orchestration examples

#### What Resonates with Users

**Client Zero Patterns:**

- Ask HR
- Ask IT
- Ask Procurement

These domain-specific examples help users immediately understand value and applicability.

#### User Quote

> "A lot of clients resonate with the client 0 strategy... they see a demo and ask procurement, ask HR and they kind of get it." - Cameron Seitz

#### Recommendations

- Replace RAG examples with Client Zero patterns
- Change "invoice extractor" to "document processing"
- Add multi-agent system examples
- Show integration-heavy use cases
- Include estimated time and complexity level for each example

---

### 5. 🧭 Navigation & Information Architecture

#### Issues Identified

**Richard's Feedback:**

> "This is more focused on administration and not what your agents are."

**Dana's Question:**

> "How do I create from scratch or go to catalog if I'm a frequent user?"

#### Problems

- Hard to find and access orchestrator agents for updates
- Need quicker access to agent list
- Current view prioritizes admin functions over agent building
- Frequent users need faster paths to common actions

#### Analytics Section Placement

- **Relevant for:** Admins, not AI engineers
- **Should not be prominent** on day-zero experience
- **More appropriate for:** Day-30+ users who have built agents

#### Recommendations

- Prioritize agent building over administration
- Add quick access to agent list
- Consider persistent navigation for frequent actions
- Separate admin and builder views
- **NEW:** Implement issue-first dashboard for experienced users (see Finding #11)

---

### 6. 👥 Role-Based Access Control (RBAC) Gap

#### Critical Gap

- No separation between admin and AI engineer personas
- Everyone sees everything, causing confusion
- Different personas have different needs and workflows

#### Persona Needs

| Persona         | Primary Tasks                                           | Key Needs                                                    |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| **Admin**       | Connections, models, analytics, credentials, governance | System health, usage metrics, credential management          |
| **AI Engineer** | Building agents, testing, integrations, configuration   | Quick agent creation, integration tools, testing environment |
| **Beginner**    | Learning, exploring, first agent                        | Tutorials, templates, guided experiences, examples           |

#### Recommendations

- Implement RBAC with persona-based landing pages
- Ask user role on first login
- Tailor experience based on role and skill level
- Allow role switching for users with multiple responsibilities

---

### 7. 📚 Documentation & Help

#### Current Issues

- "Ask Documentation" tile takes valuable landing page space
- Documentation should be contextual, not a primary action
- Users don't proactively seek documentation

#### Innovative Solution in Progress

Team is building a multi-agent help system:

1. **Ask Docs** - IBM documentation integration
2. **Ask Lab Guide** - Use case guides and tutorials
3. **Best Practices Agent** - Building guidance

#### Recommendations

- Move documentation to contextual help (icon or bottom-right agent)
- Implement the multi-agent help system
- Provide in-context help throughout the product
- Create video tutorials for complex workflows

---

### 8. 💡 Landing Page Redesign Suggestions

#### Consolidation Proposal

**Merge similar options from 4 tiles to 2-3 main actions:**

1. **Create/Build Agent**
   - Include template options
   - Show Client Zero patterns
   - Provide guided vs from-scratch paths
   - Display estimated time and complexity

2. **Explore Agent Catalog**
   - Pre-built agents
   - Domain agents
   - Integration-specific agents
   - Filter by use case

3. **Bring My Own Agent** (NEW)
   - External agent integration
   - Governance and evaluation
   - Multi-platform support

#### Experience Personalization

**On first login, ask:**

- Familiarity level with agentic AI (1-5 scale)
- Primary role (Admin, Builder, Tester)
- Coding preference (No-code, Low-code, Pro-code)

**Then show:**

- Estimated time for each option
- Complexity indicators (Beginner/Medium/Advanced)
- Personalized recommendations
- Relevant tutorials

#### User Quote

> "Maybe we could even do like when you first get on the page you give like a rating one to five how familiar you are with agentic tools or AI and then you know if someone gives A1... maybe don't show that option or show a more advanced option." - Cameron Seitz

---

### 9. ⏱️ Time to Value

#### Current State

- Users estimate **10-30 minutes** to understand Orchestrate's value
- Too long for effective onboarding
- Users want to preview agents quickly

#### Target State

- **Under 5-10 minutes** to see value
- Quick path to agent preview
- Immediate understanding of capabilities

#### What Works

> "The main thing was the ease of building, right? It is easy to build an agent in a few clicks and you have something that seems to work." - Joseph Kozhaya

#### Recommendations

- Streamline path to first agent preview
- Provide pre-configured examples that work immediately
- Show value before requiring configuration
- Use progressive disclosure for advanced features

---

### 10. 🎯 Governance & Evaluation (Emerging Need)

#### New Opportunity

**"Evaluate my agent"** should be a primary action because:

- Users struggle with agent performance tuning
- Governance is a key differentiator for Orchestrate
- Many users have existing agents needing evaluation
- Testing and validation are major pain points

#### User Quote

> "Another key big item is evaluate my agent, right? Create my agent, explore the catalog, but create, evaluate my agent... that's a big blocker for a lot of people because it's easy to build, it's hard to govern." - Joseph Kozhaya

#### Recommendations

- Add "Evaluate Agent" as a primary landing page action
- Provide governance tools upfront
- Show evaluation capabilities early
- Create evaluation templates and best practices

---

## Prioritized Recommendations

### 🔴 Immediate Actions (Next Sprint)

1. **Simplify landing page** - Reduce from 4 to 2-3 main options
2. **Replace RAG examples** with Client Zero patterns (Ask HR, Ask IT, Ask Procurement)
3. **Add time estimates** and complexity indicators to all options
4. **Move documentation** to contextual help (remove from main tiles)
5. **Clarify connection workflow** - Document admin vs builder roles

### 🟡 Medium-term (Next Quarter)

1. **Implement skill-level assessment** on first login
2. **Create integration cookbooks** for common systems (Milvus, ServiceNow, Salesforce)
3. **Build guided tutorials** with click-throughs and videos
4. **Add "Bring My Own Agent"** option for external agent integration
5. **Add "Evaluate Agent"** as primary action
6. **Improve agent list navigation** for frequent users

### 🟢 Long-term (6-12 Months)

1. **Full RBAC implementation** with persona-based landing pages
2. **Deploy embedded help agent** trained on lab guides and documentation
3. **Implement workspace segregation** for team collaboration
4. **Enhanced analytics dashboard** with role-specific views
5. **Advanced governance tools** for agent evaluation and monitoring
6. **Issue-first dashboard** for experienced users with critical problem prioritization

---

## New Finding from Interview 4: Sai Bezawada

### 11. 🚨 Issue-First Dashboard for Experienced Users (Critical)

#### Key Insight

Experienced users (Technology Sales Leaders, Account Managers) need a fundamentally different landing experience focused on **critical issues** rather than general analytics or agent building.

#### User Persona: Experienced Administrator/Manager

**Role:** Technology Sales Leader supporting enterprise clients (e.g., Elevance Health)
**Primary Goal:** Monitor agent fleet health and quickly address critical issues impacting clients
**Daily Workflow:** Check system status, identify failures, take immediate action on high-priority problems

#### Pain Points with Current Design

1. **Analytics placement is good, but content priority is wrong**
   - Current dashboard shows general metrics (model usage, policies)
   - Experienced users need **failure messages and critical issues first**
   - High failure rates and client impact should be immediately visible

2. **"Jump back in" section needs rethinking**
   - Shows recent agents (customer service agent, sales agent)
   - Should show **critical issues requiring attention** instead
   - Quick starters are less relevant for experienced users

3. **Missing: Control Plane Agent concept**
   - Need a chat interface that acts as "control plane agent"
   - Should summarize fleet health, explain errors, and guide issue resolution
   - Example: "Welcome to Watson X orchestrate. I'm your control plane agent. Let me summarise the fleet health, explain errors, issues..."

#### User Quotes

> "I still like the one on the left side to give some type of chat interface where you say, welcome to Watson X orchestrate. I'm your control plane agent. Let me summarise the fleet health explain errors, issues." - Sai Bezawada

> "I want to know what my high failure rates are, right? Where my client's impact is. So that's what I would have want to see first when I popped it. What are my critical issues?" - Sai Bezawada

> "When I log back in, I want to see, as an experienced user, I want to see where my issues are." - Sai Bezawada

> "If customer support is an issue, I want to be able to start taking action on it." - Sai Bezawada

#### Recommended Dashboard Structure for Experienced Users

**Priority 1: Critical Issues Section (Top)**

- Failed messages count with severity indicators
- High failure rate agents highlighted
- Client impact assessment
- Direct action buttons for each issue

**Priority 2: Control Plane Agent (Left Sidebar)**

- AI-powered chat interface
- Fleet health summary
- Error explanation and troubleshooting
- Guided issue resolution

**Priority 3: Quick Actions**

- "Build a new agent" should still be accessible
- But not prioritized over issue management
- Include in quick starters, not as primary action

**Priority 4: Analytics (Lower Priority)**

- Model usage, policies, and general metrics
- Still valuable but not the first thing shown
- Accessible but not prominent

#### Navigation Improvements

**Categories Organization:**

- Agents, Models, and Policies should be clearly separated
- Need better visual hierarchy to distinguish categories
- Consider tabbed interface or clearer section breaks

**Quick Access:**

- Agent list should be easily accessible
- Filter by status (failing, healthy, warning)
- Sort by client impact or failure rate

#### Recommendations

**Immediate Actions:**

1. Create "Experienced User" mode with issue-first dashboard
2. Implement Control Plane Agent chat interface
3. Add critical issues section at top of dashboard
4. Reorganize "Jump back in" to show problematic agents, not recent ones

**Design Considerations:**

1. Ask user experience level on first login
2. Provide toggle between "Builder" and "Manager" views
3. Experienced users should see issues first, then analytics
4. New users should see getting started, then building tools

**Success Metrics:**

- Time to identify critical issue: Target < 30 seconds
- Time to take action on issue: Target < 2 minutes
- User satisfaction with issue visibility: Target > 4.5/5.0

#### Impact on Existing Findings

This finding reinforces:

- **Finding #6 (RBAC Gap):** Different personas need different landing experiences
- **Finding #5 (Navigation):** Analytics placement depends on user experience level
- **Finding #8 (Landing Page):** Need to personalize based on user role AND experience level

#### New User Journey for Experienced Users

1. **Login** → See critical issues dashboard immediately
2. **Identify** → High failure rate agents highlighted with client impact
3. **Investigate** → Click issue to see details and error logs
4. **Resolve** → Take action directly from dashboard (restart, reconfigure, escalate)
5. **Monitor** → Control plane agent provides ongoing fleet health updates

---

## Success Metrics

### Primary KPIs

- **Time to first agent preview:** Target < 5 minutes (currently 10-30 minutes)
- **Onboarding completion rate:** Target > 80%
- **User satisfaction score:** Target > 4.0/5.0
- **Connection setup success rate:** Track and improve

### Secondary Metrics

- Reduction in support tickets for onboarding
- Increase in self-service agent creation
- Improved documentation engagement
- Higher feature discovery rate

---

## Appendix: Key Quotes by Theme

### On Simplification

> "I like this, honestly... I always found that orchestrates in the current orchestrate, the AI chat part is very confusing... I feel like this is more streamlined." - Dana Abu Ali

### On Analytics Placement

> "Putting analytics at the heart of it is also a big part of it. Like, it's not just a sideline tab... once you're a frequent user, you see it as part of your daily work." - Dana Abu Ali

### On Agent Access

> "It seems to me in order to get to those agents, there's not a way to... this is more focused on administration and not what your agents are." - Richard Shannon

### On Integration Challenges

> "The AI engineer typically does not have the credentials to connect to the back end systems... they're stuck. They can't do anything right." - Joseph Kozhaya

### On Configuration Clarity

> "What's the difference between instructions and guardrails? It's still not clear to me." - Joseph Kozhaya

### On Use Cases

> "A lot of clients resonate with the client 0 strategy... they see a demo and ask procurement, ask HR and they kind of get it." - Cameron Seitz

### On Ease of Building

> "The main thing was the ease of building, right? It is easy to build an agent in a few clicks and you have something that seems to work." - Joseph Kozhaya

### On Governance

> "Another key big item is evaluate my agent... that's a big blocker for a lot of people because it's easy to build, it's hard to govern." - Joseph Kozhaya

### On Issue-First Dashboard (NEW)

> "I still like the one on the left side to give some type of chat interface where you say, welcome to Watson X orchestrate. I'm your control plane agent. Let me summarise the fleet health explain errors, issues." - Sai Bezawada

> "I want to know what my high failure rates are, right? Where my client's impact is. So that's what I would have want to see first when I popped it. What are my critical issues?" - Sai Bezawada

> "When I log back in, I want to see, as an experienced user, I want to see where my issues are." - Sai Bezawada

---

## Next Steps

1. **Share findings** with product and design teams
2. **Prioritize recommendations** based on impact and effort
3. **Create design mockups** for landing page redesign
4. **Develop integration cookbooks** for top 5 systems
5. **Plan RBAC implementation** roadmap
6. **Schedule follow-up research** to validate changes

---

**Report Prepared By:** UX Research Team
**Date:** April 10, 2026 (Updated with Interview 4 findings)
**Contact:** For questions or clarifications, please reach out to the research team.

---

## Revision History

- **April 7, 2026:** Initial report with 3 interviews
- **April 10, 2026:** Added Interview 4 (Sai Bezawada) - New Finding #11: Issue-First Dashboard for Experienced Users
