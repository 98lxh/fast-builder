import type { FC } from "vite-plugin-vueact"
import { CommonHeader, HeaderButton } from "~/components/common"

interface DefineProps {
  isCollapse: boolean;
  isMobile: boolean;
}

const Header: FC<DefineProps> = function (props) {
  return (
    <CommonHeader isCollapse={props.isCollapse} isMobile={props.isMobile}>
      <div class="flex-1 h-full">
        <HeaderButton.Create />
      </div>
      <div class="flex-none">
        <HeaderButton.Theme />
      </div>
    </CommonHeader >
  )
}

export default Header
