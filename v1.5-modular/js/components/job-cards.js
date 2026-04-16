/**
 * Job Cards Component
 * Handles rendering and interaction of job cards with compact/expanded views
 */

import { getState, setState } from "../core/state.js";
import { $, $$, hide, show, addClass, removeClass } from "../utils/dom.js";
import { fadeIn, fadeOut, slideIn, slideOut } from "../utils/animations.js";
import { customerCareJobs } from "../data/jobs.js";

/**
 * JobCards class - Manages job card rendering and interactions
 */
export class JobCards {
  constructor() {
    this.currentJobs = [];
    this.expandedJobIds = new Set();
  }

  /**
   * Render job cards for the selected persona
   */
  render(persona) {
    const jobs = customerCareJobs[persona] || [];
    this.currentJobs = jobs;

    const mainContent = $("#mainContent");
    if (!mainContent) return;

    const jobsHTML = `
      <div class="jobs-grid">
        ${jobs.map((job) => this.renderJobCard(job)).join("")}
      </div>
    `;

    mainContent.innerHTML = jobsHTML;

    // Attach event listeners
    this.attachEventListeners();
  }

  /**
   * Render a single job card
   */
  renderJobCard(job) {
    const isExpanded = this.expandedJobIds.has(job.id);

    return `
      <div class="job-card job-card-compact ${job.featured ? "featured" : ""}" data-job-id="${job.id}">
        <div class="job-header">
          <h3 class="job-title">
            ${job.title}
            ${job.badge ? `<span class="job-badge">${job.badge}</span>` : ""}
          </h3>
        </div>
        
        <p class="job-description">${job.description}</p>
        
        <!-- Metadata Section -->
        ${
          job.meta
            ? `
          <div class="job-meta">
            ${job.meta.map((item) => `<span class="job-meta-item">${item}</span>`).join("")}
          </div>
        `
            : ""
        }
        
        <!-- Compact View Content -->
        <div class="job-compact-content" ${isExpanded ? 'style="display: none;"' : ""}>
          <div class="job-metrics-compact">
            ${job.compact.topMetrics
              .map(
                (metric) => `
              <div class="metric-compact">
                <span class="metric-compact-icon">${metric.icon}</span>
                <span class="metric-compact-value">${metric.value}</span>
                <span class="metric-compact-label">${metric.label}</span>
              </div>
            `,
              )
              .join("")}
          </div>
          
          <div class="job-proof-compact">
            <strong>Success Story:</strong> ${job.compact.proofLine} <span class="external-link-icon">↗</span>
          </div>
          
          <div class="job-actions">
            <button class="job-cta primary" data-action="start" data-job-id="${job.id}">
              Get Started →
            </button>
            <button class="job-cta secondary" data-action="expand" data-job-id="${job.id}">
              Learn More
            </button>
          </div>
        </div>
        
        <!-- Expanded View Content -->
        <div class="job-expanded-content" ${!isExpanded ? 'style="display: none;"' : ""}>
          <div class="job-expanded-divider"></div>
          
          <div class="job-expanded-section">
            <div class="job-expanded-header">💡 Why This Matters</div>
            <ul class="job-expanded-list">
              ${job.expanded.painPoints.map((point) => `<li>${point}</li>`).join("")}
            </ul>
          </div>
          
          <div class="job-expanded-section">
            <div class="job-expanded-header">🔧 What You'll Build</div>
            <div class="job-expanded-solution">
              <strong>${job.expanded.solution.template}</strong>
              <span class="solution-meta-inline">
                ${job.expanded.solution.buildTime} • ${job.expanded.solution.difficulty}
              </span>
              ${
                job.expanded.solution.integrations.length > 0
                  ? `
                <div class="solution-integrations-inline">
                  <strong>Requires:</strong>
                  ${job.expanded.solution.integrations
                    .map(
                      (int) =>
                        `<span class="integration-tag-inline ${int.required ? "required" : ""}">${int.name}${int.required ? " ✓" : ""}</span>`,
                    )
                    .join("")}
                </div>
              `
                  : ""
              }
            </div>
          </div>
          
          <div class="job-expanded-section">
            <div class="job-expanded-header">📊 Full Impact</div>
            <div class="job-metrics-expanded">
              ${job.expanded.allMetrics
                .map(
                  (metric) =>
                    `<span class="metric-expanded">${metric.icon} ${metric.value} ${metric.label}</span>`,
                )
                .join("")}
            </div>
          </div>
          
          <div class="job-expanded-section">
            <div class="job-expanded-header">✨ Proven Results</div>
            <div class="job-expanded-proof">
              <p>"${job.expanded.fullProof.text}"</p>
              <div class="proof-metric-expanded">${job.expanded.fullProof.metric}</div>
            </div>
          </div>
          
          <div class="job-actions">
            <button class="job-cta primary" data-action="start" data-job-id="${job.id}">
              Start Building This Agent →
            </button>
            <button class="job-cta secondary" data-action="collapse" data-job-id="${job.id}">
              Show Less ↑
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners to job cards
   */
  attachEventListeners() {
    // Handle all job card button clicks
    $$("[data-action]").forEach((button) => {
      button.addEventListener("click", (e) => {
        const action = e.target.dataset.action;
        const jobId = e.target.dataset.jobId;

        switch (action) {
          case "start":
            this.startBuilding(jobId);
            break;
          case "expand":
            this.expandJob(jobId);
            break;
          case "collapse":
            this.collapseJob(jobId);
            break;
        }
      });
    });
  }

  /**
   * Expand a job card to show full details
   */
  expandJob(jobId) {
    const card = $(`[data-job-id="${jobId}"]`);
    if (!card) return;

    const compactContent = card.querySelector(".job-compact-content");
    const expandedContent = card.querySelector(".job-expanded-content");

    if (compactContent && expandedContent) {
      // Hide compact view
      fadeOut(compactContent, 200, () => {
        compactContent.style.display = "none";

        // Show expanded view
        expandedContent.style.display = "block";
        slideIn(expandedContent, 300);
      });

      // Track expanded state
      this.expandedJobIds.add(jobId);

      // Scroll card into view
      setTimeout(() => {
        card.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }

  /**
   * Collapse a job card back to compact view
   */
  collapseJob(jobId) {
    const card = $(`[data-job-id="${jobId}"]`);
    if (!card) return;

    const compactContent = card.querySelector(".job-compact-content");
    const expandedContent = card.querySelector(".job-expanded-content");

    if (compactContent && expandedContent) {
      // Hide expanded view
      slideOut(expandedContent, 200, () => {
        expandedContent.style.display = "none";

        // Show compact view
        compactContent.style.display = "block";
        fadeIn(compactContent, 300);
      });

      // Remove from expanded state
      this.expandedJobIds.delete(jobId);
    }
  }

  /**
   * Start building a job (launch agent builder)
   */
  startBuilding(jobId) {
    const job = this.currentJobs.find((j) => j.id === jobId);
    if (!job) return;

    setState("selectedJob", jobId);

    // TODO: Navigate to agent builder
    alert(
      `Starting guided builder for: ${job.title}\n\n` +
        `This would launch the agent builder with pre-configured settings for this specific use case.`,
    );
  }

  /**
   * Show job details in modal (alternative to inline expansion)
   */
  showJobModal(jobId) {
    const job = this.currentJobs.find((j) => j.id === jobId);
    if (!job) {
      console.error("Job not found:", jobId);
      return;
    }

    const modal = $("#jobModal");
    const modalTitle = $("#jobModalTitle");
    const modalContent = $("#jobModalContent");

    if (!modal || !modalTitle || !modalContent) {
      console.error("Modal elements not found");
      return;
    }

    modalTitle.textContent = job.title;
    modalContent.innerHTML = `
      <div class="job-modal-section">
        <h3>💡 Why This Matters</h3>
        <ul>
          ${job.expanded.painPoints.map((point) => `<li>${point}</li>`).join("")}
        </ul>
      </div>
      
      <div class="job-modal-section">
        <h3>🔧 What You'll Build</h3>
        <p><strong>${job.expanded.solution.template}</strong></p>
        <p class="job-modal-meta">${job.expanded.solution.buildTime} • ${job.expanded.solution.difficulty}</p>
        <p>${job.expanded.solution.description}</p>
      </div>
      
      <div class="job-modal-section">
        <h3>📊 Expected Impact</h3>
        <div class="job-modal-metrics">
          ${job.expanded.allMetrics
            .map(
              (metric) => `
            <div class="job-modal-metric">
              <div class="job-modal-metric-icon">${metric.icon}</div>
              <div class="job-modal-metric-value">${metric.value}</div>
              <div class="job-modal-metric-label">${metric.label}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
      
      <div class="job-modal-section">
        <h3>🎯 Key Features</h3>
        <ul>
          ${job.expanded.solution.integrations.map((int) => `<li>${int.name}</li>`).join("")}
        </ul>
      </div>
      
      <div class="job-modal-actions">
        <button class="job-cta primary" onclick="window.jobCards.startBuilding('${job.id}'); window.jobCards.closeModal();">
          Get Started →
        </button>
      </div>
    `;

    show(modal);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  /**
   * Close job modal
   */
  closeModal() {
    const modal = $("#jobModal");
    if (modal) {
      hide(modal);
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }
}

// Create singleton instance
export const jobCards = new JobCards();

// Expose to window for inline event handlers (temporary, will be removed)
if (typeof window !== "undefined") {
  window.jobCards = jobCards;
}

// Made with Bob
