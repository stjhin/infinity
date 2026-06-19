import React from 'react'
import { useStreamingText } from '../../hooks/useStreamingText'
import MessageBubble from '../message/MessageBubble'
import './StreamingText.css'

/**
 * Progressively reveals text word-by-word in a MessageBubble with a blinking cursor.
 *
 * @param {Object} props
 * @param {string} props.text - Full text to reveal
 * @param {boolean} props.isStreaming - Whether streaming is active
 * @param {number} [props.speed=30]
 * @param {() => void} [props.onComplete]
 * @param {string} [props.className]
 */
export default function StreamingText({
  text = '',
  isStreaming = false,
  speed = 30,
  onComplete,
  className = '',
}) {
  const { displayedText, isComplete } = useStreamingText({
    text,
    isStreaming,
    speed,
    onComplete,
  })

  return (
    <MessageBubble role="ai" className={`ai-streaming-text ${className}`.trim()}>
      <span className="ai-streaming-text__content">
        {displayedText}
        {isStreaming && (
          <span className="ai-streaming-text__cursor" aria-hidden="true" />
        )}
      </span>
    </MessageBubble>
  )
}
