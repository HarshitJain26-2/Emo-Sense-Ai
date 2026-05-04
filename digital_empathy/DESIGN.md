---
name: Digital Empathy
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#cfc2d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#988d9f'
  outline-variant: '#4d4354'
  surface-tint: '#ddb7ff'
  primary: '#ddb7ff'
  on-primary: '#490080'
  primary-container: '#b76dff'
  on-primary-container: '#400071'
  inverse-primary: '#842bd2'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#ffb0cd'
  on-tertiary: '#640039'
  tertiary-container: '#f751a1'
  on-tertiary-container: '#570032'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f0dbff'
  primary-fixed-dim: '#ddb7ff'
  on-primary-fixed: '#2c0051'
  on-primary-fixed-variant: '#6900b3'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#3e0022'
  on-tertiary-fixed-variant: '#8c0053'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 32px
  xl: 48px
  container-padding: 24px
  gutter: 16px
---

## Brand & Style
This design system centers on a futuristic, "Neo-Glass" aesthetic tailored for a Gen Z audience. The brand personality is empathetic yet high-tech, bridging the gap between artificial intelligence and human emotion. The visual language utilizes a "Deep Space" dark mode as a canvas for vibrant, high-energy neon accents. 

The style is a hybrid of **Glassmorphism**—using translucency and backdrop blurs to simulate depth—and **Subtle Neumorphism**, which adds tactile dimensionality to interactive elements. The result is a premium, "app-object" feel where the UI feels like it is floating in a 3D space. The vibe is unapologetically aesthetic, prioritizing motion, light, and soft tactility to create a safe, playful environment for emotional exploration.

## Colors
The palette is built on a high-contrast dark foundation. The background is a near-black obsidian to ensure that the primary **Neon Purple**, **Electric Blue**, and **Soft Pink** accents achieve maximum vibrance through additive color blending. 

Gradients are the primary vehicle for color delivery, moving diagonally from Electric Blue to Neon Purple for active states, and Neon Purple to Soft Pink for expressive states. Neutrals are kept cool-toned to maintain the futuristic atmosphere, utilizing deep navy-slates rather than pure grays.

## Typography
The design system utilizes **Inter** exclusively to provide a clean, Swiss-style foundation that balances the complex visual effects of the UI. Headings use Bold and ExtraBold weights with tight letter-spacing to create a "brutal" but refined hierarchy that feels current.

Body text maintains generous line-height for readability against dark backgrounds. For specialized emotional data or AI insights, use the "Label-Bold" style with increased tracking to create a technical, "scanned" look.

## Layout & Spacing
The layout follows a **fluid grid** model with a focus on "floating" containers. Unlike traditional rigid grids, this design system uses generous internal padding (24px+) to allow elements room to breathe. 

Spacing follows an 8px rhythmic scale, but emphasis is placed on "negative space as luxury." Large margins (32px) are used at the edges of the screen to push content toward the center, reinforcing the "floating card" metaphor. Stacked elements should use the `lg` spacing token to prevent the glass layers from appearing cluttered.

## Elevation & Depth
Depth is achieved through three distinct layers:
1.  **Background Layer:** Deep black with subtle, large-scale blurred "orbs" of color (#3B82F6 and #A855F7) at 10% opacity to create a sense of infinite space.
2.  **Glass Layer:** Floating cards use a `backdrop-filter: blur(20px)` and a 1px border. The border is not a solid color but a linear gradient (top-left to bottom-right) from white at 20% opacity to white at 5% opacity.
3.  **Active Layer:** Elements that are being interacted with use **Subtle Neumorphism**. Instead of heavy shadows, use an `inner-shadow` with a soft white glow (10% opacity) on the top-left and a black shadow on the bottom-right to create a "pressed" or "extruded" tactile feel.

Neon borders should be reserved for the highest-priority "Featured" cards, using a 2px stroke with a `box-shadow` that mimics a neon glow using the primary colors.

## Shapes
The shape language is extremely organic and soft. All main containers, buttons, and input fields must use a minimum radius of **24px**. For smaller elements like chips or badges, use the **Pill-shaped** (full radius) approach. 

This extreme roundness counteracts the technical "coldness" of AI, making the app feel approachable and friendly. Avoid sharp corners entirely; even nested elements must follow a concentric rounding rule to maintain visual harmony.

## Components
-   **Gradient Buttons:** Primary buttons feature a vibrant gradient from #3B82F6 to #A855F7. They have a "drop glow" rather than a shadow—a soft, colored blur of the button's own gradient positioned behind it.
-   **Neon-Bordered Cards:** Use these for AI "Insights." The card body is frosted glass, but the border is a 2px solid gradient of the brand colors with a `5px` outer spread blur to simulate light emission.
-   **Minimalist Icons:** Use thin-stroke (1.5px) icons. When an icon is active, it should adopt a "duotone" look using the secondary and tertiary colors.
-   **Glass Input Fields:** Inputs are semi-transparent with a subtle inner-glow when focused. The cursor should be a custom neon-pulsing line.
-   **Interactive Chips:** Pill-shaped elements with a soft neumorphic "pop" (outer shadow) that switches to an "inset" shadow when selected, giving a satisfying tactile click feel.
-   **Floating Emotion Orbs:** A unique component for this system—dynamic, blurred circles that pulse and change color based on the detected emotion, acting as the primary visual feedback for the AI.