import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import { NextRequest } from 'next/server'
import { DEFAULT_MODEL } from '@/lib/models'

// Mock the Google Generative AI
const mockGenerateContent = vi.fn().mockResolvedValue({
  response: {
    text: () => JSON.stringify({
      pros: ['Good point'],
      cons: ['Bad point'],
      improvedPrompt: 'Improved version',
    }),
  },
})

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: class {
    constructor() {}
    getGenerativeModel({ model }: { model: string }) {
      return {
        modelName: model,
        generateContent: mockGenerateContent,
      }
    }
  },
}))

// Mock environment variable
beforeEach(() => {
  vi.stubEnv('GEMINI_API_KEY', 'test-api-key')
})

describe('POST /api/analyze', () => {
  it('should use default model when no model is specified', async () => {
    const request = new NextRequest('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'test prompt' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.pros).toBeDefined()
  })

  it('should accept and use a specified model', async () => {
    const request = new NextRequest('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({
        prompt: 'test prompt',
        model: 'gemini-1.5-pro',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
  })

  it('should reject invalid model ids', async () => {
    const request = new NextRequest('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({
        prompt: 'test prompt',
        model: 'invalid-model',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('מודל')
  })

  it('should return error when prompt is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})
