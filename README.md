# watsonx Orchestrate - Day Zero

A modern admin dashboard for watsonx Orchestrate with AI-powered chat interface.

## 🚀 Quick Start

1. Start the local server:

   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser to:
   ```
   http://localhost:8000
   ```

The index page will automatically redirect to the v2.0 Admin Dashboard.

## 📁 Project Structure

```
wxo-dayzero/
├── v2-dashboard/           # Current v2.0 implementation
│   ├── v2.0-admin-dashboard.html
│   ├── v2.0-sidebar-chat.html
│   ├── v2.0-app.js
│   ├── v2.0-styles.css
│   └── v2.0-carbon-icons-fix.js
├── assets/                 # Shared resources
│   ├── icons/             # SVG icons and graphics
│   ├── images/            # Images and photos
│   └── fonts/             # Custom fonts
├── docs/                   # Documentation and research
│   ├── research/          # Research documents and analysis
│   │   ├── 1.md - 5.md
│   │   ├── Competitor_Analysis.md
│   │   ├── Design_Rationale.md
│   │   ├── Executive_Summary.md
│   │   ├── Interview_Analysis_Report.md
│   │   └── Stakeholder_Feedback_Analysis.md
│   ├── room-guide/        # Room guide documentation
│   ├── executive-summary.html
│   ├── research-insights.html
│   └── research-insights-transcripts.html
├── archive/                # Legacy v1.x versions
│   ├── v1.0-persona-chat-onboarding.html
│   ├── v1.2-persona-domain-onboarding.html
│   ├── v1.3-simplified.html
│   ├── v1.4-jobs-first.html
│   ├── app-v1.3.js
│   ├── app-v1.4.js
│   ├── styles.css
│   └── dont-delete.html.backup
├── index.html             # Entry point (redirects to v2.0)
└── README.md              # This file
```

## ✨ Features

### v2.0 Admin Dashboard

- **Modern UI**: Built with IBM Carbon Design System principles
- **AI Chat Sidebar**: Integrated chat interface with quick starters
- **User Menu**: Dropdown menu with settings and preferences
- **Black & White Mode**: Toggle grayscale filter for accessibility
- **Responsive Design**: Works on desktop and mobile devices
- **Dashboard Sections**:
  - Welcome header with quick actions
  - Jump back in (recent items)
  - Agent management cards
  - Alerts and notifications
  - Platform analytics
  - Agent analytics

### Black & White Mode

- Accessible grayscale filter for the entire UI
- Toggle switch in user menu
- Persists across sessions using localStorage
- Automatically applies to all future UI changes

## 🛠️ Technologies

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactivity
- **Carbon Icons**: IBM Carbon Design System icons via CDN
- **IBM Plex Sans**: Typography

## 📝 Development Notes

### Adding New Features

All new development should be done in the `v2-dashboard/` directory. The v2.0 files include:

- Modular JavaScript with clear separation of concerns
- CSS following Carbon Design System guidelines
- Accessible HTML with proper ARIA labels

### File Naming Convention

- `v2.0-*.html` - HTML pages
- `v2.0-*.css` - Stylesheets
- `v2.0-*.js` - JavaScript files

## 🗂️ Archive

The `archive/` folder contains previous versions (v1.0 - v1.4) for reference. These are no longer actively maintained but kept for historical purposes.

## 📚 Documentation

- **Documentation**: See `docs/` folder for all documentation including research, insights, and guides

## 🎨 Design System

This project follows IBM Carbon Design System guidelines:

- Typography: IBM Plex Sans
- Color palette: Carbon color tokens
- Spacing: 8px grid system
- Components: Carbon-inspired UI elements

## 🔧 Maintenance

To update the project:

1. Make changes in `v2-dashboard/` directory
2. Test locally with `python3 -m http.server 8000`
3. Commit changes to git
4. Deploy to production

## 📄 License

Internal IBM project - All rights reserved.

---

**Last Updated**: April 23, 2026
**Version**: 2.0
**Maintainer**: IBM watsonx Orchestrate Team
