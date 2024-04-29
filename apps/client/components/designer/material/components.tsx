import type { FC } from "vite-plugin-vueact";
import type { MaterialComponentItem } from "~/constants/material";

interface DefineProps {
  components: MaterialComponentItem[]
}

const Components:FC<DefineProps> = function(props){
  return (
    props.components.map(item => (
      <div class="flex flex-col rounded-sm border-1 justify-around items-center h-[80px] w-[80px]  cursor-move">
        <NuxtIcon name={item.icon} size="38px" color="#1A5CFF" />
        <p class="text-sm whitespace-nowrap select-none font-bold">{item.text}</p>
      </div>
    ))
  )
}


export default Components;
