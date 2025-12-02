export interface ModelConfig {
  id: string
  name: string
  description: string
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    description: 'מהיר וחסכוני - מתאים לרוב המשימות',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    description: 'מתקדם יותר - לניתוח מורכב',
  },
]

export const DEFAULT_MODEL = 'gemini-1.5-flash'

export function getModelById(id: string): ModelConfig | undefined {
  return AVAILABLE_MODELS.find((model) => model.id === id)
}

export function isValidModelId(id: string): boolean {
  return AVAILABLE_MODELS.some((model) => model.id === id)
}
