# Mockup Feedback Analysis

## Comparing Design Mockup to User Research Insights

**Date:** April 7, 2026  
**Mockup URL:** https://armor-false-41348411.figma.site  
**Based on:** 3 user research interviews

---

## Executive Summary

The current mockup shows significant improvements over the existing experience, but several critical issues identified in user research remain unaddressed. This document provides specific feedback on how the mockup aligns with user needs and recommendations for improvement.

---

## Mockup Overview

The landing page includes:

- **Welcome message:** "Welcome, Ava! Explore what wxO has to offer"
- **Four main tiles:**
  1. Create my first agent (with chat with docs/invoice extractor templates)
  2. Explore agent catalog
  3. Guide me to create an agent
  4. Ask Documentation
- **Analytics & assets section** (collapsible)
- **AI Assistant panel** (opens on "Create my first agent" click)

---

## ✅ What's Working Well

### 1. AI Assistant Integration

**Positive:** The AI Assistant panel that opens when clicking "Create my first agent" is innovative and aligns with the team's plan to build a multi-agent help system.

**User Research Support:**

> "We have an agent that can help customers answer questions... integrated with all IBM docs and answer questions about that." - Joseph Kozhaya

**Recommendation:** ✅ Keep this feature and expand it.

---

### 2. Agent Catalog Prominence

**Positive:** "Explore agent catalog" is given equal weight to creating agents, which aligns with user needs.

**User Research Support:**

> "The catalog is very important, so I do think that's very important to highlight." - Joseph Kozhaya

**Recommendation:** ✅ Maintain this prominence.

---

### 3. Collapsible Analytics Section

**Positive:** Analytics is present but not overwhelming the day-zero experience.

**User Research Support:**

> "Putting analytics at the heart of it is also a big part of it... once you're a frequent user, you see it as part of your daily work." - Dana Abu Ali

**Recommendation:** ✅ Good approach for balancing day-zero vs day-30 needs.

---

### 4. Template Examples in AI Assistant

**Positive:** The AI Assistant shows 4 template options (Chat with docs, Invoice extractor, Email assistant, Data analyzer).

**Recommendation:** ✅ Good pattern, but needs better examples (see issues below).

---

## ❌ Critical Issues to Address

### 1. Four Tiles Create Confusion (🔴 High Priority)

**Problem:** The mockup still has 4 tiles, and the difference between "Create my first agent" and "Guide me to create an agent" is unclear.

**User Research Evidence:**

> "It's not immediately clear to me what the difference between the the first create my own agent and then guide me to create my own agent. It feels like almost the same action." - Cameron Seitz

**Impact:** Decision paralysis, confusion about which option to choose.

**Recommendation:** 🔴 **CONSOLIDATE TO 2-3 TILES**

**Proposed Structure:**

```
1. Create/Build Agent
   - Show templates (Client Zero patterns)
   - Include guided vs from-scratch options within
   - Time estimates and complexity levels

2. Explore Agent Catalog
   - Browse 300+ pre-built agents
   - Filter by use case, integration, complexity

3. Bring My Own Agent (NEW)
   - Import and govern external agents
   - Evaluation and testing tools
```

**Why This Works:**

- Reduces cognitive load from 4 to 3 options
- Clearer distinction between options
- Addresses external agent use case
- Removes documentation from primary actions

---

### 2. "Chat with Docs" & "Invoice Extractor" Examples (🔴 High Priority)

**Problem:** These examples don't showcase Orchestrate's agentic capabilities and feel outdated.

**User Research Evidence:**

> "Chat with documents have... people think it's old news and they don't think necessarily it's agents. Chat with documents is Gen. AI is really more generative AI than agentic AI." - Joseph Kozhaya

> "Invoice extractor is very specific, so I don't know unless they have a use case around extracting information from invoices... I don't know that it's the the number one use case." - Joseph Kozhaya

**Impact:** Users don't understand Orchestrate's full value proposition.

**Recommendation:** 🔴 **REPLACE WITH CLIENT ZERO PATTERNS**

**What Users Want:**

> "A lot of clients resonate with the client 0 strategy... they see a demo and ask procurement, ask HR and they kind of get it." - Cameron Seitz

**Suggested Template Examples:**

| Current (Weak)    | Recommended (Strong)          | Why Better                               |
| ----------------- | ----------------------------- | ---------------------------------------- |
| Chat with docs    | **Ask HR Agent**              | Domain-specific, shows agentic routing   |
| Invoice extractor | **Ask IT Agent**              | ServiceNow integration, real use case    |
| Email assistant   | **Ask Procurement Agent**     | Multi-system integration                 |
| Data analyzer     | **Document Processing Agent** | Broader than invoices, shows flexibility |

**Additional Options:**

- Multi-agent orchestrator (showcase agent coordination)
- Customer service agent (Salesforce integration)
- Compliance agent (governance capabilities)

---

### 3. Missing Time & Complexity Indicators (🟡 Medium Priority)

**Problem:** No indication of how long each option takes or what skill level is required.

**User Research Evidence:**

> "Create my first agent doesn't give them any an expectation in terms of effort for how long it's gonna take them to build an agent." - Joseph Kozhaya

> "Maybe we could even do like... estimated 20 minutes experience level medium or something like that, just so that they know what they're getting in into." - Cameron Seitz

**Impact:** Users don't know what they're committing to.

**Recommendation:** 🟡 **ADD METADATA TO EACH OPTION**

**For each tile/template, show:**

- ⏱️ **Estimated time** (e.g., "5-10 minutes", "20-30 minutes")
- 📊 **Complexity level** (Beginner/Intermediate/Advanced)
- 🎯 **Use case category** (e.g., "Client Zero", "Document Processing", "Integration")
- 🔌 **Integrations required** (if any)

**Example Mockup:**

```
┌─────────────────────────────────────┐
│ 🤖 Ask HR Agent                     │
│                                     │
│ Handle employee questions about     │
│ benefits, policies, and time off    │
│                                     │
│ ⏱️ 10-15 min | 📊 Beginner         │
│ 🎯 Client Zero | 🔌 No setup       │
└─────────────────────────────────────┘
```

---

### 4. "Ask Documentation" as Primary Tile (🟡 Medium Priority)

**Problem:** Documentation takes up valuable landing page real estate.

**User Research Evidence:**

> "As documentation in my opinion should be either like a help on the top right through an icon or an agent at the bottom right... I don't think you can share them directly through the product usually." - Joseph Kozhaya

**Impact:** Reduces space for more important actions.

**Recommendation:** 🟡 **MOVE TO CONTEXTUAL HELP**

**Implementation Options:**

1. **Help Icon in Header** (Recommended)
   - Place next to user profile icon
   - Opens AI Assistant with documentation access
   - Always available, doesn't clutter landing page

2. **Persistent Chat Widget**
   - Bottom-right corner
   - Minimizable
   - Follows user throughout product

3. **Contextual Help**
   - Tooltips and "?" icons throughout UI
   - Context-aware help based on current page
   - Links to relevant documentation

**Why This Works:**

- Frees up space for "Bring My Own Agent" tile
- Documentation still accessible but not primary
- Aligns with user expectations for help systems

---

### 5. Missing "Bring My Own Agent" Option (🟡 Medium Priority)

**Problem:** No clear path for users who have existing agents from other platforms.

**User Research Evidence:**

> "A lot of people are kind of coming in with external agents. They're not building with Orchestrate... that's almost like the new positioning because there's so many different apps that create agents nowadays." - Cameron Seitz

> "Another key big item is evaluate my agent... that's a big blocker for a lot of people because it's easy to build, it's hard to govern." - Joseph Kozhaya

**Impact:** Missing a key user segment and value proposition (governance).

**Recommendation:** 🟡 **ADD "BRING MY OWN AGENT" TILE**

**Proposed Content:**

```
┌─────────────────────────────────────┐
│ 🔗 Bring My Own Agent               │
│                                     │
│ Import agents from other platforms  │
│ and add governance & evaluation     │
│                                     │
│ • Import from external platforms    │
│ • Evaluate performance              │
│ • Add governance controls           │
│ • Monitor and optimize              │
│                                     │
│ ⏱️ 15-20 min | 📊 Intermediate     │
└─────────────────────────────────────┘
```

**Why This Matters:**

- Addresses growing market of external agents
- Highlights Orchestrate's governance capabilities
- Differentiates from pure agent builders
- Captures users who already have agents

---

### 6. No Skill-Level Personalization (🟢 Low Priority)

**Problem:** Same experience for all users regardless of skill level.

**User Research Evidence:**

> "Maybe we could even do like when you first get on the page you give like a rating one to five how familiar you are with agentic tools or AI and then you know if someone gives A1... maybe don't show that option or show a more advanced option." - Cameron Seitz

**Impact:** Beginners may be overwhelmed; experts may be underwhelmed.

**Recommendation:** 🟢 **CONSIDER SKILL-LEVEL ASSESSMENT**

**Implementation:**

**Option A: Quick Survey (Recommended)**

```
Welcome to watsonx Orchestrate!

To personalize your experience, tell us about yourself:

1. How familiar are you with AI agents?
   ○ New to AI agents
   ○ Some experience
   ○ Very experienced

2. What's your primary role?
   ○ Admin/Platform Manager
   ○ AI Engineer/Builder
   ○ Business User

3. Coding preference?
   ○ No-code (visual tools)
   ○ Low-code (some scripting)
   ○ Pro-code (full development)

[Skip] [Continue]
```

**Option B: Adaptive UI**

- Show all options initially
- Track user behavior
- Gradually personalize based on usage patterns
- Allow manual preference changes

**Benefits:**

- Tailored recommendations
- Appropriate complexity level
- Better time-to-value
- Reduced frustration

---

### 7. Navigation for Frequent Users (🟢 Low Priority)

**Problem:** Dana's question about accessing catalog/create for frequent users.

**User Research Evidence:**

> "Sorry, one quick question... So let's say I am a frequent user and I don't want to jump back in. I want to either create something from scratch or go to the catalog. How do I do it from here?" - Dana Abu Ali

**Impact:** Frequent users may find the onboarding-focused view frustrating.

**Recommendation:** 🟢 **ENHANCE NAVIGATION FOR RETURNING USERS**

**Implementation Options:**

1. **Persistent Left Sidebar** (if not already present)
   - Always visible navigation
   - Quick access to all sections
   - Collapsible for more space

2. **"Skip to..." Quick Links**
   - At top of landing page
   - "Skip to: Agents | Catalog | Analytics"
   - Minimal visual weight

3. **Smart Detection**
   - Detect returning users (cookies/login history)
   - Show simplified view after first visit
   - Option to "Show full onboarding" if needed

4. **Collapse Feature** (Already in mockup ✅)
   - "Collapse" button visible in mockup
   - Good for hiding onboarding content
   - Keep this feature

---

## 📊 Alignment with Research Findings

### Strengths of Current Mockup

| Research Finding               | Mockup Implementation    | Status          |
| ------------------------------ | ------------------------ | --------------- |
| Need for simplified experience | 4 tiles (still too many) | 🟡 Partial      |
| Agent catalog importance       | Prominent tile           | ✅ Good         |
| Analytics for frequent users   | Collapsible section      | ✅ Good         |
| AI-powered help                | AI Assistant panel       | ✅ Excellent    |
| Guided experience              | "Guide me" option        | ✅ Good         |
| Template-based creation        | Shows 4 templates        | ✅ Good pattern |

### Gaps in Current Mockup

| Research Finding            | Mockup Gap                           | Priority  |
| --------------------------- | ------------------------------------ | --------- |
| Client Zero patterns needed | Still showing chat with docs/invoice | 🔴 High   |
| Consolidate similar options | 4 tiles with unclear differences     | 🔴 High   |
| Time/complexity indicators  | No metadata shown                    | 🟡 Medium |
| External agent support      | No "Bring my own" option             | 🟡 Medium |
| Documentation placement     | Primary tile (should be contextual)  | 🟡 Medium |
| Skill-level personalization | One-size-fits-all                    | 🟢 Low    |
| Integration guidance        | No connection/integration info       | 🟡 Medium |

---

## 🎯 Recommended Mockup Changes

### Immediate Changes (Next Iteration)

1. **Reduce to 3 tiles:**
   - Create/Build Agent (merge first two tiles)
   - Explore Agent Catalog
   - Bring My Own Agent (new)

2. **Replace template examples:**
   - Ask HR Agent
   - Ask IT Agent
   - Ask Procurement Agent
   - Document Processing Agent

3. **Add metadata to all options:**
   - Time estimates
   - Complexity levels
   - Use case categories

4. **Move "Ask Documentation":**
   - Help icon in header
   - Or persistent chat widget

### Medium-term Enhancements

1. **Add integration indicators:**
   - Show which systems each template connects to
   - Indicate if connections are pre-configured

2. **Enhance AI Assistant:**
   - Add "Give me a tour" option (already present ✅)
   - Add "Create something new" option (already present ✅)
   - Expand template library

3. **Improve Analytics section:**
   - Show preview of key metrics
   - Add "View all analytics" link

### Long-term Considerations

1. **Skill-level assessment:**
   - Optional survey on first login
   - Adaptive recommendations

2. **RBAC-based views:**
   - Different landing pages for Admin vs Builder
   - Role-specific quick actions

3. **Smart recommendations:**
   - Based on user's industry
   - Based on existing integrations
   - Based on team's common use cases

---

## 📋 Detailed Comparison: Current vs Recommended

### Current Mockup Structure

```
┌─────────────────────────────────────────────────────────┐
│ Welcome, Ava! Explore what wxO has to offer             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Create my    │  │ Explore      │  │ Guide me to  │ │
│  │ first agent  │  │ agent        │  │ create an    │ │
│  │              │  │ catalog      │  │ agent        │ │
│  │ Choose from  │  │              │  │              │ │
│  │ chat with    │  │ Browse 300+  │  │ Take a       │ │
│  │ docs or      │  │ pre-built    │  │ guided tour  │ │
│  │ invoice      │  │ agents       │  │              │ │
│  │ extractor    │  │              │  │              │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌──────────────┐                                      │
│  │ Ask          │                                      │
│  │ Documentation│                                      │
│  │              │                                      │
│  │ Get answers  │                                      │
│  │ about agents │                                      │
│  └──────────────┘                                      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ Analytics & assets ▼                                    │
└─────────────────────────────────────────────────────────┘
```

### Recommended Structure

```
┌─────────────────────────────────────────────────────────┐
│ Welcome, Ava! Explore what wxO has to offer        [?]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐  ┌──────────────────┐           │
│  │ 🤖 Create Agent  │  │ 📚 Agent Catalog │           │
│  │                  │  │                  │           │
│  │ Build from       │  │ Browse 300+      │           │
│  │ templates or     │  │ pre-built agents │           │
│  │ start fresh      │  │                  │           │
│  │                  │  │ ⏱️ 2-5 min       │           │
│  │ • Ask HR         │  │ 📊 All levels    │           │
│  │ • Ask IT         │  │                  │           │
│  │ • Ask Procurement│  │                  │           │
│  │ • Custom build   │  │                  │           │
│  │                  │  │                  │           │
│  │ ⏱️ 10-30 min     │  │                  │           │
│  │ 📊 Beginner+     │  │                  │           │
│  └──────────────────┘  └──────────────────┘           │
│                                                         │
│  ┌──────────────────┐                                  │
│  │ 🔗 Bring My Own  │                                  │
│  │                  │                                  │
│  │ Import & govern  │                                  │
│  │ external agents  │                                  │
│  │                  │                                  │
│  │ • Import agents  │                                  │
│  │ • Add governance │                                  │
│  │ • Evaluate       │                                  │
│  │                  │                                  │
│  │ ⏱️ 15-20 min     │                                  │
│  │ 📊 Intermediate  │                                  │
│  └──────────────────┘                                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ Analytics & assets ▼                                    │
│ Performance metrics, agent health, usage insights       │
└─────────────────────────────────────────────────────────┘

[?] = Help icon (opens AI Assistant with documentation)
```

---

## 🎨 Visual Design Suggestions

### Typography & Hierarchy

- ✅ Current welcome message is good
- ✅ Tile titles are clear
- 🟡 Add visual hierarchy with metadata (time, complexity)
- 🟡 Use icons consistently (already started)

### Color & Emphasis

- ✅ Blue primary tile works well
- 🟡 Consider color-coding by use case category
  - Client Zero: Blue
  - Integration: Green
  - Governance: Purple
  - Custom: Gray

### Spacing & Layout

- ✅ Current spacing is good
- 🟡 Consider 2-column layout for 3 tiles (2 top, 1 bottom)
- 🟡 Or 3-column layout if space allows

### Interactive Elements

- ✅ AI Assistant panel is excellent
- ✅ Collapsible analytics section works well
- 🟡 Add hover states showing more details
- 🟡 Add "Learn more" links for each option

---

## 💬 User Quotes Supporting Changes

### On Consolidation

> "It's not immediately clear to me what the difference between the the first create my own agent and then guide me to create my own agent. It feels like almost the same action." - Cameron Seitz

> "I wonder if those 3 can all be consolidated into one, right? Like you're all creating an agent." - Cameron Seitz

### On Examples

> "Chat with documents have... people think it's old news and they don't think necessarily it's agents." - Joseph Kozhaya

> "A lot of clients resonate with the client 0 strategy... they see a demo and ask procurement, ask HR and they kind of get it." - Cameron Seitz

### On Time Indicators

> "Create my first agent doesn't give them any an expectation in terms of effort for how long it's gonna take them to build an agent." - Joseph Kozhaya

### On Documentation Placement

> "As documentation in my opinion should be either like a help on the top right through an icon or an agent at the bottom right." - Joseph Kozhaya

### On External Agents

> "A lot of people are kind of coming in with external agents. They're not building with Orchestrate... that's almost like the new positioning." - Cameron Seitz

### On Governance

> "Another key big item is evaluate my agent... that's a big blocker for a lot of people because it's easy to build, it's hard to govern." - Joseph Kozhaya

---

## ✅ Action Items for Design Team

### Priority 1 (Must Have)

- [ ] Consolidate 4 tiles to 3 tiles
- [ ] Replace chat with docs/invoice examples with Client Zero patterns
- [ ] Add time estimates to all options
- [ ] Add complexity levels to all options
- [ ] Move "Ask Documentation" to header help icon

### Priority 2 (Should Have)

- [ ] Add "Bring My Own Agent" tile
- [ ] Add use case category labels
- [ ] Show integration requirements
- [ ] Enhance template descriptions
- [ ] Add "Learn more" links

### Priority 3 (Nice to Have)

- [ ] Add skill-level assessment
- [ ] Implement adaptive recommendations
- [ ] Add hover states with more details
- [ ] Create RBAC-based views
- [ ] Add smart detection for returning users

---

## 📈 Expected Impact of Changes

### Time to Value

- **Current:** 10-30 minutes to understand value
- **Target:** Under 5-10 minutes
- **How:** Clearer options, better examples, time indicators

### User Satisfaction

- **Current:** Confusion about options
- **Target:** Clear path forward
- **How:** Consolidation, better labeling, metadata

### Feature Discovery

- **Current:** Users miss governance capabilities
- **Target:** Governance as key differentiator
- **How:** "Bring My Own Agent" tile, evaluation focus

### Onboarding Completion

- **Current:** Unknown (needs measurement)
- **Target:** >80% completion rate
- **How:** Reduced friction, clearer value prop

---

## 🔄 Next Steps

1. **Review this feedback** with design and product teams
2. **Prioritize changes** based on impact and effort
3. **Create updated mockups** incorporating high-priority changes
4. **Test with users** (5-8 participants)
5. **Iterate** based on testing feedback
6. **Implement** in phases (MVP → enhancements)

---

## 📞 Questions for Design Team

1. **Technical feasibility:** Can we detect returning users to show different views?
2. **Content:** Who will create the Client Zero template examples?
3. **AI Assistant:** What's the timeline for the multi-agent help system?
4. **RBAC:** When will role-based access control be available?
5. **Analytics:** What metrics should be shown in the collapsed view?
6. **Integration:** How do we indicate which connections are required/available?

---

**Document Prepared By:** UX Research Team  
**Date:** April 7, 2026  
**For Questions:** Contact research team or refer to [`Interview_Analysis_Report.md`](Interview_Analysis_Report.md:1)
