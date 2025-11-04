# Design System Guide

## 🎨 Color Palette

### Background Colors
- **Primary Background**: `#0a0a0a` - Deep black
- **Secondary Background**: `#111111` - Slightly lighter black
- **Card Background**: `#1a1a1a` - Dark gray with subtle transparency
- **Elevated Surface**: `#222222` - For hover states and elevated cards

### Accent Colors
- **Primary Accent**: `#3b82f6` - Vibrant blue (tailwind blue-500)
- **Success/Positive**: `#10b981` - Emerald green (tailwind emerald-500)
- **Warning**: `#f59e0b` - Amber (tailwind amber-500)
- **Danger/Negative**: `#ef4444` - Red (tailwind red-500)
- **Neutral**: `#6b7280` - Gray (tailwind gray-500)

### Text Colors
- **Primary Text**: `#ffffff` - Pure white
- **Secondary Text**: `#a1a1aa` - Light gray (tailwind zinc-400)
- **Tertiary Text**: `#71717a` - Medium gray (tailwind zinc-500)
- **Muted Text**: `#52525b` - Dark gray (tailwind zinc-600)

### Border & Divider Colors
- **Subtle Border**: `rgba(255, 255, 255, 0.1)` - 10% white opacity
- **Default Border**: `rgba(255, 255, 255, 0.15)` - 15% white opacity
- **Emphasis Border**: `rgba(255, 255, 255, 0.2)` - 20% white opacity

---

## 📝 Typography

### Font Families
```css
/* Primary Font Stack (Sans-serif) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Monospace Font (for numbers/data) */
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 
             'Monaco', 'Courier New', monospace;
```

**Recommended Fonts:**
- **Primary**: Inter (Google Fonts) - Modern, clean, excellent for data
- **Monospace**: JetBrains Mono - Perfect for financial data and numbers
- **Alternative**: Geist (Vercel's font) - Similar aesthetic

### Type Scale (Desktop)

```
Display Large:   56px / 3.5rem  | Line Height: 1.1 | Weight: 700
Display Medium:  48px / 3rem    | Line Height: 1.1 | Weight: 700
Display Small:   40px / 2.5rem  | Line Height: 1.2 | Weight: 600

Heading 1 (H1):  32px / 2rem    | Line Height: 1.2 | Weight: 600
Heading 2 (H2):  24px / 1.5rem  | Line Height: 1.3 | Weight: 600
Heading 3 (H3):  20px / 1.25rem | Line Height: 1.4 | Weight: 600
Heading 4 (H4):  18px / 1.125rem| Line Height: 1.4 | Weight: 600

Body Large:      18px / 1.125rem| Line Height: 1.6 | Weight: 400
Body Default:    16px / 1rem    | Line Height: 1.6 | Weight: 400
Body Small:      14px / 0.875rem| Line Height: 1.5 | Weight: 400
Body Tiny:       12px / 0.75rem | Line Height: 1.5 | Weight: 400

Label Large:     16px / 1rem    | Line Height: 1.4 | Weight: 500
Label Default:   14px / 0.875rem| Line Height: 1.4 | Weight: 500
Label Small:     12px / 0.75rem | Line Height: 1.4 | Weight: 500

Monospace:       14px / 0.875rem| Line Height: 1.6 | Weight: 400
```

### Font Weights
- **Regular**: 400 (Body text, paragraphs)
- **Medium**: 500 (Labels, emphasis)
- **Semibold**: 600 (Headings, important UI elements)
- **Bold**: 700 (Display text, major headings)

### Typography Best Practices
- Use `rem` units for scalability
- Maintain 1.5-1.6 line-height for body text
- Keep line length between 45-75 characters
- Use tabular numbers for financial data: `font-variant-numeric: tabular-nums;`

---

## 🎭 Visual Style

### Design Aesthetic
- **Dark Mode First**: Deep black backgrounds with subtle gradients
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Neumorphism (Subtle)**: Very soft inner shadows for depth
- **Minimalism**: Clean, uncluttered interfaces
- **Data-Focused**: Typography optimized for numbers and metrics

### Effects & Treatments

#### Glassmorphism Card
```css
background: rgba(26, 26, 26, 0.6);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
```

#### Glow Effect (for important metrics)
```css
box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
```

#### Subtle Inner Shadow (depth)
```css
box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.3);
```

---

## 📐 Spacing System

### Base Unit: 4px

```
Space 0:   0px    (none)
Space 1:   4px    (0.25rem)
Space 2:   8px    (0.5rem)
Space 3:   12px   (0.75rem)
Space 4:   16px   (1rem)      ← Default gap/margin
Space 5:   20px   (1.25rem)
Space 6:   24px   (1.5rem)
Space 8:   32px   (2rem)
Space 10:  40px   (2.5rem)
Space 12:  48px   (3rem)
Space 16:  64px   (4rem)
Space 20:  80px   (5rem)
Space 24:  96px   (6rem)
```

### Component Spacing
- **Card Padding**: 24px (Space 6)
- **Section Gap**: 32px (Space 8)
- **Element Gap**: 16px (Space 4)
- **Inline Gap**: 8px (Space 2)
- **Button Padding**: 12px 24px (Space 3, Space 6)

---

## 🔲 Layout & Grid

### Container Sizes
```
Max Width:       1280px (for main content)
Wide Container:  1536px (for dashboards)
Narrow:          896px  (for forms/reading)
```

### Responsive Breakpoints
```
Mobile:    < 640px   (sm)
Tablet:    640px     (md)
Desktop:   1024px    (lg)
Wide:      1280px    (xl)
Ultra:     1536px    (2xl)
```

### Grid System
- **12-column grid** for desktop layouts
- **6-column grid** for tablet
- **4-column grid** for mobile
- **Gap**: 24px between columns

---

## 🎯 Component Styles

### Buttons

```css
/* Primary Button */
background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
transition: all 0.2s ease;
box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);

&:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}
```

```css
/* Ghost Button */
background: transparent;
border: 1px solid rgba(255, 255, 255, 0.2);
padding: 10px 20px;
border-radius: 8px;
```

### Cards

```css
/* Standard Card */
background: rgba(26, 26, 26, 0.8);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
padding: 24px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
transition: all 0.3s ease;

&:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.3);
}
```

### Input Fields

```css
background: rgba(17, 17, 17, 0.8);
border: 1px solid rgba(255, 255, 255, 0.15);
border-radius: 8px;
padding: 12px 16px;
font-size: 14px;
color: #ffffff;
transition: all 0.2s ease;

&:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}
```

---

## 📊 Data Visualization

### Chart Colors (Sequential)
```
Blue Scale:
  #1e3a8a → #3b82f6 → #60a5fa → #93c5fd

Green Scale:
  #065f46 → #10b981 → #34d399 → #6ee7b7

Red Scale:
  #991b1b → #ef4444 → #f87171 → #fca5a5
```

### Chart Styling
- **Grid Lines**: `rgba(255, 255, 255, 0.08)`
- **Axis Text**: `#71717a` (zinc-500)
- **Tooltips**: Dark background with glassmorphism
- **Line Thickness**: 2-3px for primary data

---

## 🎬 Animation & Motion

### Timing Functions
```css
/* Default Easing */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Smooth Entrance */
transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

/* Bouncy */
transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration Guidelines
- **Quick**: 150ms (hovers, small changes)
- **Default**: 200-300ms (most transitions)
- **Moderate**: 400-500ms (page transitions)
- **Slow**: 600ms+ (complex animations)

### Common Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse (for loading) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 🔍 Accessibility

### Contrast Ratios
- **Normal Text**: Minimum 4.5:1
- **Large Text**: Minimum 3:1
- **UI Components**: Minimum 3:1

### Focus States
```css
&:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### Screen Reader Considerations
- Use semantic HTML
- Proper heading hierarchy
- ARIA labels for icons
- Skip navigation links

---

## 🛠️ Implementation Stack

### Recommended Technologies
```
Framework:        Next.js 14+ (App Router)
Styling:          Tailwind CSS 3.4+
UI Components:    shadcn/ui
Charts:           Recharts / Chart.js
Icons:            Lucide React
Fonts:            next/font/google (Inter)
State:            React hooks / Zustand
Animation:        Framer Motion (optional)
```

### Tailwind Config Additions
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
}
```

---

## 💡 Design Principles

1. **Clarity Over Cleverness**: Information should be immediately understandable
2. **Consistency**: Use established patterns throughout
3. **Efficiency**: Minimize clicks and cognitive load
4. **Feedback**: Always show system status and user actions
5. **Progressive Disclosure**: Show only what's necessary
6. **Data First**: Typography and layout optimized for reading numbers
7. **Dark Mode Native**: Designed for dark themes, not adapted

---

## 📱 Responsive Considerations

### Mobile (< 640px)
- Reduce font sizes by 10-15%
- Stack layouts vertically
- Increase touch targets (min 44x44px)
- Simplify navigation

### Tablet (640px - 1024px)
- Maintain desktop hierarchy
- Adjust grid to 6 columns
- Optimize chart sizes

### Desktop (1024px+)
- Full 12-column grid
- Multiple data views
- Advanced interactions

---

## 🎨 Color Usage Guidelines

### When to Use Each Color

**Blue** - Primary actions, links, information, trust
**Green** - Success states, positive metrics, growth
**Red** - Errors, warnings, negative metrics, danger
**Amber** - Warnings, attention needed, caution
**Gray** - Neutral states, disabled elements, secondary info

### Semantic Colors
```css
--color-info: #3b82f6;
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-neutral: #6b7280;
```

---

## 🔥 Pro Tips

1. Use `font-feature-settings: 'tnum';` for tabular numbers
2. Add subtle noise texture for depth: `background-image: url('data:image/svg...')`
3. Use CSS custom properties for theming
4. Implement skeleton loading states
5. Add micro-interactions on hover
6. Use `will-change` sparingly for performance
7. Optimize web fonts with `font-display: swap`
8. Use CSS Grid for dashboard layouts
9. Implement smooth scrolling: `scroll-behavior: smooth;`
10. Add loading states with progressive enhancement

---

## 📚 Resources

- **Fonts**: Google Fonts (Inter), Vercel Geist
- **Icons**: Lucide React, Heroicons
- **Inspiration**: Dribbble, Awwwards, Mobbin
- **Color Tools**: Coolors, Adobe Color
- **Testing**: Chrome DevTools, Lighthouse, axe DevTools

---

## 🚀 Quick Start Template

```jsx
// Example shadcn/ui card with nof1.ai styling
<Card className="bg-zinc-900/80 backdrop-blur-xl border-white/10 
                 hover:border-white/20 transition-all duration-300">
  <CardHeader className="space-y-1">
    <CardTitle className="text-xl font-semibold text-white">
      Total Value
    </CardTitle>
    <CardDescription className="text-zinc-400">
      Account Performance
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-mono font-semibold text-white 
                    tabular-nums">
      $95,000.00
    </div>
  </CardContent>
</Card>
```

This design system captures the essence of nof1.ai's sleek, data-focused interface!