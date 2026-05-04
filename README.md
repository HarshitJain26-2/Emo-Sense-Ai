# EmotionSense — Expo React Native App

A production-ready Expo React Native conversion of the EmotionSense multimodal emotion detection app.

## Project Structure

```
/
├── App.js                    # Entry point — font loading, navigation root
├── app.json                  # Expo config
├── package.json              # Dependencies
├── babel.config.js           # Babel config (Reanimated plugin)
│
├── /navigation
│   └── MainNavigator.js      # Stack + Tab navigation, custom glassmorphism tab bar
│
├── /screens
│   ├── SplashScreen.js       # Animated intro with logo, progress bar, CTA
│   ├── OnboardingScreen.js   # 3-slide carousel (Face / Voice / AI)
│   ├── HomeScreen.js         # Camera placeholder, emotion widgets, AI insight
│   ├── DetectionScreen.js    # Full-screen detection with neon bounding box
│   ├── ResultsScreen.js      # Emotion result, AI analysis, actions
│   ├── HistoryScreen.js      # SVG trend chart, timeline, AI insight card
│   └── ProfileScreen.js      # Avatar, stats, settings, logout
│
├── /components
│   ├── GlassCard.js          # Reusable glassmorphism card
│   ├── TopAppBar.js          # Shared header with brand + profile icon
│   ├── AudioWaveform.js      # Animated audio bar visualization
│   └── EmotionOrb.js         # Pulsing blurred ambient orb
│
├── /styles
│   └── theme.js              # Design tokens (colors, spacing, typography, border radii)
│
└── /assets
    └── (place icon.png here)
```

## Quick Start

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on device
npx expo start --go
```

## Design System

- **Colors**: Deep Space dark palette (#0b1326 background) with Neon Purple (#ddb7ff), Electric Blue (#adc6ff), Soft Pink (#ffb0cd)
- **Typography**: Inter font family (400, 600, 700, 800 weights)
- **Effects**: Glassmorphism cards (rgba + border), Neumorphic shadows, Gradient buttons with neon glow
- **Animations**: React Native Animated API for orbs, waveforms, scan lines, floating elements
