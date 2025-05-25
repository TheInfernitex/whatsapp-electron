# WhatsApp Desktop For Linux

A desktop client for WhatsApp Web built with Electron built for personal use.

## ✨ Features

- **🌙 Permanent Dark Mode** - Elegant dark theme that's always active
- **💬 Full WhatsApp Web Functionality** - All features you know and love
- **⚡ Native Desktop Experience** - Runs as a native desktop application
- **🔗 External Link Handling** - Opens links in your default browser
- **⌨️ Keyboard Shortcuts** - Standard desktop shortcuts supported
- **🖥️ Cross-Platform** - Available for Windows, macOS, and Linux, Works well with Tiling Window Managers like Hyprland.

- **🔒 Secure** - Same security as WhatsApp Web with enhanced privacy settings

## 🚀 Quick Start

### Download

1. Go to the [Releases](../../releases) page
2. Download the appropriate version for your operating system:
   - **Windows**: `.exe` installer
   - **macOS**: `.dmg` file
   - **Linux**: `.AppImage` file

### Installation

#### Windows

1. Download the `.exe` file
2. Run the installer and follow the prompts
3. Launch WhatsApp Desktop from the Start Menu

#### macOS

1. Download the `.dmg` file
2. Open the DMG and drag WhatsApp Desktop to Applications
3. Launch from Applications folder
4. If you see a security warning, go to System Preferences > Security & Privacy and click "Open Anyway"

#### Linux

1. Download the `.AppImage` file
2. Make it executable: `chmod +x WhatsApp-Desktop-*.AppImage`
3. Run the AppImage: `./WhatsApp-Desktop-*.AppImage`

## ⌨️ Keyboard Shortcuts

| Shortcut               | Action                 |
| ---------------------- | ---------------------- |
| `Ctrl/Cmd + R`         | Reload                 |
| `Ctrl/Cmd + Shift + R` | Force Reload           |
| `F12`                  | Toggle Developer Tools |
| `Ctrl/Cmd + 0`         | Reset Zoom             |
| `Ctrl/Cmd + Plus`      | Zoom In                |
| `Ctrl/Cmd + Minus`     | Zoom Out               |
| `F11`                  | Toggle Fullscreen      |
| `Ctrl/Cmd + M`         | Minimize Window        |
| `Ctrl/Cmd + W`         | Close Window           |
| `Ctrl/Cmd + Q`         | Quit Application       |

## 🛠️ Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/whatsapp-electron.git
cd whatsapp-electron

# Install dependencies
npm install

# Run in development mode
npm start
```

### Building

```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build-win    # Windows
npm run build-mac    # macOS
npm run build-linux  # Linux
```

## 🔧 Technical Details

### Built With

- **Electron** - Desktop app framework
- **Node.js** - Runtime environment
- **Custom CSS** - Dark theme implementation

### System Requirements

- **Windows**: Windows 10 or later
- **macOS**: macOS 10.14 (Mojave) or later
- **Linux**: Most modern distributions with glibc 2.17+

### Privacy & Security

- No data collection or tracking
- Uses WhatsApp Web's existing security
- All communications encrypted end-to-end (same as WhatsApp)
- Sandboxed web content for enhanced security
- Hardware acceleration disabled for better compatibility

## 🐛 Troubleshooting

### Common Issues

**App won't start on Linux:**

- Make sure the AppImage is executable: `chmod +x WhatsApp-Desktop-*.AppImage`
- Try running from terminal to see error messages

**Blank screen on startup:**

- Check your internet connection
- Try refreshing with `Ctrl/Cmd + R`
- Clear cache by reinstalling the app

**Theme not applying:**

- The dark theme applies automatically after WhatsApp Web loads
- Try refreshing if the theme doesn't appear within 5 seconds

**macOS security warning:**

- Go to System Preferences > Security & Privacy
- Click "Open Anyway" when the app is blocked

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

- Follow existing code style
- Test on multiple platforms when possible
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an unofficial WhatsApp client. WhatsApp is a trademark of Meta Platforms, Inc. This project is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc.

## 🙋‍♂️ Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information about your problem
3. Include your operating system and app version

## ⭐ Show Your Support

If you find this project useful, please consider giving it a star ⭐ on GitHub!

---

**Enjoy your enhanced WhatsApp experience in beautiful dark mode! 🌙**
