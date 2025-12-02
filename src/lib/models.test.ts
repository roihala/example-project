import { describe, it, expect } from 'vitest'
import {
  AVAILABLE_MODELS,
  DEFAULT_MODEL,
  getModelById,
  isValidModelId,
  type ModelConfig
} from './models'

describe('Model Configuration', () => {
  describe('AVAILABLE_MODELS', () => {
    it('should have at least one model available', () => {
      expect(AVAILABLE_MODELS.length).toBeGreaterThan(0)
    })

    it('should have gemini-1.5-flash as an available model', () => {
      const flashModel = AVAILABLE_MODELS.find(m => m.id === 'gemini-1.5-flash')
      expect(flashModel).toBeDefined()
      expect(flashModel?.name).toBe('Gemini 1.5 Flash')
    })

    it('should have gemini-1.5-pro as an available model', () => {
      const proModel = AVAILABLE_MODELS.find(m => m.id === 'gemini-1.5-pro')
      expect(proModel).toBeDefined()
      expect(proModel?.name).toBe('Gemini 1.5 Pro')
    })

    it('each model should have required properties', () => {
      AVAILABLE_MODELS.forEach((model: ModelConfig) => {
        expect(model.id).toBeDefined()
        expect(model.name).toBeDefined()
        expect(model.description).toBeDefined()
        expect(typeof model.id).toBe('string')
        expect(typeof model.name).toBe('string')
        expect(typeof model.description).toBe('string')
      })
    })
  })

  describe('DEFAULT_MODEL', () => {
    it('should be gemini-1.5-flash', () => {
      expect(DEFAULT_MODEL).toBe('gemini-1.5-flash')
    })

    it('should be a valid model id', () => {
      expect(isValidModelId(DEFAULT_MODEL)).toBe(true)
    })
  })

  describe('getModelById', () => {
    it('should return the correct model for a valid id', () => {
      const model = getModelById('gemini-1.5-flash')
      expect(model).toBeDefined()
      expect(model?.id).toBe('gemini-1.5-flash')
    })

    it('should return undefined for an invalid id', () => {
      const model = getModelById('invalid-model')
      expect(model).toBeUndefined()
    })
  })

  describe('isValidModelId', () => {
    it('should return true for valid model ids', () => {
      expect(isValidModelId('gemini-1.5-flash')).toBe(true)
      expect(isValidModelId('gemini-1.5-pro')).toBe(true)
    })

    it('should return false for invalid model ids', () => {
      expect(isValidModelId('invalid-model')).toBe(false)
      expect(isValidModelId('')).toBe(false)
    })
  })
})
