const {
  app,
  BrowserWindow,
  Menu,
  nativeTheme,
  shell,
  session,
} = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  console.log("Creating window...");

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "WhatsApp",
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      sandbox: false,
      hardwareAcceleration: false,
      preload: path.join(__dirname, "preload.js"),
    },
    backgroundColor: "#111b21",
    autoHideMenuBar: false,
  });

  console.log("Window created, loading URL...");

  mainWindow
    .loadURL("https://web.whatsapp.com")
    .then(() => {
      console.log("URL loaded successfully");
    })
    .catch((error) => {
      console.error("Failed to load URL:", error);
    });

  mainWindow.webContents.on("did-start-loading", () => {
    console.log("Started loading...");
  });

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Finished loading!");
    // Apply dark theme after page loads
    setTimeout(() => {
      applyDarkTheme();
    }, 2000);
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription) => {
      console.error("Failed to load:", errorCode, errorDescription);
    },
  );

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  createMenu();
}

function applyDarkTheme() {
  const darkThemeCSS = `
    /* Dark theme - Override WhatsApp's CSS variables */
    :root {
      --primary-strong: #111b21 !important;
      --background-default: #111b21 !important;
      --background-default-hover: #1f2937 !important;
      --panel-background-colored: #1f2937 !important;
      --panel-background: #1f2937 !important;
      --primary: #374151 !important;
      --primary-title: #f3f4f6 !important;
      --secondary: #d1d5db !important;
      --secondary-lighter: #9ca3af !important;
      --border-default: #374151 !important;
      --border-strong: #4b5563 !important;
      --teal: #00d856 !important;
      --outgoing-background: #00d856 !important;
      --incoming-background: #374151 !important;
      --message-primary: #f3f4f6 !important;
    }
    
    /* Force dark backgrounds */
    body, [data-testid="main-container"] {
      background-color: #111b21 !important;
      color: #f3f4f6 !important;
    }
    
    /* Chat list panel */
    [data-testid="chatlist"] {
      background-color: #1f2937 !important;
    }
    
    /* Chat area */
    [data-testid="conversation-panel"] {
      background-color: #111b21 !important;
    }
    
    /* Input area */
    [data-testid="compose-box"] {
      background-color: #374151 !important;
    }
  `;

  mainWindow.webContents
    .executeJavaScript(
      `
      // Remove existing theme
      const existingStyle = document.getElementById('electron-theme');
      if (existingStyle) existingStyle.remove();
      
      // Add dark theme
      const style = document.createElement('style');
      style.id = 'electron-theme';
      style.textContent = \`${darkThemeCSS}\`;
      document.head.appendChild(style);
      
      console.log('Dark theme applied');
    `,
    )
    .catch((error) => {
      console.error("Failed to apply theme:", error);
    });
}

function createMenu() {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Quit",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => app.quit(),
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", role: "undo" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectall" },
      ],
    },
    {
      label: "View",
      submenu: [
        { label: "Reload", accelerator: "CmdOrCtrl+R", role: "reload" },
        {
          label: "Force Reload",
          accelerator: "CmdOrCtrl+Shift+R",
          role: "forceReload",
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "F12",
          role: "toggleDevTools",
        },
        { type: "separator" },
        { label: "Actual Size", accelerator: "CmdOrCtrl+0", role: "resetZoom" },
        { label: "Zoom In", accelerator: "CmdOrCtrl+Plus", role: "zoomIn" },
        { label: "Zoom Out", accelerator: "CmdOrCtrl+-", role: "zoomOut" },
        { type: "separator" },
        {
          label: "Toggle Fullscreen",
          accelerator: "F11",
          role: "togglefullscreen",
        },
      ],
    },
    {
      label: "Window",
      submenu: [
        { label: "Minimize", accelerator: "CmdOrCtrl+M", role: "minimize" },
        { label: "Close", accelerator: "CmdOrCtrl+W", role: "close" },
      ],
    },
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { label: "About " + app.getName(), role: "about" },
        { type: "separator" },
        { label: "Services", role: "services", submenu: [] },
        { type: "separator" },
        {
          label: "Hide " + app.getName(),
          accelerator: "Command+H",
          role: "hide",
        },
        {
          label: "Hide Others",
          accelerator: "Command+Shift+H",
          role: "hideothers",
        },
        { label: "Show All", role: "unhide" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: () => app.quit() },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// GPU and graphics fixes for Linux
app.disableHardwareAcceleration();

// Command line switches for better Linux compatibility
app.commandLine.appendSwitch("--no-sandbox");
app.commandLine.appendSwitch("--disable-setuid-sandbox");
app.commandLine.appendSwitch("--disable-dev-shm-usage");
app.commandLine.appendSwitch("--disable-accelerated-2d-canvas");
app.commandLine.appendSwitch("--no-first-run");
app.commandLine.appendSwitch("--no-zygote");
app.commandLine.appendSwitch("--disable-gpu");
app.commandLine.appendSwitch("--disable-gpu-sandbox");
app.commandLine.appendSwitch("--disable-software-rasterizer");

app.whenReady().then(() => {
  console.log("App ready, creating window...");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
