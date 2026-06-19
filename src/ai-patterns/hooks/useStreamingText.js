import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook for smooth character-by-character text streaming animation.
 *
 * @param {Object} options
 * @param {string} options.text - The full target text to reveal
 * @param {boolean} options.isStreaming - Whether streaming is active
 * @param {number} [options.speed=30] - Milliseconds per character reveal
 * @param {number} [options.maxPerFrame=3] - Max characters to reveal per animation frame (prevents jank on long messages)
 * @param {() => void} [options.onComplete] - Called when streaming finishes
 * @returns {{ displayedText: string, isComplete: boolean }}
 */
export function useStreamingText({
  text = '',
  isStreaming = false,
  speed = 30,
  maxPerFrame = 3,
  onComplete,
}) {
  const [displayedText, setDisplayedText] = useState('')
  const indexRef = useRef(0)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const reset = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    indexRef.current = 0
    setDisplayedText('')
  }, [])

  useEffect(() => {
    if (!isStreaming) {
      // When streaming ends before completion, show remaining text immediately
      if (indexRef.current < text.length) {
        setDisplayedText(text)
        indexRef.current = text.length
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      return
    }

    // Reset on new streaming session
    if (text.length === 0 || indexRef.current > text.length) {
      reset()
    }

    const totalChars = text.length
    const msPerChar = speed

    const tick = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp

      const elapsed = timestamp - lastTimeRef.current
      const charsToAdvance = Math.min(
        Math.floor(elapsed / msPerChar),
        maxPerFrame,
        totalChars - indexRef.current,
      )

      if (charsToAdvance > 0) {
        lastTimeRef.current = timestamp
        indexRef.current += charsToAdvance
        setDisplayedText(text.slice(0, indexRef.current))

        if (indexRef.current >= totalChars) {
          if (onCompleteRef.current) onCompleteRef.current()
          return
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [text, isStreaming, speed, maxPerFrame, reset])

  // Reset when text source changes
  useEffect(() => {
    reset()
  }, [text, reset])

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return {
    displayedText,
    isComplete: indexRef.current >= text.length && text.length > 0,
  }
}
