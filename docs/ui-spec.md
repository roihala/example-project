# UI Specification

## Overview

| Setting | Value |
|---------|-------|
| Layout | Single page, chat-style |
| Direction | RTL (Hebrew) |
| Color Scheme | Light + Dark mode toggle |
| Input Type | Multi-line text area |
| Session History | Yes |
| Branding | Minimal |

---

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  [Logo/Title]                    [Dark/Light Toggle] │  ← Header
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │ User Prompt #1                                │  │  ← User message (aligned right for RTL)
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │ ## יתרונות                                    │  │  ← AI feedback (aligned left for RTL)
│  │ - נקודה 1                                     │  │
│  │ - נקודה 2                                     │  │
│  │                                               │  │
│  │ ## חסרונות                                    │  │
│  │ - נקודה 1                                     │  │
│  │                                               │  │
│  │ ## פרומפט משופר                               │  │
│  │ [improved prompt]              [copy button]  │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ... (scrollable history)                           │
│                                                     │
├─────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────┐  │
│  │                                               │  │  ← Text area input
│  │  הכנס את הפרומפט שלך כאן...                   │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
│                                        [שלח]        │  ← Submit button
└─────────────────────────────────────────────────────┘
```

---

## Components

### 1. Header
- **Title**: Simple text, e.g., "מאמן פרומפטים" (Prompt Trainer)
- **Theme Toggle**: Sun/Moon icon button for light/dark mode
- **Position**: Fixed at top

### 2. Chat Container
- **Direction**: RTL
- **Scrollable**: Yes, vertical scroll
- **Max Width**: ~800px, centered

### 3. User Message Bubble
- **Alignment**: Right (RTL)
- **Background**: Accent color (e.g., blue-100 light / blue-900 dark)
- **Border Radius**: Rounded corners
- **Content**: The user's original prompt

### 4. AI Feedback Card
- **Alignment**: Left (RTL)
- **Background**: Neutral (gray-100 light / gray-800 dark)
- **Sections**:
  - יתרונות (Pros) - with green indicator
  - חסרונות (Cons) - with red/orange indicator
  - פרומפט משופר (Improved Prompt) - with copy button
- **Border Radius**: Rounded corners

### 5. Input Area
- **Type**: `<textarea>`
- **Placeholder**: "הכנס את הפרומפט שלך כאן..."
- **Rows**: 3-5 (expandable)
- **Position**: Fixed at bottom
- **Direction**: RTL

### 6. Submit Button
- **Text**: "שלח" or arrow icon
- **Position**: Bottom right of input area
- **State**: Disabled while loading

### 7. Loading State
- Spinner or skeleton in AI feedback area
- Input disabled during processing

---

## Color Palette

### Light Mode
| Element | Color |
|---------|-------|
| Background | white (#ffffff) |
| Text | gray-900 (#111827) |
| User Bubble | blue-100 (#dbeafe) |
| AI Card | gray-100 (#f3f4f6) |
| Accent | blue-600 (#2563eb) |
| Pros indicator | green-600 (#16a34a) |
| Cons indicator | red-600 (#dc2626) |

### Dark Mode
| Element | Color |
|---------|-------|
| Background | gray-900 (#111827) |
| Text | gray-100 (#f3f4f6) |
| User Bubble | blue-900 (#1e3a8a) |
| AI Card | gray-800 (#1f2937) |
| Accent | blue-400 (#60a5fa) |
| Pros indicator | green-400 (#4ade80) |
| Cons indicator | red-400 (#f87171) |

---

## Responsive Design

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<640px) | Full width, smaller padding, stacked layout |
| Tablet (640-1024px) | 90% width, medium padding |
| Desktop (>1024px) | Max 800px width, centered |

---

## Hebrew Typography

- **Font**: System Hebrew fonts or "Heebo" (Google Fonts)
- **Direction**: `dir="rtl"` on `<html>` element
- **Text Align**: Right by default

```css
html {
  direction: rtl;
}

body {
  font-family: 'Heebo', system-ui, sans-serif;
}
```

---

## Interactions

| Action | Result |
|--------|--------|
| Submit prompt | Add user bubble, show loading, then AI feedback |
| Copy improved prompt | Copy to clipboard, show "הועתק!" toast |
| Toggle theme | Switch colors, save preference to localStorage |
| Scroll | Chat history scrolls, header stays fixed |
