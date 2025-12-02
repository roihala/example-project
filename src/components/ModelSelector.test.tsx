import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ModelSelector } from './ModelSelector'
import { AVAILABLE_MODELS, DEFAULT_MODEL } from '@/lib/models'

// Mock Grommet components
vi.mock('grommet', () => ({
  Box: ({ children, ...props }: any) => <div data-testid="box" {...props}>{children}</div>,
  Select: ({ options, value, onChange, disabled, ...props }: any) => (
    <select
      data-testid="model-select"
      value={value?.id || value}
      onChange={(e) => onChange({ option: options.find((o: any) => o.id === e.target.value) })}
      disabled={disabled}
    >
      {options.map((opt: any) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  ),
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}))

describe('ModelSelector', () => {
  it('should render a select element', () => {
    render(<ModelSelector selectedModel={DEFAULT_MODEL} onModelChange={() => {}} />)
    expect(screen.getByTestId('model-select')).toBeInTheDocument()
  })

  it('should display all available models as options', () => {
    render(<ModelSelector selectedModel={DEFAULT_MODEL} onModelChange={() => {}} />)

    AVAILABLE_MODELS.forEach((model) => {
      expect(screen.getByText(model.name)).toBeInTheDocument()
    })
  })

  it('should show the selected model as current value', () => {
    render(<ModelSelector selectedModel="gemini-1.5-pro" onModelChange={() => {}} />)

    const select = screen.getByTestId('model-select') as HTMLSelectElement
    expect(select.value).toBe('gemini-1.5-pro')
  })

  it('should call onModelChange when a different model is selected', () => {
    const onModelChange = vi.fn()
    render(<ModelSelector selectedModel={DEFAULT_MODEL} onModelChange={onModelChange} />)

    const select = screen.getByTestId('model-select')
    fireEvent.change(select, { target: { value: 'gemini-1.5-pro' } })

    expect(onModelChange).toHaveBeenCalledWith('gemini-1.5-pro')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<ModelSelector selectedModel={DEFAULT_MODEL} onModelChange={() => {}} disabled />)

    const select = screen.getByTestId('model-select')
    expect(select).toBeDisabled()
  })
})
