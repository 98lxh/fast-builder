import { useIsMobile } from "~/composables/styles/viewport"
import "@h5-designer/material"

import { Panel, Editor } from "~/components/designer"
import { useDesignerContext } from "~/composables/designer"

function Designer() {
  const isMobile = useIsMobile()

  const designer = useDesignerContext()

  watch(() => isMobile.value, () => {
    designer.collapse.left = isMobile.value
    designer.collapse.right = isMobile.value
  }, { immediate: true })

  return (
    <div class="flex h-full w-full">
      <Panel.Material />
      <Editor />
      <Panel.Attribute />
    </div>
  )
}

export default Designer
