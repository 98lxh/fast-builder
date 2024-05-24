import type { FC } from "vite-plugin-vueact";
import type { CSSProperties } from "vue";

import { layout } from "~/constants/layouts";

interface DefineProps {
  isCollapse: boolean
}

const Main: FC<DefineProps> = function (props) {
  const styles = computed(() => {
    const _styles: CSSProperties = {}
    const { sidebarWidth, collapseSidebarWidth, headerHeight, transition } = layout
    _styles.paddingLeft = `${props.isCollapse ? collapseSidebarWidth : sidebarWidth}px`
    _styles.paddingTop = `${headerHeight}px`
    _styles.transition = transition
    return _styles
  })

  return (
    <div
      class="w-[100vw] h-[100vh] bg-base-300 box-border"
      style={styles.value}>
      <NuxtPage />
    </div>
  )
}


export default Main
