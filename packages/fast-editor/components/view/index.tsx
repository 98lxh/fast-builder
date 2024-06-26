import type { CSSProperties } from "vue"
import { useEditorContext } from "../../composables";
import Simulator from "./simulator"
import Ruler from "./ruler"

import { layout } from "@fast-builder/shared"


function View() {
  const { collapse } = useEditorContext()
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

export default View
