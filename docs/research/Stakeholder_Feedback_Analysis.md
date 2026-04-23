# Stakeholder Feedback Analysis

**Date:** April 9, 2026  
**Purpose:** Synthesize stakeholder feedback on Day 0 onboarding experience

---

## Executive Summary

**Key Insight:** Focus on **"Time to First Agent"** rather than product education, as users have already seen the product before Day 0.

**Design Philosophy:** Hybrid approach combining AI-first conversational experience with persona-based structure.

---

## Three Proposed Directions

### Direction 1: AI-First Path (Conversational)

- Leverage AI chat for tenant setup, Q&A, agent building via natural language
- **Goal:** High flexibility and "magic" UX

### Direction 2: Curated Funnel (Role-Based)

- Initial questionnaire → structured checklist by role
- **Goal:** Clarity, structure, clear path to value

### Direction 3: Educational Sandbox

- PLG via interactive tours, sample agents, template previews
- **Goal:** Low friction, "learning by doing"

**Consensus:** Hybrid approach combining Direction 1 (AI-first) with Direction 2 (role-based structure)

---

## Stakeholder Feedback

### Ronak (PM)

**Key Insight:**

> "First time users would have already seen the product. So, the goal shouldn't be helping them learn about the product but quickly get them started to an agent"

**Implications:**

- Remove educational/tour elements from Day 0
- Focus exclusively on "Time to First Agent"
- Assume product awareness, optimize for action

**On Personalization:**

> "Knowing Persona and expertise in agent creation is definitely important but should be prioritized later when we bring in Customer Care specific journey"

**Correct Interpretation:**

- Persona selection IS important for tailoring the experience
- Domain-specific journeys (Customer Care, Procurement, etc.) can be phased in later phases
- Current version should focus on persona-based experience

**Major Blockers Identified:**

1. Setting up connections - major blocker
2. Instructions, guardrails, behavior - still confusing for builders
3. RBAC - major concern for user addition

**Solution:** Address via "Needs Attention" section rather than empty placeholders

---

### Frances (Manager)

**Key Quote:**

> "blend of direction 1 and 2, where we ask specifying questions and use the chat to curate the user's experience"

**Recommendation:**

- Use chat as primary interface with structured flows underneath
- Balance conversational AI with clear guidance

---

### Steve (Design Leader)

**Framework:** "Aha Moments" by Persona

| Persona          | Time to Aha | Observable Trigger                                 |
| ---------------- | ----------- | -------------------------------------------------- |
| **Builder**      | ≤5 min      | First agent test succeeds with ≥1 tool/action      |
| **End User**     | ≤5 min      | First real work task completed end-to-end          |
| **Business SME** | ≤10 min     | Template-based agent runs without code             |
| **Admin**        | ≤1 hour     | First user logs in with correct access             |
| **Exec**         | ≤1 week     | Evidence of deployed agent with governance visible |

---

### Andy (Team Member)

**Key Question:**

> "What are the major experiential milestones for each persona, and what do they need to support their primary goal?"

**Insight:** Different "first win" for each persona

- **Business SME:** Clear path to creating solutions for business needs
- **Technical Builder:** Efficient path to build, test, monitor solutions

---

### Robert (Lead)

**Framework:** Global + Domain-Specific Onboarding

**Global Tasks (All Users):**

1. Invite Team
2. Setup workspace
3. Setup environment
4. Setup Domain
5. Help & Tutorials

**Domain-Specific Paths:**

- Customer Care: Contact center integrations, KPIs (Deflection %, Containment, CSAT)
- Procurement: Order processing integrations, KPIs (Cost Savings, On-time delivery %)

---

### Intercom Competitive Analysis

**Key Patterns:**

1. **Progress Visibility:** "0/5 steps" - users know where they are
2. **One Primary Action:** Expand current step, collapse others
3. **Multi-Purpose Chat:** Single panel with tabs (Messages, Help, News, Support)
4. **Short Questionnaires:** 3-6 questions, always skippable
5. **Separate Core from Optional:** "Get set up" vs "Go further"

---

## Design Principles

1. **Activation Over Education**
   - Users already know the product
   - Focus on helping them DO something, not learn about it

2. **Chat-First, Structure-Underneath**
   - AI chat as primary interface
   - Structured flows guide the conversation

3. **Context Over Empty States**
   - No empty analytics/assets
   - Show "Needs Attention" items instead

4. **Persona-Aware Experience**
   - Persona and expertise level are important
   - Domain-specific journeys can be phased appropriately

5. **Milestone-Driven Progress**
   - Clear progress indicators
   - Celebrate "Aha moments"
   - Track time to value

---

## Strategic Recommendations

### Current Implementation (v1.2)

- Persona + Domain selection for tailored experience
- AI chat interface for agent creation
- Contextual tooltips on templates
- Remove Analytics/Assets from Day 0

### Next Iteration (v1.3)

- "Needs Attention" section for blockers
- Progress tracking ("X/5 steps" checklist)
- Multi-purpose chat interface (Build, Learn, Updates, Support tabs)
- Connection setup wizard
- RBAC quick setup

### Long-term Vision (v2.0+)

- Full domain-specific onboarding paths
- Advanced personalization based on user behavior
- Comprehensive analytics (post-Day 0)
- Team collaboration features

---

## Success Metrics by Persona

**Builder:**

- Time to first agent: <5 minutes
- Test success rate: >95%

**Business SME:**

- Time to template agent: <10 minutes
- No-code success: 100%

**Admin:**

- Tenant setup time: <1 hour
- RBAC configuration: Complete day 1

**End User:**

- Time to first task: <5 minutes
- Task completion rate: >90%

**Exec:**

- Time to value evidence: <1 week
- Usage metrics: Tracked and visible

---

**Document Status:** Active Reference  
**Last Updated:** April 10, 2026
