import type { FC } from "vite-plugin-vueact"

import CreareButton from "./button-create"

import { Header as CommonHeader, ThemeButton } from "~/components/common"

interface DefineProps {
  isCollapse: boolean;
  isMobile: boolean;
}

const Header: FC<DefineProps> = function (props) {
  return (
    <CommonHeader isCollapse={props.isCollapse} isMobile={props.isMobile}>
      <div class="flex-1 h-full">
        <CreareButton />
      </div>

      <div class="flex-none">
        <ThemeButton />
      </div>
    </CommonHeader >
  )
}

export default Header
