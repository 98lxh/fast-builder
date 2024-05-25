import type { FC } from "vite-plugin-vueact"
import type { CSSProperties } from "vue"

import ThemeButton from "./button-theme"
import CreareButton from "./button-create"

import { layout } from "~/constants/layouts";

interface DefineProps {
  isCollapse: boolean;
  isMobile: boolean;
}

const Header: FC<DefineProps> = function (props) {
  const styles = computed(() => {
    const _styles: CSSProperties = {}
    const { isMobile, isCollapse } = props
    const { sidebarWidth, collapseSidebarWidth, headerHeight, headerTransition } = layout
    _styles.width = isMobile ? '100vw' : `calc(100vw - ${isCollapse ? collapseSidebarWidth : sidebarWidth}px)`
    _styles.transition = headerTransition
    _styles.height = headerHeight + 'px'
    return _styles
  })

  return (
    <header
      class="bg-base-300 border-b-1 flex h-[48px] items-center p-[10px] right-0 fixed box-border"
      style={styles.value}
    >
      <div class="flex-1 h-full">
        <CreareButton />
      </div>

      <div class="flex-none">
        <ThemeButton />
      </div>
    </header >
  )
}

export default Header
