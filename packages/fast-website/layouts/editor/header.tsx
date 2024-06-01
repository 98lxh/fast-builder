import { CommonHeader, HeaderButton } from "~/components/common"

function Header() {
  return (
    <CommonHeader isDesigner={true}>
      <div class="flex-1 h-full">
        <HeaderButton.Menu />
      </div>
      <div class="flex">
      </div>
    </CommonHeader >
  )
}

export default Header
