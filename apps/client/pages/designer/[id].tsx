import { useIsMobile } from "~/composables/styles/viewport"
import { useDesignerContext } from "~/composables/designer"

import DesignPanel from "~/components/design-panel"
import DesignView from "~/components/design-view"


function Designer() {
  const isMobile = useIsMobile()
  const designer = useDesignerContext()

  function updateCollapse() {
    designer.collapse.left = isMobile.value
    designer.collapse.right = isMobile.value
  }

  watch(() => isMobile.value, updateCollapse, { immediate: true })

  return (
    <div class="flex h-full w-full">
      <DesignPanel.Material />
      <DesignView />
      <DesignPanel.Attribute />
    </div>
  )
}

export default Designer
