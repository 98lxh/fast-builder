import type { FC } from "vite-plugin-vueact";
import { getComponents } from "@h5-designer/material";
import { useDesignerContext, useHistoryContext } from "~/composables/designer";
import { layout } from "~/constants/layouts";
import type { CSSProperties } from "vue";
import { NEllipsis } from "naive-ui";

import { onDragstart } from "./util";

interface DefineProps {
  category: string;
}

const Components: FC<DefineProps> = function (props) {
  const history = useHistoryContext()
  const designer = useDesignerContext()

  const components = computed(() => {
    const target = [];
    const source = getComponents(props.category)
    for (var i = 0; i < source.length; i += 3) {
      target.push(source.slice(i, i + 3));
    }
    return target
  })

  const styles = computed(() => {
    const styles: CSSProperties = {}
    const { sidebarWidth, designerCollapseSidebarWidth, designerHeaderHeight } = layout
    styles.width = `${sidebarWidth - designerCollapseSidebarWidth}px`
    styles.height = `calc(100vh - ${designerHeaderHeight}px)`
    return styles
  })

  return (
    <div class="flex-1 flex flex-col overflow-hidden h-full p-[10px]" style={styles.value}>
      {components.value.map((group, index) => (
        <div class="flex w-full bg-[#F1F2F4] dark:bg-[#434448] px-[10px] py-[5px]" key={index}>
          {group.map(component => (
            <div class="flex flex-col w-[26%] mr-[15px]">
              <div
                class="rounded-sm p-[5px] hover:bg-[#D4D5D6] dark:hover:bg-[#56575b] duration-300 cursor-move"
                onDragstart={evt => onDragstart(evt, history.record, designer, component)}
                draggable
              >
                <NuxtIcon name={component.icon} />
              </div>

              <NEllipsis class="text-[12px] whitespace-nowrap select-none" style="max-width: 40px">
                {component.text}
              </NEllipsis>
            </div>
          ))}
        </div>
      ))}
    </div >
  )
}


export default Components;
