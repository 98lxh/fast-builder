import { Header as CommonHeader, ThemeButton } from "~/components/common"
import MenuButton from "./button-menu"

function Header() {
  return (
    <CommonHeader isDesigner={true}>
      <div class="flex-1 h-full">
        <MenuButton />
      </div>

      <div class="flex-none">
        <ThemeButton />
      </div>
    </CommonHeader>
  )
}

export default Header
