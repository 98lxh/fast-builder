import { Sidebar, Arrow } from "~/components/common";
import { useDesignerContext } from "~/composables/designer";


function AttributePanel() {
  const { collapse } = useDesignerContext()
  return (
    <Sidebar isDesigner={true} isFixed={true} right={true} isCollapse={collapse.right}>
      <Arrow isDesigner={true} right={true} v-model:isCollapse={collapse.right} />
    </Sidebar>
  )
}

export default AttributePanel
