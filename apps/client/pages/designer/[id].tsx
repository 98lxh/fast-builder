import { useIsMobile } from "~/composables/styles/viewport"
import "@h5-designer/material"

import {
  AttributePanel,
  MaterialPanel,
  Editor
} from "~/components/designer"

function Designer() {
  const isMobile = useIsMobile()
  const collapse = shallowReactive({ materialPanel: false, attributePanel: false })

  watch(() => isMobile.value,() => {
    collapse.materialPanel = isMobile.value
    collapse.attributePanel = isMobile.value
  },{immediate: true})

  return (
    <div class="flex h-full w-full">
      <AttributePanel v-model:isCollapse={collapse.materialPanel} />
      <Editor isCollapse={collapse.materialPanel} />
      <MaterialPanel v-model:isCollapse={collapse.attributePanel} />
    </div>
  )
}

export default Designer
