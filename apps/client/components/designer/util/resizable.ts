import type { CSSProperties } from "vue";

export const placements = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'];

const mapPlacement2Cursor: Record<string, any> = {
  't': 'ns-resize',
  'r': 'ew-resize',
  'b': 'ns-resize',
  'l': 'ew-resize',
  'rt': 'nesw-resize',
  'lb': 'nesw-resize',
  'lt': 'nwse-resize',
  'rb': 'nwse-resize'
}

function getHasPosition(placement: string) {
  return {
    hasTop: /t/.test(placement),
    hasBottom: /b/.test(placement),
    hasLeft: /l/.test(placement),
    hasRight: /r/.test(placement)
  }
}

export function generatePointStyles(placement: string, style: SimulatorBlockStyle): CSSProperties {
  const { width, height } = style || {};
  const { hasBottom, hasTop, hasLeft, hasRight } = getHasPosition(placement);

  let left = 0;
  let top = 0;

  if (placement.length === 2) {
    left = hasLeft ? 0 : width
    top = hasTop ? 0 : height
  } else {
    if (hasTop || hasBottom) {
      left = width / 2
      top = hasTop ? 0 : height
    }
    if (hasLeft || hasRight) {
      left = hasLeft ? 0 : width
      top = Math.floor(height / 2)
    }
  }

  return {
    marginTop: hasBottom ? '-4px' : '-3px',
    marginLeft: hasRight ? '-4px' : '-3px',
    cursor: mapPlacement2Cursor[placement],
    left: left + 'px',
    top: top + 'px',
  }
}

export function onMousedown(
  evt: MouseEvent,
  placement: string,
  block: SimulatorBlock,
  context: DesignerContext
) {
  evt.stopPropagation()
  evt.preventDefault()

  let height = Number(block.style.height)
  let width = Number(block.style.width)

  const top = Number(block.style.top)
  const left = Number(block.style.left)

  const startX = evt.clientX
  const startY = evt.clientY

  function onMouseMove(moveEvt: MouseEvent) {
    const currX = moveEvt.clientX
    const currY = moveEvt.clientY

    const disY = currY - startY
    const disX = currX - startX

    const { hasTop, hasBottom, hasLeft, hasRight } = getHasPosition(placement)

    const style = {
      ...block.style,
      height: height + (hasTop ? -disY : hasBottom ? disY : 0),
      width: width + (hasLeft ? -disX : hasRight ? disX : 0)
    }

    context.setSimulatorDataById( block.id, { ...block, style })
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
