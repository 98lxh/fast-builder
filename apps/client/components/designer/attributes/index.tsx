import type { CSSProperties } from "vue"

import AttributeForm from "./attribute-form"
import DragLayers from "./control-layers"

import { Sidebar, Arrow } from "~/components/common";

function AttributePanel() {
  const isCollapse = shallowRef(false);

  return (
    // <div
    //   id="attribute-panel"
    //   class="flex flex-col shadow-custom w-[248px] fixed z-[2] main-height bg-base-100 right-[0px] border-l-1 dark:border-neutral"
    //   style={styles.value}
    // >
    //   <DragLayers />
    //   <AttributeForm />
    //   <ArrowButton v-model={isHidden.value} direction="right" />
    // </div>
    <Sidebar isDesigner={true} isFixed={true} right={true} isCollapse={isCollapse.value}>
      <Arrow isDesigner={true} right={true} v-model:isCollapse={isCollapse.value} />
    </Sidebar>
  )
}

export default AttributePanel
