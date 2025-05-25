const { app, BrowserWindow } = require("electron");

// Disable GPU acceleration to fix Linux issues
app.disableHardwareAcceleration();

// Essential command line switches for Linux
app.commandLine.appendSwitch("--no-sandbox");
app.commandLine.appendSwitch("--disable-setuid-sandbox");
app.commandLine.appendSwitch("--disable-gpu");
app.commandLine.appendSwitch("--disable-gpu-sandbox");
app.commandLine.appendSwitch("--disable-software-rasterizer");

let mainWindow;

function createWindow() {
  console.log("Creating window...");

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "WhatsApp - Debug",
    show: true, // Show immediately
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false, // Temporarily disable for debugging
      hardwareAcceleration: false,
      sandbox: false,
    },
    backgroundColor: "#ffffff",
  });

  console.log("Window created, loading URL...");

  // Load WhatsApp Web
  mainWindow
    .loadURL("https://web.whatsapp.com")
    .then(() => {
      console.log("URL loaded successfully");
    })
    .catch((error) => {
      console.error("Failed to load URL:", error);
    });

  // Debug events
  mainWindow.webContents.on("did-start-loading", () => {
    console.log("Started loading...");
  });

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Finished loading!");
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription) => {
      console.error("Failed to load:", errorCode, errorDescription);
    },
  );

  mainWindow.on("ready-to-show", () => {
    console.log("Window ready to show");
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  console.log("App ready, creating window...");
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Debug: Log any unhandled errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
