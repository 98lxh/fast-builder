import type { FC } from "vite-plugin-vueact";
import { Sidebar, Arrow } from "~/components/common";

interface DefineProps {
  isCollapse?: boolean
}

interface DefineEmits {
  (name:'update:isCollapse',isCollapse:boolean):void
}

const AttributePanel:FC<DefineProps,DefineEmits> = function (props) {
  const isCollapse = useVModel(props, 'isCollapse');

  return (
    <Sidebar isDesigner={true} isFixed={true} right={true} isCollapse={isCollapse.value}>
      <Arrow isDesigner={true} right={true} v-model:isCollapse={isCollapse.value} />
    </Sidebar>
  )
}

export default AttributePanel
