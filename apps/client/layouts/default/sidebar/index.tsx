import type { FC } from "vite-plugin-vueact";
import type { CSSProperties } from "vue";

import { layout } from "~/constants/layouts";
import Items from "./items"
import Logo from "./logo"

interface DefineProps {
  isCollapse?: boolean;
  isMobile: boolean;
}

interface DefineEmits {
  (name: 'update:isCollapse', isCollapse: boolean): void
}

const Sidebar: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  function generateMobileStyles(styles: CSSProperties) {
    styles.transform = `translateX(${props.isCollapse ? '-100' : '0'}%)`
    styles.width = `${layout.sidebarWidth}px`
    return styles
  }

  const styles = computed(() => {
    const { isMobile, isCollapse } = props
    const { sidebarWidth, collapseSidebarWidth, sidebarTransition } = layout
    const _styles: CSSProperties = { transition: sidebarTransition }
    if (isMobile) { return generateMobileStyles(_styles) }
    _styles.width = `${isCollapse ? collapseSidebarWidth : sidebarWidth}px`
    return _styles
  })

  return (
    <div class="flex flex-col fixed left-0 bg-base-100 h-[100vh] z-[100] border-r-1" style={styles.value}>
      <div
        class={`w-[14px] h-[40px] border-1 border-l-0 absolute bg-base-100 top-[50%] translate-y-[-50%] right-[-7px] translate-x-[50%]
         cursor-pointer duration-300 hover:color-primary`}
        onClick={() => emit('update:isCollapse', !props.isCollapse)}
      >
        <NuxtIcon name={props.isCollapse ? 'direction/right' : 'direction/left'} />
      </div>

      <Logo isCollapse={props.isCollapse && !props.isMobile} />
      <Items isCollapse={props.isCollapse && !props.isMobile} />
    </div>
  )
}

export default Sidebar;
