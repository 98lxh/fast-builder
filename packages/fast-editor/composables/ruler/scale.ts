export interface RulerRenderOptions {
  h: number;
  w: number;
  gap: number,
  part: number,
  index: number,
  offset: number,
  sparsity: number,
  pixelPerUnit: number
  ctx: CanvasRenderingContext2D
}

/*生成渲染刻度的参数*/
export function getScaleRenderOptions(canvas: HTMLCanvasElement, isDark: boolean, props: any): RulerRenderOptions {
  const { width, height } = canvas.getBoundingClientRect()
  const dpi = 2
  canvas.width = width * dpi
  canvas.height = height * dpi
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  let { width: w, height: h } = canvas
  w /= dpi
  h /= dpi
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpi, dpi)
  ctx.clearRect(0, 0, w, h)
  ctx.save()
  ctx.lineWidth = 1
  ctx.strokeStyle = isDark ? '#8b8b8d' : '#8F949B'
  ctx.fillStyle = isDark ? '#8b8b8d' : '#8F949B'
  ctx.font = '10px serif'
  ctx.beginPath()
  const { offsetX, offsetY, scale } = props
  const offset = props.mode === 'horizontal' ? offsetX : offsetY
  const sparsity = getSparsity(scale)
  const part = 10
  const pixelPerUnit = scale * sparsity
  const gap = pixelPerUnit / part
  const index = offset % gap > 0 ? gap - (offset % gap) : -offset % gap

  return { h, w, ctx, gap, part, index, offset, sparsity, pixelPerUnit }
}

/* 渲染横向的刻度 */
export function horizontal(options: RulerRenderOptions) {
  let { ctx, offset, index, pixelPerUnit, sparsity, h, w, gap } = options
  ctx.translate(29.5, 0)
  const fixed = getFixed(sparsity)
  do {
    const num = ((offset + index) / pixelPerUnit) * sparsity
    if (isCloseToInteger(num / sparsity)) {
      ctx.moveTo(index, 0)
      ctx.lineTo(index, h - 14)
      const text = num.toFixed(fixed)
      const textWidth = ctx.measureText(text).width
      num !== 0 && ctx.fillText(text, index - textWidth / 2, h - 4)
    } else {
      ctx.moveTo(index, 0)
      ctx.lineTo(index, h - 17)
    }
    index += gap
  } while (index < w)
}

/* 渲染纵向的刻度 */
export function vertical(options: RulerRenderOptions) {
  let { ctx, offset, index, pixelPerUnit, sparsity, h, w, gap } = options
  ctx.translate(0, -0.5)
  const fixed = getFixed(sparsity)
  do {
    const num = ((offset + index) / pixelPerUnit) * sparsity
    if (isCloseToInteger(num / sparsity)) {
      ctx.moveTo(0, num === 0 ? index + 1 : index)
      ctx.lineTo(w - 14, num === 0 ? index + 1 : index)
      const text = num.toFixed(fixed)
      ctx.save()
      ctx.rotate((-90 * Math.PI) / 180)
      const textWidth = ctx.measureText(text).width
      num !== 0 && ctx.fillText(text, - ((index) + textWidth / 2), w - 4)
      ctx.rotate((0 * Math.PI) / 180)
      ctx.restore()
    } else {
      ctx.moveTo(0, index)
      ctx.lineTo(w - 17, index)
    }
    index += gap
  } while (index < h)
}

function getFixed(sparsity: number) {
  const pointIdx = String(sparsity).indexOf('.')
  const len = String(sparsity).length
  return pointIdx < 0 ? 0 : len - pointIdx - 1
}

function isCloseToInteger(num: number) {
  return Math.abs(num - Math.round(num)) < 0.0000001
}

function getSparsity(scale: number) {
  if (scale <= 1) {
    return 100
  } else if (scale <= 3) {
    return 50
  } else if (scale <= 4) {
    return 20
  } else if (scale <= 5) {
    return 10
  }
  return 5
}


export function scale(canvasRef: Ref<HTMLCanvasElement | null>, isDark: Ref<boolean>,props:any) {
  if (!canvasRef.value) { return }
  const options = getScaleRenderOptions(canvasRef.value, isDark.value, props);
  props.mode === 'vertical' ? vertical(options) : horizontal(options)
  const { ctx } = options;
  ctx.closePath()
  ctx.stroke()
}
