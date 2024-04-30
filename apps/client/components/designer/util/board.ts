export function bindMouseEvent(
    dom: HTMLDivElement | null, 
    content:HTMLDivElement | null,
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

    const startX = evt.pageX;
    const startY = evt.pageY;

    let lastX = startX;
    let lastY = startY;

    document.onmousemove = function (evt: MouseEvent) {
      evt.preventDefault();
      const currentX = evt.pageX;
      const currentY = evt.pageY;
      const deltaX = currentX - lastX;
      const deltaY = currentY - lastY;
      lastX = currentX;
      lastY = currentY;

      updateTranslate(deltaX, deltaY);
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}
