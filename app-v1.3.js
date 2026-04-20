// watsonx Orchestrate v1.3 - Simplified Domain Personalization
// Minimal JavaScript for persona and domain selection flow

// State
let selectedPersona = null;
let selectedDomain = null;

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializePersonaSelection();
  initializeDomainSelection();
});

// ===== PERSONA SELECTION =====

function initializePersonaSelection() {
  const personaCards = document.querySelectorAll(".persona-card");
  const continueBtn = document.getElementById("continueBtn");

  personaCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove selected class from all cards
      personaCards.forEach((c) => c.classList.remove("selected"));

      // Add selected class to clicked card
      card.classList.add("selected");

      // Store selected persona
      selectedPersona = card.dataset.persona;

      // Enable continue button
      if (continueBtn) {
        continueBtn.disabled = false;
      }
    });
  });
}

function continueToLanding() {
  if (!selectedPersona) return;

  // Hide persona screen, show domain screen
  document.getElementById("personaScreen").style.display = "none";
  document.getElementById("domainScreen").style.display = "block";
}

function showAssessment() {
  // Hide persona screen, show assessment screen
  document.getElementById("personaScreen").style.display = "none";
  document.getElementById("assessmentScreen").style.display = "block";
}

function showRoleGuide() {
  alert(
    "Role guide would open here with detailed information about each role, responsibilities, and typical workflows.",
  );
}

function skipOnboarding() {
  // Default to builder persona and skip to main app
  selectedPersona = "builder";
  selectedDomain = "customercare";
  goToMainApp();
}

// ===== ASSESSMENT =====

let currentQuestion = 1;
const assessmentAnswers = {};

function nextAssessmentQuestion() {
  // Store answer for current question
  const selectedOption = document.querySelector(".assessment-option.selected");
  if (selectedOption) {
    assessmentAnswers[`q${currentQuestion}`] = selectedOption.dataset.value;
  }

  if (currentQuestion < 3) {
    // Move to next question
    document.getElementById(`question${currentQuestion}`).style.display =
      "none";
    currentQuestion++;
    document.getElementById(`question${currentQuestion}`).style.display =
      "block";

    // Update progress
    document.querySelectorAll(".progress-step").forEach((step, index) => {
      if (index < currentQuestion) {
        step.classList.add("completed");
      }
    });

    // Disable next button until option selected
    document.getElementById("assessmentNextBtn").disabled = true;
  } else {
    // Show results
    showAssessmentResults();
  }
}

function showAssessmentResults() {
  document.getElementById("assessmentScreen").style.display = "none";
  document.getElementById("assessmentResultScreen").style.display = "block";

  // Simple logic: recommend based on answers
  // This is a placeholder - real logic would be more sophisticated
  const recommendation = "builder";
  selectedPersona = recommendation;

  document.getElementById("recommendedRole").textContent =
    recommendation.charAt(0).toUpperCase() + recommendation.slice(1);
}

function backToPersona() {
  // Reset and go back to persona selection
  document.getElementById("assessmentScreen").style.display = "none";
  document.getElementById("assessmentResultScreen").style.display = "none";
  document.getElementById("personaScreen").style.display = "block";

  currentQuestion = 1;
  Object.keys(assessmentAnswers).forEach(
    (key) => delete assessmentAnswers[key],
  );
}

function acceptRecommendation() {
  // Accept the recommended persona and continue to domain selection
  continueToLanding();
}

// Assessment option selection
document.addEventListener("DOMContentLoaded", () => {
  const assessmentOptions = document.querySelectorAll(".assessment-option");
  assessmentOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Remove selected from siblings
      option.parentElement
        .querySelectorAll(".assessment-option")
        .forEach((opt) => {
          opt.classList.remove("selected");
        });

      // Add selected to clicked option
      option.classList.add("selected");

      // Enable next button
      const nextBtn = document.getElementById("assessmentNextBtn");
      if (nextBtn) {
        nextBtn.disabled = false;
      }
    });
  });
});

// ===== DOMAIN SELECTION =====

function initializeDomainSelection() {
  const domainCards = document.querySelectorAll(".domain-card");
  const domainContinueBtn = document.getElementById("domainContinueBtn");

  domainCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove selected class from all cards
      domainCards.forEach((c) => c.classList.remove("selected"));

      // Add selected class to clicked card
      card.classList.add("selected");

      // Store selected domain
      selectedDomain = card.dataset.domain;

      // Enable continue button
      if (domainContinueBtn) {
        domainContinueBtn.disabled = false;
      }
    });
  });
}

function continueWithDomain() {
  if (!selectedDomain) return;
  goToMainApp();
}

function skipDomainSelection() {
  // Default to customer care domain
  selectedDomain = "customercare";
  goToMainApp();
}

function backFromDomain() {
  // Go back to persona selection
  document.getElementById("domainScreen").style.display = "none";
  document.getElementById("personaScreen").style.display = "block";
}

// ===== MAIN APP =====

function goToMainApp() {
  // Hide persona overlay
  document.getElementById("personaOverlay").classList.add("hidden");

  // Show main app content
  document.getElementById("appContent").style.display = "flex";

  // Update UI based on persona and domain
  updateMainAppContent();
}

function updateMainAppContent() {
  const heroContent = document.getElementById("heroContent");
  const mainContent = document.getElementById("mainContent");

  // Persona labels
  const personaLabels = {
    builder: "🔨 Builder",
    admin: "⚙️ Admin",
    sme: "💡 SME",
  };

  // Domain labels
  const domainLabels = {
    customercare: "🎧 Customer Care",
    hr: "👥 HR",
    finance: "💰 Finance",
  };

  // Update hero section
  if (heroContent) {
    heroContent.innerHTML = `
      <h1>Welcome, ${personaLabels[selectedPersona] || "User"}!</h1>
      <p class="subtitle">Let's solve ${domainLabels[selectedDomain] || "business"} challenges with AI agents</p>
    `;
  }

  // Update main content based on persona
  if (mainContent) {
    if (selectedPersona === "admin") {
      mainContent.innerHTML = `
        <div class="getting-started-section">
          <h2>Get Started</h2>
          <div class="getting-started-grid">
            <div class="getting-started-card priority">
              <div class="getting-started-card-header">
                <h3>Connect your apps</h3>
                <span class="getting-started-card-badge">Start here</span>
              </div>
              <p>Set up integrations with your ${domainLabels[selectedDomain]} tools</p>
              <div class="getting-started-card-meta">
                <span>⚡ Quick setup</span>
                <span>🔧 5-10 min</span>
              </div>
            </div>
            
            <div class="getting-started-card">
              <div class="getting-started-card-header">
                <h3>Configure models</h3>
              </div>
              <p>Set up AI models for your agents</p>
              <div class="getting-started-card-meta">
                <span>🤖 AI setup</span>
              </div>
            </div>
            
            <div class="getting-started-card">
              <div class="getting-started-card-header">
                <h3>Manage users</h3>
              </div>
              <p>Add team members and set permissions</p>
              <div class="getting-started-card-meta">
                <span>👥 Team</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      mainContent.innerHTML = `
        <div class="jobs-section">
          <h2>Popular Jobs</h2>
          <p>Start with these pre-built workflows for ${domainLabels[selectedDomain]}</p>
          <div class="jobs-grid">
            <div class="job-card">
              <h3>Handle Customer Inquiry</h3>
              <p>Automatically route and respond to customer questions</p>
              <button class="btn-primary">Use this job</button>
            </div>
            <div class="job-card">
              <h3>Process Refund Request</h3>
              <p>Streamline refund approvals and processing</p>
              <button class="btn-primary">Use this job</button>
            </div>
            <div class="job-card">
              <h3>Escalate Complex Issue</h3>
              <p>Intelligently route difficult cases to specialists</p>
              <button class="btn-primary">Use this job</button>
            </div>
          </div>
        </div>
      `;
    }
  }
}

// Made with Bob
