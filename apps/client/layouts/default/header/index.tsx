import type { FC } from "vite-plugin-vueact"
import type { CSSProperties } from "vue"
import ThemeButton from "./theme"

import { layout } from "~/constants/layouts";

interface DefineProps {
  isCollapse: boolean
}

const Header:FC<DefineProps> = function(props) {
  const styles = computed(() => {
    const _styles:CSSProperties = {}
    const { sidebarWidth, collapseSidebarWidth, headerHeight, transition } = layout
    _styles.width = `calc(100vw - ${props.isCollapse ? collapseSidebarWidth : sidebarWidth}px)`
    _styles.height = headerHeight + 'px'
    _styles.transition = transition
    return _styles
  })

  return (
    <header id="header" class="bg-base-300 border-b-1 flex h-[48px] items-center p-[10px] right-0 fixed box-border" style={styles.value}>
      <div class="flex-1">
      </div>
      <div class="flex-none">
        <ThemeButton />
      </div>
    </header >
  )
}

export default Header
