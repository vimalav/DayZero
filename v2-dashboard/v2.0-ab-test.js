// A/B Test Controller for Solution-First Catalog
class ABTestController {
  constructor() {
    this.testName = "catalog-solution-first-v1";
    this.variants = {
      A: "control",
      B: "treatment",
    };
    this.assignedVariant = this.getOrAssignVariant();
  }

  // Get or assign user to variant
  getOrAssignVariant() {
    // Check if user already has a variant assigned
    let variant = localStorage.getItem(`ab_test_${this.testName}`);

    if (!variant) {
      // New user - assign randomly (50/50 split)
      variant = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem(`ab_test_${this.testName}`, variant);

      // Track assignment
      this.trackEvent("ab_test_assigned", {
        test_name: this.testName,
        variant: variant,
        timestamp: new Date().toISOString(),
      });
    }

    return variant;
  }

  // Redirect to appropriate variant
  redirectToVariant() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split("/").pop();

    if (this.assignedVariant === "B") {
      // Redirect to Variant B pages
      if (currentFile === "agent-catalog.html") {
        window.location.href = "agent-catalog-v2.html";
      } else if (currentFile === "v2.0-admin-dashboard.html") {
        window.location.href = "v2.0-admin-dashboard-v2.html";
      }
    } else if (this.assignedVariant === "A") {
      // Redirect Variant A users away from V2 pages
      if (currentFile === "agent-catalog-v2.html") {
        window.location.href = "agent-catalog.html";
      } else if (currentFile === "v2.0-admin-dashboard-v2.html") {
        window.location.href = "v2.0-admin-dashboard.html";
      }
    }
  }

  // Load appropriate stylesheet
  loadVariantStyles() {
    if (this.assignedVariant === "B") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "v2.0-styles-variant-b.css";
      document.head.appendChild(link);
    }
  }

  // Track events for analytics
  trackEvent(eventName, properties = {}) {
    const eventData = {
      event: eventName,
      test_name: this.testName,
      variant: this.assignedVariant,
      user_id: this.getUserId(),
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      page: window.location.pathname.split("/").pop(),
      ...properties,
    };

    // Log to console for debugging
    console.log("AB Test Event:", eventData);

    // Store locally for debugging and analysis
    const events = JSON.parse(localStorage.getItem("ab_test_events") || "[]");
    events.push(eventData);

    // Keep only last 100 events to avoid storage issues
    if (events.length > 100) {
      events.shift();
    }

    localStorage.setItem("ab_test_events", JSON.stringify(events));

    // TODO: Send to your analytics service
    // Example: analytics.track(eventName, eventData);
    // Example: gtag('event', eventName, eventData);
  }

  // Get or create user ID
  getUserId() {
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      userId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("user_id", userId);
    }
    return userId;
  }

  // Get or create session ID
  getSessionId() {
    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = "session_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("session_id", sessionId);
    }
    return sessionId;
  }

  // Track page view
  trackPageView(pageName) {
    this.trackEvent("page_view", {
      page: pageName,
      url: window.location.href,
    });
  }

  // Track catalog interaction
  trackCatalogInteraction(action, details = {}) {
    this.trackEvent("catalog_interaction", {
      action: action,
      ...details,
    });
  }

  // Track agent adoption
  trackAgentAdoption(agentId, agentName, source) {
    this.trackEvent("agent_adopted", {
      agent_id: agentId,
      agent_name: agentName,
      source: source, // 'recommended_starters', 'catalog_browse', 'search', etc.
      time_to_adoption: this.getTimeToAdoption(),
    });
  }

  // Calculate time from first page view to adoption
  getTimeToAdoption() {
    const firstView = localStorage.getItem("first_page_view_time");
    if (firstView) {
      const timeMs = Date.now() - parseInt(firstView);
      return Math.round(timeMs / 1000); // Return seconds
    }
    return null;
  }

  // Initialize tracking
  init() {
    // Store first page view time if not already set
    if (!localStorage.getItem("first_page_view_time")) {
      localStorage.setItem("first_page_view_time", Date.now().toString());
    }

    // Track page view
    const pageName = window.location.pathname.split("/").pop();
    this.trackPageView(pageName);

    // Set up event listeners for tracking
    this.setupEventListeners();

    // Log variant info to console
    console.log(`AB Test Active: ${this.testName}`);
    console.log(
      `Assigned Variant: ${this.assignedVariant} (${this.variants[this.assignedVariant]})`,
    );
  }

  // Set up event listeners for tracking interactions
  setupEventListeners() {
    // Track catalog card clicks
    document.addEventListener("click", (e) => {
      // Track "Try Now" button clicks
      if (
        e.target.classList.contains("btn-start-now") ||
        e.target.classList.contains("btn-primary-action")
      ) {
        const card = e.target.closest(".starter-card, .solution-card");
        const agentName = card?.querySelector("h3")?.textContent;
        const source = e.target.classList.contains("btn-start-now")
          ? "recommended_starters"
          : "catalog_browse";

        this.trackCatalogInteraction("try_now_clicked", {
          agent_name: agentName,
          source: source,
        });
      }

      // Track "Add to Workspace" clicks
      if (e.target.classList.contains("btn-secondary-action")) {
        const card = e.target.closest(".solution-card");
        const agentName = card?.querySelector("h3")?.textContent;
        this.trackCatalogInteraction("add_to_workspace_clicked", {
          agent_name: agentName,
          source: "catalog_browse",
        });
      }

      // Track intent category clicks (Variant B only)
      if (
        e.target.classList.contains("intent-category") ||
        e.target.closest(".intent-category")
      ) {
        const category = e.target.classList.contains("intent-category")
          ? e.target
          : e.target.closest(".intent-category");
        const intentLabel =
          category?.querySelector(".intent-label")?.textContent;
        this.trackCatalogInteraction("intent_category_clicked", {
          intent: intentLabel,
        });
      }

      // Track search suggestions
      if (e.target.classList.contains("suggestion-chip")) {
        this.trackCatalogInteraction("search_suggestion_clicked", {
          suggestion: e.target.textContent.trim(),
        });
      }

      // Track hero search button
      if (e.target.classList.contains("hero-search-btn")) {
        const searchInput = document.querySelector(".hero-search-input");
        if (searchInput) {
          this.trackCatalogInteraction("hero_search_performed", {
            query: searchInput.value,
          });
        }
      }
    });

    // Track search usage
    const searchInputs = document.querySelectorAll(
      ".hero-search-input, .catalog-search-input",
    );
    searchInputs.forEach((searchInput) => {
      searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          const inputType = e.target.classList.contains("hero-search-input")
            ? "hero_search"
            : "catalog_search";
          this.trackCatalogInteraction("search_performed", {
            query: e.target.value,
            input_type: inputType,
          });
        }
      });
    });

    // Track card preview expansions (Variant B only)
    document.addEventListener("toggle", (e) => {
      if (e.target.classList.contains("card-preview")) {
        const card = e.target.closest(".solution-card");
        const agentName = card?.querySelector("h3")?.textContent;
        this.trackCatalogInteraction("card_preview_toggled", {
          agent_name: agentName,
          expanded: e.target.open,
        });
      }
    });

    // Track session end on page unload
    window.addEventListener("beforeunload", () => {
      this.trackEvent("session_end", {
        duration: this.getSessionDuration(),
      });
    });
  }

  // Get session duration in seconds
  getSessionDuration() {
    const firstView = localStorage.getItem("first_page_view_time");
    if (firstView) {
      const durationMs = Date.now() - parseInt(firstView);
      return Math.round(durationMs / 1000);
    }
    return 0;
  }

  // Get test results summary
  getTestResults() {
    const events = JSON.parse(localStorage.getItem("ab_test_events") || "[]");
    const variantEvents = events.filter(
      (e) => e.variant === this.assignedVariant,
    );

    return {
      variant: this.assignedVariant,
      variant_name: this.variants[this.assignedVariant],
      total_events: variantEvents.length,
      session_duration: this.getSessionDuration(),
      time_to_adoption: this.getTimeToAdoption(),
      events: variantEvents,
    };
  }

  // Export events for analysis
  exportEvents() {
    const events = JSON.parse(localStorage.getItem("ab_test_events") || "[]");
    const dataStr = JSON.stringify(events, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ab-test-events-${this.getUserId()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Clear test data (for debugging)
  clearTestData() {
    localStorage.removeItem(`ab_test_${this.testName}`);
    localStorage.removeItem("ab_test_events");
    localStorage.removeItem("first_page_view_time");
    console.log("AB test data cleared. Reload page to be reassigned.");
  }
}

// Initialize A/B test on page load
const abTest = new ABTestController();
abTest.init();

// Make available globally for debugging
window.abTest = abTest;

// Add console helper
console.log("AB Test Helper Commands:");
console.log("  abTest.getTestResults() - View current test results");
console.log("  abTest.exportEvents() - Download events as JSON");
console.log("  abTest.clearTestData() - Clear test data and reassign");

// Made with Bob
