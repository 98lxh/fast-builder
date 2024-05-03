import type { FC } from "vite-plugin-vueact";
import type { MaterialComponent } from "@h5-designer/material";
import { designerInjectionKey } from "../util/context";
import { onDragstart } from "../util/material";

interface DefineProps {
  components: MaterialComponent[];
  isHidden: boolean;
}

const Components: FC<DefineProps> = function (props) {
  const context = inject(designerInjectionKey)

  return (
    <div class={`flex m-2 w-full justify-around overflow-hidden w-[${props.isHidden ? 'auto' : '0px'}]`}>
      {
        props.components.map(component => (
          <div class="flex flex-col justify-around items-center h-[80px] w-[60px] cursor-move">
            <div
              class="text-primary border-2 border-dotted rounded-sm dark:border-[#8b8b8d] w-full p-3 hover:border-primary duration-300"
              onDragstart={evt => onDragstart(evt, context, component)}
              draggable
            >
              <NuxtIcon name={component.icon} />
            </div>

            <p class="text-xs mt-2 whitespace-nowrap select-none font-bold">
              {component.text}
            </p>
          </div>
        ))
      }
    </div>
  )
}


export default Components;
