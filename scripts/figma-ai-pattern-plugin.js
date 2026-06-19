/**
 * Figma Plugin Script — AI Pattern Component Generator
 *
 * Paste this entire script into Figma: Plugins → Development → New Plugin → Paste & Run.
 * It creates all 14 AI Pattern components inside the "AI Pattern" page with auto-layout,
 * design tokens, and proper naming.
 *
 * Components: ChatContainer, ChatThread, PromptInput, MessageBubble, StreamingText,
 *   TypingIndicator, ThinkingIndicator, ChainOfThought, SourcesPanel, Source,
 *   ExplainabilityPanel, VoiceInput, SuggestedActions, PersonaCard
 */

const TOKENS = {
  purple100: { r: 0.953, g: 0.941, b: 1 },
  purple200: { r: 0.875, g: 0.847, b: 0.992 },
  purple500: { r: 0.561, g: 0.494, b: 0.906 },
  purple600: { r: 0.510, g: 0.439, b: 0.859 },
  purple800: { r: 0.369, g: 0.302, b: 0.698 },
  navy0: { r: 1, g: 1, b: 1 },
  navy100: { r: 0.969, g: 0.973, b: 0.976 },
  navy200: { r: 0.945, g: 0.949, b: 0.957 },
  navy300: { r: 0.863, g: 0.875, b: 0.894 },
  navy800: { r: 0.267, g: 0.329, b: 0.435 },
  navy900: { r: 0.173, g: 0.243, b: 0.365 },
  mono500: { r: 0.451, g: 0.518, b: 0.588 },
  mono600: { r: 0.220, g: 0.255, b: 0.290 },
  green: { r: 0.133, g: 0.627, b: 0.420 },
  red: { r: 0.886, g: 0.282, b: 0.239 },
  yellow: '#e2b203',
  white: '#ffffff',
  black: '#22272b',
  transparent: { r: 1, g: 1, b: 1, a: 0 },
}

function solid(color) {
  return { type: 'SOLID', color }
}

function fill(color) {
  return figma.util.solidPaint(
    typeof color === 'string' ? color : `rgb(${Math.round(color.r*255)},${Math.round(color.g*255)},${Math.round(color.b*255)})`
  )
}

function textNode(name, content, fontSize = 14, opts = {}) {
  const node = figma.createText()
  node.name = name
  node.fontSize = fontSize
  node.fontName = { family: 'Noto Sans', style: opts.bold ? 'Bold' : 'Regular' }
  if (opts.color) node.fills = [fill(opts.color)]
  if (opts.characters) {
    node.characters = opts.characters
  } else {
    node.characters = content
  }
  node.textAutoResize = 'WIDTH_AND_HEIGHT'
  return node
}

function frame(name, opts = {}) {
  const f = figma.createFrame()
  f.name = name
  f.layoutMode = opts.layoutMode || 'VERTICAL'
  f.primaryAxisSizingMode = opts.primarySizing || 'AUTO'
  f.counterAxisSizingMode = opts.counterSizing || 'AUTO'
  if (opts.padding) f.paddingLeft = f.paddingRight = f.paddingTop = f.paddingBottom = opts.padding
  if (opts.gap != null) f.itemSpacing = opts.gap
  if (opts.fills) f.fills = opts.fills.map(c => fill(c))
  if (opts.strokes) f.strokes = opts.strokes.map(c => fill(c))
  if (opts.strokeWeight) f.strokeWeight = opts.strokeWeight
  if (opts.cornerRadius) f.cornerRadius = opts.cornerRadius
  if (opts.counterAlign) f.counterAxisAlignItems = opts.counterAlign
  if (opts.width) f.resize(opts.width, f.height)
  if (opts.clips) f.clipsContent = true
  return f
}

function rectangle(name, w, h, color, radius = 0) {
  const r = figma.createRectangle()
  r.name = name
  r.resize(w, h)
  r.fills = [fill(color)]
  if (radius) r.cornerRadius = radius
  return r
}

// ──────────────────────────────────────────────────
// FIND OR CREATE "AI Pattern" PAGE
// ──────────────────────────────────────────────────
const targetPageName = 'AI Pattern'
let page = figma.root.findChild(n => n.name === targetPageName && n.type === 'PAGE')
if (!page) {
  page = figma.createPage()
  page.name = targetPageName
}

// Wrap in async since this file uses dynamic pages
;(async () => {

// Switch to the page
await figma.setCurrentPageAsync(page)

// Load fonts before creating any text nodes
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Regular' })
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Bold' })

// Clear existing placeholder
page.children.forEach(c => c.remove())

// ──────────────────────────────────────────────────
// 1. TYPING INDICATOR
// ──────────────────────────────────────────────────
function createTypingIndicator() {
  const container = frame('TypingIndicator', { layoutMode: 'HORIZONTAL', gap: 8, padding: 8, fills: [TOKENS.navy200], cornerRadius: 18, counterAlign: 'CENTER' })
  const dotsFrame = frame('dots', { layoutMode: 'HORIZONTAL', gap: 4, counterAlign: 'CENTER' })
  for (let i = 0; i < 3; i++) {
    const dot = rectangle('dot', 8, 8, TOKENS.purple500)
    dot.cornerRadius = 4
    dotsFrame.appendChild(dot)
  }
  container.appendChild(dotsFrame)
  const label = textNode('label', 'AI is typing', 14, { color: TOKENS.mono600 })
  container.appendChild(label)
  return container
}

// ──────────────────────────────────────────────────
// 2. THINKING INDICATOR
// ──────────────────────────────────────────────────
function createThinkingIndicator() {
  const container = frame('ThinkingIndicator', { layoutMode: 'HORIZONTAL', gap: 6, padding: 4, fills: [TOKENS.navy100], cornerRadius: 16, strokeWeight: 1, strokes: [TOKENS.navy300], counterAlign: 'CENTER' })
  container.paddingLeft = container.paddingRight = 12
  const icon = textNode('icon', 'psychology', 16, { color: TOKENS.purple600 })
  const label = textNode('label', 'Planning', 12, { bold: true, color: TOKENS.purple600 })
  container.appendChild(icon)
  container.appendChild(label)
  const pulse = rectangle('pulse', 6, 6, TOKENS.purple600)
  pulse.cornerRadius = 3
  container.appendChild(pulse)
  return container
}

// ──────────────────────────────────────────────────
// 3. MESSAGE BUBBLE (AI)
// ──────────────────────────────────────────────────
function createMessageBubble() {
  const container = frame('MessageBubble (AI)', { layoutMode: 'HORIZONTAL', gap: 12, counterAlign: 'MIN' })
  const avatar = rectangle('avatar', 32, 32, TOKENS.navy400)
  avatar.cornerRadius = 16
  container.appendChild(avatar)

  const body = frame('body', { layoutMode: 'VERTICAL', gap: 4 })
  const header = frame('header', { layoutMode: 'HORIZONTAL', gap: 8, counterAlign: 'CENTER' })
  header.appendChild(textNode('role', 'AI', 12, { bold: true, color: TOKENS.mono600 }))
  header.appendChild(textNode('time', '10:32 AM', 10, { color: TOKENS.mono500 }))
  body.appendChild(header)

  const content = frame('content', { padding: 10, fills: [TOKENS.navy100], cornerRadius: 12 })
  content.paddingLeft = content.paddingRight = 14
  content.appendChild(textNode('text', 'Here is a response message from the AI.', 14, { color: TOKENS.navy800 }))
  body.appendChild(content)
  container.appendChild(body)
  return container
}

// ──────────────────────────────────────────────────
// 4. PROMPT INPUT
// ──────────────────────────────────────────────────
function createPromptInput() {
  const container = frame('PromptInput', { layoutMode: 'VERTICAL', gap: 8, padding: 12, fills: [TOKENS.white], cornerRadius: 8, strokeWeight: 1, strokes: [TOKENS.navy300] })
  container.counterAxisSizingMode = 'FIXED'
  container.resize(400, container.height)

  const toolbar = frame('toolbar', { layoutMode: 'HORIZONTAL', gap: 8 })
  const modelBtn = frame('model-btn', { layoutMode: 'HORIZONTAL', gap: 6, padding: 4, cornerRadius: 16, fills: [TOKENS.navy200], strokeWeight: 1, strokes: [TOKENS.navy300], counterAlign: 'CENTER' })
  modelBtn.paddingLeft = modelBtn.paddingRight = 10
  modelBtn.appendChild(textNode('model-icon', 'smart_toy', 16, { color: TOKENS.mono500 }))
  modelBtn.appendChild(textNode('model-name', 'DeepSeek V4 Pro', 12, { color: TOKENS.navy800 }))
  toolbar.appendChild(modelBtn)
  container.appendChild(toolbar)

  const inputRow = frame('input-row', { layoutMode: 'HORIZONTAL', gap: 8, counterAlign: 'MAX' })
  const textarea = frame('textarea', { layoutMode: 'HORIZONTAL', counterSizing: 'FIXED' })
  textarea.resize(320, textarea.height)
  textarea.layoutGrow = 1
  textarea.appendChild(textNode('placeholder', 'Ask anything...', 14, { color: TOKENS.mono500 }))
  inputRow.appendChild(textarea)

  const sendBtn = frame('send-btn', { layoutMode: 'HORIZONTAL', padding: 8, cornerRadius: 8, fills: [TOKENS.purple800], counterAlign: 'CENTER' })
  sendBtn.appendChild(textNode('send-icon', 'send', 18, { color: TOKENS.white }))
  inputRow.appendChild(sendBtn)
  container.appendChild(inputRow)

  const hint = textNode('hint', 'Press Enter to send', 11, { color: TOKENS.mono500 })
  container.appendChild(hint)
  return container
}

// ──────────────────────────────────────────────────
// 5. CHAIN OF THOUGHT
// ──────────────────────────────────────────────────
function createChainOfThought() {
  const container = frame('ChainOfThought', { layoutMode: 'VERTICAL', cornerRadius: 8, strokeWeight: 1, strokes: [TOKENS.navy300], fills: [TOKENS.navy100], clips: true })

  const header = frame('header', { layoutMode: 'HORIZONTAL', gap: 8, padding: 10, counterAlign: 'CENTER', counterSizing: 'FIXED' })
  header.paddingLeft = header.paddingRight = 14
  header.resize(400, header.height)
  const headerLeft = frame('header-left', { layoutMode: 'HORIZONTAL', gap: 8, counterAlign: 'CENTER' })
  headerLeft.appendChild(textNode('icon', 'psychology', 16, { color: TOKENS.purple600 }))
  headerLeft.appendChild(textNode('title', 'Chain of Thought', 13, { bold: true, color: TOKENS.navy800 }))
  header.appendChild(headerLeft)

  const confidenceBadge = frame('confidence', { layoutMode: 'HORIZONTAL', padding: 2, cornerRadius: 10, fills: [TOKENS.green], counterAlign: 'CENTER' })
  confidenceBadge.paddingLeft = confidenceBadge.paddingRight = 8
  confidenceBadge.fills = [{ type: 'SOLID', color: TOKENS.green, opacity: 0.12 }]
  confidenceBadge.appendChild(textNode('pct', '88%', 11, { bold: true, color: TOKENS.green }))
  header.appendChild(confidenceBadge)
  header.appendChild(textNode('chevron', 'expand_more', 16, { color: TOKENS.mono500 }))
  container.appendChild(header)

  // Steps
  const steps = ['Understanding query', 'Planning approach', 'Executing...', 'Generating response']
  const phases = ['understanding', 'planning', 'executing', 'outputting']
  const phaseColors = [TOKENS.purple600, TOKENS.purple600, TOKENS.purple600, TOKENS.green]

  const stepsFrame = frame('steps', { layoutMode: 'VERTICAL', gap: 0, padding: 14 })
  stepsFrame.paddingTop = 0
  steps.forEach((step, i) => {
    const row = frame('step-' + i, { layoutMode: 'HORIZONTAL', gap: 12, padding: 8, counterAlign: 'MIN' })
    row.paddingTop = row.paddingBottom = 8
    // Phase badge
    const badge = frame(`phase-${phases[i]}`, { layoutMode: 'HORIZONTAL', gap: 4, padding: 4, cornerRadius: 12, fills: [TOKENS.navy100], strokeWeight: 1, strokes: [TOKENS.navy300], counterAlign: 'CENTER' })
    badge.paddingLeft = badge.paddingRight = 8
    const phaseColorsMap = {
      understanding: TOKENS.purple600,
      planning: TOKENS.purple600,
      executing: TOKENS.mono500,
      outputting: TOKENS.green,
    }
    badge.appendChild(textNode('phase-icon', 'psychology', 12, { color: phaseColorsMap[phases[i]] }))
    badge.appendChild(textNode('phase-label', step, 11, { bold: true, color: phaseColorsMap[phases[i]] }))
    row.appendChild(badge)
    row.appendChild(textNode('detail', `Description for ${step.toLowerCase()}.`, 12, { color: TOKENS.mono600 }))
    if (i < steps.length - 1) {
      row.strokes = [fill(TOKENS.navy300)]
      row.strokeWeight = 0.5
      row.strokeAlign = 'INSIDE'
    }
    stepsFrame.appendChild(row)
  })
  container.appendChild(stepsFrame)

  // Inline explainability
  const explainSection = frame('explainability', { layoutMode: 'VERTICAL', gap: 4, padding: 14 })
  explainSection.paddingTop = 8
  explainSection.strokes = [fill(TOKENS.navy300)]
  explainSection.strokeWeight = 0.5
  explainSection.strokeAlign = 'INSIDE'

  const expHeader = frame('exp-header', { layoutMode: 'HORIZONTAL', gap: 6, counterAlign: 'CENTER' })
  expHeader.appendChild(textNode('exp-icon', 'insights', 14, { color: TOKENS.purple600 }))
  expHeader.appendChild(textNode('exp-title', 'Explainability', 12, { bold: true, color: TOKENS.navy800 }))
  explainSection.appendChild(expHeader)

  const barRow = frame('bar-row', { layoutMode: 'HORIZONTAL', gap: 8, counterAlign: 'CENTER' })
  const barBg = rectangle('bar-bg', 200, 6, TOKENS.navy200)
  barBg.cornerRadius = 3
  barRow.appendChild(barBg)
  barRow.appendChild(textNode('pct-value', '88%', 14, { bold: true, color: TOKENS.green }))
  explainSection.appendChild(barRow)
  explainSection.appendChild(textNode('exp-text', 'Response based on official documentation.', 12, { color: TOKENS.mono600 }))
  container.appendChild(explainSection)

  return container
}

// ──────────────────────────────────────────────────
// 6. SOURCE (Citation Pill)
// ──────────────────────────────────────────────────
function createSource() {
  const container = frame('Source', { layoutMode: 'HORIZONTAL', gap: 6, padding: 4, cornerRadius: 6, fills: [TOKENS.navy100], strokeWeight: 1, strokes: [TOKENS.navy300], counterAlign: 'CENTER' })
  container.paddingLeft = container.paddingRight = 10
  container.appendChild(textNode('icon', 'link', 14, { color: TOKENS.mono500 }))
  container.appendChild(textNode('title', 'React Documentation', 12, { color: TOKENS.navy800 }))
  const badge = frame('badge', { layoutMode: 'HORIZONTAL', padding: 1, cornerRadius: 3, fills: [TOKENS.green], counterAlign: 'CENTER' })
  badge.fills = [{ type: 'SOLID', color: TOKENS.green, opacity: 0.15 }]
  badge.paddingLeft = badge.paddingRight = 5
  badge.appendChild(textNode('confidence', '95%', 10, { bold: true, color: TOKENS.green }))
  container.appendChild(badge)
  return container
}

// ──────────────────────────────────────────────────
// 7. SOURCES PANEL
// ──────────────────────────────────────────────────
function createSourcesPanel() {
  const container = frame('SourcesPanel', { layoutMode: 'VERTICAL', gap: 6, padding: 10 })
  container.paddingLeft = container.paddingRight = 14
  container.appendChild(textNode('label', 'SOURCES', 11, { bold: true, color: TOKENS.mono500 }))
  const sources = ['WCAG 2.1 Guidelines', 'Infinity Button Docs', 'MDN Web Docs']
  sources.forEach(s => {
    const sFrame = frame('source-wrap', { layoutMode: 'HORIZONTAL', gap: 6, padding: 4, cornerRadius: 6, fills: [TOKENS.navy100], strokeWeight: 1, strokes: [TOKENS.navy300], counterAlign: 'CENTER' })
    sFrame.paddingLeft = sFrame.paddingRight = 10
    sFrame.appendChild(textNode('s-icon', 'link', 14, { color: TOKENS.mono500 }))
    sFrame.appendChild(textNode('s-title', s, 12, { color: TOKENS.navy800 }))
    container.appendChild(sFrame)
  })
  return container
}

// ──────────────────────────────────────────────────
// 8. SUGGESTED ACTIONS
// ──────────────────────────────────────────────────
function createSuggestedActions() {
  const container = frame('SuggestedActions', { layoutMode: 'VERTICAL', gap: 8, padding: 10 })
  container.paddingLeft = container.paddingRight = 14
  container.appendChild(textNode('label', 'SUGGESTED', 11, { bold: true, color: TOKENS.mono500 }))
  const row = frame('row', { layoutMode: 'HORIZONTAL', gap: 8 })
  const actions = [
    { label: 'Explain further', icon: 'help' },
    { label: 'Show example', icon: '' },
    { label: 'Regenerate', icon: 'refresh' },
  ]
  actions.forEach(a => {
    const chip = frame('chip', { layoutMode: 'HORIZONTAL', gap: 6, padding: 6, cornerRadius: 16, fills: [TOKENS.white], strokeWeight: 1, strokes: [TOKENS.purple800], counterAlign: 'CENTER' })
    chip.paddingLeft = chip.paddingRight = 12
    if (a.icon) chip.appendChild(textNode('c-icon', a.icon, 14, { color: TOKENS.purple800 }))
    chip.appendChild(textNode('c-label', a.label, 13, { color: TOKENS.purple800 }))
    row.appendChild(chip)
  })
  container.appendChild(row)
  return container
}

// ──────────────────────────────────────────────────
// 9. PERSONA CARD
// ──────────────────────────────────────────────────
function createPersonaCard() {
  const container = frame('PersonaCard', { layoutMode: 'VERTICAL', gap: 16, padding: 20, cornerRadius: 12, fills: [TOKENS.white], strokeWeight: 1, strokes: [TOKENS.navy300] })
  container.counterAxisSizingMode = 'FIXED'
  container.resize(360, container.height)

  const headerRow = frame('header-row', { layoutMode: 'HORIZONTAL', gap: 14, counterAlign: 'MIN' })
  const avatar = rectangle('avatar', 56, 56, TOKENS.purple600)
  avatar.cornerRadius = 28
  headerRow.appendChild(avatar)

  const identity = frame('identity', { layoutMode: 'VERTICAL', gap: 4 })
  identity.appendChild(textNode('name', 'Infinity Assistant', 18, { bold: true, color: TOKENS.navy900 }))
  identity.appendChild(textNode('desc', 'Your AI-powered design system companion.', 14, { color: TOKENS.mono600 }))
  headerRow.appendChild(identity)
  container.appendChild(headerRow)

  // Capabilities
  const capsSection = frame('capabilities', { layoutMode: 'VERTICAL', gap: 8 })
  capsSection.appendChild(textNode('caps-label', 'CAPABILITIES', 11, { bold: true, color: TOKENS.mono500 }))
  const tagsRow = frame('tags', { layoutMode: 'HORIZONTAL', gap: 6, counterAlign: 'CENTER' })
  const caps = ['Component gen', 'A11y audit', 'Token mgmt', 'Code review']
  caps.forEach(c => {
    const tag = frame('tag', { layoutMode: 'HORIZONTAL', padding: 2, cornerRadius: 4, fills: [TOKENS.purple100], counterAlign: 'CENTER' })
    tag.paddingLeft = tag.paddingRight = 8
    tag.appendChild(textNode('tag-text', c, 12, { bold: true, color: TOKENS.purple800 }))
    tagsRow.appendChild(tag)
  })
  capsSection.appendChild(tagsRow)
  container.appendChild(capsSection)

  // Powered by
  const powered = frame('powered', { layoutMode: 'HORIZONTAL', gap: 8, padding: 12, counterAlign: 'CENTER' })
  powered.paddingTop = powered.paddingBottom = 12
  powered.paddingLeft = powered.paddingRight = 0
  powered.strokes = [fill(TOKENS.navy300)]
  powered.strokeWeight = 0.5
  powered.strokeAlign = 'INSIDE'
  powered.appendChild(textNode('pw-label', 'POWERED BY', 11, { bold: true, color: TOKENS.mono500 }))
  powered.appendChild(textNode('pw-name', 'DeepSeek V4 Pro', 14, { bold: true, color: TOKENS.navy800 }))
  container.appendChild(powered)

  return container
}

// ──────────────────────────────────────────────────
// 10. VOICE INPUT OVERLAY
// ──────────────────────────────────────────────────
function createVoiceInput() {
  const container = frame('VoiceInput', { layoutMode: 'VERTICAL', gap: 20, padding: 40, cornerRadius: 16, fills: [TOKENS.white], counterAlign: 'CENTER' })
  container.counterAxisSizingMode = 'FIXED'
  container.resize(320, container.height)

  const micCircle = rectangle('mic-circle', 96, 96, TOKENS.navy400)
  micCircle.cornerRadius = 48
  micCircle.fills = [{ type: 'SOLID', color: TOKENS.red, opacity: 0.9 }]
  container.appendChild(micCircle)

  container.appendChild(textNode('status', 'Listening...', 16, { bold: true, color: TOKENS.navy800 }))

  const btnRow = frame('btn-row', { layoutMode: 'HORIZONTAL', gap: 12, counterAlign: 'CENTER' })
  const cancelBtn = frame('cancel-btn', { layoutMode: 'HORIZONTAL', padding: 8, cornerRadius: 8, fills: [TOKENS.white], strokeWeight: 1, strokes: [TOKENS.navy300], counterAlign: 'CENTER' })
  cancelBtn.paddingLeft = cancelBtn.paddingRight = 20
  cancelBtn.appendChild(textNode('cancel', 'Cancel', 14, { color: TOKENS.navy800 }))
  btnRow.appendChild(cancelBtn)

  const stopBtn = frame('stop-btn', { layoutMode: 'HORIZONTAL', padding: 8, cornerRadius: 8, fills: [TOKENS.red], counterAlign: 'CENTER' })
  stopBtn.paddingLeft = stopBtn.paddingRight = 20
  stopBtn.appendChild(textNode('stop', 'Stop', 14, { color: TOKENS.white }))
  btnRow.appendChild(stopBtn)
  container.appendChild(btnRow)

  return container
}

// ──────────────────────────────────────────────────
// 11. CHAT CONTAINER (Composite)
// ──────────────────────────────────────────────────
function createChatContainer() {
  const container = frame('ChatContainer', { layoutMode: 'VERTICAL', gap: 0, cornerRadius: 12, fills: [TOKENS.white], strokeWeight: 1, strokes: [TOKENS.navy300], clips: true })
  container.counterAxisSizingMode = 'FIXED'
  container.resize(600, container.height)

  // Header
  const headerArea = frame('header', { layoutMode: 'HORIZONTAL', gap: 12, padding: 16, counterAlign: 'CENTER', counterSizing: 'FIXED' })
  headerArea.resize(600, headerArea.height)
  headerArea.paddingLeft = headerArea.paddingRight = 20
  const hAvatar = rectangle('h-avatar', 40, 40, TOKENS.purple600)
  hAvatar.cornerRadius = 20
  headerArea.appendChild(hAvatar)
  const hText = frame('h-text', { layoutMode: 'VERTICAL', gap: 2 })
  hText.appendChild(textNode('h-title', 'Infinity AI Assistant', 16, { bold: true, color: TOKENS.navy900 }))
  hText.appendChild(textNode('h-model', 'DeepSeek V4 Pro', 12, { color: TOKENS.mono500 }))
  headerArea.appendChild(hText)
  headerArea.strokes = [fill(TOKENS.navy300)]
  headerArea.strokeWeight = 0.5
  headerArea.strokeAlign = 'INSIDE'
  container.appendChild(headerArea)

  // Messages area
  const msgArea = frame('messages', { layoutMode: 'VERTICAL', gap: 8, padding: 16, clips: true })
  msgArea.counterAxisSizingMode = 'FIXED'
  msgArea.resize(600, 300)

  // User message
  const userMsg = frame('user-msg', { layoutMode: 'HORIZONTAL', gap: 12, counterAlign: 'MAX' })
  userMsg.counterAxisAlignItems = 'MAX'
  const userBubble = frame('user-bubble', { layoutMode: 'VERTICAL', gap: 4, padding: 10, cornerRadius: 12, fills: [TOKENS.purple100] })
  userBubble.paddingLeft = userBubble.paddingRight = 14
  userBubble.appendChild(textNode('user-text', 'How do I create an accessible button?', 14, { color: TOKENS.purple800 }))
  userMsg.appendChild(userBubble)
  msgArea.appendChild(userMsg)

  // AI message
  const aiMsg = frame('ai-msg', { layoutMode: 'HORIZONTAL', gap: 12 })
  const aiBubble = frame('ai-bubble', { layoutMode: 'VERTICAL', gap: 4, padding: 10, cornerRadius: 12, fills: [TOKENS.navy100] })
  aiBubble.paddingLeft = aiBubble.paddingRight = 14
  aiBubble.appendChild(textNode('ai-text', 'Start with semantic HTML and ensure keyboard support.', 14, { color: TOKENS.navy800 }))
  aiMsg.appendChild(aiBubble)
  msgArea.appendChild(aiMsg)
  container.appendChild(msgArea)

  // Suggested actions
  const actionsArea = frame('actions-area', { layoutMode: 'HORIZONTAL', gap: 8, padding: 10 })
  actionsArea.paddingLeft = actionsArea.paddingRight = 14
  const quickActions = ['Show code', 'Color contrast?', 'Test it']
  quickActions.forEach(a => {
    const chip = frame('action-chip', { layoutMode: 'HORIZONTAL', gap: 6, padding: 6, cornerRadius: 16, fills: [TOKENS.white], strokeWeight: 1, strokes: [TOKENS.purple800], counterAlign: 'CENTER' })
    chip.paddingLeft = chip.paddingRight = 12
    chip.appendChild(textNode('ac-label', a, 13, { color: TOKENS.purple800 }))
    actionsArea.appendChild(chip)
  })
  container.appendChild(actionsArea)

  // Input bar
  const inputArea = frame('input-area', { layoutMode: 'HORIZONTAL', gap: 8, padding: 12, counterAlign: 'MAX', counterSizing: 'FIXED' })
  inputArea.resize(600, inputArea.height)
  inputArea.strokes = [fill(TOKENS.navy300)]
  inputArea.strokeWeight = 0.5
  inputArea.strokeAlign = 'INSIDE'
  const inputField = frame('input-field', { layoutMode: 'HORIZONTAL', counterSizing: 'FIXED' })
  inputField.resize(500, inputField.height)
  inputField.layoutGrow = 1
  inputField.appendChild(textNode('placeholder2', 'Ask anything...', 14, { color: TOKENS.mono500 }))
  inputArea.appendChild(inputField)
  const sendBtn2 = frame('send-btn2', { layoutMode: 'HORIZONTAL', padding: 8, cornerRadius: 8, fills: [TOKENS.purple800], counterAlign: 'CENTER' })
  sendBtn2.appendChild(textNode('send2', 'send', 18, { color: TOKENS.white }))
  inputArea.appendChild(sendBtn2)
  container.appendChild(inputArea)

  return container
}

// ──────────────────────────────────────────────────
// BUILD ALL COMPONENTS
// ──────────────────────────────────────────────────
const components = [
  { name: 'TypingIndicator', fn: createTypingIndicator },
  { name: 'ThinkingIndicator', fn: createThinkingIndicator },
  { name: 'MessageBubble (AI)', fn: createMessageBubble },
  { name: 'PromptInput', fn: createPromptInput },
  { name: 'ChainOfThought', fn: createChainOfThought },
  { name: 'Source', fn: createSource },
  { name: 'SourcesPanel', fn: createSourcesPanel },
  { name: 'SuggestedActions', fn: createSuggestedActions },
  { name: 'PersonaCard', fn: createPersonaCard },
  { name: 'VoiceInput', fn: createVoiceInput },
  { name: 'ChatContainer', fn: createChatContainer },
]

let yPos = 0
const SPACING = 60

components.forEach(comp => {
  const frame = comp.fn()
  frame.x = 40
  frame.y = yPos
  yPos += frame.height + SPACING
  page.appendChild(frame)
})

figma.viewport.scrollAndZoomIntoView(page.children)
figma.notify(`Created ${components.length} AI Pattern components on the "${targetPageName}" page.`)
figma.closePlugin()

})()  // close async wrapper
