<div align="center">

# 🧠 EmotionSense AI

### Multimodal Emotion Detection — Expo React Native Mobile App

*A premium, production-ready mobile interface for real-time facial and contextual emotion analysis powered by AI.*

[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=white)](https://reactnative.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![License](https://img.shields.io/badge/license-Private-red)](./package.json)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots & Screens](#-screens)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Getting Started](#-getting-started)
- [Running the App](#-running-the-app)
- [Navigation Architecture](#-navigation-architecture)
- [Contributing](#-contributing)

---

## 🌟 Overview

**EmotionSense AI** is a beautifully designed Expo React Native application that provides multimodal emotion detection through facial analysis, voice tone assessment, and AI-driven behavioral insights. Built with a "Digital Empathy" design philosophy, it features a deep-space dark aesthetic with glassmorphism effects, neon gradients, and fluid micro-animations.

> The app is designed for portrait-orientation phones (iOS & Android) and functions as the front-end interface for an AI emotion analysis backend.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎭 **Real-Time Detection** | Full-screen camera feed with neon bounding boxes and live emotion overlays |
| 📸 **Media Analysis** | Upload photos or videos from gallery or capture directly with camera |
| 📊 **Emotion Results** | Detailed breakdown with confidence scores, AI textual analysis, and actionable insights |
| 📅 **History & Trends** | SVG emotion trend charts with a scrollable session timeline |
| 🎤 **Voice Analysis** | Animated waveform visualizer for audio-based mood detection |
| 🧭 **Smooth Onboarding** | 3-slide feature carousel (Face Detection · Voice Analysis · AI Insights) |
| 👤 **User Profile** | Avatar, session stats, preferences, and logout |
| 🌙 **Dark Mode Only** | Deep Space dark palette optimised for low-light use |
| 💎 **Glassmorphism UI** | Frosted glass cards, gradient buttons with neon glow, and ambient orbs |

---

## 📱 Screens

| Screen | Route Name | Description |
|---|---|---|
| **Splash** | `Splash` | Animated intro with logo, loading progress bar, and CTA |
| **Onboarding** | `Onboarding` | 3-slide feature walkthrough carousel |
| **Analyze Media** | `Scan` (tab) | Photo/video upload zone with gallery & camera access |
| **Home / Insights** | `Insights` (tab) | Camera preview, emotion widgets, and AI insight card |
| **Detection** | `Detection` | Full-screen live detection with real-time overlays |
| **Results** | `Results` | Emotion result card, confidence bars, AI analysis, and share actions |
| **History** | `History` (tab) | SVG trend chart and paginated session timeline |
| **Profile** | `Profile` (tab) | User stats, settings, and account actions |

---

## 🛠 Tech Stack

### Core

| Package | Version | Purpose |
|---|---|---|
| `expo` | ~54.0.34 | App runtime & toolchain |
| `react-native` | 0.81.5 | Mobile UI framework |
| `react` | 19.1.0 | UI library |

### Navigation

| Package | Version | Purpose |
|---|---|---|
| `@react-navigation/native` | ^6.1.18 | Navigation container |
| `@react-navigation/native-stack` | ^6.11.0 | Stack navigator |
| `@react-navigation/bottom-tabs` | ^6.6.1 | Custom tab bar |

### Expo Libraries

| Package | Purpose |
|---|---|
| `expo-camera` | Real-time camera feed for live detection |
| `expo-image-picker` | Gallery & camera media selection |
| `expo-linear-gradient` | Gradient buttons, backgrounds, and overlays |
| `expo-blur` | Glassmorphism blur effects |
| `expo-font` + `@expo-google-fonts/inter` | Inter typeface (4 weights) |
| `expo-splash-screen` | Controlled splash screen dismissal |

### UI & Utilities

| Package | Purpose |
|---|---|
| `react-native-svg` | SVG emotion trend charts |
| `react-native-safe-area-context` | Safe area inset handling |
| `react-native-screens` | Native screen optimisation |
| `react-native-gesture-handler` | Touch gesture support |

---

## 📁 Project Structure

```
emotionsense/
├── App.js                        # Entry point — font loading & navigation root
├── app.json                      # Expo configuration (permissions, plugins)
├── package.json                  # Dependencies & npm scripts
├── babel.config.js               # Babel config (expo preset)
├── metro.config.js               # Metro bundler config
├── index.js                      # Expo registerRootComponent
│
├── navigation/
│   └── MainNavigator.js          # Root Stack + Tab navigator with custom glassmorphism tab bar
│
├── screens/
│   ├── SplashScreen.js           # Animated intro, progress bar, CTA
│   ├── OnboardingScreen.js       # 3-slide feature carousel
│   ├── AnalyzeMediaScreen.js     # Photo/video upload with camera & gallery integration
│   ├── HomeScreen.js             # Camera widget, live emotion chips, AI insight
│   ├── DetectionScreen.js        # Full-screen camera detection with neon scan overlay
│   ├── ResultsScreen.js          # Emotion result, confidence bars, AI analysis text
│   ├── HistoryScreen.js          # SVG trend chart, session timeline, AI insight card
│   └── ProfileScreen.js          # User avatar, stats grid, settings, logout
│
├── components/
│   ├── GlassCard.js              # Reusable glassmorphism card (rgba + border)
│   ├── TopAppBar.js              # Shared header bar with brand logo + profile icon
│   ├── AudioWaveform.js          # Animated audio bar visualisation
│   └── EmotionOrb.js             # Pulsing blurred ambient background orb
│
├── styles/
│   └── theme.js                  # Design tokens: colors, spacing, typography, border radii
│
└── assets/                       # App icons and splash assets (place icon.png here)
```

---

## 🎨 Design System

The app uses a centralised **"Digital Empathy"** design system defined in [`styles/theme.js`](./styles/theme.js).

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `background` | `#0b1326` | App background (Deep Space) |
| `surface` | `#111827` | Card surfaces |
| `primary` | `#ddb7ff` | Neon Purple — primary actions |
| `gradientBlue` | `#adc6ff` | Electric Blue — gradient start |
| `gradientPurple` | `#ddb7ff` | Neon Purple — gradient end |
| `onSurface` | `#e2e8f0` | Primary text |
| `onSurfaceVariant` | `#94a3b8` | Secondary/muted text |

### Typography

All text uses the **Inter** font family loaded via `@expo-google-fonts/inter`:

| Weight | Token | Usage |
|---|---|---|
| 400 | `Inter_400Regular` | Body, captions |
| 600 | `Inter_600SemiBold` | Labels, badges |
| 700 | `Inter_700Bold` | Section headings |
| 800 | `Inter_800ExtraBold` | Hero titles |

### Key Visual Effects

- **Glassmorphism Cards** — `rgba(255,255,255,0.05)` background + `rgba(255,255,255,0.1)` border
- **Gradient Buttons** — Blue → Purple linear gradient with neon drop-shadow
- **Ambient Orbs** — Large blurred circles using `expo-blur` for depth
- **Animated Elements** — React Native `Animated` API for pulse, float, scan-line, and waveform effects

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | ≥ 20.x |
| npm | ≥ 10.x |
| Expo Go app | Latest (iOS / Android) |

> **Note:** Install [Expo Go](https://expo.dev/go) on your phone to run the app instantly without building.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HarshitJain26-2/Emo-Sense-Ai.git
cd Emo-Sense-Ai

# 2. Install dependencies
npm install
```

---

## ▶️ Running the App

```bash
# Start the Expo development server
npm start

# Then in the terminal, press:
#   a  — open on Android emulator
#   i  — open on iOS simulator
#   w  — open in web browser

# Or scan the QR code with Expo Go on your physical device
```

### Platform-specific shortcuts

```bash
npm run android   # Launch directly on Android emulator
npm run ios       # Launch directly on iOS simulator
npm run web       # Launch in the browser
```

---

## 🧭 Navigation Architecture

```
Root Stack Navigator
│
├── Splash                    (SplashScreen)
├── Onboarding                (OnboardingScreen)
├── Main                      (Tab Navigator)  ← fade transition
│   ├── Scan                  (AnalyzeMediaScreen)
│   ├── Insights              (HomeScreen)
│   ├── History               (HistoryScreen)
│   └── Profile               (ProfileScreen)
├── Detection                 (DetectionScreen)  ← slide_from_bottom
└── Results                   (ResultsScreen)    ← slide_from_bottom
```

The bottom tab bar is a **fully custom floating pill** (`CustomTabBar`) with glassmorphism styling — active tabs use a gradient icon background, inactive tabs use a muted outline icon.

---

## 📦 Key Permissions

Declared in `app.json` via Expo plugins:

| Permission | Reason |
|---|---|
| `CAMERA` | Real-time live detection & in-app photo/video capture |
| `READ_MEDIA_IMAGES` / `READ_MEDIA_VIDEO` | Gallery access for media upload |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

<div align="center">

Made with ❤️ by **Harshit Jain**

</div>
