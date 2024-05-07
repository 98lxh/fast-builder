export function bindMouseEvent(
  dom: HTMLDivElement | null,
  content: HTMLDivElement | null,
  updateTranslate: any
) {

  if (!dom) {
    return
  }

  dom.onmousedown = function (evt: MouseEvent) {
    evt.preventDefault();

    if (content?.contains(evt.target as HTMLElement)) {
      return;
    }

    onMousemoveHandler(evt, function ({ startX, startY, currentX, currentY, lastX, lastY }) {
      const deltaX = currentX - lastX;
      const deltaY = currentY - lastY;
      updateTranslate(deltaX, deltaY);
    })
  };
}
