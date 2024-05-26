import type { CSSProperties } from "vue";
import type { MoveListenerOptions } from "~/composables/event";


export interface BlockTranslate { x: number; y: number }

const mapPlacement2Cursor: Record<string, string> = {
  't': 'ns-resize',
  'r': 'ew-resize',
  'b': 'ns-resize',
  'l': 'ew-resize',
  'rt': 'nesw-resize',
  'lb': 'nesw-resize',
  'lt': 'nwse-resize',
  'rb': 'nwse-resize'
}

export const placements = Object.keys(mapPlacement2Cursor)
export function getHasPosition(placement: string) {
  return {
    hasTop: /t/.test(placement),
    hasBottom: /b/.test(placement),
    hasLeft: /l/.test(placement),
    hasRight: /r/.test(placement)
  }
}

export interface SourceStyles {
  top: number
  left: number
  zIndex: number
  height: number
  width: number
}

// 生成点样式
export function generatePointStyles(placement: string, source: SourceStyles): CSSProperties {
  const pointStyles: CSSProperties = {}
  const { height, width } = source

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

  pointStyles.marginTop = hasBottom ? '-4px' : '-3px'
  pointStyles.marginLeft = hasRight ? '-4px' : '-3px'
  pointStyles.cursor = mapPlacement2Cursor[placement]
  pointStyles.left = left + 'px'
  pointStyles.top = top + 'px'
  return pointStyles
}

export function calculateResizeStyle(
  { currentY, currentX, startY, startX, result }: MoveListenerOptions<SimulatorBlockStyle>,
  block: SimulatorBlock,
  placement: string,
): SimulatorBlockStyle {
  let { height, width, top, left } = result
  const { hasTop, hasBottom, hasLeft, hasRight } = getHasPosition(placement)
  const disY = currentY - startY
  const disX = currentX - startX
  height = height + (hasTop ? -disY : hasBottom ? disY : 0)
  width = width + (hasLeft ? -disX : hasRight ? disX : 0)
  height = height > 0 ? height : 0
  width = width > 0 ? width : 0
  left = left + (hasLeft ? disX : 0)
  top = top + (hasTop ? disY : 0)
  return { ...block.style, height, width, left, top }
}

export function calculateContainerResizeStyle(
  { currentY, currentX, startY, startX, result }: MoveListenerOptions<SourceStyles>,
  placement: string,
): SourceStyles {
  let { height, width, top, left } = result
  const { hasTop, hasBottom, hasLeft, hasRight } = getHasPosition(placement)
  const disY = currentY - startY
  const disX = currentX - startX
  height = height + (hasTop ? -disY : hasBottom ? disY : 0)
  width = width + (hasLeft ? -disX : hasRight ? disX : 0)
  height = height > 0 ? height : 0
  width = width > 0 ? width : 0
  left = left + (hasLeft ? disX : 0)
  top = top + (hasTop ? disY : 0)
  return { height, width, left, top, zIndex: 1 }
}
