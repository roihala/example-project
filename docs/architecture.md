# Architecture

## Tech Stack Decision

### Frontend Framework Options

| Option | Pros | Cons |
|--------|------|------|
| **React** | Huge ecosystem, abundant resources, easy hiring | Requires bundler setup, heavier |
| **Vue** | Simpler learning curve, great docs | Smaller ecosystem than React |
| **Next.js** | React + built-in backend (API routes), SSR, easy deployment | More complex, overkill for simple apps |
| **Svelte** | Very fast, minimal code | Smaller community, fewer libraries |

### Backend Options

| Option | Pros | Cons |
|--------|------|------|
| **Next.js API Routes** | Same codebase as frontend, easy deployment | Tied to Next.js |
| **Express (Node.js)** | Simple, flexible, huge ecosystem | Separate deployment needed |
| **FastAPI (Python)** | Great for AI projects, type hints | Different language from frontend |
| **Serverless Functions** | Pay per use, auto-scaling | Cold starts, vendor lock-in |

### AI API Options

| Option | Pros | Cons |
|--------|------|------|
| **OpenAI (GPT-4)** | Best known, great Hebrew support | Cost, rate limits |
| **Anthropic (Claude)** | Strong reasoning, good Hebrew | Similar cost to OpenAI |
| **Google (Gemini)** | Competitive pricing | Hebrew quality varies |

### Styling Options

| Option | Pros | Cons |
|--------|------|------|
| **Tailwind CSS** | Fast development, RTL support built-in | Learning curve, verbose HTML |
| **Plain CSS** | No dependencies, full control | Slower development |
| **Styled Components** | CSS-in-JS, scoped styles | Additional dependency |

---

## Final Decision

### Stack: **Next.js + Tailwind + Google Gemini**

| Component | Choice | Reason |
|-----------|--------|--------|
| **Framework** | Next.js | Frontend + Backend in one codebase, API routes for Gemini calls |
| **Styling** | Tailwind CSS | RTL support, fast development, Hebrew fonts |
| **AI Provider** | Google Gemini | Cost-effective, decent Hebrew support |
| **Deployment** | Self-hosted | Full control over infrastructure |
| **Database** | None (Stateless) | Simple MVP - no persistence needed |

### Architecture Diagram

```
┌─────────────────────────────────────────┐
│             User Browser                │
│         (Hebrew RTL Interface)          │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│           Next.js Server                │
│  ┌─────────────┐  ┌──────────────────┐  │
│  │   Frontend  │  │   API Routes     │  │
│  │  (React +   │  │  /api/analyze    │  │
│  │  Tailwind)  │  │                  │  │
│  └─────────────┘  └────────┬─────────┘  │
└────────────────────────────┼────────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   Google Gemini API │
                  │   (Prompt Analysis) │
                  └─────────────────────┘
```

### Self-Hosting Notes

- Can run on any Linux server with Node.js
- Docker container recommended for easy deployment
- Requires `GEMINI_API_KEY` environment variable
- Reverse proxy (nginx) for HTTPS
