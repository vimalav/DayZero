/**
 * Chat Panel Component
 * Sliding chat panel for tool preview and interaction
 */

import { $, $$, hide, show, addClass, removeClass } from "../utils/dom.js";
import { slideIn, slideOut } from "../utils/animations.js";

/**
 * ChatPanel class - Manages sliding chat panel for tool interaction
 */
export class ChatPanel {
  constructor() {
    this.panel = null;
    this.connection = null;
    this.toolName = "";
    this.toolDescription = "";
  }

  /**
   * Show chat panel for a specific tool
   */
  show(toolName, toolDescription, connection) {
    this.toolName = toolName;
    this.toolDescription = toolDescription;
    this.connection = connection;

    const appName = connection ? connection.name : "App";

    // Remove existing panel if any
    this.close();

    // Create panel
    const modalContent = $("#connectionModalContent");
    if (!modalContent) return;

    this.panel = document.createElement("div");
    this.panel.className = "tool-chat-panel";
    this.panel.innerHTML = this.renderPanel(appName);

    // Add to DOM
    modalContent.parentElement.appendChild(this.panel);

    // Animate in
    setTimeout(() => {
      addClass(this.panel, "open");
    }, 10);

    // Attach event listeners
    this.attachEventListeners();
  }

  /**
   * Render chat panel HTML
   */
  renderPanel(appName) {
    return `
      <div class="tool-chat-header">
        <div class="tool-chat-title">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
            <path d="M17 11h-2V9h2v2zm0 12h-2v-8h2v8z"/>
          </svg>
          <span>${appName} tool preview</span>
        </div>
        <button class="tool-chat-close" id="closeChatBtn">
          <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
            <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"/>
          </svg>
        </button>
      </div>
      
      <div class="tool-chat-content" id="chatContent">
        ${this.renderInitialMessage(appName)}
      </div>
      
      <div class="tool-chat-input">
        <input type="text" id="chatInput" placeholder="Type something..." />
        <button class="send-btn" id="sendBtn">
          <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
            <path d="M27.71 4.29a1 1 0 00-1.05-.23l-22 8a1 1 0 000 1.87l8.59 3.43L19.59 11 14 16.41l3.44 8.59a1 1 0 001.87 0l8-22a1 1 0 00-.6-1.71z"/>
          </svg>
        </button>
      </div>
    `;
  }

  /**
   * Render initial AI message
   */
  renderInitialMessage(appName) {
    return `
      <div class="tool-chat-message ai-message">
        <div class="message-avatar">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
          </svg>
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-source">${appName} tool</span>
            <span class="message-time">${this.getCurrentTime()}</span>
          </div>
          <div class="message-text">
            <strong>${this.toolName}</strong><br/>
            ${this.toolDescription}<br/><br/>
            Hello! Try asking these things:
          </div>
          <div class="message-actions">
            <button class="quick-action-btn" data-question="Who are my top customers?">"Who are my top customers?"</button>
            <button class="quick-action-btn" data-question="Show me recent deals">"Show me recent deals"</button>
            <button class="quick-action-btn" data-question="Create a new contact">"Create a new contact"</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close button
    const closeBtn = $("#closeChatBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.close();
      });
    }

    // Quick action buttons
    $$(".quick-action-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const question = btn.dataset.question;
        this.handleQuickAction(btn, question);
      });
    });

    // Send button
    const sendBtn = $("#sendBtn");
    const chatInput = $("#chatInput");

    if (sendBtn && chatInput) {
      sendBtn.addEventListener("click", () => {
        this.sendMessage(chatInput.value);
        chatInput.value = "";
      });

      // Enter key to send
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && chatInput.value.trim()) {
          this.sendMessage(chatInput.value);
          chatInput.value = "";
        }
      });
    }
  }

  /**
   * Handle quick action button click
   */
  handleQuickAction(button, question) {
    const chatContent = $("#chatContent");
    if (!chatContent) return;

    // Disable button
    button.disabled = true;
    button.style.opacity = "0.5";

    // Add user message
    this.addUserMessage(question);

    // Show typing indicator and simulate response
    this.simulateAIResponse();
  }

  /**
   * Send a message
   */
  sendMessage(message) {
    if (!message || !message.trim()) return;

    this.addUserMessage(message);
    this.simulateAIResponse();
  }

  /**
   * Add user message to chat
   */
  addUserMessage(message) {
    const chatContent = $("#chatContent");
    if (!chatContent) return;

    const userMessage = document.createElement("div");
    userMessage.className = "tool-chat-message user-message";
    userMessage.innerHTML = `
      <div class="message-content user-content">
        <div class="message-bubble">${message}</div>
      </div>
    `;

    chatContent.appendChild(userMessage);
    this.scrollToBottom();
  }

  /**
   * Add AI message to chat
   */
  addAIMessage(message, includeTable = false) {
    const chatContent = $("#chatContent");
    if (!chatContent) return;

    const appName = this.connection ? this.connection.name : "App";

    const aiMessage = document.createElement("div");
    aiMessage.className = "tool-chat-message ai-message";
    aiMessage.innerHTML = `
      <div class="message-avatar">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
        </svg>
      </div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-source">${appName} tool</span>
          <span class="message-time">${this.getCurrentTime()}</span>
        </div>
        <div class="message-text">
          ${message}
        </div>
        ${includeTable ? this.renderSampleTable() : ""}
      </div>
    `;

    chatContent.appendChild(aiMessage);
    this.scrollToBottom();
  }

  /**
   * Show typing indicator
   */
  showTypingIndicator() {
    const chatContent = $("#chatContent");
    if (!chatContent) return;

    const typingIndicator = document.createElement("div");
    typingIndicator.className = "tool-chat-message ai-message typing-indicator";
    typingIndicator.id = "typingIndicator";
    typingIndicator.innerHTML = `
      <div class="message-avatar">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
        </svg>
      </div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;

    chatContent.appendChild(typingIndicator);
    this.scrollToBottom();
  }

  /**
   * Remove typing indicator
   */
  removeTypingIndicator() {
    const indicator = $("#typingIndicator");
    if (indicator) {
      indicator.remove();
    }
  }

  /**
   * Simulate AI response
   */
  simulateAIResponse() {
    this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator();
      this.addAIMessage(
        "Here is a list of clients with more than 1 million employees:",
        true,
      );
    }, 1500);
  }

  /**
   * Render sample data table
   */
  renderSampleTable() {
    return `
      <div class="response-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Revenue</th>
              <th>Employee count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Walmart</td>
              <td>USD 648 billion</td>
              <td>2.1 million</td>
            </tr>
            <tr>
              <td>Amazon</td>
              <td>USD 575 billion</td>
              <td>1.5 million</td>
            </tr>
            <tr>
              <td>McDonald's</td>
              <td>USD 23 billion</td>
              <td>1.7 million</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Scroll chat to bottom
   */
  scrollToBottom() {
    const chatContent = $("#chatContent");
    if (chatContent) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }

  /**
   * Get current time formatted
   */
  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  /**
   * Close chat panel
   */
  close() {
    if (this.panel) {
      removeClass(this.panel, "open");

      setTimeout(() => {
        if (this.panel && this.panel.parentElement) {
          this.panel.remove();
        }
        this.panel = null;
      }, 300);
    }
  }
}

// Create singleton instance
export const chatPanel = new ChatPanel();

// Expose to window for inline event handlers (temporary)
if (typeof window !== "undefined") {
  window.chatPanel = chatPanel;
  window.closeToolChat = () => chatPanel.close();
}

// Made with Bob
