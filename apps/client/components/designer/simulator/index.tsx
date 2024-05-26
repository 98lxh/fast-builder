import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { layout } from "~/constants/layouts"

import BlockContainer from "./block-container"
import Ruler from "./ruler"

interface DefineProps {
  isCollapse: boolean
}

const Simulator: FC<DefineProps> = function (props) {
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
    const { isCollapse } = props
    const { sidebarWidth, designerCollapseSidebarWidth, mainTransition } = layout
    styles.paddingLeft = `${isCollapse ? designerCollapseSidebarWidth : sidebarWidth}px`
    styles.transition = mainTransition
    return styles
  })

  return (
    <div
      class="flex-1 relative overflow-hidden relative cursor-pointer main-height"
      style={styles.value}
      ref={wrapper}
    >
      <Ruler mode="horizontal" {...attrs.value} />
      <Ruler mode="vertical"  {...attrs.value} />
      <BlockContainer />
    </div>
  )
}

export default Simulator
