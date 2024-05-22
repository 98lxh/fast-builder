import type { FC } from "vite-plugin-vueact";
import { getComponents } from "@h5-designer/material";
import { useDesignerContext } from "~/composables/designer";
import { useHistoryContext } from "~/composables/designer/history";
import { onDragstart } from "../util/draggable";
import { Empty } from "~/components/common";

interface DefineProps {
  category: string;
  isHidden: boolean;
}

const Components: FC<DefineProps> = function (props) {
  const history = useHistoryContext()
  const designer = useDesignerContext()
  return (
    <div class="flex m-2 flex-1 justify-around overflow-hidden">
      {(() => {
        const components = getComponents(props.category)
        if (components.length === 0) /*EXCLUDE*/ return <Empty description="暂无物料组件" />
        /*EXCLUDE*/ return components.map(component => (
          <div class="flex flex-col justify-around items-center h-[80px] w-[60px] cursor-move">
            <div
              class="text-primary border-1 border-dotted rounded-sm dark:border-[#8b8b8d] w-full p-3 hover:border-primary duration-300"
              onDragstart={evt => onDragstart(evt, history.record, designer, component)}
              draggable
            >
              <NuxtIcon name={component.icon} />
            </div>
            <p class="text-xs mt-2 whitespace-nowrap select-none font-bold">
              {component.text}
            </p>
          </div>
        ))
      })()}
    </div >
  )
}


export default Components;
