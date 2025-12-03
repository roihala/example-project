# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prompt Trainer (מאמן פרומפטים) - A Hebrew RTL web application that helps junior developers improve their AI prompting skills. Users submit prompts and receive structured feedback (pros, cons, improved version) from Google Gemini.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm test             # Run tests in watch mode (vitest)
npm run test:run     # Run tests once
```

Run a single test file:
```bash
npx vitest run src/lib/models.test.ts
```

## Architecture

### Stack
- **Frontend**: Next.js 16 + React 19 + Grommet UI
- **Styling**: Grommet theme system with light/dark mode (not Tailwind despite docs)
- **AI**: Google Gemini API (gemini-1.5-flash default, gemini-1.5-pro available)
- **Testing**: Vitest + Testing Library + jsdom

### Key Data Flow
```
User Input → /api/analyze (POST) → Gemini API → JSON response
                                      ↓
                              { pros[], cons[], improvedPrompt }
```

### Directory Structure
```
src/
├── app/
│   ├── api/analyze/route.ts   # Gemini integration, prompt analysis
│   ├── page.tsx               # Main chat interface, state management
│   └── layout.tsx             # RTL setup, ThemeProvider wrapper
├── components/
│   ├── ThemeProvider.tsx      # Grommet theme + dark mode context
│   ├── ChatMessage.tsx        # User/AI message bubbles
│   ├── ChatInput.tsx          # Textarea + model selector
│   └── ModelSelector.tsx      # Gemini model dropdown
└── lib/
    ├── theme.ts               # Grommet theme config (colors, typography)
    └── models.ts              # Model configuration constants
```

### Key Patterns
- **Theme**: Uses Grommet's `themeMode` prop for dark/light switching, persists to localStorage
- **API Response**: Gemini returns JSON with `{ pros, cons, improvedPrompt }` - route handles markdown code block extraction
- **Model Selection**: Configurable via `AVAILABLE_MODELS` in `src/lib/models.ts`

## Environment Variables

```bash
GEMINI_API_KEY=your-api-key  # Required for /api/analyze
```

## RTL Considerations

- All UI text is Hebrew
- `dir="rtl"` set on `<html>` element
- User messages align right, AI responses align left
- System prompt in `route.ts` is in Hebrew
