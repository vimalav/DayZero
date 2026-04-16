// Persona Selection Component

import { setState, getState } from "../core/state.js";
import { goToAssessment, goToDashboard } from "../core/router.js";
import {
  $,
  $$,
  onAll,
  addClass,
  removeClass,
  enable,
  disable,
} from "../utils/dom.js";

export class PersonaSelector {
  constructor() {
    this.selectedPersona = null;
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Persona card selection
    onAll(".persona-card", "click", (e) => {
      const card = e.currentTarget;
      this.selectPersona(card);
    });

    // Continue button
    const continueBtn = $("#continueBtn");
    if (continueBtn) {
      continueBtn.addEventListener("click", () => this.continue());
    }

    // Assessment button
    const assessmentBtn = $("#assessmentBtn");
    if (assessmentBtn) {
      assessmentBtn.addEventListener("click", () => this.showAssessment());
    }

    // Skip button
    const skipBtn = $("#skipBtn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => this.skip());
    }

    // Role guide button
    const roleGuideBtn = $("#roleGuideBtn");
    if (roleGuideBtn) {
      roleGuideBtn.addEventListener("click", () => this.showRoleGuide());
    }
  }

  selectPersona(card) {
    // Remove selected class from all cards
    $$(".persona-card").forEach((c) => removeClass(c, "selected"));

    // Add selected class to clicked card
    addClass(card, "selected");

    // Get persona from data attribute
    this.selectedPersona = card.dataset.persona;
    setState("selectedPersona", this.selectedPersona);

    // Enable continue button
    enable("#continueBtn");
  }

  continue() {
    if (!this.selectedPersona) return;
    goToDashboard();
  }

  showAssessment() {
    goToAssessment();
  }

  skip() {
    // Default to builder persona
    setState("selectedPersona", "builder");
    goToDashboard();
  }

  showRoleGuide() {
    alert(
      "Role guide would open here with detailed information about each role, responsibilities, and typical workflows for customer care.",
    );
  }

  reset() {
    this.selectedPersona = null;
    $$(".persona-card").forEach((c) => removeClass(c, "selected"));
    disable("#continueBtn");
  }
}

// Assessment Component
export class Assessment {
  constructor() {
    this.currentQuestion = 1;
    this.answers = { q1: null, q2: null, q3: null };
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Assessment option selection
    onAll(".assessment-option", "click", (e) => {
      const option = e.currentTarget;
      this.selectOption(option);
    });

    // Next button
    const nextBtn = $("#assessmentNextBtn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.next());
    }

    // Back button
    const backBtn = $("#assessmentBackBtn");
    if (backBtn) {
      backBtn.addEventListener("click", () => this.back());
    }
  }

  selectOption(option) {
    const radio = option.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
    }

    // Remove selected class from siblings
    const parent = option.parentElement;
    parent.querySelectorAll(".assessment-option").forEach((opt) => {
      removeClass(opt, "selected");
    });

    // Add selected class
    addClass(option, "selected");

    // Enable next button
    enable("#assessmentNextBtn");
  }

  next() {
    // Save current answer
    const selectedOption = $(`input[name="q${this.currentQuestion}"]:checked`);
    if (selectedOption) {
      this.answers[`q${this.currentQuestion}`] = selectedOption.value;
      setState("assessmentAnswers", this.answers);
    }

    if (this.currentQuestion < 3) {
      // Hide current question
      const currentQ = $(`#question-${this.currentQuestion}`);
      if (currentQ) currentQ.style.display = "none";

      // Show next question
      this.currentQuestion++;
      const nextQ = $(`#question-${this.currentQuestion}`);
      if (nextQ) nextQ.style.display = "block";

      // Update progress
      const progress = $(`#progress-${this.currentQuestion}`);
      if (progress) addClass(progress, "active");

      // Disable next button until selection
      disable("#assessmentNextBtn");

      // Update button text on last question
      if (this.currentQuestion === 3) {
        const nextBtn = $("#assessmentNextBtn");
        if (nextBtn) nextBtn.textContent = "See Recommendation";
      }
    } else {
      this.showResult();
    }
  }

  back() {
    if (this.currentQuestion > 1) {
      // Hide current question
      const currentQ = $(`#question-${this.currentQuestion}`);
      if (currentQ) currentQ.style.display = "none";

      // Show previous question
      this.currentQuestion--;
      const prevQ = $(`#question-${this.currentQuestion}`);
      if (prevQ) prevQ.style.display = "block";

      // Update button text
      const nextBtn = $("#assessmentNextBtn");
      if (nextBtn) nextBtn.textContent = "Next";
    }
  }

  showResult() {
    // Calculate scores
    const scores = { admin: 0, builder: 0, sme: 0 };
    Object.values(this.answers).forEach((answer) => {
      if (answer) scores[answer]++;
    });

    // Find recommended role
    const recommended = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b,
    );

    setState("selectedPersona", recommended);

    // Role names and reasons
    const roleNames = {
      admin: "⚙️ Admin",
      builder: "🔨 Builder",
      sme: "💡 Subject Matter Expert",
    };

    const roleReasons = {
      admin:
        "Based on your answers, you're focused on platform management and enabling your team. The Admin role will help you set up integrations and manage access for customer care agents.",
      builder:
        "Based on your answers, you're focused on solving customer care challenges. The Builder role will help you create agents that reduce tickets, speed up inquiries, and automate processes.",
      sme: "Based on your answers, you're focused on ensuring quality and accuracy. The SME role will help you validate customer care agents and provide expert feedback.",
    };

    // Update result screen
    const roleEl = $("#recommended-role");
    if (roleEl) roleEl.textContent = roleNames[recommended];

    const reasonEl = $("#recommendation-reason");
    if (reasonEl) reasonEl.textContent = roleReasons[recommended];

    // Show result screen
    import("../core/router.js").then(({ showScreen }) => {
      showScreen("assessmentResult");
    });
  }

  acceptRecommendation() {
    goToDashboard();
  }

  reset() {
    this.currentQuestion = 1;
    this.answers = { q1: null, q2: null, q3: null };

    // Reset UI
    for (let i = 1; i <= 3; i++) {
      const q = $(`#question-${i}`);
      if (q) q.style.display = i === 1 ? "block" : "none";
    }

    $$(".assessment-option").forEach((opt) => removeClass(opt, "selected"));
    $$('input[type="radio"]').forEach((radio) => (radio.checked = false));
    disable("#assessmentNextBtn");
  }
}

// Made with Bob
