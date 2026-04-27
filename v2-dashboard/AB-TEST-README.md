# A/B Test: Solution-First Catalog

## Overview

This A/B test compares two approaches to the agent catalog experience:

- **Variant A (Control)**: Current technical catalog organized by type (Agents, Tools, MCP Servers)
- **Variant B (Treatment)**: Solution-first catalog organized by user intent and outcomes

## Hypothesis

> "A solution-first catalog organized by user intent will reduce time to first agent adoption by 50% compared to the current technical directory."

## Files Created

### HTML Files

- `agent-catalog.html` - Variant A (Control) - No changes to existing file
- `agent-catalog-v2.html` - Variant B (Treatment) - Solution-first design

### CSS Files

- `v2.0-styles.css` - Shared base styles (existing)
- `v2.0-styles-variant-b.css` - Additional styles for Variant B

### JavaScript Files

- `v2.0-ab-test.js` - A/B test controller with tracking

## Key Features - Variant B

### 1. Outcome-Focused Hero

- Question-based headline: "What do you want to accomplish today?"
- Outcome-based search placeholder
- Popular goal suggestions
- Trust indicators (IBM Validated, Security Reviewed, etc.)

### 2. Recommended Starters Section

- 3 curated high-confidence solutions
- Setup time estimates (2-5 minutes)
- Social proof (ratings, usage stats)
- Direct "Start Now" buttons

### 3. Value Propositions

- 4-card grid explaining catalog benefits
- Pre-Built & Validated
- Enterprise Governance
- Ecosystem Partners
- Continuous Updates

### 4. Intent-Based Navigation

Replaces technical sidebar with outcome categories:

- 🎯 Get Started
- 📊 Analyze & Summarize
- 🔗 Connect & Integrate
- 🤝 Support & Service
- 📝 Create & Document
- 🔍 Search & Discover
- ⚙️ Automate Workflows

### 5. Enhanced Solution Cards

- Intent badges (not technical types)
- Collapsible "What it does" preview
- Direct action buttons (Try Now, Add to Workspace)
- Trust signals (validation, ratings, usage)
- Provider and update information

## How to Test

### Option 1: Manual Testing

**Test Variant A (Control):**

```
Open: agent-catalog.html
```

**Test Variant B (Treatment):**

```
Open: agent-catalog-v2.html
```

### Option 2: A/B Test Mode (Recommended)

The A/B test controller automatically assigns users to variants:

1. **First Visit**: User is randomly assigned to Variant A or B (50/50 split)
2. **Persistence**: Assignment is stored in localStorage
3. **Consistency**: User sees the same variant on subsequent visits

**To enable A/B testing:**

Add this script tag to both HTML files (already included in agent-catalog-v2.html):

```html
<script src="v2.0-ab-test.js"></script>
```

### Testing Commands

Open browser console and use these commands:

```javascript
// View current variant assignment
abTest.assignedVariant; // Returns 'A' or 'B'

// View test results
abTest.getTestResults();

// Export events for analysis
abTest.exportEvents();

// Clear test data and reassign
abTest.clearTestData();
```

## Tracked Events

The A/B test controller tracks these events:

### Navigation Events

- `page_view` - Page loads
- `intent_category_clicked` - User clicks intent category (Variant B)
- `search_performed` - User performs search
- `search_suggestion_clicked` - User clicks search suggestion (Variant B)

### Engagement Events

- `card_preview_toggled` - User expands/collapses card preview (Variant B)
- `try_now_clicked` - User clicks "Try Now" button
- `add_to_workspace_clicked` - User clicks "Add to Workspace"

### Conversion Events

- `agent_adopted` - User successfully adds agent
  - Includes: agent_id, agent_name, source, time_to_adoption

### Session Events

- `ab_test_assigned` - User assigned to variant
- `session_end` - Session ends (page unload)

## Success Metrics

### Primary Metric

- **Time to First Agent Adoption**: Target < 5 minutes (vs. ~10 min baseline)

### Secondary Metrics

| Metric              | Variant A (Expected) | Variant B (Target) | Improvement |
| ------------------- | -------------------- | ------------------ | ----------- |
| Bounce Rate         | 45%                  | 25%                | -44%        |
| Pages per Session   | 2.5                  | 4.0                | +60%        |
| Session Duration    | 3 min                | 6 min              | +100%       |
| Agent Adoption Rate | 30%                  | 45%                | +50%        |
| Direct Action Rate  | 10%                  | 60%                | +500%       |

## Test Duration

- **Minimum**: 4 weeks
- **Sample Size**: 1,000+ users per variant
- **Confidence Level**: 95%

## Decision Criteria

### Variant B Wins If:

- Primary metric improves by 30%+
- No degradation in secondary metrics
- Statistical significance achieved (p < 0.05)
- Positive user feedback (NPS > 40)

### Next Steps:

- Gradual rollout to 100% of users
- Continue monitoring for 4 weeks post-rollout
- Document learnings

## Implementation Checklist

### Completed ✅

- [x] Create Variant B HTML (agent-catalog-v2.html)
- [x] Create Variant B CSS (v2.0-styles-variant-b.css)
- [x] Create A/B test controller (v2.0-ab-test.js)
- [x] Implement intent-based navigation
- [x] Create Recommended Starters section
- [x] Enhance solution cards with preview
- [x] Add direct action buttons
- [x] Implement event tracking

### To Do 📋

- [ ] Add A/B test script to original agent-catalog.html
- [ ] Create Variant B home page (v2.0-admin-dashboard-v2.html)
- [ ] Set up analytics dashboard
- [ ] Configure automated reports
- [ ] Deploy to staging for QA
- [ ] Launch to production

## Analytics Integration

To integrate with your analytics service, update the `trackEvent` method in `v2.0-ab-test.js`:

```javascript
trackEvent(eventName, properties = {}) {
  // ... existing code ...

  // Add your analytics service
  if (window.gtag) {
    gtag('event', eventName, eventData);
  }

  if (window.analytics) {
    analytics.track(eventName, eventData);
  }

  // Or your custom analytics
  if (window.yourAnalytics) {
    yourAnalytics.track(eventName, eventData);
  }
}
```

## Debugging

### View All Events

```javascript
JSON.parse(localStorage.getItem("ab_test_events"));
```

### View Variant Assignment

```javascript
localStorage.getItem("ab_test_catalog-solution-first-v1");
```

### Clear All Test Data

```javascript
localStorage.removeItem("ab_test_catalog-solution-first-v1");
localStorage.removeItem("ab_test_events");
localStorage.removeItem("first_page_view_time");
location.reload();
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Known Limitations

1. **localStorage Dependency**: Test assignment stored in localStorage (cleared if user clears browser data)
2. **Single Device**: Assignment is per-device, not per-user account
3. **No Server-Side Tracking**: Events stored locally only (integrate with analytics service for production)

## Support

For questions or issues:

1. Check browser console for error messages
2. Use `abTest.getTestResults()` to view current state
3. Export events with `abTest.exportEvents()` for analysis

## License

Internal IBM watsonx Orchestrate project
