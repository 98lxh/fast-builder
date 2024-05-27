import type { CSSProperties } from "vue";
import type { FC } from "vite-plugin-vueact";
import { getRenderOptions, horizontal, vertical } from "../util/ruler";
import { useDarkMode } from "~/composables/styles/dark";

interface DefineProps {
  mode?: 'vertical' | 'horizontal';
  offsetX: number;
  offsetY: number;
  height: number;
  width: number;
  scale: number;
}

const Ruler: FC<DefineProps> = function (props) {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const { isDark } = useDarkMode();

  const styles = computed(() => {
    const styles: CSSProperties = {}
    styles.height = props.mode === 'horizontal' ? '24px' : '100%'
    styles.width = props.mode === 'horizontal' ? '100%' : '24px'
    styles.top = props.mode === 'horizontal' ? '0px' : '24px'
    return styles
  })

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
    <canvas
      class="absolute bg-transparent flex-none block z-1"
      style={{ ...styles.value }}
      ref={canvasRef}
    />

  )
}

export default Ruler;
