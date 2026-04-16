// Global state management

class AppState {
  constructor() {
    this.state = {
      selectedPersona: null,
      selectedJob: null,
      selectedDomain: "customercare",
      assessmentAnswers: { q1: null, q2: null, q3: null },
      currentQuestion: 1,
      currentJobs: [],
      connections: [],
    };
    this.listeners = {};
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;
    this.notify(key, value, oldValue);
  }

  update(updates) {
    Object.keys(updates).forEach((key) => {
      this.set(key, updates[key]);
    });
  }

  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners[key] = this.listeners[key].filter((cb) => cb !== callback);
    };
  }

  notify(key, newValue, oldValue) {
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => {
        callback(newValue, oldValue);
      });
    }
  }

  reset() {
    this.state = {
      selectedPersona: null,
      selectedJob: null,
      selectedDomain: "customercare",
      assessmentAnswers: { q1: null, q2: null, q3: null },
      currentQuestion: 1,
      currentJobs: [],
      connections: [],
    };
  }
}

// Create singleton instance
export const appState = new AppState();

// Convenience methods
export function getState(key) {
  return appState.get(key);
}

export function setState(key, value) {
  appState.set(key, value);
}

export function updateState(updates) {
  appState.update(updates);
}

export function subscribe(key, callback) {
  return appState.subscribe(key, callback);
}

export function resetState() {
  appState.reset();
}

// Made with Bob
