import React from 'react'
import ChatContainer from './components/chat/ChatContainer'
import MessageBubble from './components/message/MessageBubble'
import TypingIndicator from './components/indicators/TypingIndicator'
import ThinkingIndicator from './components/indicators/ThinkingIndicator'
import ChainOfThought from './components/reasoning/ChainOfThought'
import SourcesPanel from './components/reasoning/SourcesPanel'
import ExplainabilityPanel from './components/reasoning/ExplainabilityPanel'
import SuggestedActions from './components/controls/SuggestedActions'
import PersonaCard from './components/persona/PersonaCard'
import { listModels } from './registry/ModelRegistry'

const meta = {
  title: 'AI Patterns/Overview',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# AI Pattern Components — Overview

The **AI Patterns** library provides a complete set of React components for building AI-powered chat interfaces. It covers four domains: core conversation UI, explainability & reasoning, user controls & actions, and governance infrastructure.

---

## Architecture — Layered Composition

Higher tiers compose lower tiers:

- **Tier 3 (Organisms):** ChatContainer
- **Tier 2 (Molecules):** PromptInput, StreamingText, ChainOfThought, SourcesPanel, ExplainabilityPanel, SuggestedActions, VoiceInput, ChatThread
- **Tier 1 (Atoms):** MessageBubble, TypingIndicator, ThinkingIndicator, QuickReply, PersonaCard, Source
- **Tier 0 (Foundation):** ConversationContext, useStreamingText, useVoiceInput, ModelRegistry, ComponentCatalog, AssetCILinkage

### Message Flow (Data Pipeline)

1. User types in PromptInput → fires onSubmit(text, modelId)
2. ChatContainer creates a user Message, dispatches ADD_MESSAGE
3. TypingIndicator appears (SET_TYPING: true)
4. ThinkingIndicator cycles: understanding → planning → executing → outputting
5. StreamingText progressively reveals AI response via requestAnimationFrame
6. ChainOfThought, SourcesPanel, ExplainabilityPanel render below AI message
7. SuggestedActions chips appear for follow-up prompts

---

## Component Catalog

### 💬 Core Conversation — The building blocks of any chat with AI

| Component | What it does (plain language) |
|-----------|------------------------------|
| **ChatContainer** | The main chat window — the full screen where you talk back and forth with the AI |
| **ChatThread** | A saved conversation in your history that you can click to resume later |
| **PromptInput** | The text box at the bottom where you type your question or request |
| **MessageBubble** | A single message in the conversation — colored differently so you can tell who said what |
| **StreamingText** | Words that appear one at a time, like watching the AI type its response live |
| **TypingIndicator** | Three bouncing dots that let you know the AI is working on an answer |
| **ThinkingIndicator** | A small badge telling you which step the AI is on (understanding your question, planning, writing) |

### 🧠 Explainability & Reasoning — Understanding how the AI arrived at its answer

| Component | What it does (plain language) |
|-----------|------------------------------|
| **ChainOfThought** | A expandable panel that reveals the AI's step-by-step reasoning — click to see how it thought through the problem |
| **SourcesPanel** | A list of references and links the AI consulted to answer your question |
| **Source** | A single reference link, with a color-coded badge showing how trustworthy it is |
| **ExplainabilityPanel** | A confidence meter (0-100%) plus a written explanation of how reliable the answer is and which model produced it |

### 🎛 Controls & Actions — Ways to interact with the AI beyond typing

| Component | What it does (plain language) |
|-----------|------------------------------|
| **VoiceInput** | A pop-up that lets you speak your question instead of typing — tap to talk, tap to stop |
| **QuickReply** | A tappable suggestion chip the AI offers so you can continue the conversation with one click |
| **SuggestedActions** | A row (or column) of suggested follow-up questions you might want to ask next |
| **PersonaCard** | An ID card showing who the AI is, what it can help with, and which model powers it |

### 🏛 Governance Infrastructure — Behind-the-scenes safety and compliance tools

| Module | What it does (plain language) |
|--------|------------------------------|
| **ModelRegistry** | A master list of every AI model the system can use, including who built it and what regulations it complies with |
| **ComponentCatalog** | A safety gatekeeper — only UI pieces that have been approved can appear on screen; anything unknown is blocked |
| **AssetCILinkage** | A tracking record that shows which AI models are running in which locations (e.g. US servers vs. EU servers) |

---

## State Management (ConversationContext)

All conversation state flows through React Context + useReducer:

| Action | Dispatched by | Consumed by |
|--------|--------------|-------------|
| ADD_MESSAGE | ChatContainer (onSend) | Message list |
| UPDATE_STREAM | ChatContainer | StreamingText |
| SET_TYPING | ChatContainer | TypingIndicator |
| SET_THINKING | ChatContainer | ThinkingIndicator, ChainOfThought |
| ADD_SOURCE | ChatContainer | SourcesPanel |
| DELETE_MESSAGE | MessageBubble actions | Message list |
| CLEAR_CONVERSATION | ChatContainer | Entire view |

---

## Standalone Usage

Every component works independently. Minimal example:

\`\`\`jsx
import { ConversationProvider, useConversation } from './ai-patterns'
import MessageBubble from './ai-patterns/components/message/MessageBubble'
import PromptInput from './ai-patterns/components/prompt/PromptInput'

function MiniChat() {
  const { messages, addMessage } = useConversation()
  return (
    <div>
      {messages.map(msg => (
        <MessageBubble key={msg.id} role={msg.role}>{msg.content}</MessageBubble>
      ))}
      <PromptInput onSubmit={(text) => addMessage({
        id: Date.now().toString(), role: 'user', content: text, timestamp: Date.now()
      })} />
    </div>
  )
}

export default function App() {
  return <ConversationProvider><MiniChat /></ConversationProvider>
}
\`\`\`

### Governance Infrastructure

\`\`\`jsx
import { filterByComplianceTag } from './ai-patterns'
import { registerComponent, renderSafe } from './ai-patterns'
import { getCIsForAsset } from './ai-patterns'

// Model compliance
const euReady = filterByComplianceTag('EU-AI-Act-limited-risk')

// Component allowlist
registerComponent('SafeCard', ({ title }) => <div>{title}</div>)
renderSafe('SafeCard', { title: 'Hello' })   // ✅ renders
renderSafe('MaliciousWidget', {})             // ❌ returns null

// Deployment tracking
getCIsForAsset('deepseek-v4-pro')
// → [{ ciId: 'ci-us-prod-001', environment: 'us-prod', ... }, ...]
\`\`\`

---

## Accessibility

| Component | A11y Feature |
|-----------|-------------|
| ChatContainer | role="log", aria-live="polite" |
| StreamingText | Blinking cursor hidden (aria-hidden) |
| TypingIndicator | role="status", aria-label |
| ThinkingIndicator | role="status", aria-label with phase |
| PromptInput | aria-label, keyboard shortcuts |
| VoiceInput | role="dialog", keyboard navigation |
| ExplainabilityPanel | role="progressbar" with aria-valuenow/min/max |
| ChainOfThought | aria-expanded on toggle, semantic button |

---

## Token System

All components use CSS custom properties from tokens.css:

\`\`\`css
--ai-bubble-user-bg          /* User message background */
--ai-bubble-ai-bg            /* AI message background */
--ai-thinking-phase-*        /* Phase indicator colors */
--ai-confidence-high/medium/low  /* Confidence badge colors */
--ai-streaming-cursor-color  /* Blinking cursor */
--ai-prompt-focus-border     /* Input focus ring */
--ai-voice-overlay-bg        /* Recording overlay backdrop */
\`\`\`

---

## File Structure

\`\`\`
src/ai-patterns/
├── index.js                    # Barrel export
├── types.js                    # JSDoc type definitions
├── tokens.css                  # 65 AI-specific CSS custom properties
├── docs.stories.jsx            # This overview
├── context/ConversationContext.jsx  # React Context + useReducer
├── hooks/
│   ├── useStreamingText.js     # rAF-based text reveal
│   └── useVoiceInput.js        # MediaRecorder wrapper
├── registry/
│   ├── ModelRegistry.js        # AI model inventory
│   ├── ComponentCatalog.js     # Render allowlist
│   └── AssetCILinkage.js       # CI deployment linkage
└── components/
    ├── chat/           ChatContainer, ChatThread
    ├── prompt/         PromptInput
    ├── message/        MessageBubble
    ├── streaming/      StreamingText
    ├── indicators/     TypingIndicator, ThinkingIndicator
    ├── reasoning/      ChainOfThought, SourcesPanel, Source, ExplainabilityPanel
    ├── controls/       QuickReply, SuggestedActions, VoiceInput
    └── persona/        PersonaCard
\`\`\`
`,
      },
    },
  },
}

export default meta

const AI_AVATAR = (
  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>smart_toy</span>
)

/**
 * AI Chat — the full chat interface demo. Only the ChatContainer is shown here;
 * individual components are displayed separately in "AI Patterns".
 */
export const AiChat = {
  name: 'AI Chat',
  render: () => (
    <ChatContainer
      headerTitle="Infinity AI Assistant"
      models={listModels()}
      persona={{
        name: 'Infinity Assistant',
        description: 'Your AI-powered design system companion.',
        capabilities: ['Component generation', 'Accessibility auditing', 'Design token management', 'Code review'],
      }}
      initialMessages={[
        {
          id: 'msg-1',
          role: 'system',
          content: 'Conversation started. Model: DeepSeek V4 Pro. Context: 128K tokens.',
          timestamp: Date.now() - 300000,
        },
        {
          id: 'msg-2',
          role: 'user',
          content: 'How do I create an accessible button component?',
          timestamp: Date.now() - 240000,
        },
        {
          id: 'msg-3',
          role: 'ai',
          content: 'To create an accessible button component, start with semantic HTML using the `<button>` element. Ensure it has a visible focus indicator, supports keyboard navigation, and includes proper ARIA attributes when needed.\n\nUse the Infinity Button component which already handles these concerns — it includes focus rings, aria-disabled, aria-busy for loading states, and full keyboard support via Space and Enter keys.',
          timestamp: Date.now() - 230000,
          sources: [
            { id: 's1', title: 'WCAG 2.1 — Button Guidelines', url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value', confidence: 0.95 },
            { id: 's2', title: 'Infinity Button Docs', url: './?path=/docs/components-button--docs', confidence: 0.88 },
            { id: 's3', title: 'MDN: ARIA button role', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role', confidence: 0.91 },
          ],
        },
      ]}
      quickReplies={[
        { label: 'Show me the code', icon: 'code', onClick: () => {} },
        { label: 'Color contrast?', icon: 'contrast', onClick: () => {} },
        { label: 'Test it for me', icon: 'play_arrow', onClick: () => {} },
      ]}
      thinking={[
        { phase: 'understanding', label: 'Understanding query', content: 'Parsing question about accessible buttons. Identifying WCAG guidelines (2.1 AA) and Infinity component patterns.' },
        { phase: 'planning', label: 'Planning approach', content: 'Outline: semantic HTML, keyboard navigation, focus indicators, ARIA attributes, Infinity Button implementation.' },
        { phase: 'executing', label: 'Generating response', content: 'Writing detailed answer with code references, WCAG citations, and design system guidance.' },
        { phase: 'outputting', label: 'Formatting output', content: 'Structuring final response with markdown, links, and source citations.' },
      ]}
      confidence={0.88}
      explanation="Based on WCAG 2.1 AA standards, Infinity design system documentation, and MDN Web Docs. All code patterns verified against current component library."
    />
  ),
}

/**
 * AI Patterns — visual catalog of every individual component with plain-language descriptions.
 */
const DEFINITION_STYLE = {
  fontSize: 13,
  color: 'var(--color-asx-mono-500)',
  marginTop: 6,
  lineHeight: 1.4,
  maxWidth: 520,
}
const SECTION_STYLE = { marginBottom: 28, fontFamily: 'var(--font-family-base)' }
const TITLE_STYLE = { margin: '0 0 6px', fontSize: 17, fontWeight: 600, color: 'var(--color-asx-navy-900)' }
const SUBTITLE_STYLE = { margin: '0 0 14px', fontSize: 13, color: 'var(--color-asx-mono-500)', lineHeight: 1.5 }
const GRID_STYLE = { display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }

export const AiPatterns = {
  name: 'AI Patterns',
  render: () => (
    <div style={{ padding: 24, fontFamily: 'var(--font-family-base)' }}>

      {/* ── Core Conversation ── */}
      <h3 style={TITLE_STYLE}>💬 Core Conversation</h3>
      <p style={SUBTITLE_STYLE}>The building blocks of any chat with AI — the input box, message bubbles, and status indicators that make a conversation feel natural.</p>

      <div style={SECTION_STYLE}>
        <div style={GRID_STYLE}>
          <TypingIndicator label="AI is typing" size="medium" />
          <ThinkingIndicator phase="executing" label="Generating response" isActive />
        </div>
        <p style={DEFINITION_STYLE}>
          <strong>TypingIndicator</strong> — Three bouncing dots that let you know the AI is working on a response.
          <br />
          <strong>ThinkingIndicator</strong> — A small badge showing which step the AI is on (understanding, planning, writing).
        </p>
      </div>

      <div style={SECTION_STYLE}>
        <MessageBubble role="ai" avatar={AI_AVATAR} timestamp="10:32 AM">
          React hooks let you use state and lifecycle features in functional components. The most common are useState, useEffect, and useContext.
        </MessageBubble>
        <p style={DEFINITION_STYLE}>
          <strong>MessageBubble</strong> — A single message in the conversation. The background color tells you who sent it: purple-ish for you, light gray for the AI.
        </p>
      </div>

      {/* ── Explainability & Reasoning ── */}
      <h3 style={TITLE_STYLE}>🧠 Explainability & Reasoning</h3>
      <p style={SUBTITLE_STYLE}>Tools that help you understand how the AI arrived at its answer, what sources it used, and how confident it is.</p>

      <div style={SECTION_STYLE}>
        <ChainOfThought
          steps={[
            { phase: 'understanding', label: 'Understanding query', content: 'Parsing user question about React hooks. Identifying key concepts.' },
            { phase: 'planning', label: 'Planning approach', content: 'Outline explanation with code examples and best practices.' },
            { phase: 'executing', label: 'Executing...', content: 'Generating detailed response with code snippets.' },
            { phase: 'outputting', label: 'Generating response', content: 'Formatting final answer with proper markdown.' },
          ]}
          defaultExpanded={true}
        />
        <p style={DEFINITION_STYLE}>
          <strong>ChainOfThought</strong> — An expandable panel that reveals the AI&rsquo;s step-by-step thinking. Click the header to open or close it. Each step has a colored badge and an explanation.
        </p>
      </div>

      <div style={SECTION_STYLE}>
        <SourcesPanel
          sources={[
            { id: '1', title: 'React Docs', url: 'https://react.dev', confidence: 0.95 },
            { id: '2', title: 'Community Guide', confidence: 0.62 },
            { id: '3', title: 'Wikipedia: React', url: 'https://en.wikipedia.org/wiki/React_(software)', confidence: 0.78 },
          ]}
          layout="panel"
        />
        <p style={DEFINITION_STYLE}>
          <strong>SourcesPanel</strong> — A list of references the AI used. Each source has a colored badge: green = highly trustworthy, yellow = moderately reliable, red = unverified.
        </p>
      </div>

      <div style={SECTION_STYLE}>
        <ExplainabilityPanel
          confidence={0.88}
          explanation="Response is based on official React documentation and verified code patterns."
          model={listModels()[0]}
        />
        <p style={DEFINITION_STYLE}>
          <strong>ExplainabilityPanel</strong> — A confidence meter (0&ndash;100%) plus a written explanation of how reliable the answer is. Also shows which AI model produced the response.
        </p>
      </div>

      {/* ── Controls & Actions ── */}
      <h3 style={TITLE_STYLE}>🎛 Controls & Actions</h3>
      <p style={SUBTITLE_STYLE}>Alternative ways to interact with the AI — voice input, suggested replies, and the AI&rsquo;s identity card.</p>

      <div style={SECTION_STYLE}>
        <SuggestedActions
          orientation="horizontal"
          actions={[
            { label: 'Explain further', icon: 'help', onClick: () => {} },
            { label: 'Show example', onClick: () => {} },
            { label: 'Regenerate', icon: 'refresh', onClick: () => {} },
          ]}
        />
        <p style={DEFINITION_STYLE}>
          <strong>SuggestedActions</strong> — A row of tappable chips the AI suggests so you can continue the conversation with one click. Each chip is a <strong>QuickReply</strong> — a pre-filled prompt that acts like a shortcut.
        </p>
      </div>

      <div style={SECTION_STYLE}>
        <PersonaCard
          name="Infinity Assistant"
          description="Your AI-powered design system companion."
          capabilities={['Component generation', 'Accessibility auditing', 'Design token management', 'Code review']}
          model={listModels()[0]}
        />
        <p style={DEFINITION_STYLE}>
          <strong>PersonaCard</strong> — An ID card showing the AI&rsquo;s name, what it can help you with, and which model is powering it. Useful for transparency and trust.
        </p>
      </div>

    </div>
  ),
}
