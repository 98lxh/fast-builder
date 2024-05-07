interface ListenerOptions {
  startX: number
  startY: number
  currentX: number
  currentY: number
  lastX: number
  lastY: number
}

export function onMousemoveHandler(
  mouseDownEvt: MouseEvent,
  listener: (opts: ListenerOptions) => void
) {
  const startX = mouseDownEvt.clientX
  const startY = mouseDownEvt.clientY

  let lastX = startX;
  let lastY = startY;

  function onMousemove(moveEvt: MouseEvent) {
    const currentX = moveEvt.clientX
    const currentY = moveEvt.clientY
    listener({ startX, startY, currentX, currentY, lastX, lastY })
    lastX = currentX
    lastY = currentY
  }

  function onMouseup() {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }

  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}
