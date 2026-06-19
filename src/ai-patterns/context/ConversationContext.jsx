/**
 * React Context + useReducer for conversation state management.
 *
 * Manages: message list, streaming state, thinking phases, typing indicators.
 *
 * @module ai-patterns/context/ConversationContext
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react'

const ConversationContext = createContext(null)

/* ── Action types ── */

const ADD_MESSAGE = 'ADD_MESSAGE'
const UPDATE_STREAM = 'UPDATE_STREAM'
const SET_TYPING = 'SET_TYPING'
const SET_THINKING = 'SET_THINKING'
const CLEAR_CONVERSATION = 'CLEAR_CONVERSATION'
const DELETE_MESSAGE = 'DELETE_MESSAGE'
const ADD_SOURCE = 'ADD_SOURCE'

/* ── Reducer ── */

const initialState = {
  /** @type {import('../types').Message[]} */
  messages: [],
  streamingText: null,
  /** @type {boolean} */
  isTyping: false,
  /** @type {string|null} */
  thinkingLabel: null,
  /** @type {import('../types').ThinkingPhase} */
  thinkingPhase: 'idle',
  /** @type {number} */
  maxMessages: 200,
}

function conversationReducer(state, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      const messages = [...state.messages, action.payload]
      if (messages.length > state.maxMessages) {
        return { ...state, messages: messages.slice(messages.length - state.maxMessages) }
      }
      return { ...state, messages }
    }

    case UPDATE_STREAM: {
      return { ...state, streamingText: action.payload }
    }

    case SET_TYPING: {
      return { ...state, isTyping: action.payload }
    }

    case SET_THINKING: {
      return {
        ...state,
        thinkingPhase: action.payload.phase ?? state.thinkingPhase,
        thinkingLabel: action.payload.label ?? state.thinkingLabel,
      }
    }

    case CLEAR_CONVERSATION: {
      return { ...initialState, maxMessages: state.maxMessages }
    }

    case DELETE_MESSAGE: {
      return {
        ...state,
        messages: state.messages.filter((m) => m.id !== action.payload),
      }
    }

    case ADD_SOURCE: {
      const { messageId, source } = action.payload
      return {
        ...state,
        messages: state.messages.map((m) => {
          if (m.id !== messageId) return m
          const sources = m.sources ? [...m.sources, source] : [source]
          return { ...m, sources }
        }),
      }
    }

    default:
      return state
  }
}

/* ── Provider ── */

export function ConversationProvider({ children, maxMessages = 200 }) {
  const [state, dispatch] = useReducer(conversationReducer, {
    ...initialState,
    maxMessages,
  })

  /** @param {import('../types').Message} message */
  const addMessage = useCallback(
    (message) => dispatch({ type: ADD_MESSAGE, payload: message }),
    [],
  )

  /** @param {string|null} text */
  const updateStream = useCallback(
    (text) => dispatch({ type: UPDATE_STREAM, payload: text }),
    [],
  )

  /** @param {boolean} typing */
  const setTyping = useCallback(
    (typing) => dispatch({ type: SET_TYPING, payload: typing }),
    [],
  )

  /** @param {{ phase?: import('../types').ThinkingPhase, label?: string }} thinking */
  const setThinking = useCallback(
    (thinking) => dispatch({ type: SET_THINKING, payload: thinking }),
    [],
  )

  const clearConversation = useCallback(
    () => dispatch({ type: CLEAR_CONVERSATION }),
    [],
  )

  /** @param {string} messageId */
  const deleteMessage = useCallback(
    (messageId) => dispatch({ type: DELETE_MESSAGE, payload: messageId }),
    [],
  )

  /** @param {string} messageId @param {import('../types').Citation} source */
  const addSource = useCallback(
    (messageId, source) =>
      dispatch({ type: ADD_SOURCE, payload: { messageId, source } }),
    [],
  )

  const value = {
    ...state,
    addMessage,
    updateStream,
    setTyping,
    setThinking,
    clearConversation,
    deleteMessage,
    addSource,
  }

  return React.createElement(ConversationContext.Provider, { value }, children)
}

/* ── Hook ── */

export function useConversation() {
  const ctx = useContext(ConversationContext)
  if (!ctx) {
    throw new Error('useConversation must be used within <ConversationProvider>')
  }
  return ctx
}

export { ConversationContext }
