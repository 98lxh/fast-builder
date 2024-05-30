import type { CSSProperties } from "vue";
import type { FC } from "vite-plugin-vueact";

import { useDesignerContext } from "@fast-builder/editor/composables/designer";
import { ruler } from "@fast-builder/editor/utils";

interface DefineProps {
  mode?: 'vertical' | 'horizontal';
  offsetX: number;
  offsetY: number;
  height: number;
  width: number;
  scale: number;
}

const Ruler: FC<DefineProps> = function (props) {
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const designer = useDesignerContext()

  const styles = computed(() => {
    const styles: CSSProperties = {}
    styles.height = props.mode === 'horizontal' ? '22px' : '100%'
    styles.width = props.mode === 'horizontal' ? '100%' : '22px'
    styles.opacity = 0.4
    return styles
  })

  const current = computed(() => {
    let current: BlockStyle | Container | null = null
    const { data, currentBlock } = designer
    const { container } = data.value
    if (!currentBlock.value && !container.focus) { return null }
    if (container.focus) current = container
    if (currentBlock.value) current = currentBlock.value.style
    const { height, width, top, left } = current!
    const styles = { height, width, top, left }
    return { styles, isBlock: !!currentBlock.value }
  })

  const watchSource = computed(() => [props.height, props.width, current.value])
  watch(() => watchSource.value, () => nextTick(() => ruler.mask(canvasRef.value, current.value, designer, props)), { deep: true })

  return (
    <canvas
      class={`absolute bg-transparent block z-10 ${props.mode === 'horizontal' ? 'left-0' : 'top-0'}`}
      style={{ ...styles.value }}
      ref={canvasRef}
    />

  )
}

export default Ruler;
