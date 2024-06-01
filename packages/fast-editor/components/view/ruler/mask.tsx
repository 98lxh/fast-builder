import type { CSSProperties } from "vue";
import type { FC } from "vite-plugin-vueact";

import { useEditorContext, ruler, EDITOR_CONTAINER_KEY } from "../../../composables";

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
  const editor = useEditorContext()

  const styles = computed(() => {
    const styles: CSSProperties = {}
    styles.height = props.mode === 'horizontal' ? '22px' : '100%'
    styles.width = props.mode === 'horizontal' ? '100%' : '22px'
    styles.opacity = 0.4
    return styles
  })

  const current = computed(() => {
    const { currentBlock } = editor
    if (!currentBlock.value) { return null }
    const { height, width, top, left } = currentBlock.value!.style
    const styles = { height, width, top, left }
    return { styles, isBlock: currentBlock.value!.key !== EDITOR_CONTAINER_KEY }
  })

  const watchSource = computed(() => [props.height, props.width, current.value])
  watch(() => watchSource.value, () => nextTick(() => ruler.mask(canvasRef.value, current.value, editor, props)), { deep: true })

  return (
    <canvas
      class={`absolute bg-transparent block z-10 ${props.mode === 'horizontal' ? 'left-0' : 'top-0'}`}
      style={{ ...styles.value }}
      ref={canvasRef}
    />

  )
}

export default Ruler;
