import type { FC } from "vite-plugin-vueact"
import { CommonHeader, ThemeButton } from "~/components/common"
import CreateButton from "./button-create"

interface DefineProps {
  isCollapse: boolean;
  isMobile: boolean;
}

const Header: FC<DefineProps> = function (props) {
  return (
    <CommonHeader isCollapse={props.isCollapse} isMobile={props.isMobile}>
      <div class="flex-1 h-full">
        <CreateButton />
      </div>
      <div class="flex-none">
        <ThemeButton />
      </div>
    </CommonHeader >
  )
}

export default Header
