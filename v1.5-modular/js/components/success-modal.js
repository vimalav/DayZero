/**
 * Success Modal Component
 * Displays connection success with confetti animation and tool preview
 */

import { getState, setState } from "../core/state.js";
import { $, $$, hide, show } from "../utils/dom.js";
import { createConfetti } from "../utils/animations.js";

/**
 * SuccessModal class - Manages connection success display
 */
export class SuccessModal {
  constructor() {
    this.connection = null;
    this.toolCount = 18; // Mock count - in real app, from API
  }

  /**
   * Show success modal with confetti
   */
  show(connection) {
    this.connection = connection;
    const appName = connection ? connection.name : "App";

    const modalTitle = $("#connectionModalTitle");
    const modalContent = $("#connectionModalContent");

    if (!modalTitle || !modalContent) return;

    // Update title with success message
    modalTitle.innerHTML = `
      Great work! You've unlocked ${this.toolCount} tools 🎉
      <div class="success-subtitle">Your ${appName} connection is ready!</div>
    `;

    // Trigger confetti animation
    setTimeout(() => {
      this.triggerConfetti();
    }, 100);

    // Render success content
    modalContent.innerHTML = this.renderSuccessContent(appName);

    // Attach event listeners
    this.attachEventListeners();
  }

  /**
   * Render success content
   */
  renderSuccessContent(appName) {
    return `
      <div class="connection-success-container">
        <div class="connection-success-content">
          
          <!-- Tool Preview Section -->
          <div class="tool-preview-section">
            <div class="tool-preview-header">
              <div class="tool-preview-title">
                <h3>Preview connected tools</h3>
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" class="launch-icon">
                  <path d="M26 28H6a2 2 0 01-2-2V6a2 2 0 012-2h9v2H6v20h20v-9h2v9a2 2 0 01-2 2z"/>
                  <path d="M21 2v2h5.59L13.3 17.29l1.41 1.41L28 5.41V11h2V2h-9z"/>
                </svg>
              </div>
              <span class="tool-count">${this.toolCount} tools</span>
            </div>
            
            <div class="tool-preview-grid">
              ${this.renderToolCards(appName)}
            </div>
            
            <div class="tool-preview-more">
              <span>+ ${this.toolCount - 4} more tools available</span>
            </div>
          </div>
          
          <!-- What's Next Card -->
          <div class="connection-success-card">
            <div class="success-card-header">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
              </svg>
              <h3>What's next?</h3>
            </div>
            <ul class="success-card-list">
              <li>
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                  <circle cx="16" cy="16" r="4" fill="currentColor"/>
                </svg>
                <span>Start building your first agent using ${appName} tools</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                  <circle cx="16" cy="16" r="4" fill="currentColor"/>
                </svg>
                <span>Test your agent in the draft environment</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
                  <circle cx="16" cy="16" r="4" fill="currentColor"/>
                </svg>
                <span>When ready, configure live credentials to deploy</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <!-- Footer Actions -->
        <div class="connection-success-footer">
          <button class="btn-ghost" id="connectAnotherBtn">Connect another app</button>
          <button class="btn-primary" id="buildAgentBtn">
            Build an agent with these tools
            <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" style="margin-left: 8px;">
              <path d="M16 8l-1.43 1.393L20.15 15H8v2h12.15l-5.58 5.573L16 24l8-8-8-8z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render tool preview cards
   */
  renderToolCards(appName) {
    const tools = [
      {
        name: "Get Customer Data",
        description: "Retrieve customer information and history",
        icon: `<path d="M26 24v4H6v-4H4v4a2 2 0 002 2h20a2 2 0 002-2v-4zM26 14l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10 10-10z"/>`,
      },
      {
        name: "Create Records",
        description: `Add new records to ${appName}`,
        icon: `<path d="M28 6H4a2 2 0 00-2 2v16a2 2 0 002 2h24a2 2 0 002-2V8a2 2 0 00-2-2zm0 18H4V8h24z"/><path d="M7 11h10v2H7zM7 15h14v2H7zM7 19h10v2H7z"/>`,
      },
      {
        name: "Update Information",
        description: "Modify existing records and data",
        icon: `<path d="M27.6 20.6L24 24.2V4h-2v20.2l-3.6-3.6L17 22l6 6 6-6-1.4-1.4zM9 4l-6 6 1.4 1.4L8 7.8V28h2V7.8l3.6 3.6L15 10 9 4z"/>`,
      },
      {
        name: "Search & Filter",
        description: "Find specific records using queries",
        icon: `<path d="M22 16h2v6h-2zM8 16h2v6H8z"/><path d="M30 8h-4V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2H2v2h4v14a2 2 0 002 2h16a2 2 0 002-2V10h4zM8 6h16v2H8zm16 20H8V10h16z"/>`,
      },
    ];

    return tools
      .map(
        (tool) => `
      <div class="tool-preview-card" data-tool-name="${tool.name}" data-tool-description="${tool.description}">
        <div class="tool-card-icon">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
            ${tool.icon}
          </svg>
        </div>
        <div class="tool-card-content">
          <h4>${tool.name}</h4>
          <p>${tool.description}</p>
        </div>
      </div>
    `,
      )
      .join("");
  }

  /**
   * Trigger confetti animation
   */
  triggerConfetti() {
    const modal = $(".connection-modal");
    if (!modal) return;

    createConfetti(modal, {
      count: 50,
      colors: ["#0f62fe", "#24a148", "#8a3ffc", "#ff832b"],
      duration: 4000,
    });
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Tool preview cards - open chat panel
    $$(".tool-preview-card").forEach((card) => {
      card.addEventListener("click", () => {
        const toolName = card.dataset.toolName;
        const toolDescription = card.dataset.toolDescription;
        this.openToolChat(toolName, toolDescription);
      });
    });

    // Connect another app button
    const connectAnotherBtn = $("#connectAnotherBtn");
    if (connectAnotherBtn) {
      connectAnotherBtn.addEventListener("click", () => {
        this.connectAnother();
      });
    }

    // Build agent button
    const buildAgentBtn = $("#buildAgentBtn");
    if (buildAgentBtn) {
      buildAgentBtn.addEventListener("click", () => {
        this.buildAgent();
      });
    }
  }

  /**
   * Open tool chat panel
   */
  openToolChat(toolName, toolDescription) {
    // Import and show chat panel
    import("./chat-panel.js").then((module) => {
      const chatPanel = new module.ChatPanel();
      chatPanel.show(toolName, toolDescription, this.connection);
    });
  }

  /**
   * Connect another app
   */
  connectAnother() {
    // Close current modal and reopen connection modal
    import("./connection-modal.js").then((module) => {
      module.connectionModal.show();
    });
  }

  /**
   * Build agent with tools
   */
  buildAgent() {
    // Close modal and navigate to agent builder
    const modal = $("#connectionModal");
    if (modal) {
      hide(modal);
      modal.style.display = "none";
      document.body.style.overflow = "";
    }

    // In a real app, this would navigate to the agent builder
    alert(
      "Launching Agent Builder...\n\n" +
        `You can now build agents using the ${this.connection?.name || "connected"} tools.\n\n` +
        "This would open the agent builder interface.",
    );
  }

  /**
   * Close the success modal
   */
  close() {
    const modal = $("#connectionModal");
    if (modal) {
      hide(modal);
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }
}

// Create singleton instance
export const successModal = new SuccessModal();

// Expose to window for inline event handlers (temporary)
if (typeof window !== "undefined") {
  window.successModal = successModal;
}

// Made with Bob
