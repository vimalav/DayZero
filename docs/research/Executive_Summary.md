# watsonx Orchestrate Day 0 Onboarding

## Executive Summary & Strategic Recommendations

**Date:** April 10, 2026  
**Audience:** Leadership & Product Strategy  
**Research Basis:** 5 user interviews (240 min) + stakeholder feedback + competitive analysis

---

## The Challenge

Users currently require **10-30 minutes** to understand watsonx Orchestrate's value proposition. Our target is **under 5-10 minutes**. This gap represents a critical barrier to adoption and time-to-value.

---

## What We Learned

### From 5 User Interviews (240 Minutes)

We spoke with Client Engineering, Account Technical Leaders, Customer Success, Sales Leadership, and Ecosystem Architects. **The message was unanimous:**

> **"Personalization is essential. Templates must be tuned to the user's specific interests and use cases."**  
> — Validated by all 5 interviews

**Key Insights:**

1. **Integration is the #1 blocker** - Users get stuck on ServiceNow, Salesforce, SAP, Workday connections
2. **Empty analytics provide no value** - Day 0 users have no agents, so analytics are meaningless
3. **Chat interface needs clarity** - Users don't immediately recognize conversational capabilities
4. **Experienced users need issue-first dashboards** - Sales leaders want to see problems, not general metrics
5. **Time to first agent is everything** - Users have already seen the product; they want to DO something

### From Stakeholder Consensus

**Ronak (PM):**

> "First time users would have already seen the product. So, the goal shouldn't be helping them learn about the product but quickly get them started to an agent."

**Design Philosophy:** "Activation Over Education"

**Frances (Manager):**

> "Blend of direction 1 and 2, where we ask specifying questions and use the chat to curate the user's experience."

**Consensus:** Hybrid approach combining AI-first conversational experience with role-based structure.

---

## Three Strategic Directions Evaluated

We evaluated three potential approaches using ICE prioritization (Impact × Confidence ÷ Effort):

### 🏆 Direction 2: Curated Funnel — **ICE Score: 15.0** (RECOMMENDED)

**Approach:** Persona selection → Domain-specific path → Structured checklist

**Why This Wins:**

- **Impact: 10/10** - Directly addresses the #1 user need for personalization
- **Confidence: 9/10** - Validated by ALL 5 interviews + stakeholder consensus + Intercom competitive analysis
- **Effort: 6/10** - Well-understood patterns, proven by competitors

**Evidence:**

- 5/5 interviews explicitly requested personalization
- Steve (Design Leader) defined clear "Aha moments" by persona (Builder: ≤5 min, SME: ≤10 min, Admin: ≤1 hour)
- Ronak confirmed: "Persona and expertise in agent creation is definitely important"
- Intercom's checklist-based approach proves this pattern works

### Direction 1: AI-First Path — **ICE Score: 7.9** (SECONDARY)

**Approach:** AI chat for everything - tenant setup, Q&A, agent building

**Why Secondary:**

- **Impact: 9/10** - High flexibility and "magic" UX
- **Confidence: 7/10** - Users reported "chat not immediately obvious"
- **Effort: 8/10** - High implementation complexity

**Decision:** Use as supporting interface, not primary experience

### Direction 3: Educational Sandbox — **ICE Score: 4.6** (DEPRIORITIZED)

**Approach:** Interactive tours, sample agents, template previews

**Why Deprioritized:**

- **Impact: 4/10** - Contradicts "Activation Over Education" principle
- Ronak: "Users already know the product"
- Ahmed: "Show features, not empty analytics"
- All interviews: Focus on action, not education

**Decision:** Move educational content to contextual help, not Day 0

---

## Strategic Recommendation

### Implement Hybrid Approach: Direction 2 (Primary) + Direction 1 (Secondary)

**Current Implementation (v1.2):**

- ✅ Persona selection (Admin, Builder, SME)
- ✅ Domain selection (HR, IT, Finance, Customer Care, Procurement, Sales)
- ✅ 18 tailored combinations (3 personas × 6 domains)
- ✅ AI chat as secondary interface

**Next Iteration (v1.3):**

- Add "Needs Attention" section for blockers
- Implement progress tracking ("X/5 steps" checklist)
- Multi-purpose chat interface (Build, Learn, Updates, Support tabs)
- Connection setup wizard
- RBAC quick setup

**Long-term Vision (v2.0+):**

- Full domain-specific onboarding paths
- Advanced personalization based on user behavior
- Comprehensive analytics (post-Day 0)
- Team collaboration features

---

## Competitive Intelligence: What Intercom Teaches Us

Intercom's Day 0 onboarding reveals 5 critical patterns:

1. **Progress Visibility is Critical** - "0/5 steps" beats vague "getting started"
2. **One Primary Action at a Time** - Expand current step, collapse others
3. **Multi-Purpose Chat is Genius** - Single panel with 4 tabs (Messages, Help, News, Support)
4. **Questionnaires Should Be Short & Skippable** - 3-6 questions maximum
5. **Separate Core from Optional** - "Get set up" vs "Go further"

**Application to watsonx Orchestrate:**

- Implement checklist-based progress tracking
- Progressive disclosure (one step at a time)
- Consolidate communication channels into unified chat
- Keep persona/domain selection lightweight (2-step process)

---

## Success Metrics by Persona

| Persona          | Time to "Aha" | Observable Trigger                         | Target Metric                   |
| ---------------- | ------------- | ------------------------------------------ | ------------------------------- |
| **Builder**      | ≤5 min        | First agent test succeeds                  | 3+ agents deployed in week 1    |
| **Business SME** | ≤10 min       | Template agent runs without code           | 2+ workflows created in month 1 |
| **Admin**        | ≤1 hour       | First user logs in with correct access     | Zero security incidents         |
| **End User**     | ≤5 min        | First task completed end-to-end            | 3+ days usage per week          |
| **Exec**         | ≤1 week       | Evidence of deployed agent with governance | ROI visibility clear            |

---

## The Bottom Line

**Current State:** 10-30 minutes to understand value  
**Target State:** <5-10 minutes to first agent  
**Solution:** Persona + Domain personalization (v1.2)  
**Validation:** 100% of user interviews + stakeholder consensus + competitive proof points

**ROI Impact:**

- **Faster time-to-value** = Higher adoption rates
- **Personalized experience** = Reduced support burden
- **Clear progress tracking** = Lower abandonment rates
- **Issue-first dashboards** = Proactive problem resolution

---

## Recommendation for Leadership

**Approve v1.2 as current implementation** - It represents the highest-impact, highest-confidence approach validated by comprehensive user research and competitive analysis.

**Invest in v1.3 enhancements** - Progress tracking, "Needs Attention" section, and connection wizards address the #1 blocker (integrations).

**Deprioritize educational content** - Users want activation, not education. Move tutorials to contextual help.

---

**Prepared by:** Design & Research Team  
**Next Review:** Post-v1.3 implementation  
**Contact:** For detailed research data, see Interview_Analysis_Report.md and Stakeholder_Feedback_Analysis.md
