import type { FC } from "vite-plugin-vueact";
import Items from "./items"
import Logo from "./logo"


import { SidePanel, FixedArrow } from "@fast-builder/shared"

interface DefineProps {
  isCollapse?: boolean;
  isMobile: boolean;
}

interface DefineEmits {
  (name: 'update:isCollapse', isCollapse: boolean): void
}

const Sidebar: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  return (
    <SidePanel isFixed={props.isMobile} isCollapse={props.isCollapse}>
      <Logo isCollapse={props.isCollapse && !props.isMobile} />
      <Items isCollapse={props.isCollapse && !props.isMobile} />
      <FixedArrow isCollapse={props.isCollapse} {...{ 'onUpdate:isCollapse': (value: boolean) => emit('update:isCollapse', value) }} />
    </SidePanel>
  )
}

export default Sidebar;
