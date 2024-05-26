import type { FC } from "vite-plugin-vueact";

import { Sidebar as CommonSidebar, Arrow } from "~/components/common"
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
  return (
    <CommonSidebar isFixed={props.isMobile} isCollapse={props.isCollapse}>
      <Logo isCollapse={props.isCollapse && !props.isMobile} />
      <Items isCollapse={props.isCollapse && !props.isMobile} />
      <Arrow isCollapse={props.isCollapse} {...{ 'onUpdate:isCollapse': (value: boolean) => emit('update:isCollapse', value) }} />
    </CommonSidebar>
  )
}

export default Sidebar;
