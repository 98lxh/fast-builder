import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { layout } from "~/constants/layouts"

import Editor from "./editor"

interface DefineProps {
  isCollapse: boolean
}

const EditorPanel: FC<DefineProps> = function (props) {
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
      class="flex-1 relative overflow-hidden relative cursor-pointer"
      style={styles.value}
      ref={wrapper}
    >
      <Editor.Ruler mode="horizontal" {...attrs.value} />
      <Editor.Ruler mode="vertical"  {...attrs.value} />
      <Editor.Simulator />
    </div>
  )
}

export default EditorPanel
