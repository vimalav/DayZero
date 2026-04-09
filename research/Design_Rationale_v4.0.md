# Design Rationale - v4.0 Checklist-Driven Onboarding

**Date:** April 9, 2026  
**Version:** v4.0  
**Purpose:** Document design decisions, philosophy, and rationale behind v4.0

---

## 📋 Table of Contents

1. [Design Philosophy Evolution](#design-philosophy-evolution)
2. [Key Design Decisions](#key-design-decisions)
3. [Persona Journeys](#persona-journeys)
4. [Open Questions & Considerations](#open-questions--considerations)

---

## Design Philosophy Evolution

### v1.0-v1.1: Exploration Phase

**Philosophy:** "Let's understand what onboarding could be"

- Focus: Basic concept validation
- Approach: Exploratory, open-ended
- User assumption: Needs to learn everything

### v2.0-v2.1: Persona Discovery

**Philosophy:** "Different users need different experiences"

- Focus: Role-based differentiation
- Approach: Persona selection → Dashboard
- User assumption: Knows their role, needs guidance
- Key insight: One size doesn't fit all

### v3.0: Day 0 Reality Check

**Philosophy:** "Handle the zero state honestly"

- Focus: What happens when there's nothing there yet?
- Approach: Assessment → Zero-state handling
- User assumption: Might not know their role, needs help choosing
- Key insight: Day 0 is different from Day 1+

### v3.1: Dashboard Enhancement

**Philosophy:** "Make it actionable and conversational"

- Focus: AI assistance + clear actions
- Approach: Dashboard + AI chat + Role switching
- User assumption: Wants to explore and get help
- Key insight: Chat can guide, dashboard can show options

### v4.0: Activation Over Education ⭐

**Philosophy:** "Users already know the product - get them to value FAST"

- Focus: Time to First Agent
- Approach: Checklist + Multi-purpose help + Progressive disclosure
- User assumption: **Already seen product demos, ready to act**
- Key insight: Day 0 is about activation, not education

**The Fundamental Shift:**

```
v1-v3: "Let me teach you about the product"
v4.0:  "Let me help you DO something with the product"
```

---

## Key Design Decisions

### Decision 1: Checklist in Left Panel (Not Integrated)

**Question:** Why is the checklist in a side panel instead of integrated into the main content?

**Rationale:**

**✅ Pros of Side Panel:**

1. **Always Visible** - Users always know where they are (0/5 steps)
2. **Persistent Context** - Doesn't disappear when working in main area
3. **Clear Separation** - Checklist = what to do, Main area = where to do it
4. **Intercom Pattern** - Proven to work in production (Intercom uses this)
5. **Progressive Disclosure** - Can expand/collapse steps without losing place

**❌ Cons of Integration:**

1. Checklist would scroll away as user works
2. Progress would be hidden when deep in a task
3. Harder to see "what's next" at a glance
4. More context switching required

**Design Principle:**

> "The checklist is your map, the main area is your workspace. Keep the map visible while you work."

**Alternative Considered:**

- Top banner with progress → Too easy to ignore, takes horizontal space
- Integrated cards → Loses persistent visibility
- Bottom progress bar → Can't see next steps

**Recommendation:** Keep as side panel, but consider:

- Making it collapsible for more workspace
- Adding a mini progress indicator in header when collapsed

---

### Decision 2: "Needs Attention" as Separate Section

**Question:** Why do we need "Needs Attention" on Day 0? Could this be part of the checklist?

**Rationale:**

**Why Separate:**

1. **Different Mental Models**
   - **Checklist** = "Steps to complete" (proactive, sequential)
   - **Needs Attention** = "Blockers to resolve" (reactive, urgent)

2. **Different Priorities**
   - Checklist: "Do these in order"
   - Needs Attention: "Fix these NOW or you'll be blocked"

3. **Different Lifecycles**
   - Checklist: Static, same for everyone in persona
   - Needs Attention: Dynamic, unique to each user's setup

4. **User Research Insight**

   > "Setting up connections is a major blocker" - Ronak

   Users need to see blockers BEFORE they hit them in the checklist.

**Example Scenario:**

**Without "Needs Attention":**

```
User: *Clicks "Connect your tools" in checklist*
System: "You need API credentials first"
User: "Why didn't you tell me this earlier?!"
```

**With "Needs Attention":**

```
User: *Sees "Set up API connections (2 pending)" in Needs Attention*
User: *Fixes connections first*
User: *Then proceeds to checklist step 2 smoothly*
```

**Could It Be Part of Checklist?**

**Option A: Integrated**

```
Checklist:
1. ⚠️ Set up connections (BLOCKER)
2. Choose your agent type
3. Connect your tools (requires step 1)
```

**Problems:**

- Breaks sequential flow
- Mixes prerequisites with steps
- Harder to see what's blocking vs. what's next

**Option B: Separate (Current)**

```
Needs Attention:
- Set up connections (2 pending) → Fix now

Checklist:
1. Choose your agent type
2. Connect your tools
```

**Benefits:**

- Clear separation of concerns
- Urgent items get visual priority (red banner)
- Checklist stays clean and sequential

**Design Principle:**

> "Show blockers prominently so users can clear the path before starting the journey."

**Recommendation:** Keep separate, but consider:

- Linking checklist steps to related "Needs Attention" items
- Auto-dismissing "Needs Attention" items when resolved
- Showing "Needs Attention" count in header

---

### Decision 3: Rename "Control Plane Agent"

**Question:** Could we call the Control Plane Agent something else as it's no more just AI chat?

**Rationale:**

**Current Name Issues:**

1. **Too Technical** - "Control Plane" is infrastructure jargon
2. **Too Narrow** - Implies only AI chat, but has Help, News, Support
3. **Not Descriptive** - Doesn't convey multi-purpose nature
4. **Confusing** - Users might think it's an agent they're building

**Alternative Names:**

| Name                      | Pros                 | Cons                       | Recommendation |
| ------------------------- | -------------------- | -------------------------- | -------------- |
| **Assistant Panel**       | Clear, friendly      | Generic                    | ⭐⭐⭐ Good    |
| **Help Center**           | Familiar pattern     | Sounds passive             | ⭐⭐ OK        |
| **Copilot**               | Trendy, active       | Overused, Microsoft        | ⭐⭐ OK        |
| **Guide**                 | Simple, clear        | Too basic                  | ⭐⭐ OK        |
| **Companion**             | Friendly, supportive | Bit cheesy                 | ⭐⭐ OK        |
| **watsonx Assistant**     | Brand aligned        | Might confuse with product | ⭐⭐⭐⭐ Best  |
| **Your Assistant**        | Personal, clear      | Generic                    | ⭐⭐⭐ Good    |
| **Orchestrate Assistant** | Product-specific     | Long                       | ⭐⭐⭐ Good    |

**Recommended Name: "watsonx Assistant"**

**Rationale:**

1. **Brand Aligned** - Uses watsonx brand
2. **Clear Purpose** - "Assistant" implies help across multiple areas
3. **Multi-Purpose** - Doesn't limit to just chat
4. **Familiar** - Users know what an "assistant" does
5. **Scalable** - Can add more tabs without name change

**Tab Labels Would Become:**

```
watsonx Assistant
├── 🤖 Agent Builder (was "Agent")
├── 💬 Help & Docs (was "Help")
├── 📰 What's New (was "News")
└── 👤 Support (unchanged)
```

**Alternative Structure:**

```
watsonx Assistant
├── 🤖 Build (AI-powered agent creation)
├── 📚 Learn (Documentation & guides)
├── 📰 Updates (Product news)
└── 💬 Support (Get help)
```

**Design Principle:**

> "Name things for what they do, not what they are technically."

---

## Persona Journeys

### Admin Journey: "Set Up the Platform"

**Goal:** Tenant ready for team in ≤1 hour

**Checklist:**

1. ✅ Configure authentication and RBAC (15-20 min)
2. ⏳ Connect enterprise systems (20-30 min)
3. ⬜ Set governance policies (10-15 min)
4. ⬜ Invite your team (5 min)
5. ⬜ Review security settings (10 min)

**Needs Attention (Day 0):**

- Complete SSO configuration
- Add users (3 pending invites)
- Set up audit logging
- Configure data retention policies

**Assistant Tab Content:**

**🤖 Build Tab:**
"I can help you set up your watsonx Orchestrate tenant. What would you like to configure first?"

- Set up SSO
- Add users and roles
- Configure governance

**💬 Help Tab:**

- Admin Quick Start Guide
- SSO Configuration Tutorial
- RBAC Best Practices
- Security Checklist

**📰 Updates Tab:**

- New: Enhanced RBAC controls
- Improved: Audit log filtering
- Coming: Advanced governance policies

**👤 Support Tab:**

- Priority support for admins
- Architecture consultation available
- Security review requests

**Journey Flow:**

```
1. Admin logs in → Sees questionnaire
2. Selects "Set up platform for organization"
3. Lands on Admin checklist (0/5 steps)
4. Sees "Needs Attention" - SSO not configured
5. Clicks "Fix now" → SSO setup wizard
6. Completes SSO → "Needs Attention" updates
7. Returns to checklist, completes step 1
8. Continues through checklist sequentially
9. Invites team at step 4
10. Reviews security at step 5 → Done!
```

**Success Metric:** First user logs in with correct access

---

### SME Journey: "Create Your First Workflow"

**Goal:** Template-based agent running in ≤10 minutes

**Checklist:**

1. ✅ Select a template (2 min)
2. ⏳ Customize for your needs (3 min)
3. ⬜ Add your knowledge (3 min)
4. ⬜ Test with real scenarios (2 min)
5. ⬜ Share with team (1 min)

**Needs Attention (Day 0):**

- Upload knowledge documents (0 uploaded)
- Review agent responses (recommended)
- Connect to your data sources (optional)

**Assistant Tab Content:**

**🤖 Build Tab:**
"I can help you create an agent using templates. What business process would you like to automate?"

- Ask HR (Employee questions)
- Ask IT (Support tickets)
- Ask Procurement (Purchase orders)

**💬 Help Tab:**

- Template Customization Guide
- Knowledge Upload Best Practices
- Testing Your Agent
- Sharing with Team

**📰 Updates Tab:**

- New: 5 industry-specific templates
- Improved: Knowledge extraction
- Tip: Test with real questions

**👤 Support Tab:**

- Template customization help
- Knowledge structuring advice
- Best practices consultation

**Journey Flow:**

```
1. SME logs in → Sees questionnaire
2. Selects "Automate business processes"
3. Lands on SME checklist (0/5 steps)
4. Sees "Needs Attention" - No knowledge uploaded
5. Clicks "Upload documents" → Uploads FAQ, policies
6. Returns to checklist, step 1 expanded
7. Clicks "Browse Templates" → Sees Ask HR
8. Selects Ask HR → Template loads
9. Customizes responses (step 2)
10. Tests with sample questions (step 4)
11. Shares with HR team (step 5) → Done!
```

**Success Metric:** Workflow runs without writing code

---

### Builder Journey: "Build Your First Agent"

**Goal:** First agent test succeeds in ≤5 minutes

**Checklist:**

1. ✅ Choose your agent type (1 min)
2. ⏳ Connect your tools and data sources (2 min)
3. ⬜ Configure agent behavior (1 min)
4. ⬜ Test your agent (1 min)
5. ⬜ Deploy to production (30 sec)

**Needs Attention (Day 0):**

- Set up API connections (2 pending)
- Configure guardrails (recommended)
- Review security settings (required)

**Assistant Tab Content:**

**🤖 Build Tab:**
"I can help you create your first agent. What would you like to automate?"

- Build from scratch
- Use a template (Ask HR, Ask IT)
- Import existing agent

**💬 Help Tab:**

- Agent Builder Tutorial
- API Connection Guide
- Guardrails Configuration
- Testing Best Practices

**📰 Updates Tab:**

- New: Multi-agent workflows
- Improved: 40% faster responses
- Tip: Start with templates

**👤 Support Tab:**

- Technical support
- Architecture guidance
- Code review available

**Journey Flow:**

```
1. Builder logs in → Sees questionnaire
2. Selects "Build AI agents for my team"
3. Lands on Builder checklist (0/5 steps)
4. Sees "Needs Attention" - API connections needed
5. Clicks "Connect APIs" → Sets up 2 APIs
6. Returns to checklist, step 1 expanded
7. Clicks "Use a template" → Selects Ask IT
8. Template loads with sample connections
9. Configures behavior (step 3)
10. Tests agent (step 4) → Success!
11. Deploys (step 5) → Done!
```

**Success Metric:** Agent executes with ≥1 tool/action

---

## Open Questions & Considerations

### Question 1: Checklist vs. Needs Attention Integration

**Current State:** Separate sections

**Alternative:** Integrate as checklist prerequisites

**Prototype Idea:**

```
Checklist:
⚠️ Prerequisites (2 items need attention)
  - Set up API connections → Fix now
  - Configure guardrails → Fix now

1. Choose your agent type
2. Connect your tools (requires prerequisites)
```

**Pros:**

- Single source of truth
- Clear dependencies
- Less visual clutter

**Cons:**

- Mixes urgent with sequential
- Harder to scan for blockers
- Prerequisites might not map 1:1 to steps

**Recommendation:** Test both approaches with users

---

### Question 2: Checklist Collapsibility

**Current State:** Always visible, takes 400px

**Alternative:** Collapsible with mini progress in header

**Prototype Idea:**

```
Header: [watsonx Orchestrate] [👨‍💻 Builder] [●●●○○ 3/5] [Change Role]
                                              ↑ Mini progress

Collapsed: [≡] icon to expand checklist
Expanded: Full 400px panel
```

**Pros:**

- More workspace when needed
- Still shows progress
- User control

**Cons:**

- Adds interaction complexity
- Might hide important context
- Users might forget to check progress

**Recommendation:** Start with always-visible, add collapse in v4.1

---

### Question 3: Assistant Tab Naming

**Current Options:**

**Option A: Action-Oriented**

- 🤖 Build
- 📚 Learn
- 📰 Updates
- 💬 Support

**Option B: Noun-Based**

- 🤖 Agent Builder
- 💬 Help & Docs
- 📰 What's New
- 👤 Support

**Option C: User-Centric**

- 🤖 Create
- 💬 Get Help
- 📰 Stay Updated
- 👤 Contact Us

**Recommendation:** Option A (Action-Oriented)

- Shorter labels
- Clearer intent
- Easier to scan

---

### Question 4: Progress Celebration

**Current State:** Checkmark appears, no celebration

**Alternative:** Micro-celebrations for milestones

**Ideas:**

- Confetti animation on step completion
- Progress bar color change at 50%, 100%
- "Great job!" message from Assistant
- Unlock next feature teaser

**Recommendation:** Add subtle celebrations in v4.1

- Small checkmark animation
- Brief success message
- No confetti (too distracting)

---

## Design Principles Summary

1. **Activation Over Education**
   - Users already know the product
   - Focus on doing, not learning

2. **Progressive Disclosure**
   - Show one step at a time
   - Reduce cognitive load

3. **Persistent Context**
   - Always show progress
   - Never lose your place

4. **Separate Concerns**
   - Checklist = sequential steps
   - Needs Attention = urgent blockers
   - Assistant = multi-purpose help

5. **Clear Naming**
   - Name for what it does
   - Avoid technical jargon

6. **Persona-Specific**
   - Different goals need different paths
   - Customize checklist per role

7. **Time-Bound Goals**
   - Builder: ≤5 min
   - SME: ≤10 min
   - Admin: ≤1 hour

---

## Next Steps

### For v4.1:

1. Test "Needs Attention" integration with checklist
2. Add collapsible checklist option
3. Rename to "watsonx Assistant"
4. Add subtle progress celebrations
5. User test all three persona journeys

### For v4.2:

1. Add domain-specific paths (Customer Care, Procurement)
2. Implement smart recommendations based on org setup
3. Add real-time collaboration features
4. Integrate with actual platform data

---

**Document Owner:** UX Research Team  
**Last Updated:** April 9, 2026  
**Status:** Living Document - Update as design evolves
