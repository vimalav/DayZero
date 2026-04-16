/**
 * Main Application Orchestrator
 * Initializes and coordinates all components
 */

import { initState, getState, setState, subscribe } from "./core/state.js";
import {
  showScreen,
  goToPersonaSelection,
  goToAssessment,
  goToDashboard,
} from "./core/router.js";
import { personaSelector, assessment } from "./components/persona-selector.js";
import { jobCards } from "./components/job-cards.js";
import { connectionModal } from "./components/connection-modal.js";
import { $, $$, hide, show } from "./utils/dom.js";

/**
 * Main Application class
 */
class App {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    if (this.initialized) return;

    console.log("🚀 Initializing watsonx Orchestrate v1.5...");

    // Initialize state
    initState();

    // Set up global event listeners
    this.setupGlobalListeners();

    // Initialize persona selector
    personaSelector.init();

    // Subscribe to state changes
    this.subscribeToStateChanges();

    // Show persona selection screen
    goToPersonaSelection();

    this.initialized = true;
    console.log("✅ Application initialized successfully");
  }

  /**
   * Set up global event listeners
   */
  setupGlobalListeners() {
    // Close modals on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.handleEscapeKey();
      }
    });

    // Close modals on overlay click
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        this.handleOverlayClick(e.target);
      }
    });

    // Handle browser back/forward
    window.addEventListener("popstate", (e) => {
      this.handlePopState(e);
    });
  }

  /**
   * Subscribe to state changes
   */
  subscribeToStateChanges() {
    // Listen for persona selection
    subscribe("selectedPersona", (persona) => {
      console.log("Persona selected:", persona);
      this.handlePersonaChange(persona);
    });

    // Listen for domain selection
    subscribe("selectedDomain", (domain) => {
      console.log("Domain selected:", domain);
    });

    // Listen for job selection
    subscribe("selectedJob", (jobId) => {
      console.log("Job selected:", jobId);
    });
  }

  /**
   * Handle persona change
   */
  handlePersonaChange(persona) {
    if (!persona) return;

    // Update UI based on persona
    const badge = $("#personaBadge");
    if (badge) {
      const personaLabels = {
        builder: "🔨 BUILDER",
        admin: "⚙️ ADMIN",
        sme: "💡 SME",
      };
      badge.textContent = `${personaLabels[persona]} • 🎧 CUSTOMER CARE`;
    }

    // Render appropriate content
    this.renderPersonaContent(persona);
  }

  /**
   * Render content based on persona
   */
  renderPersonaContent(persona) {
    const mainContent = $("#mainContent");
    if (!mainContent) return;

    // For builder and SME, show job cards
    if (persona === "builder" || persona === "sme") {
      jobCards.render(persona);
    }
    // For admin, show setup cards (handled by persona-specific logic)
    else if (persona === "admin") {
      // Admin setup cards would be rendered here
      // For now, we can show a placeholder or connection setup
      this.renderAdminContent();
    }
  }

  /**
   * Render admin-specific content
   */
  renderAdminContent() {
    const mainContent = $("#mainContent");
    if (!mainContent) return;

    mainContent.innerHTML = `
      <div class="getting-started-grid">
        <div class="getting-started-card priority" onclick="window.app.showConnectionSetup()">
          <div class="getting-started-card-header">
            <h3 class="getting-started-card-title">Connect your apps</h3>
            <span class="getting-started-card-badge">Start here</span>
          </div>
          <p class="getting-started-card-description">
            Set up integrations with your customer care tools
          </p>
          <div class="getting-started-card-meta">
            <span>⚡ Quick setup</span>
            <span>🔧 5-10 min</span>
          </div>
        </div>

        <div class="getting-started-card">
          <div class="getting-started-card-header">
            <h3 class="getting-started-card-title">Configure models</h3>
          </div>
          <p class="getting-started-card-description">
            Set up AI models for your agents
          </p>
          <div class="getting-started-card-meta">
            <span>🤖 AI setup</span>
          </div>
        </div>

        <div class="getting-started-card">
          <div class="getting-started-card-header">
            <h3 class="getting-started-card-title">Manage users</h3>
          </div>
          <p class="getting-started-card-description">
            Add team members and set permissions
          </p>
          <div class="getting-started-card-meta">
            <span>👥 Team</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Show connection setup modal
   */
  showConnectionSetup(domain) {
    connectionModal.show(domain || getState("selectedDomain"));
  }

  /**
   * Handle Escape key press
   */
  handleEscapeKey() {
    // Close any open modals
    const modals = $$(".modal-overlay");
    modals.forEach((modal) => {
      if (modal.style.display !== "none") {
        hide(modal);
        modal.style.display = "none";
      }
    });

    // Close connection modal specifically
    const connectionModalEl = $("#connectionModal");
    if (connectionModalEl && connectionModalEl.style.display === "flex") {
      connectionModal.close();
    }
  }

  /**
   * Handle overlay click
   */
  handleOverlayClick(overlay) {
    // Close the modal
    hide(overlay);
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }

  /**
   * Handle browser back/forward
   */
  handlePopState(event) {
    // Handle navigation state
    const state = event.state;
    if (state && state.screen) {
      showScreen(state.screen);
    }
  }

  /**
   * Navigate to a specific screen
   */
  navigateTo(screen) {
    showScreen(screen);
  }

  /**
   * Show assessment
   */
  showAssessment() {
    goToAssessment();
  }

  /**
   * Skip onboarding
   */
  skipOnboarding() {
    // Set a default persona or go directly to dashboard
    setState("selectedPersona", "builder");
    goToDashboard();
  }

  /**
   * Show role guide
   */
  showRoleGuide() {
    alert(
      "Role Guide\n\n" +
        "🔨 Builder: Create and configure AI agents for customer care\n" +
        "⚙️ Admin: Manage platform, connections, and team access\n" +
        "💡 SME: Validate agents and ensure quality responses\n\n" +
        "Choose the role that best matches your primary responsibility.",
    );
  }

  /**
   * Toggle chat panel
   */
  toggleChat() {
    const chatPanel = $("#chatPanel");
    if (chatPanel) {
      chatPanel.classList.toggle("open");
    }
  }

  /**
   * Handle chat suggestion click
   */
  handleChatSuggestion(suggestion) {
    const chatInput = $("#chatInput");
    const chatMessages = $("#chatMessages");

    if (!chatInput || !chatMessages) return;

    // Add user message
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message";
    userMessage.innerHTML = `
      <div class="chat-avatar" style="background: #8d8d8d;">You</div>
      <div class="chat-content">
        <div class="chat-source">You</div>
        <div class="chat-text">${suggestion}</div>
      </div>
    `;
    chatMessages.appendChild(userMessage);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = document.createElement("div");
      aiMessage.className = "chat-message";
      aiMessage.innerHTML = `
        <div class="chat-avatar">🤖</div>
        <div class="chat-content">
          <div class="chat-source">Control Plane Agent</div>
          <div class="chat-text">
            I can help you with that! Let me guide you through the process...
          </div>
        </div>
      `;
      chatMessages.appendChild(aiMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Create and initialize app instance
const app = new App();

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    app.init();
  });
} else {
  app.init();
}

// Expose app instance globally for debugging and inline handlers
window.app = app;

// Export for module usage
export default app;

// Made with Bob
