// Screen navigation and routing

import { $, hide, show } from "../utils/dom.js";

const screens = {
  persona: "personaScreen",
  assessment: "assessmentScreen",
  assessmentResult: "assessmentResultScreen",
  dashboard: "appContent",
};

let currentScreen = null;

export function showScreen(screenName) {
  // Hide all screens
  Object.values(screens).forEach((screenId) => {
    const screen = $(screenId);
    if (screen) {
      hide(screen);
    }
  });

  // Show persona overlay or hide it
  const overlay = $("#personaOverlay");
  if (screenName === "dashboard") {
    if (overlay) {
      overlay.classList.add("hidden");
    }
  } else {
    if (overlay) {
      overlay.classList.remove("hidden");
    }
  }

  // Show requested screen
  const screenId = screens[screenName];
  if (screenId) {
    const screen = $(screenId);
    if (screen) {
      show(screen);
      currentScreen = screenName;
    }
  }
}

export function getCurrentScreen() {
  return currentScreen;
}

export function goToPersonaSelection() {
  showScreen("persona");
}

export function goToAssessment() {
  showScreen("assessment");
}

export function goToAssessmentResult() {
  showScreen("assessmentResult");
}

export function goToDashboard() {
  showScreen("dashboard");
}

export function goBack() {
  // Simple back navigation logic
  if (currentScreen === "assessment") {
    goToPersonaSelection();
  } else if (currentScreen === "assessmentResult") {
    goToAssessment();
  } else if (currentScreen === "dashboard") {
    goToPersonaSelection();
  }
}

// Made with Bob
