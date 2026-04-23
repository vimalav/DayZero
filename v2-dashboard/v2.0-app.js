// v2.0 Admin Dashboard JavaScript

// State management
const state = {
  sidebarOpen: false,
  currentAlertTab: "incidents",
  currentAgentTab: "agents",
  currentAgentType: "total",
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeAlerts();
  initializeCharts();
  initializeAgentTable();
  initializeEventListeners();
  initializeUserMenu();
  initializeBWMode();
});

// Toggle sidebar for mobile
function toggleSidebar() {
  const sidebar = document.getElementById("leftSidebar");
  state.sidebarOpen = !state.sidebarOpen;
  sidebar.classList.toggle("open", state.sidebarOpen);
}

// Initialize event listeners
function initializeEventListeners() {
  // Section tabs
  const sectionTabs = document.querySelectorAll(".section-tab");
  sectionTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const parent = e.target.closest(".section-card");
      parent
        .querySelectorAll(".section-tab")
        .forEach((t) => t.classList.remove("active"));
      e.target.classList.add("active");
    });
  });

  // Alert tabs
  const alertTabs = document.querySelectorAll(".alerts-tab");
  alertTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      alertTabs.forEach((t) => t.classList.remove("active"));
      e.target.closest(".alerts-tab").classList.add("active");
    });
  });

  // Agent type pills
  const agentPills = document.querySelectorAll(".agent-type-pill");
  agentPills.forEach((pill) => {
    pill.addEventListener("click", (e) => {
      agentPills.forEach((p) => p.classList.remove("active"));
      e.target.classList.add("active");
    });
  });

  // Quick starters
  const quickStarters = document.querySelectorAll(".quick-starter-card");
  quickStarters.forEach((item) => {
    item.addEventListener("click", () => {
      console.log(
        "Quick starter clicked:",
        item.querySelector(".quick-starter-title").textContent,
      );
    });
  });
}

// Initialize alerts list
function initializeAlerts() {
  const alertsList = document.getElementById("alertsList");
  if (!alertsList) return;

  const alerts = [
    {
      text: "SAP_Procurement_agent tool call error. Lorem ipsum adipiscing dolor sit amet adipiscing cons...",
      status: "Pending",
    },
    {
      text: "SAP_Procurement_agent tool call error. Lorem ipsum adipiscing dolor sit amet adipiscing cons...",
      status: "Pending",
    },
    {
      text: "SAP_Procurement_agent tool call error. Lorem ipsum adipiscing dolor sit amet adipiscing cons...",
      status: "Pending",
    },
    {
      text: "SAP_Procurement_agent tool call error. Lorem ipsum adipiscing dolor sit amet adipiscing cons...",
      status: "Pending",
    },
    {
      text: "SAP_Procurement_agent tool call error. Lorem ipsum adipiscing dolor sit amet adipiscing cons...",
      status: "Pending",
    },
  ];

  alertsList.innerHTML = alerts
    .map(
      (alert) => `
    <div class="alert-item">
      <div class="alert-icon">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm-1.1 6h2.2v11h-2.2V8zM16 25c-.8 0-1.5-.7-1.5-1.5S15.2 22 16 22s1.5.7 1.5 1.5S16.8 25 16 25z"/>
        </svg>
      </div>
      <div class="alert-content">
        <div class="alert-text">${alert.text}</div>
        <div class="alert-status">
          <svg class="status-icon" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="8" r="4"/>
          </svg>
          ${alert.status}
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Initialize charts
function initializeCharts() {
  initializeModelsChart();
  initializeControlsChart();
}

// Initialize models bar chart
function initializeModelsChart() {
  const container = document.getElementById("modelsChart");
  if (!container) return;

  const models = [
    { name: "llama 3.2-90b-in...", value: 80 },
    { name: "gpt-4-o", value: 40 },
    { name: "claude opus 4.6", value: 60 },
    { name: "claude haiku", value: 55 },
    { name: "model name", value: 20 },
    { name: "model name", value: 35 },
  ];

  const maxValue = Math.max(...models.map((m) => m.value));

  container.innerHTML = `
    <div class="bar-chart">
      ${models
        .map(
          (model) => `
        <div class="bar-chart-item">
          <div class="bar-chart-label">${model.name}</div>
          <div class="bar-chart-bar-container">
            <div class="bar-chart-bar" style="width: ${(model.value / maxValue) * 100}%"></div>
          </div>
          <div class="bar-chart-value">${model.value}</div>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}

// Initialize controls donut chart
function initializeControlsChart() {
  const container = document.getElementById("controlsChart");
  if (!container) return;

  const total = 100;
  const covered = 75;
  const notCovered = 25;

  const coveredPercent = (covered / total) * 100;
  const notCoveredPercent = (notCovered / total) * 100;

  // Calculate SVG circle parameters
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const coveredLength = (coveredPercent / 100) * circumference;
  const notCoveredLength = (notCoveredPercent / 100) * circumference;

  container.innerHTML = `
    <div class="donut-chart">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="${radius}"
          fill="none"
          stroke="#e0e0e0"
          stroke-width="20"
        />
        <circle
          cx="100"
          cy="100"
          r="${radius}"
          fill="none"
          stroke="#0f62fe"
          stroke-width="20"
          stroke-dasharray="${coveredLength} ${circumference}"
          stroke-linecap="round"
        />
        <circle
          cx="100"
          cy="100"
          r="${radius}"
          fill="none"
          stroke="#8d8d8d"
          stroke-width="20"
          stroke-dasharray="${notCoveredLength} ${circumference}"
          stroke-dashoffset="${-coveredLength}"
          stroke-linecap="round"
        />
      </svg>
      <div class="donut-center">
        <div class="donut-value">${covered}/${total}</div>
        <div class="donut-label">Controlled assets</div>
      </div>
    </div>
    <div class="chart-legend">
      <div class="legend-item">
        <div class="legend-color" style="background: #0f62fe;"></div>
        <span>Assets covered by controls</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #8d8d8d;"></div>
        <span>Assets not covered by controls</span>
      </div>
    </div>
  `;
}

// Initialize agent analytics table
function initializeAgentTable() {
  const container = document.getElementById("agentTable");
  if (!container) return;

  const agents = [
    {
      name: "Customer support",
      alerts: 3,
      users: "18.2k",
      usersChange: "+18.2k",
      conversations: "18.2k",
      conversationsChange: "+18.2k",
      messages: "18.2k",
      messagesChange: "▼ 18.2k",
      failed: "18.2k",
      failedChange: "▲ 18.2k",
      evaluations: "18.2k",
      lastUpdate: "Mar 24, 2026",
    },
    {
      name: "Sales assistant",
      alerts: 3,
      users: "18.2k",
      usersChange: "+18.2k",
      conversations: "18.2k",
      conversationsChange: "+18.2k",
      messages: "18.2k",
      messagesChange: "▼ 18.2k",
      failed: "18.2k",
      failedChange: "▲ 18.2k",
      evaluations: "18.2k",
      lastUpdate: "Mar 24, 2026",
    },
    {
      name: "Technical Help Agent",
      alerts: 3,
      users: "18.2k",
      usersChange: "+18.2k",
      conversations: "18.2k",
      conversationsChange: "+18.2k",
      messages: "18.2k",
      messagesChange: "▼ 18.2k",
      failed: "18.2k",
      failedChange: "▲ 18.2k",
      evaluations: "18.2k",
      lastUpdate: "Mar 24, 2026",
    },
    {
      name: "HR Assistant",
      alerts: 3,
      users: "18.2k",
      usersChange: "+18.2k",
      conversations: "18.2k",
      conversationsChange: "+18.2k",
      messages: "18.2k",
      messagesChange: "▼ 18.2k",
      failed: "18.2k",
      failedChange: "▲ 18.2k",
      evaluations: "18.2k",
      lastUpdate: "Mar 24, 2026",
    },
    {
      name: "Product advisor",
      alerts: 3,
      users: "18.2k",
      usersChange: "+18.2k",
      conversations: "18.2k",
      conversationsChange: "+18.2k",
      messages: "18.2k",
      messagesChange: "▼ 18.2k",
      failed: "18.2k",
      failedChange: "▲ 18.2k",
      evaluations: "18.2k",
      lastUpdate: "Mar 24, 2026",
    },
  ];

  container.innerHTML = `
    <table class="agent-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Alerts</th>
          <th>Users</th>
          <th>Conver...</th>
          <th>Messa...</th>
          <th>Failed...</th>
          <th>Evalua...</th>
          <th>Last update</th>
        </tr>
      </thead>
      <tbody>
        ${agents
          .map(
            (agent) => `
          <tr>
            <td class="agent-name-cell">${agent.name}</td>
            <td>
              ${agent.alerts > 0 ? `<span class="alert-badge">${agent.alerts}</span>` : "-"}
            </td>
            <td>
              <div>${agent.users}</div>
              <div class="metric-change change-positive">${agent.usersChange}</div>
            </td>
            <td>
              <div>${agent.conversations}</div>
              <div class="metric-change change-positive">${agent.conversationsChange}</div>
            </td>
            <td>
              <div>${agent.messages}</div>
              <div class="metric-change change-negative">${agent.messagesChange}</div>
            </td>
            <td>
              <div>${agent.failed}</div>
              <div class="metric-change change-negative">${agent.failedChange}</div>
            </td>
            <td>${agent.evaluations}</td>
            <td>${agent.lastUpdate}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
    <div class="pagination">
      <div class="pagination-info">1–100 of 100 items</div>
      <div class="pagination-controls">
        <select class="pagination-select">
          <option>1</option>
        </select>
        <span style="font-size: 14px; color: #525252;">of 10 pages</span>
        <button class="pagination-btn" disabled>
          <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
            <path d="M20 24l-10-8 10-8z"/>
          </svg>
        </button>
        <button class="pagination-btn">
          <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
            <path d="M12 8l10 8-10 8z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

// Initialize user menu dropdown
function initializeUserMenu() {
  const userMenuButton = document.getElementById("userMenuButton");
  const userMenu = document.getElementById("userMenu");

  if (!userMenuButton || !userMenu) return;

  // Toggle menu on button click
  userMenuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    userMenu.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!userMenu.contains(e.target) && !userMenuButton.contains(e.target)) {
      userMenu.classList.remove("active");
    }
  });

  // Prevent menu from closing when clicking inside
  userMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// Initialize Black & White mode toggle
function initializeBWMode() {
  const bwToggle = document.getElementById("bwModeToggle");

  if (!bwToggle) return;

  // Check if BW mode was previously enabled
  const bwModeEnabled = localStorage.getItem("bwMode") === "true";
  if (bwModeEnabled) {
    document.body.classList.add("bw-mode");
    bwToggle.checked = true;
  }

  // Toggle BW mode on switch change
  bwToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      document.body.classList.add("bw-mode");
      localStorage.setItem("bwMode", "true");
    } else {
      document.body.classList.remove("bw-mode");
      localStorage.setItem("bwMode", "false");
    }
  });
}

// Export functions for external use
window.toggleSidebar = toggleSidebar;

// Made with Bob
