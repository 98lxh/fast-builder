import type { FC } from "vite-plugin-vueact";
import type { CSSProperties } from "vue";

import { layout } from "~/constants/layouts";
import Logo from "./logo"

interface DefineProps {
  isCollapse?: boolean
}

interface DefineEmits {
  (name: 'update:isCollapse', isCollapse: boolean): void
}

const Sidebar: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const styles = computed(() => {
    const _styles: CSSProperties = {}
    const { sidebarWidth, collapseSidebarWidth, transition } = layout
    _styles.width = `${props.isCollapse ? collapseSidebarWidth : sidebarWidth}px`
    _styles.transition = transition
    return _styles
  })

  return (
    <div class="flex flex-col fixed left-0 bg-base-100 h-full" style={styles.value}>
      <div class="w-[22px] h-[22px] p-[2px] absolute bg-base-300 top-[50px] right-[0px] translate-x-[50%] cursor-pointer duration-300 shadow-xl hover:color-primary border-1 hover:border-primary"
        onClick={() => emit('update:isCollapse', !props.isCollapse)}>
        <NuxtIcon name={props.isCollapse ? 'left' : 'right'} />
      </div>

      <Logo isCollapse={props.isCollapse} />
    </div>
  )
}

export default Sidebar;
