import React, { useCallback, useRef, useEffect } from 'react'
import { ConversationProvider, useConversation } from '../../context/ConversationContext'
import MessageBubble from '../message/MessageBubble'
import PromptInput from '../prompt/PromptInput'
import StreamingText from '../streaming/StreamingText'
import TypingIndicator from '../indicators/TypingIndicator'
import ThinkingIndicator from '../indicators/ThinkingIndicator'
import ChainOfThought from '../reasoning/ChainOfThought'
import SourcesPanel from '../reasoning/SourcesPanel'
import SuggestedActions from '../controls/SuggestedActions'
import PersonaCard from '../persona/PersonaCard'
import { listModels } from '../../registry/ModelRegistry'
import './ChatContainer.css'

const AI_AVATAR = (
  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>smart_toy</span>
)
const USER_AVATAR = (
  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>person</span>
)

/**
 * Full chat view composing all AI pattern components.
 *
 * @param {Object} props
 * @param {import('../../types').Message[]} [props.initialMessages=[]]
 * @param {string} [props.headerTitle='AI Assistant']
 * @param {import('../../types').AIModel[]} [props.models]
 * @param {{label: string, icon?: string, onClick: () => void}[]} [props.quickReplies]
 * @param {import('../../types').ThinkingStep[]} [props.thinking]
 * @param {import('../../types').Citation[]} [props.sources]
 * @param {number} [props.confidence]
 * @param {string} [props.explanation]
 * @param {{name: string, description: string, capabilities: string[]}} [props.persona]
 * @param {string} [props.className]
 */
export default function ChatContainer({
  initialMessages = [],
  headerTitle = 'AI Assistant',
  models,
  quickReplies = [],
  thinking = [],
  sources = [],
  confidence,
  explanation,
  persona,
  className = '',
}) {
  const modelsList = models || listModels()

  return (
    <ConversationProvider>
      <ChatInner
        initialMessages={initialMessages}
        headerTitle={headerTitle}
        models={modelsList}
        quickReplies={quickReplies}
        thinking={thinking}
        sources={sources}
        confidence={confidence}
        explanation={explanation}
        persona={persona}
        className={className}
      />
    </ConversationProvider>
  )
}

function ChatInner({
  initialMessages,
  headerTitle,
  models,
  quickReplies,
  thinking: thinkingSteps,
  sources,
  confidence,
  explanation,
  persona,
  className,
}) {
  const {
    messages,
    streamingText,
    isTyping,
    thinkingPhase,
    thinkingLabel,
    addMessage,
    updateStream,
    setTyping,
    setThinking,
  } = useConversation()

  // ── Refs for timeout tracking and click-outside detection ──
  const containerRef = useRef(null)
  const timeoutIdsRef = useRef([])
  const hasInteractedRef = useRef(false)

  // Seed initial messages on first render
  React.useEffect(() => {
    if (messages.length === 0 && initialMessages.length > 0) {
      initialMessages.forEach((m) => addMessage(m))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cancel all pending streaming timeouts ──
  const cancelStreaming = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id))
    timeoutIdsRef.current = []
  }, [])

  // ── Reset chat to idle default state (stop streaming/typing/thinking, keep messages) ──
  const resetToIdle = useCallback(() => {
    cancelStreaming()
    updateStream(null)
    setTyping(false)
    setThinking({ phase: 'idle', label: null })
  }, [cancelStreaming, updateStream, setTyping, setThinking])

  // ── Click-outside handler: reset to idle, preserve PromptInput text ──
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        resetToIdle()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [resetToIdle])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => cancelStreaming()
  }, [cancelStreaming])

  const currentModel = models[0]

  const handleSend = useCallback(
    (text, modelId) => {
      // Cancel any in-flight streaming from a previous message
      cancelStreaming()
      hasInteractedRef.current = true

      const userMsg = {
        id: `msg-${Date.now()}-user`,
        role: /** @type {import('../../types').MessageRole} */ ('user'),
        content: text,
        timestamp: Date.now(),
      }
      addMessage(userMsg)

      // Simulate AI response pipeline — track timeouts so they can be cancelled
      setTyping(true)
      setThinking({ phase: 'understanding', label: 'Understanding query' })

      const t1 = setTimeout(() => {
        setThinking({ phase: 'planning', label: 'Planning approach' })
      }, 800)
      timeoutIdsRef.current.push(t1)

      const t2 = setTimeout(() => {
        setThinking({ phase: 'executing', label: 'Generating response' })
        setTyping(false)

        const aiMsg = {
          id: `msg-${Date.now()}-ai`,
          role: /** @type {import('../../types').MessageRole} */ ('ai'),
          content: `Here's a response to "${text}":\n\nThis is a simulated AI response that demonstrates the ChatContainer composition. In a real integration, this would be connected to an AI backend streaming API.`,
          timestamp: Date.now(),
          sources: sources.length > 0 ? sources : undefined,
        }
        addMessage(aiMsg)
        updateStream(aiMsg.content)
        setThinking({ phase: 'idle' })

        // Clean up completed timeout refs
        timeoutIdsRef.current = timeoutIdsRef.current.filter((id) => id !== t1 && id !== t2)
      }, 1600)
      timeoutIdsRef.current.push(t2)
    },
    [addMessage, setTyping, setThinking, updateStream, sources, cancelStreaming],
  )

  const handleQuickReply = useCallback(
    (label) => {
      handleSend(label, models[0]?.id || '')
    },
    [handleSend, models],
  )

  return (
    <div className={`ai-chat ${className}`.trim()} ref={containerRef}>
      {/* Header */}
      <header className="ai-chat__header">
        {persona ? (
          <PersonaCard {...persona} model={currentModel} />
        ) : (
          <div className="ai-chat__header-simple">
            <div className="ai-chat__header-avatar">{AI_AVATAR}</div>
            <div>
              <h2 className="ai-chat__header-title">{headerTitle}</h2>
              {currentModel && (
                <span className="ai-chat__header-model">{currentModel.name}</span>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Messages area */}
      <div className="ai-chat__messages" role="log" aria-live="polite" aria-atomic="false">
        {messages.length === 0 && !isTyping && (
          <div className="ai-chat__empty">
            <span className="material-symbols-rounded" style={{ fontSize: 48, color: 'var(--color-asx-mono-300)' }}>
              forum
            </span>
            <p>Start a conversation by typing a message below.</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="ai-chat__message-wrapper">
            <MessageBubble
              role={msg.role}
              avatar={msg.role === 'ai' ? AI_AVATAR : msg.role === 'user' ? USER_AVATAR : undefined}
              timestamp={new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            >
              {msg.content}

              {/* Chain of Thought embedded inside the AI message bubble */}
              {msg.role === 'ai' && thinkingSteps.length > 0 && (
                <ChainOfThought
                  steps={thinkingSteps}
                  isActive={false}
                  embedded
                  confidence={confidence}
                  explanation={explanation}
                  model={currentModel}
                />
              )}
            </MessageBubble>

            {/* Show supplementary sources below the bubble */}
            {msg.role === 'ai' && (
              <div className="ai-chat__reasoning">
                {msg.sources && msg.sources.length > 0 && (
                  <SourcesPanel sources={msg.sources} layout="inline" />
                )}
              </div>
            )}
          </div>
        ))}

        {/* Streaming text */}
        {streamingText && (
          <div className="ai-chat__message-wrapper">
            <StreamingText text={streamingText} isStreaming={!!streamingText} />
          </div>
        )}

        {/* Typing / thinking indicators */}
        {isTyping && (
          <div className="ai-chat__status">
            <TypingIndicator label="AI is typing" size="small" />
          </div>
        )}

        {thinkingPhase !== 'idle' && !isTyping && (
          <div className="ai-chat__status">
            <ThinkingIndicator phase={thinkingPhase} label={thinkingLabel} isActive />
          </div>
        )}
      </div>

      {/* Suggested actions */}
      {quickReplies.length > 0 && (
        <SuggestedActions
          actions={quickReplies.map((qr) => ({
            ...qr,
            onClick: () => handleQuickReply(qr.label),
          }))}
        />
      )}

      {/* Input area */}
      <div className="ai-chat__input">
        <PromptInput
          onSubmit={handleSend}
          models={models}
        />
      </div>
    </div>
  )
}
