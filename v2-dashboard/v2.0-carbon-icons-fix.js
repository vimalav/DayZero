// Carbon Icons CDN Loader with Fallbacks
// Add this script to your HTML file

// Fallback SVGs for all icons
const fallbackIcons = {
  menu: '<svg viewBox="0 0 32 32"><path d="M4 6h24v2H4zm0 8h24v2H4zm0 8h24v2H4z"/></svg>',
  search:
    '<svg viewBox="0 0 32 32"><path d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9 9.01 9.01 0 0 1-9-9z"/></svg>',
  notification:
    '<svg viewBox="0 0 32 32"><path d="M28.7 19.3L26 16.6V13c0-5.5-4.5-10-10-10S6 7.5 6 13v3.6l-2.7 2.7c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h8v1c0 2.2 1.8 4 4 4s4-1.8 4-4v-1h8c.6 0 1-.4 1-1v-3c0-.3-.1-.5-.3-.7zM18 25c0 1.1-.9 2-2 2s-2-.9-2-2v-1h4v1zm8-3H6v-1.6l2.7-2.7c.2-.2.3-.4.3-.7V13c0-4.4 3.6-8 8-8s8 3.6 8 8v4c0 .3.1.5.3.7l2.7 2.7V22z"/></svg>',
  help: '<svg viewBox="0 0 32 32"><path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/><path d="M16 10c-2.2 0-4 1.8-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 .8-.5 1.6-1.3 1.9-.9.4-1.7 1.3-1.7 2.4V20h2v-1.7c0-.4.3-.7.6-.8 1.3-.6 2.4-2 2.4-3.5 0-2.2-1.8-4-4-4zM15 22h2v2h-2z"/></svg>',
  "user--avatar":
    '<svg viewBox="0 0 32 32"><path d="M16 4c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm8 10c0-4.4-3.6-8-8-8s-8 3.6-8 8v4h2v-4c0-3.3 2.7-6 6-6s6 2.7 6 6v4h2v-4z"/></svg>',
  close:
    '<svg viewBox="0 0 16 16"><path d="M12 4.7L11.3 4 8 7.3 4.7 4 4 4.7 7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z"/></svg>',
  maximize:
    '<svg viewBox="0 0 16 16"><polygon points="6,15 6,14 2.7,14 7,9.7 6.3,9 2,13.3 2,10 1,10 1,15"/><polygon points="10,1 10,2 13.3,2 9,6.3 9.7,7 14,2.7 14,6 15,6 15,1"/></svg>',
  "microphone--filled":
    '<svg viewBox="0 0 16 16"><rect x="6" y="2" width="4" height="6" rx="2"/><path d="M5 7a3 3 0 006 0h1a4 4 0 01-3.5 3.969V12.5h2v1h-5v-1h2v-1.531A4 4 0 014 7h1z"/></svg>',
  "send--alt":
    '<svg viewBox="0 0 16 16"><path d="M2 2l12 6-12 6V9.5l8.5-1.5L2 6.5V2z"/></svg>',
  "arrow--right":
    '<svg viewBox="0 0 16 16"><path d="M11.3 8L6.5 3.2 7.2 2.5 13 8.3 12.7 8.5 7.2 13.5 6.5 12.8 11.3 8z"/></svg>',
  "overflow-menu--vertical":
    '<svg viewBox="0 0 16 16"><circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg>',
};

// Load Carbon icons from CDN
const loadIcon = async (iconName, size = 20) => {
  try {
    const response = await fetch(
      `https://unpkg.com/@carbon/icons@latest/svg/${size}/${iconName}.svg`,
    );

    if (!response.ok) {
      console.warn(
        `Icon not found on CDN: ${iconName} (${size}px) - Using fallback`,
      );
      return fallbackIcons[iconName] || null;
    }

    const svgText = await response.text();
    return svgText;
  } catch (error) {
    console.warn(
      `Failed to load icon from CDN: ${iconName} (${size}px) - Using fallback`,
      error,
    );
    return fallbackIcons[iconName] || null;
  }
};

// Icon name mappings
const iconMappings = {
  menu: "menu",
  search: "search",
  notification: "notification",
  help: "help",
  "user-avatar": "user--avatar",
  close: "close",
  maximize: "maximize",
  "overflow-menu--vertical": "overflow-menu--vertical",
  microphone: "microphone--filled",
  send: "send--alt",
  "arrow-right": "arrow--right",
};

// Initialize icons when DOM is ready
window.addEventListener("DOMContentLoaded", async () => {
  const elements = document.querySelectorAll("[data-carbon-icon]");
  console.log(`🎨 Loading ${elements.length} Carbon icons...`);

  let loaded = 0;
  let failed = 0;

  for (const el of elements) {
    const iconKey = el.getAttribute("data-carbon-icon");
    const iconName = iconMappings[iconKey] || iconKey;
    const size = parseInt(el.getAttribute("data-icon-size")) || 20;

    const svg = await loadIcon(iconName, size);
    if (svg) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, "image/svg+xml");
      const svgEl = doc.querySelector("svg");
      if (svgEl) {
        svgEl.setAttribute("width", size);
        svgEl.setAttribute("height", size);
        svgEl.setAttribute("fill", "currentColor");
        el.innerHTML = svgEl.outerHTML;
        loaded++;
      }
    } else {
      console.error(`❌ No fallback available for: ${iconName}`);
      failed++;
    }
  }

  console.log(`✅ Icons loaded: ${loaded} successful, ${failed} failed`);
});

// Made with Bob
