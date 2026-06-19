// Minimal Figma plugin test — create one frame on the current page
const f = figma.createFrame()
f.name = 'TEST_COMPONENT'
f.resize(200, 100)
f.fills = [{ type: 'SOLID', color: { r: 0.51, g: 0.44, b: 0.86 } }]
f.cornerRadius = 8
f.x = 100
f.y = 100
figma.currentPage.appendChild(f)
figma.viewport.scrollAndZoomIntoView([f])
figma.notify('Plugin works! Purple frame created.')
figma.closePlugin()
