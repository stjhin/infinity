/**
 * Figma Plugin — AI Pattern Component Generator (TypeScript)
 *
 * Paste this into your plugin's code.ts, then run:
 *   Terminal → Run Build Task → "tsc: watch"
 * to compile to code.js, then run the plugin from Figma.
 */

// ── Design tokens matching the React components ──
const T = {
  purple100: { r: 0.953, g: 0.941, b: 1 },
  purple500: { r: 0.561, g: 0.494, b: 0.906 },
  purple600: { r: 0.510, g: 0.439, b: 0.859 },
  purple800: { r: 0.369, g: 0.302, b: 0.698 },
  navy100: { r: 0.969, g: 0.973, b: 0.976 },
  navy200: { r: 0.945, g: 0.949, b: 0.957 },
  navy300: { r: 0.863, g: 0.875, b: 0.894 },
  navy400: { r: 0.702, g: 0.725, b: 0.769 },
  navy800: { r: 0.267, g: 0.329, b: 0.435 },
  navy900: { r: 0.173, g: 0.243, b: 0.365 },
  mono500: { r: 0.451, g: 0.518, b: 0.588 },
  mono600: { r: 0.220, g: 0.255, b: 0.290 },
  green: { r: 0.133, g: 0.627, b: 0.420 },
  red: { r: 0.886, g: 0.282, b: 0.239 },
  white: { r: 1, g: 1, b: 1 },
}

function solid(color: RGB, opacity = 1): SolidPaint {
  return { type: 'SOLID', color, opacity }
}

function t(name: string, chars: string, size = 14, opts?: { bold?: boolean; color?: RGB }) {
  const node = figma.createText()
  node.name = name
  node.characters = chars
  node.fontSize = size
  node.fontName = { family: 'Noto Sans', style: opts?.bold ? 'Bold' : 'Regular' }
  if (opts?.color) node.fills = [solid(opts.color)]
  node.textAutoResize = 'WIDTH_AND_HEIGHT'
  return node
}

function box(name: string, w: number, h: number, color: RGB, r = 0) {
  const rect = figma.createRectangle()
  rect.name = name
  rect.resize(w, h)
  rect.fills = [solid(color)]
  if (r) rect.cornerRadius = r
  return rect
}

function stack(name: string, opts: {
  dir?: 'HORIZONTAL' | 'VERTICAL'
  gap?: number
  pad?: number
  fill?: RGB
  stroke?: RGB
  sw?: number
  radius?: number
  width?: number
  align?: 'MIN' | 'CENTER' | 'MAX'
}) {
  const f = figma.createFrame()
  f.name = name
  f.layoutMode = opts.dir || 'VERTICAL'
  f.primaryAxisSizingMode = 'AUTO'
  f.counterAxisSizingMode = opts.width ? 'FIXED' : 'AUTO'
  if (opts.pad != null) f.paddingLeft = f.paddingRight = f.paddingTop = f.paddingBottom = opts.pad
  if (opts.gap != null) f.itemSpacing = opts.gap
  if (opts.fill) f.fills = [solid(opts.fill)]
  if (opts.stroke) { f.strokes = [solid(opts.stroke)]; f.strokeWeight = opts.sw ?? 1 }
  if (opts.radius) f.cornerRadius = opts.radius
  if (opts.width) f.resize(opts.width, f.height)
  if (opts.align) f.counterAxisAlignItems = opts.align
  return f
}

// ────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────
async function main() {
  // Find or create "AI Pattern" page
  const pageName = 'AI Pattern'
  let page = figma.root.children.find(c => c.name === pageName && c.type === 'PAGE') as PageNode | undefined
  if (!page) {
    page = figma.createPage()
    page.name = pageName
  }
  await figma.setCurrentPageAsync(page)
  page.children.forEach(c => c.remove())

  let y = 0
  const gap = 60

  function place(frame: FrameNode) {
    frame.x = 40
    frame.y = y
    y += frame.height + gap
    page!.appendChild(frame)
  }

  // 1. TypingIndicator
  const typing = stack('TypingIndicator', { dir: 'HORIZONTAL', gap: 8, pad: 8, fill: T.navy200, radius: 18, align: 'CENTER' })
  const dots = stack('dots', { dir: 'HORIZONTAL', gap: 4, align: 'CENTER' })
  for (let i = 0; i < 3; i++) dots.appendChild(box('dot', 8, 8, T.purple500, 4))
  typing.appendChild(dots)
  typing.appendChild(t('label', 'AI is typing', 14, { color: T.mono600 }))
  place(typing)

  // 2. ThinkingIndicator
  const thinking = stack('ThinkingIndicator', { dir: 'HORIZONTAL', gap: 6, pad: 4, fill: T.navy100, stroke: T.navy300, radius: 16, align: 'CENTER' })
  thinking.paddingLeft = thinking.paddingRight = 12
  thinking.appendChild(t('icon', '\u{1F9E0}', 16))  // brain emoji as icon fallback
  thinking.appendChild(t('label', 'Planning approach', 12, { bold: true, color: T.purple600 }))
  thinking.appendChild(box('pulse', 6, 6, T.purple600, 3))
  place(thinking)

  // 3. MessageBubble (AI)
  const msg = stack('MessageBubble', { dir: 'HORIZONTAL', gap: 12, align: 'MIN' })
  msg.appendChild(box('avatar', 32, 32, T.navy400, 16))
  const body = stack('body', { gap: 4 })
  const hdr = stack('header', { dir: 'HORIZONTAL', gap: 8, align: 'CENTER' })
  hdr.appendChild(t('role', 'AI', 12, { bold: true, color: T.mono600 }))
  hdr.appendChild(t('time', '10:32 AM', 10, { color: T.mono500 }))
  body.appendChild(hdr)
  const content = stack('content', { pad: 10, fill: T.navy100, radius: 12 })
  content.paddingLeft = content.paddingRight = 14
  content.appendChild(t('text', 'Here is a response from the AI assistant.', 14, { color: T.navy800 }))
  body.appendChild(content)
  msg.appendChild(body)
  place(msg)

  // 4. PromptInput
  const prompt = stack('PromptInput', { gap: 8, pad: 12, fill: T.white, stroke: T.navy300, radius: 8, width: 400 })
  const toolbar = stack('toolbar', { dir: 'HORIZONTAL', gap: 8 })
  const modelBtn = stack('model-btn', { dir: 'HORIZONTAL', gap: 6, pad: 4, fill: T.navy200, stroke: T.navy300, radius: 16, align: 'CENTER' })
  modelBtn.paddingLeft = modelBtn.paddingRight = 10
  modelBtn.appendChild(t('m-icon', '\u{1F916}', 14))
  modelBtn.appendChild(t('m-name', 'DeepSeek V4 Pro', 12, { color: T.navy800 }))
  toolbar.appendChild(modelBtn)
  prompt.appendChild(toolbar)

  const inputRow = stack('input-row', { dir: 'HORIZONTAL', gap: 8, align: 'MAX', width: 400 })
  const ta = stack('textarea', { dir: 'HORIZONTAL', width: 320 })
  ta.layoutGrow = 1
  ta.appendChild(t('placeholder', 'Ask anything...', 14, { color: T.mono500 }))
  inputRow.appendChild(ta)
  const send = stack('send', { dir: 'HORIZONTAL', pad: 8, fill: T.purple800, radius: 8, align: 'CENTER' })
  send.appendChild(t('s-icon', '\u{27A1}', 18, { color: T.white }))
  inputRow.appendChild(send)
  prompt.appendChild(inputRow)
  prompt.appendChild(t('hint', 'Press Enter to send', 11, { color: T.mono500 }))
  place(prompt)

  // 5. ChainOfThought
  const cot = stack('ChainOfThought', { gap: 0, stroke: T.navy300, radius: 8, width: 400 })
  const cotHdr = stack('cot-header', { dir: 'HORIZONTAL', gap: 8, pad: 10, align: 'CENTER', width: 400 })
  cotHdr.paddingLeft = cotHdr.paddingRight = 14
  const cotLeft = stack('cot-left', { dir: 'HORIZONTAL', gap: 8, align: 'CENTER' })
  cotLeft.appendChild(t('cot-icon', '\u{1F9E0}', 16))
  cotLeft.appendChild(t('cot-title', 'Chain of Thought', 13, { bold: true, color: T.navy800 }))
  cotHdr.appendChild(cotLeft)
  const badge = stack('badge', { dir: 'HORIZONTAL', pad: 2, radius: 10, align: 'CENTER' })
  badge.paddingLeft = badge.paddingRight = 8
  badge.fills = [solid(T.green, 0.12)]
  badge.appendChild(t('pct', '88%', 11, { bold: true, color: T.green }))
  cotHdr.appendChild(badge)
  cotHdr.appendChild(t('chevron', '\u{25BC}', 14, { color: T.mono500 }))
  cot.appendChild(cotHdr)

  const steps = stack('steps', { gap: 0, pad: 14 })
  steps.paddingTop = 0
  const phases = ['Understanding query', 'Planning approach', 'Executing...', 'Generating response']
  phases.forEach((step, i) => {
    const row = stack('step', { dir: 'HORIZONTAL', gap: 12, pad: 8, align: 'MIN' })
    row.paddingLeft = 0; row.paddingRight = 0
    const phBadge = stack('ph', { dir: 'HORIZONTAL', gap: 4, pad: 4, stroke: T.navy300, radius: 12, align: 'CENTER' })
    phBadge.paddingLeft = phBadge.paddingRight = 8
    phBadge.appendChild(t('ph-icon', '\u{25CF}', 10, { color: T.purple600 }))
    phBadge.appendChild(t('ph-label', step, 11, { bold: true, color: T.purple600 }))
    row.appendChild(phBadge)
    row.appendChild(t('ph-detail', `Explanation for ${step.toLowerCase()}.`, 12, { color: T.mono600 }))
    if (i < phases.length - 1) { row.strokes = [solid(T.navy300, 0.4)]; row.strokeWeight = 0.5; row.strokeAlign = 'INSIDE' }
    steps.appendChild(row)
  })
  cot.appendChild(steps)
  place(cot)

  // 6. Source (citation pill)
  const source = stack('Source', { dir: 'HORIZONTAL', gap: 6, pad: 4, fill: T.navy100, stroke: T.navy300, radius: 6, align: 'CENTER' })
  source.paddingLeft = source.paddingRight = 10
  source.appendChild(t('src-icon', '\u{1F517}', 14))
  source.appendChild(t('src-title', 'React Documentation', 12, { color: T.navy800 }))
  const confBadge = stack('conf', { dir: 'HORIZONTAL', pad: 1, radius: 3, align: 'CENTER' })
  confBadge.paddingLeft = confBadge.paddingRight = 5
  confBadge.fills = [solid(T.green, 0.15)]
  confBadge.appendChild(t('conf-text', '95%', 10, { bold: true, color: T.green }))
  source.appendChild(confBadge)
  place(source)

  // 7. SourcesPanel
  const sp = stack('SourcesPanel', { gap: 6, pad: 10 })
  sp.paddingLeft = sp.paddingRight = 14
  sp.appendChild(t('sp-label', 'SOURCES', 11, { bold: true, color: T.mono500 }))
  ;['WCAG 2.1 Guidelines', 'Infinity Button Docs', 'MDN Web Docs'].forEach(s => {
    const si = stack('si', { dir: 'HORIZONTAL', gap: 6, pad: 4, fill: T.navy100, stroke: T.navy300, radius: 6, align: 'CENTER' })
    si.paddingLeft = si.paddingRight = 10
    si.appendChild(t('si-icon', '\u{1F517}', 14))
    si.appendChild(t('si-title', s, 12, { color: T.navy800 }))
    sp.appendChild(si)
  })
  place(sp)

  // 8. SuggestedActions
  const sa = stack('SuggestedActions', { gap: 8, pad: 10 })
  sa.paddingLeft = sa.paddingRight = 14
  sa.appendChild(t('sa-label', 'SUGGESTED', 11, { bold: true, color: T.mono500 }))
  const saRow = stack('sa-row', { dir: 'HORIZONTAL', gap: 8 })
  ;['Explain further', 'Show example', 'Regenerate'].forEach(a => {
    const chip = stack('chip', { dir: 'HORIZONTAL', gap: 6, pad: 6, fill: T.white, stroke: T.purple800, radius: 16, align: 'CENTER' })
    chip.paddingLeft = chip.paddingRight = 12
    chip.appendChild(t('c-label', a, 13, { color: T.purple800 }))
    saRow.appendChild(chip)
  })
  sa.appendChild(saRow)
  place(sa)

  // 9. PersonaCard
  const pc = stack('PersonaCard', { gap: 16, pad: 20, fill: T.white, stroke: T.navy300, radius: 12, width: 360 })
  const pcHeader = stack('pc-header', { dir: 'HORIZONTAL', gap: 14, align: 'MIN' })
  pcHeader.appendChild(box('pc-avatar', 56, 56, T.purple600, 28))
  const pcId = stack('pc-id', { gap: 4 })
  pcId.appendChild(t('pc-name', 'Infinity Assistant', 18, { bold: true, color: T.navy900 }))
  pcId.appendChild(t('pc-desc', 'Your AI-powered design system companion.', 14, { color: T.mono600 }))
  pcHeader.appendChild(pcId)
  pc.appendChild(pcHeader)

  const caps = stack('caps', { gap: 8 })
  caps.appendChild(t('caps-label', 'CAPABILITIES', 11, { bold: true, color: T.mono500 }))
  const tagsRow = stack('tags', { dir: 'HORIZONTAL', gap: 6, align: 'CENTER' })
  ;['Component gen', 'A11y audit', 'Token mgmt', 'Code review'].forEach(c => {
    const tag = stack('tag', { dir: 'HORIZONTAL', pad: 2, fill: T.purple100, radius: 4, align: 'CENTER' })
    tag.paddingLeft = tag.paddingRight = 8
    tag.appendChild(t('tag-text', c, 12, { bold: true, color: T.purple800 }))
    tagsRow.appendChild(tag)
  })
  caps.appendChild(tagsRow)
  pc.appendChild(caps)
  place(pc)

  // 10. VoiceInput
  const voice = stack('VoiceInput', { gap: 20, pad: 40, fill: T.white, radius: 16, align: 'CENTER', width: 320 })
  voice.appendChild(box('mic', 96, 96, T.red, 48))
  voice.appendChild(t('status', 'Listening...', 16, { bold: true, color: T.navy800 }))
  const btnRow = stack('btn-row', { dir: 'HORIZONTAL', gap: 12, align: 'CENTER' })
  const cancel = stack('cancel', { dir: 'HORIZONTAL', pad: 8, fill: T.white, stroke: T.navy300, radius: 8, align: 'CENTER' })
  cancel.paddingLeft = cancel.paddingRight = 20
  cancel.appendChild(t('cancel-txt', 'Cancel', 14, { color: T.navy800 }))
  btnRow.appendChild(cancel)
  const stop = stack('stop', { dir: 'HORIZONTAL', pad: 8, fill: T.red, radius: 8, align: 'CENTER' })
  stop.paddingLeft = stop.paddingRight = 20
  stop.appendChild(t('stop-txt', 'Stop', 14, { color: T.white }))
  btnRow.appendChild(stop)
  voice.appendChild(btnRow)
  place(voice)

  // 11. ChatContainer (composite)
  const chat = stack('ChatContainer', { gap: 0, fill: T.white, stroke: T.navy300, radius: 12, width: 600 })
  const chatHdr = stack('chat-hdr', { dir: 'HORIZONTAL', gap: 12, pad: 16, align: 'CENTER', width: 600 })
  chatHdr.paddingLeft = chatHdr.paddingRight = 20
  chatHdr.strokes = [solid(T.navy300, 0.5)]; chatHdr.strokeWeight = 0.5; chatHdr.strokeAlign = 'INSIDE'
  chatHdr.appendChild(box('ch-avatar', 40, 40, T.purple600, 20))
  const chText = stack('ch-text', { gap: 2 })
  chText.appendChild(t('ch-title', 'Infinity AI Assistant', 16, { bold: true, color: T.navy900 }))
  chText.appendChild(t('ch-model', 'DeepSeek V4 Pro', 12, { color: T.mono500 }))
  chatHdr.appendChild(chText)
  chat.appendChild(chatHdr)

  const msgArea = stack('messages', { gap: 8, pad: 16, width: 600 })
  const userBubble = stack('user-bubble', { pad: 10, fill: T.purple100, radius: 12 })
  userBubble.paddingLeft = userBubble.paddingRight = 14
  userBubble.appendChild(t('u-text', 'How do I create an accessible button?', 14, { color: T.purple800 }))
  const userMsg = stack('user-msg', { dir: 'HORIZONTAL', pad: 0, align: 'MAX' })
  userMsg.appendChild(userBubble)
  msgArea.appendChild(userMsg)

  const aiBubble = stack('ai-bubble', { pad: 10, fill: T.navy100, radius: 12 })
  aiBubble.paddingLeft = aiBubble.paddingRight = 14
  aiBubble.appendChild(t('a-text', 'Start with semantic HTML and ensure keyboard support.', 14, { color: T.navy800 }))
  msgArea.appendChild(aiBubble)
  chat.appendChild(msgArea)

  const actionsArea = stack('actions', { dir: 'HORIZONTAL', gap: 8, pad: 10 })
  actionsArea.paddingLeft = actionsArea.paddingRight = 14
  ;['Show code', 'Color contrast?', 'Test it'].forEach(a => {
    const aChip = stack('aChip', { dir: 'HORIZONTAL', gap: 6, pad: 6, fill: T.white, stroke: T.purple800, radius: 16, align: 'CENTER' })
    aChip.paddingLeft = aChip.paddingRight = 12
    aChip.appendChild(t('ac-label', a, 13, { color: T.purple800 }))
    actionsArea.appendChild(aChip)
  })
  chat.appendChild(actionsArea)

  const inputArea = stack('input', { dir: 'HORIZONTAL', gap: 8, pad: 12, align: 'MAX', width: 600 })
  inputArea.strokes = [solid(T.navy300, 0.5)]; inputArea.strokeWeight = 0.5; inputArea.strokeAlign = 'INSIDE'
  const inField = stack('field', { dir: 'HORIZONTAL' })
  inField.layoutGrow = 1
  inField.appendChild(t('ph2', 'Ask anything...', 14, { color: T.mono500 }))
  inputArea.appendChild(inField)
  const sBtn = stack('sBtn', { dir: 'HORIZONTAL', pad: 8, fill: T.purple800, radius: 8, align: 'CENTER' })
  sBtn.appendChild(t('s2', '\u{27A1}', 18, { color: T.white }))
  inputArea.appendChild(sBtn)
  chat.appendChild(inputArea)
  place(chat)

  figma.viewport.scrollAndZoomIntoView(page.children)
  figma.notify(`Created 11 AI Pattern components on "${pageName}" page.`)
  figma.closePlugin()
}

main()
