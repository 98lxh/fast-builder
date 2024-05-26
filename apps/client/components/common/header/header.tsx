import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { layout } from "~/constants/layouts"

interface DefineProps {
  isMobile?: boolean;
  isCollapse?: boolean;
  isDesigner?: boolean;
}

const Header: FC<DefineProps> = function (props, { slots }) {
  const styles = computed(() => {
    const _styles: CSSProperties = {}
    const { isMobile, isCollapse, isDesigner } = props
    const { sidebarWidth, collapseSidebarWidth, defaultHeaderHeight, designerHeaderHeight, headerTransition } = layout
    _styles.width = isMobile || isDesigner ? '100vw' : `calc(100vw - ${isCollapse ? collapseSidebarWidth : sidebarWidth}px)`
    _styles.height = `${(isDesigner ? designerHeaderHeight : defaultHeaderHeight)}px`
    _styles.transition = !isDesigner ? headerTransition : ''
    return _styles
  })

  return (
    <header
      class={`${props.isDesigner ? 'bg-base-300 dark:bg-base-200 p-[5px]' : 'bg-base-300 p-[10px]'} border-b-1 flex h-[48px] items-center right-0 fixed box-border`}
      style={styles.value}
    >
      {slots.default && slots.default()}
    </header >
  )
}

export default Header
