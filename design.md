# Anime Website Template - Design Style Guide

## Design Philosophy

**Theme**: Red-themed dark aesthetic with high-energy anime styling
**Target Audience**: Anime enthusiasts, manga readers, and Japanese pop culture fans
**Visual Language**: Bold, dynamic, and emotionally engaging with premium feel

## Color Palette

### Primary Colors
- **Deep Crimson**: #DC143C (Primary red for buttons and accents)
- **Blood Red**: #8B0000 (Darker red for hover states)
- **Pure Black**: #000000 (Primary background)
- **Charcoal**: #1a1a1a (Secondary background sections)

### Accent Colors
- **Electric Red**: #FF1744 (Highlights and active states)
- **Dark Gray**: #2d2d2d (Cards and containers)
- **Silver**: #C0C0C0 (Text on dark backgrounds)
- **White**: #FFFFFF (Primary text color)

### Gradient Combinations
- **Red Glow**: Linear gradient from #DC143C to #FF1744
- **Dark Fade**: Linear gradient from #000000 to #1a1a1a
- **Accent Burst**: Radial gradient with #8B0000 center and transparent edges

## Typography

### Primary Font
- **Display/Headers**: "Orbitron" - Futuristic, tech-inspired for anime aesthetic
- **Body Text**: "Inter" - Clean, readable sans-serif for content
- **Accent Text**: "JetBrains Mono" - Monospace for technical elements

### Font Hierarchy
- **Hero Titles**: 4rem, bold, with red glow effect
- **Section Headers**: 2.5rem, medium weight
- **Body Text**: 1rem, regular weight
- **Button Text**: 0.9rem, medium weight, uppercase

## Visual Effects & Animation

### Core Libraries Used
1. **Anime.js** - Smooth animations and transitions
2. **Pixi.js** - Particle effects and visual enhancements
3. **Shader-park** - Dynamic background effects
4. **ECharts.js** - Data visualization for episode progress
5. **Splide.js** - Image carousels and sliders
6. **Matter.js** - Physics-based interactions
7. **p5.js** - Creative coding effects

### Animation Effects
- **Button Hover**: Scale transform (1.05x) + red glow + shadow expansion
- **Card Reveal**: Staggered fade-in with 200ms delays
- **Text Effects**: Character-by-character reveal with color cycling
- **Background**: Subtle particle system with red accents
- **Navigation**: Smooth slide transitions between pages

### Header Background Effect
- **Aurora Gradient Flow**: Animated red-to-black gradient with subtle movement
- **Particle Field**: Floating red particles with physics-based movement
- **Depth Layers**: Multiple parallax layers for immersive experience

## Layout & Structure

### Grid System
- **Desktop**: 12-column grid with 24px gutters
- **Tablet**: 8-column grid with 20px gutters  
- **Mobile**: 4-column grid with 16px gutters

### Spacing Scale
- **XS**: 4px - Fine details
- **SM**: 8px - Component spacing
- **MD**: 16px - Section spacing
- **LG**: 32px - Major sections
- **XL**: 64px - Page sections

### Component Styling
- **Cards**: Dark background (#2d2d2d) with red border on hover
- **Buttons**: Red gradient with white text and glow effects
- **Forms**: Dark inputs with red focus states
- **Navigation**: Fixed header with translucent black background

## Interactive Elements

### Button States
- **Default**: Red gradient background
- **Hover**: Brightened red with expanded shadow
- **Active**: Darker red with inset shadow
- **Disabled**: Gray with reduced opacity

### Hover Effects
- **Scale**: 1.05x transform with smooth transition
- **Glow**: Box-shadow with red color and blur
- **Color**: Text color shift to electric red
- **Animation**: 200ms ease-out timing

### Loading States
- **Skeleton**: Dark gray placeholders with red accent
- **Progress**: Red progress bars with smooth animation
- **Spinner**: Red rotating indicator with pulse effect

## Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

### Mobile Adaptations
- **Navigation**: Hamburger menu with slide-out drawer
- **Cards**: Single column layout with full-width cards
- **Text**: Reduced font sizes for mobile readability
- **Spacing**: Compressed spacing scale for smaller screens