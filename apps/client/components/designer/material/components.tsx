import type { FC } from "vite-plugin-vueact";
import type { MaterialComponentItem } from "~/constants/material";

interface DefineProps {
  components: MaterialComponentItem[]
  isHidden: boolean
}

const Components: FC<DefineProps> = function (props) {
  return (
    <div class={`flex m-2 gap-2 overflow-hidden w-[${props.isHidden ? 'auto' : '0px'}]`}>
      {
        props.components.map(item => (
          <div class="flex flex-col rounded-sm border-2 border-dotted justify-around items-center h-[80px] w-[80px] cursor-move dark:border-gray">
            <NuxtIcon name={item.icon} size="38px" color="#1A5CFF" />
            <p class="text-sm whitespace-nowrap select-none font-bold">{item.text}</p>
          </div>
        ))

      }
    </div>
  )
}


export default Components;
