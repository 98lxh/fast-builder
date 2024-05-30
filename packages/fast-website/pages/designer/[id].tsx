import { useIsMobile } from "~/composables/styles/viewport"
import { View, Panel, useEditorContext } from "@fast-builder/editor"

function Designer() {
  const isMobile = useIsMobile()
  const designer = useEditorContext()

  function updateCollapse() {
    designer.collapse.left = isMobile.value
    designer.collapse.right = isMobile.value
  }

  watch(() => isMobile.value, updateCollapse, { immediate: true })

  return (
    <div class="flex h-full w-full">
      <Panel.Material />
      <View />
      <Panel.Attribute />
    </div>
  )
}

export default Designer
