import { useIsMobile } from "~/composables/styles/viewport"
import "@h5-designer/material"

import Panel from "~/components/designer"

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
      <Panel.Editor isCollapse={collapse.materialPanel} />
      <Panel.Materia v-model:isCollapse={collapse.materialPanel} />
      <Panel.FixedButton />
    </div>
  )
}

export default Designer
