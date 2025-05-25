const { contextBridge, ipcRenderer } = require("electron");

// Security: Only expose safe APIs
contextBridge.exposeInMainWorld("electronAPI", {
  // Notification handling
  showNotification: (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body, silent: false });
    }
  },

  // Performance monitoring
  getMemoryUsage: () => {
    return {
      used: Math.round(performance.memory?.usedJSHeapSize / 1048576) || 0,
      total: Math.round(performance.memory?.totalJSHeapSize / 1048576) || 0,
    };
  },
});

// Performance optimizations
window.addEventListener("DOMContentLoaded", () => {
  // Lazy load images for better performance
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Optimize scrolling performance
  let ticking = false;
  function optimizeScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Your scroll optimization code here
        ticking = false;
      });
      ticking = true;
    }
  }

  document.addEventListener("scroll", optimizeScroll, { passive: true });
});

// Handle notifications
window.addEventListener("load", () => {
  // Request notification permission
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }

  // Enhanced dark mode detection
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // Monitor for WhatsApp's own theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        // Sync with system theme if needed
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class"],
  });
});

// Memory cleanup
window.addEventListener("beforeunload", () => {
  // Clean up event listeners and observers
  if (window.imageObserver) {
    window.imageObserver.disconnect();
  }
});
