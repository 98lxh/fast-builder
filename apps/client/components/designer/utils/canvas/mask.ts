import type { DesignerContext } from "~/composables/designer"
import { primaryColor } from "~/constants/overrides"

interface ICurrent {
  styles: BasicStyle,
  isBlock: boolean
}

export function getRenderOptions(canvas: HTMLCanvasElement, current: ICurrent | null, designer: DesignerContext, props: any) {
  const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect()
  const dpi = 2
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
  const { left: currentLeft, top: currentTop, width: currentWidth, height: currentHeight } = styles
  const isVertical = props.mode === 'vertical'
  const height = isVertical ? currentHeight : canvasHeight
  const width = isVertical ? canvasWidth : currentWidth
  let x = 0
  let y = 0

  const { data, collapse } = designer
  const { container } = data.value
  const { width: containerWidth, height: containerHeight, left: containerLeft, top: ContainerTop } = container

  if (isVertical) {
    y =  ContainerTop + ((canvasHeight / 2) - (containerHeight / 2))
    if(isBlock) y += currentTop
    x = -15
  } else {
    x = containerLeft + ((canvasWidth / 2) - (collapse.left ? containerWidth / 2 : containerWidth))
    if(isBlock) x += currentLeft
    y = -15
  }

  return { height, width, x, y, ctx }
}

export function mask(canvas: HTMLCanvasElement | null, current: ICurrent | null, designer: DesignerContext, props: any) {
  if (!canvas) { return }
  const options = getRenderOptions(canvas, current, designer, props)
  if (!options) { return }
  const { ctx, height, width, x, y } = options
  ctx.fillRect(x, y, width, height)
}
