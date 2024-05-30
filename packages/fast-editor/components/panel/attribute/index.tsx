import { useDesignerContext } from "@fast-builder/editor/composables/designer";
import { SidePanel, FixedArrow } from "@fast-builder/shared"

function AttributePanel() {
  const { collapse } = useDesignerContext()
  return (
    <SidePanel isDesigner={true} isFixed={true} right={true} isCollapse={collapse.right}>
      <FixedArrow isDesigner={true} right={true} v-model:isCollapse={collapse.right} />
    </SidePanel>
  )
}

export default AttributePanel
