import { primaryColor } from "@fast-builder/shared"
import type { EditorContext } from "../context"

interface ICurrent {
  styles: BlockStyle,
  isBlock: boolean
}

export function getRenderOptions(canvas: HTMLCanvasElement, current: ICurrent | null, editor: EditorContext, props: any) {
  const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect()
  const dpi = 1
  canvas.width = canvasWidth * dpi
  canvas.height = canvasHeight * dpi
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'
  let { width: w, height: h } = canvas
  w /= dpi
  h /= dpi
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpi, dpi)
  ctx.clearRect(0, 0, w, h)
  if (!current) return null
  ctx.fillStyle = primaryColor
  ctx.save()
  const { isBlock, styles } = current
  const { data, zoom } = editor

  let { left: blockLeft, top: blockTop, width: currentWidth, height: currentHeight } = styles

  const { container } = data.value
  let { left, top, width: containerWidth, height: containerHeight } = container

  left = left + Number(containerWidth * (1 - Number(zoom.value))) / 2
  top = top + Number(containerHeight * (1 - Number(zoom.value))) / 2

  currentHeight = currentHeight * Number(zoom.value)
  currentWidth = currentWidth * Number(zoom.value)
  blockLeft = blockLeft * Number(zoom.value)
  blockTop = blockTop * Number(zoom.value)


  const isVertical = props.mode === 'vertical'
  const height = isVertical ? currentHeight : canvasHeight
  const width = isVertical ? canvasWidth : currentWidth
  let x = 0
  let y = 0



  if (isVertical) {
    x = -15
    y = top  //容器的y
    if (isBlock) y += blockTop  // 如果是组件根据容器的y计算组件的y
  } else {
    y = -15
    x = left //容器的x
    if (isBlock) x += blockLeft // 如果是组件根据容器的x计算组件的x
  }

  return { height, width, x, y, ctx }
}

export function mask(canvas: HTMLCanvasElement | null, current: ICurrent | null, editor: EditorContext, props: any) {
  if (!canvas) { return }
  const options = getRenderOptions(canvas, current, editor, props)
  if (!options) { return }
  const { ctx, height, width, x, y } = options
  ctx.fillRect(x, y, width, height)
}
