import { useIsMobile } from "~/composables/styles/viewport"
import "@h5-designer/material"

import {
  AttributePanel,
  MaterialPanel,
  Simulator
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
      <MaterialPanel v-model:isCollapse={collapse.materialPanel} />
      <Simulator isCollapse={collapse.materialPanel} />
      <AttributePanel v-model:isCollapse={collapse.attributePanel} />
    </div>
  )
}

export default Designer
