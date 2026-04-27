export function getInstallSupport(): string {
  if (typeof window === "undefined") {
    return "Check install support from a browser.";
  }

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  return isStandalone
    ? "Installed on this device."
    : "Open the browser menu and choose Add to Home Screen to install.";
}

export function getNotificationSupport(): string {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "Browser notifications are not available in this environment.";
  }

  if (Notification.permission === "granted") {
    return "Browser notifications are enabled.";
  }

  if (Notification.permission === "denied") {
    return "Browser notifications are blocked for this browser.";
  }

  return "Browser notifications are ready to be enabled once web push is configured.";
}
