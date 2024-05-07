interface ListenerOptions {
  startX: number
  startY: number
  currentX: number
  currentY: number
}

export function registerDocumentMoveEvent(
  evt: MouseEvent,
  listener: (opts: ListenerOptions) => void
) {
  const startX = evt.clientX
  const startY = evt.clientY

  function onMousemove(moveEvt: MouseEvent) {
    const currentX = moveEvt.clientX
    const currentY = moveEvt.clientY
    listener({ startX,startY, currentX, currentY })
  }

  function onMouseup() {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }

  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}
