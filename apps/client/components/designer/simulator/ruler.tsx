import type { FC } from "vite-plugin-vueact";
import { getRenderOptions, horizontal, vertical } from "../util/ruler";

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

  function render() {
    const canvas = canvasRef.value
    if (!canvas) { return }
    const options = getRenderOptions(canvas, isDark.value, props);
    props.mode === 'vertical' ? vertical(options) : horizontal(options)
    const { ctx } = options;
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
