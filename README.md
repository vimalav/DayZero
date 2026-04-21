# watsonx Orchestrate - Day Zero Prototypes

Interactive prototypes exploring onboarding experiences for watsonx Orchestrate.

## 🎯 Quick Start

**Live Demo:** [https://vimalav.github.io/DayZero/](https://vimalav.github.io/DayZero/)

Or open any HTML file locally in your browser - no build process required.

## 📋 Current Versions

### v1.4 - Jobs First ⭐ LATEST

**File:** [`v1.4-jobs-first.html`](v1.4-jobs-first.html)

**Design Philosophy:** "Jobs-to-be-done first, connections second"

**Key Features:**

- Enhanced connection flow with auto-populate connection ID
- Dynamic subdomain population based on selected app
- Carbon Design System icons throughout
- Consistent modal heights (80vh)
- Interactive success page with confetti animation
- Tool preview with sliding chat panel
- Working demo: quick action shows typing indicator and data table response
- Reordered content flow: Tool Preview → What's next → Action buttons

**Why This Works:**

- Focuses on user's job to be done first
- Streamlined connection setup with smart defaults
- Interactive tool demonstrations show immediate value
- Validated by user research and design iterations

---

### v1.3 - Simplified

**File:** [`v1.3-simplified.html`](v1.3-simplified.html)

**Focus:** Streamlined onboarding experience with reduced complexity

---

### v1.2 - Persona Domain

**File:** [`v1.2-persona-domain-onboarding.html`](v1.2-persona-domain-onboarding.html)

**Focus:** Persona-based onboarding with domain-specific guidance

---

### v1.0 - Persona Chat

**File:** [`v1.0-persona-chat-onboarding.html`](v1.0-persona-chat-onboarding.html)

**Focus:** Initial persona-based onboarding with conversational interface

---

## 📚 Documentation

### Research & Insights

- **[research-insights.html](research-insights.html)** - Comprehensive insights webpage
  - User research findings
  - Key insights and recommendations
  - Persona-specific needs

- **[research-insights-transcripts.html](research-insights-transcripts.html)** - Detailed interview transcripts

- **[executive-summary.html](executive-summary.html)** - High-level project overview

### Research Files

- **[research/Interview_Analysis_Report.md](research/Interview_Analysis_Report.md)** - Analysis of user interviews
- **[research/Design_Rationale.md](research/Design_Rationale.md)** - Design principles and rationale
- **[research/Stakeholder_Feedback_Analysis.md](research/Stakeholder_Feedback_Analysis.md)** - Stakeholder synthesis
- **[research/Competitor_Analysis.md](research/Competitor_Analysis.md)** - Competitive analysis
- **[research/Executive_Summary.md](research/Executive_Summary.md)** - Executive summary (markdown)

---

## 🔑 Key Design Principles

### 1. Jobs-to-be-Done First

Focus on what users want to accomplish before diving into technical setup.

### 2. Progressive Disclosure

Show information when needed, not all at once. Guide users step-by-step.

### 3. Smart Defaults

Auto-populate fields and suggest common configurations to reduce friction.

### 4. Immediate Value

Show users what they'll get before asking them to do work. Tool previews and demos build confidence.

### 5. Contextual Help

Provide assistance exactly when and where users need it.

---

## 📁 Project Structure

```
.
├── index.html                              # Version selector landing page
├── v1.4-jobs-first.html                    # Latest version ⭐
├── v1.3-simplified.html                    # Simplified flow
├── v1.2-persona-domain-onboarding.html     # Persona + domain
├── v1.0-persona-chat-onboarding.html       # Original persona flow
├── app-v1.4.js                             # JavaScript for v1.4
├── styles.css                              # Shared styles
├── executive-summary.html                  # Executive overview
├── research-insights.html                  # Research findings
├── research-insights-transcripts.html      # Interview transcripts
├── README.md                               # This file
└── research/                               # Research documentation
    ├── Interview_Analysis_Report.md
    ├── Design_Rationale.md
    ├── Stakeholder_Feedback_Analysis.md
    ├── Competitor_Analysis.md
    ├── Executive_Summary.md
    └── 1.md - 5.md                         # Interview transcripts
```

---

## 🚀 Development

### Local Development

Simply open any HTML file in your browser. No build process required.

### Deployment

The project is deployed to GitHub Pages at: https://vimalav.github.io/DayZero/

To update the live site:

1. Make changes to files
2. Commit to `main` branch
3. Merge `main` into `gh-pages` branch
4. Push `gh-pages` to GitHub

---

## 📊 Version History

| Version | Focus            | Key Innovation                                          |
| ------- | ---------------- | ------------------------------------------------------- |
| v1.4    | Jobs First       | AI chat panel, nav drawer, connection settings workflow |
| v1.3    | Simplified       | Reduced complexity                                      |
| v1.2    | Persona + Domain | Two-dimensional personalization                         |
| v1.0    | Persona + Chat   | Conversational guidance                                 |

---

**Last Updated:** April 20, 2026
**Current Version:** v1.4 (Jobs First)
**Status:** Active prototype with updated navigation and connection settings flow
