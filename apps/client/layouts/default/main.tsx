import type { FC } from "vite-plugin-vueact";
import type { CSSProperties } from "vue";

import { layout } from "~/constants/layouts";

interface DefineProps {
  isCollapse: boolean;
  isMobile: boolean;
}

const Main: FC<DefineProps> = function (props) {
  const styles = computed(() => {
    const _styles: CSSProperties = {}
    const { isCollapse, isMobile } = props
    const { sidebarWidth, collapseSidebarWidth, headerHeight, mainTransition } = layout
    if (!isMobile) { _styles.paddingLeft = `${isCollapse ? collapseSidebarWidth : sidebarWidth}px` }
    _styles.paddingTop = `${headerHeight}px`
    _styles.transition = mainTransition
    return _styles
  })

  return (
    <div
      class="w-[100vw] h-[100vh] bg-base-300"
      style={styles.value}>
      <div class="p-[15px] h-full">
        <NuxtPage />
      </div>
    </div>
  )
}


export default Main
