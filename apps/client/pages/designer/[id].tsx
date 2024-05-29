import { useIsMobile } from "~/composables/styles/viewport"
import "@h5-designer/material"

import { Panel, Editor } from "~/components/designer"

function Designer() {
  const isMobile = useIsMobile()
  const collapse = shallowReactive({ materialPanel: false, attributePanel: false })

  watch(() => isMobile.value,() => {
    collapse.materialPanel = isMobile.value
    collapse.attributePanel = isMobile.value
  },{immediate: true})

  return (
    <div class="flex h-full w-full">
      <Panel.Attribute v-model:isCollapse={collapse.attributePanel} />
      <Editor isCollapse={collapse.materialPanel} />
      <Panel.Material v-model:isCollapse={collapse.materialPanel} />
    </div>
  )
}

export default Designer
