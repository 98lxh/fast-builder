import type { FC } from "vite-plugin-vueact";

interface DefineProps {
  isCollapse?: boolean
}

const Logo: FC<DefineProps> = function (props) {
  return (
    <div class="flex w-full pl-[12px] pt-[18px] select-none items-center">
      <img class="w-[30px] h-[30px] p-[3px]" src="/logo.png" />
      {props.isCollapse ? null : <p class="mx-[6px] text-nowrap text-[16px]">H5 Designer</p>}
    </div>
  )
}


export default Logo
