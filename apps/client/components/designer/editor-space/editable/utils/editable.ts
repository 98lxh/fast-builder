import type { CSSProperties } from "vue";
import { getMaxIndex, type DesignerContext } from "~/composables/designer";
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

export const blockPlacements = Object.keys(mapPlacement2Cursor)
export const containerPlacements = ['rb', 'r', 'b']

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
export function generatePointStyles(placement: string, source: CSSProperties): CSSProperties {
  const pointStyles: CSSProperties = {}
  let height = source.height as number
  let width = source.width as number

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
  { currentY, currentX, startY, startX, result }: MoveListenerOptions<BlockStyle>,
  block: Block,
  placement: string,
): BlockStyle {
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


export function convertContainerStyles(container: Container) {
  const styles: CSSProperties = {}
  const { width, height, top, left } = container
  // 容器边框宽高+4px把左右border的2px计算进去
  styles.height = height + 3
  styles.width = width + 3
  styles.left = left
  styles.top = top
  return styles
}

export function convertBlockStyles(designer: DesignerContext, block: Block) {
  const styles: CSSProperties = {}
  if (!block) { return styles }
  const { currentBlockID, data } = designer
  let { zIndex, width, height, left, top } = block.style
  // 当前编辑的组件暂时放到顶层
  if (currentBlockID.value === block.id) { zIndex = getMaxIndex(data.value.blocks) + 1 }
  styles.zIndex = zIndex
  styles.height = height
  styles.width = width
  styles.left = left
  styles.top = top
  return styles
}
