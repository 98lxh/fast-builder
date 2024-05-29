import type { CSSProperties } from "vue"
import { layout } from "~/constants/layouts"
import { useDesignerContext } from "~/composables/designer"
import Simulator from "./simulator"
import Ruler from "./canvas"

function Editor() {
  const { collapse } = useDesignerContext()
  const wrapper = ref<HTMLDivElement | null>(null)
  const size = reactive(useElementSize(wrapper))

  const attrs = computed(() => ({
    height: size.height,
    width: size.width,
    offsetX: 0,
    offsetY: 0,
    scale: 1
  }))

  const styles = computed(() => {
    const styles: CSSProperties = {}
    const { sidebarWidth, designerCollapseSidebarWidth, mainTransition } = layout
    styles.paddingLeft = `${collapse.left ? designerCollapseSidebarWidth : sidebarWidth}px`
    styles.transition = mainTransition
    return styles
  })

  return (
    <div
      class="flex-1 relative overflow-hidden relative cursor-pointer"
      style={styles.value}
      ref={wrapper}
    >
      <Ruler mode="horizontal" {...attrs.value} />
      <Ruler mode="vertical"  {...attrs.value} />
      <Simulator />
    </div>
  )
}

export default Editor
