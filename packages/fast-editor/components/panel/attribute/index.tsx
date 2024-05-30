import { SidePanel, FixedArrow } from "@fast-builder/shared"
import { useEditorContext } from "../../../composables";

function AttributePanel() {
  const { collapse } = useEditorContext()
  return (
    <SidePanel isDesigner={true} isFixed={true} right={true} isCollapse={collapse.right}>
      <FixedArrow isDesigner={true} right={true} v-model:isCollapse={collapse.right} />
    </SidePanel>
  )
}

export default AttributePanel
