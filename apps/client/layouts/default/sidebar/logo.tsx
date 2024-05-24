import type { FC } from "vite-plugin-vueact";

interface DefineProps {
  isCollapse?: boolean
}

const Logo: FC<DefineProps> = function (props) {
  return (
    <div class="flex w-full pl-[16px] pt-[22px] select-none">
      <img class="w-[25px] h-[25px] mr-[8px]" src="/logo.png" />
      {props.isCollapse ? null : <p class="mr-[5px] text-nowrap">H5 Designer</p>}
    </div>
  )
}


export default Logo
