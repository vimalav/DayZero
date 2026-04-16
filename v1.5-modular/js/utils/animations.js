// Animation utilities

export function createConfetti() {
  const colors = ["#0f62fe", "#24a148", "#8a3ffc", "#ff832b"];
  const confettiCount = 50;
  const container = document.body;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    container.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

export function fadeIn(element, duration = 300) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  if (!element) return;

  element.style.opacity = "0";
  element.style.display = "block";

  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const opacity = Math.min(progress / duration, 1);
    element.style.opacity = opacity;

    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

export function fadeOut(element, duration = 300) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  if (!element) return;

  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const opacity = Math.max(1 - progress / duration, 0);
    element.style.opacity = opacity;

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = "none";
    }
  }

  requestAnimationFrame(animate);
}

export function slideIn(element, direction = "right", duration = 300) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  if (!element) return;

  const startPos = direction === "right" ? "100%" : "-100%";
  element.style.transform = `translateX(${startPos})`;
  element.style.display = "block";

  setTimeout(() => {
    element.style.transition = `transform ${duration}ms ease`;
    element.style.transform = "translateX(0)";
  }, 10);
}

export function slideOut(element, direction = "right", duration = 300) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  if (!element) return;

  const endPos = direction === "right" ? "100%" : "-100%";
  element.style.transition = `transform ${duration}ms ease`;
  element.style.transform = `translateX(${endPos})`;

  setTimeout(() => {
    element.style.display = "none";
    element.style.transform = "";
  }, duration);
}

export function pulse(element, duration = 1000) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  if (!element) return;

  element.style.animation = `pulse ${duration}ms ease-in-out`;
  setTimeout(() => {
    element.style.animation = "";
  }, duration);
}

// Made with Bob
