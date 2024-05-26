import type { FC } from "vite-plugin-vueact";
import type { CSSProperties } from "vue";

import { layout } from "~/constants/layouts";

interface DefineProps {
  isCollapse?: boolean;
  isDesigner?: boolean;
  isFixed?: boolean;
  right?: boolean;
}

const Sidebar: FC<DefineProps> = function (props, { slots }) {
  function generateFixedStyles(styles: CSSProperties) {
    const { isCollapse, right } = props
    styles.transform = `translateX(${isCollapse ? (right ? '100' : '-100') : '0'}%)`
    styles.width = `${layout.sidebarWidth}px`
    return styles
  }
  const styles = computed(() => {
    const { isFixed, isCollapse, isDesigner } = props
    const {
      designerCollapseSidebarWidth,
      collapseSidebarWidth,
      designerHeaderHeight,
      sidebarTransition,
      sidebarWidth,
    } = layout
    const _styles: CSSProperties = { transition: sidebarTransition }
    if (isFixed) { return generateFixedStyles(_styles) }
    _styles.height = isDesigner ? `calc(100vh - ${designerHeaderHeight}px)` : '100vh'
    _styles.width = `${isCollapse ? (isDesigner ? designerCollapseSidebarWidth : collapseSidebarWidth) : sidebarWidth}px`
    _styles.top = isDesigner ? `${designerHeaderHeight}px` : 0
    return _styles
  })

  return (
    <div
      class={`flex flex-col fixed ${props.isDesigner ? 'bg-base-300 dark:bg-base-100' : 'bg-base-100'} h-[100vh] z-[100] ${props.right ? 'right-0 border-l-1' : 'left-0 border-r-1'}`}
      style={styles.value}
    >
      {slots.default && slots.default()}
    </div>
  )
}

export default Sidebar
