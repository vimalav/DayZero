# Stakeholder Feedback Analysis - Round 2

**Date:** April 9, 2026  
**Purpose:** Analyze stakeholder feedback on Day 0 onboarding directions and synthesize recommendations for v4.0

---

## 📋 Executive Summary

**Key Insight:** Strong consensus emerging for a **hybrid approach** combining AI-first conversational experience (Direction 1) with role-based structure (Direction 2), while deprioritizing analytics/assets in Day 0.

**Critical Finding:** Focus should be on **"Time to First Agent"** rather than product education, as users have already seen the product before Day 0.

---

## 🎯 Three Proposed Directions (from Slack)

### Direction 1: AI-First Path (Conversational)

- Leverage AI chat for tenant setup, Q&A, agent building via NL, chart generation
- **Goal:** High flexibility and "magic" UX

### Direction 2: Curated Funnel (Role-Based)

- Initial questionnaire → structured checklist by role
- **Goal:** Clarity, structure, clear path to value

### Direction 3: Educational Sandbox

- PLG via interactive tours, sample agents, template previews
- **Goal:** Low friction, "learning by doing"

---

## 💬 Stakeholder Feedback Analysis

### 1. Frances (Manager) - Hybrid Approach

**Key Quote:** "blend of direction 1 and 2, where we ask specifying questions and use the chat to curate the user's experience"

**Analysis:**

- ✅ Supports combining AI chat with structured guidance
- ✅ Recognizes need to balance chat vs. other engagement methods
- 🎯 **Recommendation:** Use chat as the primary interface but with structured flows underneath

---

### 2. Ronak (PM) - Data-Driven Insights

#### Critical Insights from User Research:

**A. First-Time Users Context**

> "First time users would have already seen the product. So, the goal shouldn't be helping them learn about the product but quickly get them started to an agent"

**Implication:**

- ❌ Remove educational/tour elements from Day 0
- ✅ Focus exclusively on "Time to First Agent"
- ✅ Assume product awareness, optimize for action

**B. Agent Creation - Use Chat!**

> "Scratch and Search Agent Catalog could be combined into Agentic Chat where you either build an agent through NL or Search through catalog"

**Current State:** 3 separate paths (Scratch, Search Catalog, Guided Build)  
**Proposed State:** Unified AI chat interface that:

- Builds agents via natural language
- Searches catalog to suggest existing agents
- Leads to Agent Builder (right or left panel)

**C. OOTB Agents - Need Context**

> "Document Processing Agent - Invoice Extractor as just an example"  
> "Provide tool tips to these OOTB agents journey to provide more context"

**Issues Identified:**

- Use cases appear too narrow without explanation
- Users don't know what to expect
- Client Zero use-cases should be highlighted as OOTB agents

**Solution:** Add tooltips and contextual examples to OOTB agents

**D. Analytics & Assets - NOT for Day 0**

> "Empty version of Analytics & Assets didn't make sense to many"  
> "Doesn't help them to first agent"; "Can't do anything with it"; "Raises more questions than answers"

**Critical Decision:**

- ❌ Remove Analytics & Assets from Day 0 experience
- ✅ Only show for Admin persona (if at all)
- ✅ Replace with "Needs Attention" items

**E. Lightweight Personalization - Deprioritize**

> "Knowing Persona and expertise in agent creation is definitely important but should be prioritized later when we bring in Customer Care specific journey"

**Implication:**

- Keep persona selection lightweight
- Don't over-invest in personalization for v4.0
- Focus on Customer Care journey later

**F. Major Blockers Identified**

1. **Setting up connections** - major blocker
2. **Instructions, guardrails, behavior** - still confusing for builders
3. **RBAC** - major concern for user addition

**Solution:** Address via "Needs Attention" in Day 0 rather than empty placeholders

---

### 3. Andy (Team Member) - Persona-Specific "First Win"

**Key Insight:** Different "first win" for each persona

#### Persona Breakdown:

**Pooja (Business SME / Citizen Dev):**

- **First Win:** Clear path to creating solutions for specific business needs
- **Need:** Fastest path to translate ideas → functional solutions
- **Focus:** Speed and simplicity

**Bob/Betty (Technical Builder):**

- **First Win:** Efficient path to build, test, monitor solutions
- **Need:** Technical efficiency and control
- **Focus:** Build quality and maintainability

**Critical Question Raised:**

> "What are the major experiential milestones for each persona, and what do they need to support their primary goal for each?"

**Implication:** Need to map persona journeys with clear milestones

---

### 4. Steve (Design Leader) - Epic Framework

**Key Framework from Screenshot:**

#### Five Persona Categories:

1. **Bob (Builder)** - Technical developer
2. **Cassie (End User)** - Task executor
3. **Pooja (Business SME)** - Citizen developer
4. **Ava (Systems Admin)** - Platform administrator
5. **Dave (CTO/Exec)** - Executive stakeholder

#### "Aha Moments" by Persona:

| Persona                  | Time to Aha      | Observable Aha Trigger                                                        | Longer-Term Aha                                            |
| ------------------------ | ---------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Bob (Builder)**        | ≤ 5 min          | First agent test run succeeds with ≥1 tool/action executed                    | System scales and stays stable (2-6 weeks)                 |
| **Cassie (End User)**    | ≤ 5 min          | First real work task completed end-to-end                                     | This is part of weekly routine (2-4 weeks)                 |
| **Pooja (Business SME)** | ≤ 10 min         | 1 template-based agent/workflow created and run successfully without code     | Can improve processes myself (4-8 weeks)                   |
| **Ava (Systems Admin)**  | ≤ 1 hour (day 1) | Tenant provisioned + RBAC configured + first user logs in with correct access | Scaled AI with zero surprises (30-60 days)                 |
| **Dave (CTO/Exec)**      | ≤ 1 week         | Evidence of ≥1 deployed agent with governance + usage telemetry visible       | Platform justifies AI/enterprise investment (1-2 quarters) |

**Critical Metrics:**

- **Bob:** 3+ agents deployed, reusable components, <2% failure rate
- **Cassie:** 10+ tasks completed, 3+ days usage, measurable time savings
- **Pooja:** 2+ workflows created without IT tickets
- **Ava:** 10+ workflows live, zero critical security/cost escalations
- **Dave:** QBR shows measurable business outcomes

---

### 5. Robert (Lead) - Global Onboarding Tasks

**Key Framework from Screenshot:**

#### Global Onboarding Tasks (All Users):

1. Invite Team
2. Setup workspace
3. Setup environment
4. Setup Domain
5. Help
6. Tutorials (Agent creation walk-through)
7. Select Suggested Agent

#### Domain-Specific Onboarding:

**Customer Care:**

- **Integrations:** Contact center, Support desk, Human transfers, Voice, Channels
- **Try it out:** Demo site / mock responses
- **Suggested agents:** Try out suggested agents
- **KPIs:** Deflection %, Containment, Customer Satisfaction, Call Centre Satisfaction, AHT, FCR %, Call Abandonment Rate

**Procurement:**

- **Integrations:** Order Processing System
- **Try it out:** Demo + Suggested agents
- **KPIs:** Cost Savings, Purchase Price Variance, On-time delivery %, Purchase Order Cycle Time

**Implication:**

- Need global tasks applicable to all
- Domain-specific paths for Customer Care, Procurement, etc.
- KPIs should be visible and trackable

---

### 6. Intercom - Competitive Analysis

**Source:** Intercom's Day 0 onboarding experience (Screenshots analyzed)

#### Landing Page: "Get started with AI-first customer support"

**What Intercom Does Exceptionally Well:**

1. **Clear Progress Tracking**
   - "Get set up • 0/5 steps" - Immediate visibility of progress
   - Users know exactly where they are and what's left

2. **Actionable Checklist Approach**
   - 5 concrete, specific steps (not vague guidance)
   - Each step has a clear action and outcome
   - Primary action ("Set up channels") prominently displayed with CTA button

3. **Progressive Disclosure**
   - First step expanded with details and CTA
   - Other 4 steps collapsed to reduce cognitive load
   - Users focus on one thing at a time

4. **Multi-Purpose Chat Interface**
   - Messages panel on right side with 4 sections:
     1. **Messages** - Direct communication with team/support
     2. **Live chats** - Real-time conversations
     3. **News** - Product updates and announcements
     4. **Help** - Documentation and guides
   - Single unified interface for all communication needs
   - Contextual and always accessible
   - Not intrusive - available when needed

5. **"Go Further" Section**
   - Additional resources AFTER core setup
   - Doesn't distract from primary goal
   - Positioned as optional next steps

**Their 5-Step Checklist:**

1. ✅ Set up channels to connect with customers (PRIMARY - expanded)
2. ⭕ Invite your teammates to collaborate faster
3. ⭕ Set up Fin to give instant answers
4. ⭕ Ask Copilot to find an answer instantly
5. ⭕ Set your Help Center live to give support 24/7

#### Questionnaire: "Question 3 of 6"

**What Makes Their Questionnaire Effective:**

1. **Visual Progress Indicator**
   - "Question 3 of 6" with progress bar
   - Users know how much is left
   - Reduces abandonment anxiety

2. **Clear, Specific Questions**
   - "Which support channels do you prefer?"
   - Not abstract or confusing
   - Directly relevant to setup

3. **Flexible Selection**
   - "Select all that apply" - multiple choice
   - Accommodates different use cases
   - No forced single answer

4. **Relevant, Comprehensive Options**
   - Live chat, Email, Phone, SMS, WhatsApp, Social media, Other
   - Covers all major channels
   - "Other" as catch-all

5. **Skip Option Available**
   - Users can skip if not ready
   - Reduces friction
   - Can come back later

6. **Modal Overlay Design**
   - Doesn't navigate away from context
   - Keeps user oriented
   - Easy to complete quickly

**The 6 Questions (Inferred):**

1. What's your role/use case?
2. Team size or scale?
3. Which support channels do you prefer? (shown)
4. Integration needs?
5. Current tools/systems?
6. Primary goals?

---

#### Key Takeaways from Intercom for watsonx Orchestrate:

**✅ What We Should Adopt:**

1. **Checklist-Based Progress**
   - Replace vague "getting started" with specific 5-7 step checklist
   - Show "0/5 steps" or "2/5 complete" prominently
   - Each step = one clear action with visible outcome

2. **Progressive Disclosure**
   - Expand only the current/next step
   - Collapse completed and future steps
   - Reduce overwhelm, increase focus

3. **Primary Action Prominence**
   - Make the #1 most important action impossible to miss
   - Large CTA button for primary action
   - Everything else is secondary

4. **Multi-Purpose Chat Interface** ⭐ KEY INSIGHT
   - Single unified chat panel for multiple purposes:
     - **Messages** - Team communication and support
     - **Live chats** - Real-time conversations
     - **News** - Product updates and announcements
     - **Help** - Documentation and guides
   - Reduces UI clutter by consolidating communication channels
   - Always accessible but not intrusive
   - Context-aware based on user needs

5. **Questionnaire Best Practices**
   - Show "Question X of Y" with progress bar
   - Keep questions specific and actionable
   - Allow multiple selections where appropriate
   - Always provide skip option
   - Use modal overlay to maintain context

6. **"Go Further" Pattern**
   - Core setup first, additional resources second
   - Don't mix required and optional
   - Clear separation between "must do" and "nice to have"

**❌ What We Should Avoid:**

1. **Don't Hide Progress**
   - Never leave users wondering "how much is left?"
   - Always show completion status

2. **Don't Overwhelm with Choices**
   - Intercom shows 5 steps, not 20
   - We should aim for 5-7 core steps max

3. **Don't Force Linear Flow**
   - Intercom allows skipping questionnaire questions
   - Users should be able to jump to what matters to them

---

#### Applying Intercom Patterns to watsonx Orchestrate v4.0:

**Proposed Checklist for Bob/Betty (Builder):**

```
Get started with your first agent • 0/5 steps

✅ 1. Choose your agent type
    [Build from scratch] [Use template] [Import existing]

⭕ 2. Connect your tools and data sources

⭕ 3. Configure agent behavior and guardrails

⭕ 4. Test your agent

⭕ 5. Deploy to production
```

**Proposed Checklist for Ava (Admin):**

```
Set up your watsonx Orchestrate tenant • 0/5 steps

✅ 1. Configure authentication and RBAC
    [Set up SSO] [Add users] [Assign roles]

⭕ 2. Connect enterprise systems

⭕ 3. Set governance policies

⭕ 4. Invite your team

⭕ 5. Review security settings
```

**Proposed Questionnaire (3-5 questions max):**

```
Question 1 of 3: What's your primary goal?
□ Build AI agents for my team
□ Automate business processes
□ Set up platform for organization
□ Use existing agents

Question 2 of 3: Which systems will you connect?
□ CRM (Salesforce, HubSpot)
□ ITSM (ServiceNow, Jira)
□ HR Systems (Workday, SAP)
□ Custom APIs
□ Other

Question 3 of 3: What's your technical comfort level?
○ I'm a developer/technical builder
○ I'm a business user with some technical skills
○ I'm a business user (no-code preferred)
○ I'm an administrator/IT professional
```

---

## 🎯 Synthesis & Recommendations for v4.0

### Core Strategy: Hybrid AI-First + Structured Approach

#### 1. **Primary Interface: AI Chat**

- Make chat the central interaction point
- Chat handles:
  - Agent creation via natural language
  - Catalog search and suggestions
  - Setup guidance
  - Contextual help

#### 2. **Structured Underneath**

- Behind the chat, maintain role-based structure
- Use chat to guide users through structured flows
- Provide clear milestones and progress tracking

#### 3. **Focus: Time to First Agent**

- Remove all educational content
- Assume product awareness
- Optimize every interaction for speed to first agent

#### 4. **Remove from Day 0**

- ❌ Analytics (empty state confusing)
- ❌ Assets (not relevant to first agent)
- ❌ Heavy personalization (lightweight only)
- ❌ Product tours (users already know product)

#### 5. **Add to Day 0**

- ✅ "Needs Attention" section for blockers
- ✅ Connection setup guidance
- ✅ RBAC quick setup
- ✅ Tooltips on OOTB agents
- ✅ Client Zero templates as featured OOTB agents

#### 6. **Persona-Specific Paths**

**Bob/Betty (Builder):**

- **Goal:** First agent test run in ≤5 minutes
- **Path:** Chat → Build agent via NL → Test → Deploy
- **Success:** Agent executes with ≥1 tool/action

**Pooja (Business SME):**

- **Goal:** Template-based agent in ≤10 minutes
- **Path:** Chat → Select template → Customize → Run
- **Success:** Workflow runs without writing code

**Ava (Admin):**

- **Goal:** Tenant ready in ≤1 hour
- **Path:** Setup wizard → RBAC → First user login
- **Success:** User logs in with correct access

**Cassie (End User):**

- **Goal:** Complete first task in ≤5 minutes
- **Path:** Discover agent → Execute task → See result
- **Success:** Real work task completed end-to-end

**Dave (Exec):**

- **Goal:** See value evidence in ≤1 week
- **Path:** Dashboard → Deployed agents → Usage metrics
- **Success:** Governance + telemetry visible

---

## 🚀 Proposed v4.0 Features

### 1. **Multi-Purpose Chat Interface** (Inspired by Intercom)

```
┌─────────────────────────────────────┐
│  💬 Control Plane Agent        [×]  │
│  ┌─────────────────────────────┐   │
│  │ 🤖 Agent  💬 Help  📰 News  │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Agent Tab - Active]               │
│  "I can help you create your first  │
│   agent. What would you like to     │
│   automate?"                        │
│                                     │
│  [Type or select from suggestions]  │
│  • Build from scratch               │
│  • Search agent catalog             │
│  • Use a template (Ask HR, Ask IT)  │
└─────────────────────────────────────┘
```

**4 Tabs in Chat Panel:**

1. **🤖 Agent** - AI-powered agent creation and guidance
2. **💬 Help** - Documentation, guides, and contextual help
3. **📰 News** - Product updates and announcements
4. **👤 Support** - Direct communication with team/support

**Benefits:**

- Single unified interface reduces UI clutter
- Context switches without leaving the flow
- Always accessible, never intrusive
- Consolidates multiple communication channels

### 2. **Contextual OOTB Agents**

```
┌─────────────────────────────────────┐
│  📦 Featured Templates              │
│                                     │
│  [Ask HR] ℹ️                        │
│  Automate employee questions about  │
│  benefits, PTO, policies            │
│  Example: "How many vacation days?" │
│                                     │
│  [Invoice Extractor] ℹ️             │
│  Extract data from invoices         │
│  Example: Process 100 invoices/day  │
└─────────────────────────────────────┘
```

### 3. **Needs Attention Section**

```
┌─────────────────────────────────────┐
│  ⚠️ Needs Attention                 │
│                                     │
│  • Set up connections (2 pending)   │
│  • Configure RBAC (3 users waiting) │
│  • Review guardrails (recommended)  │
└─────────────────────────────────────┘
```

### 4. **Progress Milestones**

```
┌─────────────────────────────────────┐
│  🎯 Your Progress                   │
│                                     │
│  ✅ Account created                 │
│  ✅ First agent built               │
│  ⏳ Test your agent                 │
│  ⬜ Deploy to production            │
│  ⬜ Invite team members             │
└─────────────────────────────────────┘
```

### 5. **Domain-Specific Paths** (Future)

- Customer Care onboarding
- Procurement onboarding
- Each with specific integrations and KPIs

---

## 📊 Success Metrics by Persona

### Bob/Betty (Builder)

- **Time to first agent:** <5 minutes
- **Test success rate:** >95%
- **Agents deployed:** 3+ in first week
- **Component reuse:** >50%

### Pooja (Business SME)

- **Time to template agent:** <10 minutes
- **No-code success:** 100%
- **Workflows created:** 2+ in first month
- **IT ticket reduction:** Measurable

### Ava (Admin)

- **Tenant setup time:** <1 hour
- **RBAC configuration:** Complete day 1
- **User onboarding:** Smooth first login
- **Security incidents:** Zero

### Cassie (End User)

- **Time to first task:** <5 minutes
- **Task completion rate:** >90%
- **Daily usage:** 3+ days/week
- **Time savings:** Measurable

### Dave (Exec)

- **Time to value evidence:** <1 week
- **Deployed agents:** Visible
- **Usage metrics:** Tracked
- **ROI visibility:** Clear

---

## 🎨 Design Principles for v4.0

1. **Chat-First, Structure-Underneath**
   - AI chat as primary interface
   - Structured flows guide the conversation
   - Progressive disclosure based on persona

2. **Speed Over Education**
   - Assume product knowledge
   - Optimize for action, not learning
   - Remove all tutorial content from Day 0

3. **Context Over Empty States**
   - No empty analytics/assets
   - Show "Needs Attention" instead
   - Provide examples and tooltips

4. **Persona-Aware, Not Persona-Heavy**
   - Lightweight personalization
   - Focus on Customer Care later
   - Keep it simple for v4.0

5. **Milestone-Driven**
   - Clear progress indicators
   - Celebrate "Aha moments"
   - Track time to value

---

## 🔄 Migration from v3.1 to v4.0

### Keep from v3.1:

- ✅ Persona selection (but simplify)
- ✅ AI chat panel (make it primary)
- ✅ Role switching capability
- ✅ Assessment flow (but streamline)

### Remove from v3.1:

- ❌ Analytics section (empty state)
- ❌ Assets section (not Day 0)
- ❌ Heavy dashboard cards (too much)
- ❌ Educational content (assume knowledge)

### Add to v4.0:

- ✅ Unified chat interface for agent creation
- ✅ "Needs Attention" section
- ✅ Contextual tooltips on OOTB agents
- ✅ Progress milestones
- ✅ Connection setup guidance
- ✅ RBAC quick setup

---

## 📝 Open Questions

1. **How do we balance chat vs. visual UI?**
   - Frances raised this concern
   - Need to test what works best for each interaction

2. **What are the exact experiential milestones for each persona?**
   - Andy's question needs answering
   - Should map detailed journey for each persona

3. **How do we handle domain-specific onboarding?**
   - Robert's framework shows Customer Care and Procurement
   - When do we introduce domain selection?

4. **What's the right level of personalization?**
   - Ronak suggests lightweight for now
   - When do we invest more heavily?

5. **How do we measure "Time to First Agent"?**
   - Need clear definition
   - Need tracking mechanism

---

## 🎯 Next Steps

### Immediate (v4.0):

1. Design unified AI chat interface for agent creation
2. Add "Needs Attention" section
3. Remove Analytics/Assets from Day 0
4. Add tooltips to OOTB agents
5. Simplify persona selection
6. Add progress milestones

### Short-term (v4.1):

1. Add connection setup wizard
2. Add RBAC quick setup
3. Implement domain-specific paths (Customer Care)
4. Add KPI tracking

### Long-term (v5.0):

1. Full domain-specific onboarding (Procurement, etc.)
2. Advanced personalization
3. Comprehensive analytics (post-Day 0)
4. Team collaboration features

---

## 📚 References

- Slack discussion on Day 0 directions
- Frances feedback on hybrid approach
- Ronak's PM insights from user research
- Steve's epic framework with Aha moments
- Robert's global onboarding tasks
- Andy's persona-specific first wins
- **Intercom competitive analysis** (Screenshots from /Intercom folder)

---

## 🏆 Competitive Insights Summary

### What Intercom Teaches Us:

1. **Progress Visibility is Critical**
   - "0/5 steps" beats vague "getting started"
   - Users need to know where they are and what's left

2. **One Primary Action at a Time**
   - Expand current step, collapse others
   - Reduce cognitive load dramatically

3. **Multi-Purpose Chat is Genius** ⭐
   - Single panel with 4 tabs: Messages, Live chats, News, Help
   - Consolidates all communication in one place
   - Reduces UI clutter and context switching
   - Always accessible, never intrusive

4. **Questionnaires Should Be Short & Skippable**
   - 3-6 questions maximum
   - Always allow skip
   - Show progress ("Question 3 of 6")

5. **Separate Core from Optional**
   - "Get set up" (required) vs "Go further" (optional)
   - Don't mix must-do with nice-to-have

### How This Changes v4.0:

**Before (v3.1):**

- Dashboard with many cards
- Unclear what to do first
- No progress tracking
- Assessment feels like a test

**After (v4.0):**

- Clear checklist: "0/5 steps"
- One primary action expanded
- Progress bar visible
- Quick questionnaire (3 questions, skippable)

---

**Document Status:** Draft for Review
**Next Review:** After v4.0 prototype creation
**Owner:** Design Team
**Last Updated:** April 9, 2026 - Added Intercom competitive analysis
