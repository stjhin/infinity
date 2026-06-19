import React, { useState, useRef, useCallback } from 'react'
import Button from '../../../components/Button'
import { listModels } from '../../registry/ModelRegistry'
import './PromptInput.css'

/**
 * Auto-resizing textarea with toolbar, submit button, and model selector.
 *
 * @param {Object} props
 * @param {(text: string, modelId: string) => void} props.onSubmit
 * @param {string} [props.placeholder='Ask anything...']
 * @param {boolean} [props.disabled=false]
 * @param {import('../../types').AIModel[]} [props.models]
 * @param {string} [props.selectedModel]
 * @param {(modelId: string) => void} [props.onModelChange]
 * @param {string} [props.className]
 */
export default function PromptInput({
  onSubmit,
  placeholder = 'Ask anything...',
  disabled = false,
  models = listModels(),
  selectedModel = models[0]?.id || '',
  onModelChange,
  className = '',
}) {
  const [value, setValue] = useState('')
  const [modelOpen, setModelOpen] = useState(false)
  const textareaRef = useRef(null)
  const containerRef = useRef(null)

  const currentModel = models.find((m) => m.id === selectedModel) || models[0]

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed, selectedModel)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value, disabled, onSubmit, selectedModel])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  const handleInput = useCallback((e) => {
    setValue(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 150) + 'px'
  }, [])

  const selectModel = useCallback(
    (id) => {
      setModelOpen(false)
      if (onModelChange) onModelChange(id)
    },
    [onModelChange],
  )

  return (
    <div className={`ai-prompt ${disabled ? 'ai-prompt--disabled' : ''} ${className}`.trim()} ref={containerRef}>
      <div className="ai-prompt__toolbar">
        {onModelChange && models.length > 1 && (
          <div className="ai-prompt__model-selector">
            <button
              type="button"
              className="ai-prompt__model-toggle"
              onClick={() => setModelOpen(!modelOpen)}
              disabled={disabled}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>smart_toy</span>
              <span>{currentModel?.name || 'Select model'}</span>
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                {modelOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {modelOpen && (
              <div className="ai-prompt__model-dropdown">
                {models.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`ai-prompt__model-option ${m.id === selectedModel ? 'ai-prompt__model-option--selected' : ''}`}
                    onClick={() => selectModel(m.id)}
                  >
                    <span>{m.name}</span>
                    <span className="ai-prompt__model-version">v{m.version}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="ai-prompt__input-row">
        <textarea
          ref={textareaRef}
          className="ai-prompt__textarea"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label="Message input"
        />
        <Button
          variant="primary"
          btnType="icon-only"
          size="medium"
          disabled={disabled || !value.trim()}
          onClick={handleSubmit}
          leadingIcon="send"
          className="ai-prompt__submit"
        />
      </div>

      <div className="ai-prompt__hint">
        Press <kbd>Enter</kbd> to send, <kbd>Shift+Enter</kbd> for new line
      </div>
    </div>
  )
}
