import type { FC } from "vite-plugin-vueact";

interface DefineProps {
  mode?: string | 'vertical' | 'horizontal';
  offsetX: number;
  offsetY: number;
  height: number;
  width: number;
  scale: number;
}

const Ruler: FC<DefineProps> = function (props) {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const { isDark } = useDarkMode();

  const styles = computed(() => ({
    width: props.mode === 'horizontal' ? '100%' : '30px',
    height: props.mode === 'horizontal' ? '30px' : '100%',
    cursor: props.mode === 'horizontal' ? 'row-resize' : 'col-resize',
    backgroundColor: 'transparent',
    display: 'block',
    flex: 'none',
    zIndex: 1
  }))


  function getFixed(sparsity: number) {
    const pointIdx = String(sparsity).indexOf('.')
    const len = String(sparsity).length
    return pointIdx < 0 ? 0 : len - pointIdx - 1
  }

  function isCloseToInteger(num: number) {
    return Math.abs(num - Math.round(num)) < 0.0000001
  }

  // 获取间隔
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


  function horizontal(
    ctx: CanvasRenderingContext2D,
    offset: number,
    index: number,
    pixelPerUnit: number,
    sparsity: number,
    h: number,
    w: number,
    gap: number
  ) {
    ctx.translate(29.5, 0)
    const fixed = getFixed(sparsity)
    do {
      const num = ((offset + index) / pixelPerUnit) * sparsity
      if (isCloseToInteger(num / sparsity)) {
        ctx.moveTo(index, 0)
        ctx.lineTo(index, num === 0 ? h : h - 15)
        const text = num.toFixed(fixed)
        const textWidth = ctx.measureText(text).width
        num !== 0 && ctx.fillText(text, index - textWidth / 2, h)
      } else {
        ctx.moveTo(index, 0)
        ctx.lineTo(index, h - 20)
      }
      index += gap
    } while (index < w)
  }


  function vertical(
    ctx: CanvasRenderingContext2D,
    offset: number,
    index: number,
    pixelPerUnit: number,
    sparsity: number,
    h: number,
    w: number,
    gap: number
  ) {
    ctx.translate(0, -0.5)
    const fixed = getFixed(sparsity)

    do {
      const num = ((offset + index) / pixelPerUnit) * sparsity
      if (isCloseToInteger(num / sparsity)) {
        ctx.moveTo(0, num === 0 ? index + 1 : index)
        ctx.lineTo(num === 0 ? w : w - 15, num === 0 ? index + 1 : index)
        const text = num.toFixed(fixed)
        ctx.save()
        ctx.rotate((-90 * Math.PI) / 180)
        const textWidth = ctx.measureText(text).width
        num !== 0 && ctx.fillText(text, -((index) + textWidth / 2), w)
        ctx.rotate((0 * Math.PI) / 180)
        ctx.restore()
      } else {
        ctx.moveTo(0, index)
        ctx.lineTo(w - 20, index)
      }
      index += gap
    } while (index < h)
  }

  function getRenderOptions(canvas: HTMLCanvasElement) {
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
    ctx.strokeStyle = isDark.value ? '#8b8b8d' : '#8F949B'
    ctx.fillStyle = isDark.value ? '#8b8b8d' : '#8F949B'
    ctx.font = '14px serif'
    ctx.beginPath()
    const { offsetX, offsetY, scale } = props
    const offset = props.mode === 'horizontal' ? offsetX : offsetY
    const sparsity = getSparsity(scale)
    const part = 10
    const pixelPerUnit = scale * sparsity
    const gap = pixelPerUnit / part
    const index = offset % gap > 0 ? gap - (offset % gap) : -offset % gap

    return {
      h,
      w,
      ctx,
      gap,
      part,
      index,
      offset,
      sparsity,
      pixelPerUnit
    }
  }

  function render() {
    const canvas = canvasRef.value
    if (!canvas) { return }
    const { ctx, offset, index, pixelPerUnit, sparsity, h, w, gap } = getRenderOptions(canvas);

    props.mode === 'vertical'
      ? vertical(ctx, offset, index, pixelPerUnit, sparsity, h, w, gap)
      : horizontal(ctx, offset, index, pixelPerUnit, sparsity, h, w, gap)

    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  watch(() => [props.height, props.width, isDark], useDebounceFn(render, 50), { deep: true })

  onMounted(render)

  return (
    <canvas ref={canvasRef} style={{ ...styles.value }} />
  )
}

export default Ruler;
