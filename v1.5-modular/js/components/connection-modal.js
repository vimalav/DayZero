/**
 * Connection Modal Component
 * Handles the connection setup flow with app selection and configuration
 */

import { getState, setState } from "../core/state.js";
import { $, $$, hide, show, addClass, removeClass } from "../utils/dom.js";
import { fadeIn, fadeOut } from "../utils/animations.js";
import { validateForm, sanitizeConnectionId } from "../utils/validators.js";
import { domainConnections, getSubdomainForApp } from "../data/connections.js";
import { environmentEducation } from "../data/environment.js";

/**
 * ConnectionModal class - Manages connection setup workflow
 */
export class ConnectionModal {
  constructor() {
    this.selectedConnectionId = null;
    this.currentConnection = null;
    this.currentStep = 1;
    this.helpPanelVisible = false;
  }

  /**
   * Show the connection modal with app selection
   */
  show(domain) {
    const modal = $("#connectionModal");
    const modalContent = $("#connectionModalContent");

    if (!modal || !modalContent) return;

    // Reset state
    this.selectedConnectionId = null;
    this.currentConnection = null;
    this.currentStep = 1;

    // Get domain-specific connections
    const domainKey = domain || getState("selectedDomain") || "custom";
    const connections = domainConnections[domainKey];

    if (!connections) {
      console.error("No connections found for domain:", domainKey);
      return;
    }

    // Render connection selection view
    modalContent.innerHTML = this.renderConnectionSelection(connections);

    // Show modal
    show(modal);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Attach event listeners
    this.attachSelectionListeners();
  }

  /**
   * Render connection selection view
   */
  renderConnectionSelection(connections) {
    return `
      <div class="connection-modal-container">
        <!-- Optional Help Panel -->
        <div class="connection-help-panel" id="connectionHelpPanel" style="display: none;">
          ${this.renderHelpPanel()}
        </div>

        <!-- Main Content -->
        <div class="connection-main-content" id="connectionMainContent">
          <!-- Search Bar -->
          <div class="connection-search-container">
            <input
              type="text"
              id="connectionSearch"
              class="connection-search-input"
              placeholder="Search for an app or integration..."
            />
            <span class="search-icon">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                <path d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9 9.01 9.01 0 0 1-9-9z"/>
              </svg>
            </span>
          </div>
          
          <!-- Recommended Section -->
          <div class="section-label">
            <h3>Recommended for Customer Care</h3>
          </div>
          
          <!-- OOTB Connections -->
          <div class="ootb-connections" id="ootbConnectionsSection">
            <div class="connections-grid">
              ${connections.ootbConnections
                .map(
                  (conn) => `
                <div class="connection-card" data-connection-id="${conn.id}" data-connection-name="${conn.name.toLowerCase()}">
                  <div class="connection-card-header">
                    <span class="connection-icon">${conn.icon}</span>
                    <div class="connection-title-group">
                      <h4>${conn.name}</h4>
                      <span class="tool-count-badge">Unlock ${conn.toolCount} tools</span>
                    </div>
                  </div>
                  <p>${conn.description}</p>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
          
          <!-- Custom Connection -->
          <div class="custom-connection-section">
            <div class="section-divider"><span>or</span></div>
            <button class="custom-connection-card" id="customConnectionBtn">
              <span class="custom-icon">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1 2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1 2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1 2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51zM25.21 24l-3.43-1.16a8.86 8.86 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.36 9.36 0 0 1-2.7-1.57L6.79 24 4.5 20l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.5 12 6.8 8l3.43 1.16a8.86 8.86 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.36 9.36 0 0 1 2.7 1.57L25.21 8 27.5 12l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.5 20z"/>
                  <path d="M16 22a6 6 0 1 1 6-6 5.94 5.94 0 0 1-6 6zm0-10a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4z"/>
                </svg>
              </span>
              <div class="custom-content">
                <h4>Custom Integration</h4>
                <p>Connect to any REST API or custom system</p>
              </div>
              <span class="arrow-icon">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z"/>
                </svg>
              </span>
            </button>
          </div>
          
          <!-- Modal Actions -->
          <div class="connection-modal-actions">
            <div class="connection-actions-left">
              <a href="${environmentEducation.documentation}" target="_blank" class="persona-btn tertiary">
                View Documentation
              </a>
              <button class="persona-btn tertiary" id="toggleHelpBtn">
                Understanding Draft vs Live
              </button>
            </div>
            <div class="connection-actions-right">
              <button class="persona-btn primary" id="connectionNextBtn" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render help panel content
   */
  renderHelpPanel() {
    return `
      <div class="help-panel-header">
        <div class="help-panel-title">
          <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" style="margin-right: 8px;">
            <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
            <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
          </svg>
          <span style="font-size: 14px; font-weight: 600;">Understanding Environments</span>
        </div>
        <button class="help-panel-close" id="closeHelpBtn" aria-label="Close help panel">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
            <path d="M14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6 4 16l10 10z"/>
          </svg>
        </button>
      </div>
      <div class="help-panel-content">
        <h3>💡 ${environmentEducation.title}</h3>
        <p style="margin-bottom: 16px;">${environmentEducation.description}</p>
        
        <div class="environment-grid">
          ${environmentEducation.environments
            .map(
              (env) => `
            <div class="environment-card">
              <div class="environment-card-header">
                <span style="font-size: 24px;">${env.icon}</span>
                <h4>${env.name}</h4>
              </div>
              <div class="environment-card-purpose">${env.purpose}</div>
              <p>${env.description}</p>
              <ul>
                ${env.features.map((feature) => `<li>${feature}</li>`).join("")}
              </ul>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div style="margin-top: 16px; padding: 12px; background: #f4f4f4; border-radius: 4px;">
          <strong>Recommended Workflow:</strong>
          <ol style="margin: 8px 0 0 20px; padding: 0;">
            ${environmentEducation.workflow.map((step) => `<li style="margin: 4px 0;">${step}</li>`).join("")}
          </ol>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners for connection selection
   */
  attachSelectionListeners() {
    // Connection card selection
    $$(".connection-card").forEach((card) => {
      card.addEventListener("click", () => {
        this.selectConnection(card.dataset.connectionId);
      });
    });

    // Search functionality
    const searchInput = $("#connectionSearch");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.filterConnections(e.target.value);
      });
    }

    // Custom connection button
    const customBtn = $("#customConnectionBtn");
    if (customBtn) {
      customBtn.addEventListener("click", () => {
        this.showCustomConnectionOption();
      });
    }

    // Toggle help panel
    const toggleHelpBtn = $("#toggleHelpBtn");
    if (toggleHelpBtn) {
      toggleHelpBtn.addEventListener("click", () => {
        this.toggleHelpPanel();
      });
    }

    const closeHelpBtn = $("#closeHelpBtn");
    if (closeHelpBtn) {
      closeHelpBtn.addEventListener("click", () => {
        this.toggleHelpPanel();
      });
    }

    // Next button
    const nextBtn = $("#connectionNextBtn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.proceedWithConnection();
      });
    }
  }

  /**
   * Select a connection card
   */
  selectConnection(connectionId) {
    this.selectedConnectionId = connectionId;

    // Update visual selection
    $$(".connection-card").forEach((card) => {
      if (card.dataset.connectionId === connectionId) {
        addClass(card, "selected");
      } else {
        removeClass(card, "selected");
      }
    });

    // Enable next button
    const nextBtn = $("#connectionNextBtn");
    if (nextBtn) {
      nextBtn.disabled = false;
    }
  }

  /**
   * Filter connections based on search term
   */
  filterConnections(searchTerm) {
    const cards = $$(".connection-card");
    const lowerSearch = searchTerm.toLowerCase();

    cards.forEach((card) => {
      const name = card.dataset.connectionName || "";
      const description =
        card.querySelector("p")?.textContent.toLowerCase() || "";

      const matches =
        name.includes(lowerSearch) || description.includes(lowerSearch);
      card.style.display = matches ? "block" : "none";
    });
  }

  /**
   * Show custom connection option
   */
  showCustomConnectionOption() {
    alert(
      "Custom Integration Setup\n\n" +
        "Connect to any REST API endpoint or custom system.\n\n" +
        "You'll need:\n" +
        "• API endpoint URL\n" +
        "• Authentication method (API key, OAuth, Basic Auth)\n" +
        "• Required headers and parameters\n\n" +
        "This would launch a custom connection wizard.",
    );
  }

  /**
   * Toggle help panel visibility
   */
  toggleHelpPanel() {
    const helpPanel = $("#connectionHelpPanel");
    const mainContent = $("#connectionMainContent");

    if (!helpPanel || !mainContent) return;

    this.helpPanelVisible = !this.helpPanelVisible;

    if (this.helpPanelVisible) {
      helpPanel.style.display = "block";
      mainContent.style.marginLeft = "416px";
    } else {
      helpPanel.style.display = "none";
      mainContent.style.marginLeft = "0";
    }
  }

  /**
   * Proceed with selected connection
   */
  proceedWithConnection() {
    if (!this.selectedConnectionId) return;

    // Find the selected connection
    this.currentConnection = this.getConnectionById(this.selectedConnectionId);

    if (!this.currentConnection) {
      console.error("Connection not found:", this.selectedConnectionId);
      return;
    }

    // Show connection details form
    this.showConnectionDetailsForm();
  }

  /**
   * Get connection by ID from all domains
   */
  getConnectionById(connectionId) {
    for (const domain in domainConnections) {
      const connections = domainConnections[domain].ootbConnections;
      const found = connections.find((conn) => conn.id === connectionId);
      if (found) return found;
    }
    return null;
  }

  /**
   * Show connection details form
   */
  showConnectionDetailsForm() {
    const modalTitle = $("#connectionModalTitle");
    const modalContent = $("#connectionModalContent");

    if (!modalTitle || !modalContent) return;

    modalTitle.textContent = "Add new connection";
    this.currentStep = 1;

    // Render the form
    modalContent.innerHTML = this.renderConnectionForm();

    // Attach form event listeners
    this.attachFormListeners();
  }

  /**
   * Render connection configuration form
   */
  renderConnectionForm() {
    const appName = this.currentConnection
      ? this.currentConnection.name
      : "App";
    const defaultDisplayName = appName;
    const connectionId = sanitizeConnectionId(defaultDisplayName);
    const defaultSubdomain = getSubdomainForApp(appName);

    return `
      <div class="connection-details-container-new">
        <!-- Progress Sidebar -->
        ${this.renderProgressSidebar()}
        
        <!-- Form Content -->
        <div class="connection-form-content">
          <div class="connection-form-scroll">
            <!-- Header -->
            <div class="connection-form-header">
              <h2 class="connection-form-title">Connect [${appName}]</h2>
              <p class="connection-form-subtitle">
                Provide credentials to draft environment of your connection for building and testing the agent.
              </p>
            </div>

            <!-- Step 1: Connection Details -->
            ${this.renderStep1(defaultDisplayName, connectionId)}

            <!-- Step 2: Draft Configuration -->
            ${this.renderStep2(defaultSubdomain)}

            <!-- Step 3: Live Configuration -->
            ${this.renderStep3(defaultSubdomain)}
          </div>

          <!-- Footer Actions -->
          <div class="connection-form-footer">
            <div class="footer-links">
              <a href="#" class="footer-link" id="helpLink">Need help?</a>
            </div>
            <div class="footer-buttons">
              <button class="btn-ghost" id="backBtn">Back</button>
              <button class="btn-primary" id="continueBtn">Continue</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render progress sidebar
   */
  renderProgressSidebar() {
    const step = this.currentStep;
    return `
      <div class="connection-progress-sidebar">
        <div class="progress-step ${step === 1 ? "current" : step > 1 ? "complete" : ""}">
          <div class="progress-step-indicator">
            ${step > 1 ? '<span class="step-check">✓</span>' : '<span class="step-number">1</span>'}
          </div>
          <div class="progress-step-label">
            <div class="step-label-text">Get started</div>
          </div>
        </div>
        <div class="progress-connector ${step > 1 ? "complete" : ""}"></div>
        <div class="progress-step ${step === 2 ? "current" : step > 2 ? "complete" : ""}">
          <div class="progress-step-indicator">
            ${step > 2 ? '<span class="step-check">✓</span>' : '<span class="step-number">2</span>'}
          </div>
          <div class="progress-step-label">
            <div class="step-label-text">Draft configuration</div>
            <div class="step-label-subtitle">Build and test</div>
          </div>
        </div>
        <div class="progress-connector ${step > 2 ? "complete" : ""}"></div>
        <div class="progress-step ${step === 3 ? "current" : ""}">
          <div class="progress-step-indicator">
            <span class="step-number">3</span>
          </div>
          <div class="progress-step-label">
            <div class="step-label-text">Live configuration</div>
            <div class="step-label-subtitle">Deploy to production</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Step 1: Connection Details
   */
  renderStep1(defaultDisplayName, connectionId) {
    return `
      <div class="connection-step-section" id="step-section-1">
        <div class="step-section-header">
          <span class="step-section-number">1</span>
          <h3 class="step-section-title">Define app details</h3>
        </div>
        
        <div class="form-field">
          <label for="connectionName" class="form-label">Connection name</label>
          <input
            type="text"
            id="connectionName"
            class="form-input"
            value="${defaultDisplayName}"
            placeholder="Enter display name"
          />
          <p class="form-helper-text">
            A friendly name for this connection. You can change this anytime.
          </p>
        </div>

        <div class="form-field">
          <label for="connectionId" class="form-label">Connection ID</label>
          <input
            type="text"
            id="connectionId"
            class="form-input"
            value="${connectionId}"
            placeholder="Enter connection ID"
            readonly
          />
          <p class="form-helper-text">Auto-generated identifier</p>
        </div>
      </div>
    `;
  }

  /**
   * Render Step 2: Draft Configuration
   */
  renderStep2(defaultSubdomain) {
    return `
      <div class="connection-step-section" id="step-section-2">
        <div class="step-section-header">
          <span class="step-section-number">2</span>
          <h3 class="step-section-title">Draft configuration</h3>
          <button class="tooltip-trigger" title="Information about draft configuration" style="margin-left: auto;">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
              <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
            </svg>
          </button>
        </div>

        <div class="form-field">
          <label class="form-label">Who can use this?</label>
          <div class="radio-button-group">
            <label class="radio-button-label">
              <input type="radio" name="whoCanUse" value="team" checked />
              <span class="radio-button-text">Team (Shared)</span>
            </label>
            <label class="radio-button-label">
              <input type="radio" name="whoCanUse" value="member" />
              <span class="radio-button-text">Member (Private)</span>
            </label>
          </div>
        </div>

        <div class="form-field">
          <label for="authMethod" class="form-label">Authentication method</label>
          <select id="authMethod" class="form-select">
            <option value="api-key">API Key (recommended)</option>
            <option value="oauth">OAuth 2.0</option>
            <option value="basic">Basic Auth</option>
          </select>
        </div>

        <div class="form-field">
          <label for="subdomain" class="form-label">Subdomain</label>
          <input
            type="text"
            id="subdomain"
            class="form-input"
            value="${defaultSubdomain}"
            placeholder="Enter subdomain"
          />
        </div>

        <div class="form-field">
          <label for="apiKey" class="form-label">API Key</label>
          <div class="password-input-wrapper">
            <input
              type="password"
              id="apiKey"
              class="form-input"
              placeholder="Enter API key"
            />
            <button class="password-toggle-btn" id="toggleApiKey">
              <span class="eye-icon">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M30.94 15.66A16.69 16.69 0 0 0 16 5 16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66 1 1 0 0 0 0-.68zM16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25z"/>
                  <path d="M16 10a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Step 3: Live Configuration
   */
  renderStep3(defaultSubdomain) {
    return `
      <div class="connection-step-section" id="step-section-3">
        <div class="step-section-header">
          <span class="step-section-number">3</span>
          <h3 class="step-section-title">Live configuration</h3>
          <button class="tooltip-trigger" title="Information about live configuration" style="margin-left: auto;">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
              <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
            </svg>
          </button>
        </div>

        <div class="form-field">
          <label class="toggle-label">
            <input type="checkbox" id="sameAsDraft" class="toggle-input" checked />
            <span class="toggle-text">Same as draft configuration</span>
          </label>
        </div>

        <div class="inline-notification info" id="liveConfigNote">
          <div class="notification-icon">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
              <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
            </svg>
          </div>
          <div class="notification-content">
            <div class="notification-title">Note</div>
            <div class="notification-subtitle">
              You can always edit this later when your agent is ready to go live
            </div>
          </div>
        </div>

        <div id="liveConfigFields" style="display: none;">
          <div class="form-field">
            <label class="form-label">Who can use this?</label>
            <div class="radio-button-group">
              <label class="radio-button-label">
                <input type="radio" name="whoCanUseLive" value="team" checked />
                <span class="radio-button-text">Team (Shared)</span>
              </label>
              <label class="radio-button-label">
                <input type="radio" name="whoCanUseLive" value="member" />
                <span class="radio-button-text">Member (Private)</span>
              </label>
            </div>
          </div>

          <div class="form-field">
            <label for="authMethodLive" class="form-label">Authentication method</label>
            <select id="authMethodLive" class="form-select">
              <option value="api-key">API Key (recommended)</option>
              <option value="oauth">OAuth 2.0</option>
              <option value="basic">Basic Auth</option>
            </select>
          </div>

          <div class="form-field">
            <label for="subdomainLive" class="form-label">Subdomain</label>
            <input
              type="text"
              id="subdomainLive"
              class="form-input"
              value="${defaultSubdomain}"
              placeholder="Enter subdomain"
            />
          </div>

          <div class="form-field">
            <label for="apiKeyLive" class="form-label">API Key</label>
            <div class="password-input-wrapper">
              <input
                type="password"
                id="apiKeyLive"
                class="form-input"
                placeholder="Enter API key"
              />
              <button class="password-toggle-btn" id="toggleApiKeyLive">
                <span class="eye-icon">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M30.94 15.66A16.69 16.69 0 0 0 16 5 16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66 1 1 0 0 0 0-.68zM16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25z"/>
                    <path d="M16 10a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Attach form event listeners
   */
  attachFormListeners() {
    // Connection name input - auto-update ID and subdomain
    const nameInput = $("#connectionName");
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        this.updateConnectionIdAndSubdomain(e.target.value);
      });
    }

    // Toggle live config
    const sameAsDraftToggle = $("#sameAsDraft");
    if (sameAsDraftToggle) {
      sameAsDraftToggle.addEventListener("change", (e) => {
        this.toggleLiveConfig(e.target.checked);
      });
    }

    // Password visibility toggles
    const toggleApiKey = $("#toggleApiKey");
    if (toggleApiKey) {
      toggleApiKey.addEventListener("click", () => {
        this.togglePasswordVisibility("apiKey");
      });
    }

    const toggleApiKeyLive = $("#toggleApiKeyLive");
    if (toggleApiKeyLive) {
      toggleApiKeyLive.addEventListener("click", () => {
        this.togglePasswordVisibility("apiKeyLive");
      });
    }

    // Back button
    const backBtn = $("#backBtn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        this.show();
      });
    }

    // Continue button
    const continueBtn = $("#continueBtn");
    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        this.handleContinue();
      });
    }

    // Help link
    const helpLink = $("#helpLink");
    if (helpLink) {
      helpLink.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Help documentation would open here");
      });
    }
  }

  /**
   * Update connection ID and subdomain based on name
   */
  updateConnectionIdAndSubdomain(displayName) {
    const connectionIdInput = $("#connectionId");
    const subdomainInput = $("#subdomain");
    const subdomainLiveInput = $("#subdomainLive");

    if (!displayName || displayName.trim() === "") {
      if (connectionIdInput) connectionIdInput.value = "";
      return;
    }

    // Update connection ID
    const connectionId = sanitizeConnectionId(displayName);
    if (connectionIdInput) {
      connectionIdInput.value = connectionId;
    }

    // Update subdomains
    const subdomain = getSubdomainForApp(displayName);
    if (subdomainInput) {
      subdomainInput.value = subdomain;
    }
    if (subdomainLiveInput) {
      subdomainLiveInput.value = subdomain;
    }
  }

  /**
   * Toggle live configuration fields
   */
  toggleLiveConfig(isSameAsDraft) {
    const liveConfigNote = $("#liveConfigNote");
    const liveConfigFields = $("#liveConfigFields");

    if (isSameAsDraft) {
      if (liveConfigNote) liveConfigNote.style.display = "flex";
      if (liveConfigFields) liveConfigFields.style.display = "none";
    } else {
      if (liveConfigNote) liveConfigNote.style.display = "none";
      if (liveConfigFields) liveConfigFields.style.display = "block";
    }
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(inputId) {
    const input = $(`#${inputId}`);
    if (!input) return;

    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
  }

  /**
   * Handle continue button click
   */
  handleContinue() {
    // In a real app, validate form and save data
    // For now, proceed to success modal
    setState("connectionConfigured", true);

    // Import and show success modal
    import("./success-modal.js").then((module) => {
      const successModal = new module.SuccessModal();
      successModal.show(this.currentConnection);
    });
  }

  /**
   * Close the modal
   */
  close() {
    const modal = $("#connectionModal");
    if (modal) {
      hide(modal);
      modal.style.display = "none";
      document.body.style.overflow = "";
    }

    // Reset state
    this.selectedConnectionId = null;
    this.currentConnection = null;
    this.currentStep = 1;
    this.helpPanelVisible = false;
  }
}

// Create singleton instance
export const connectionModal = new ConnectionModal();

// Expose to window for inline event handlers (temporary)
if (typeof window !== "undefined") {
  window.connectionModal = connectionModal;
}

// Made with Bob
