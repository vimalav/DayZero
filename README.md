# watsonx Orchestrate - Onboarding Prototypes

A collection of interactive HTML prototypes exploring persona-based onboarding experiences for watsonx Orchestrate.

## 🎯 Project Overview

This project contains iterative prototypes for the watsonx Orchestrate Day 0 onboarding experience, focusing on persona-based customization and user guidance.

## 📁 Project Structure

```
.
├── README.md                                    # This file
├── VERSION_HISTORY.md                           # Detailed version history and features
├── Interview_Analysis_Report.md                 # User research insights
├── MVP_Day0_Analysis.md                         # MVP analysis and recommendations
├── Mockup_Feedback_Analysis.md                  # Mockup feedback analysis
├── Persona_Based_Onboarding_Specification.md    # Persona specifications
├── Slack_Message_Draft.md                       # Communication draft
│
├── v1.0-research-concept.html                   # Initial research concept
├── v1.1-onboarding-concept.html                 # Onboarding refinement
├── v2.0-persona-based-onboarding.html           # Persona-based approach
├── v2.1-persona-selection-complete.html         # Complete persona selection
├── v3.0-day0-enhanced-with-assessment.html      # Day 0 with assessment
└── v3.1-enhanced-dashboard.html                 # ⭐ LATEST: Enhanced dashboard
```

## ⭐ Latest Version: v3.1

**File:** `v3.1-enhanced-dashboard.html`

### Key Features:

- ✅ **AI Chat Panel** - Control Plane Agent with contextual assistance
- ✅ **Role Switching** - Easy switching between Admin, Builder, and SME roles
- ✅ **Enhanced Persona Selection** - "YOU'LL FOCUS ON" sections with clear responsibilities
- ✅ **Dashboard Experience** - Persona-specific landing pages with action cards
- ✅ **Assessment Flow** - 3-question assessment to recommend the right role
- ✅ **Day 0 Zero-State Handling** - Proper empty states for all personas
- ✅ **Time & Complexity Indicators** - Clear expectations for each action
- ✅ **Client Zero Patterns** - Featured templates for common use cases

### How to View:

1. Open `v3.1-enhanced-dashboard.html` in any modern web browser
2. Select a persona or take the assessment
3. Explore the dashboard and AI chat panel
4. Try the "Change Role" button to switch personas

## 🚀 How to Move This Project and Set Up GitHub

### Step 1: Move the Project Folder

1. **Choose your target location** (e.g., `~/Documents/Projects/` or `~/Developer/`)

2. **Open Terminal** and run:

   ```bash
   # Example: Moving to ~/Documents/Projects/
   mv ~/Desktop/Transcripts ~/Documents/Projects/watsonx-orchestrate-onboarding

   # Or to your preferred location:
   # mv ~/Desktop/Transcripts /path/to/your/desired/location/watsonx-orchestrate-onboarding
   ```

3. **Navigate to the new location:**
   ```bash
   cd ~/Documents/Projects/watsonx-orchestrate-onboarding
   # Or: cd /path/to/your/new/location/watsonx-orchestrate-onboarding
   ```

### Step 2: Initialize Git Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: watsonx Orchestrate onboarding prototypes v3.1"
```

### Step 3: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new

2. **Create a new repository:**
   - Repository name: `watsonx-orchestrate-onboarding`
   - Description: "Interactive prototypes for watsonx Orchestrate persona-based onboarding"
   - Choose Public or Private
   - **DO NOT** initialize with README (we already have one)

3. **Connect your local repository to GitHub:**

   ```bash
   # Replace YOUR_USERNAME with your GitHub username
   git remote add origin https://github.com/YOUR_USERNAME/watsonx-orchestrate-onboarding.git

   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

### Step 4: Enable GitHub Pages (Optional - for live demo)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your prototype will be live at: `https://YOUR_USERNAME.github.io/watsonx-orchestrate-onboarding/v3.1-enhanced-dashboard.html`

## 📤 Sharing with Your Team

### Option 1: Share GitHub Repository URL

```
https://github.com/YOUR_USERNAME/watsonx-orchestrate-onboarding
```

### Option 2: Share Live Demo (if GitHub Pages enabled)

```
https://YOUR_USERNAME.github.io/watsonx-orchestrate-onboarding/v3.1-enhanced-dashboard.html
```

### Option 3: Share Specific Files

Team members can:

1. Clone the repository: `git clone https://github.com/YOUR_USERNAME/watsonx-orchestrate-onboarding.git`
2. Open any HTML file in their browser
3. Review the VERSION_HISTORY.md for detailed documentation

## 📝 Version History

See [`VERSION_HISTORY.md`](VERSION_HISTORY.md) for detailed information about each version, features, and improvements.

### Quick Version Summary:

- **v1.0-v1.1**: Initial concepts
- **v2.0-v2.1**: Persona-based approach with dashboard UI
- **v3.0**: Day 0 enhancements with assessment and zero-state handling
- **v3.1**: ⭐ Enhanced dashboard with AI chat panel and role switching

## 🔄 Making Updates

After making changes to any files:

```bash
# Check what changed
git status

# Add changed files
git add .

# Commit with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## 📊 Research Documents

- **Interview_Analysis_Report.md** - User research insights from 3 interviews
- **MVP_Day0_Analysis.md** - Analysis of MVP mockup and recommendations
- **Mockup_Feedback_Analysis.md** - Detailed feedback on design mockups
- **Persona_Based_Onboarding_Specification.md** - Persona specifications and requirements

## 🛠️ Technical Details

- **Framework:** Pure HTML/CSS/JavaScript (no dependencies)
- **Fonts:** IBM Plex Sans (loaded from Google Fonts)
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Responsive:** Adapts to different screen sizes

## 📧 Contact

For questions or feedback about these prototypes, contact the UX Research Team.

---

**Last Updated:** April 9, 2026  
**Current Version:** v3.1  
**Status:** Ready for team review and feedback
