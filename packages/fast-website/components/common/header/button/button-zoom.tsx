import { useEditorContext } from "@fast-builder/editor"
import { FastIcon } from "@fast-builder/icon"
import { zoomOptions } from "@fast-builder/shared"
import { NDropdown } from "naive-ui"

function ZoomButton() {
  const editor = useEditorContext()
  const zoom = computed(() => `${Number(editor.zoom.value) * 100}%`)
  return (
    <NDropdown
      size="small"
      trigger="click"
      options={zoomOptions}
      placement="bottom-start"
      onSelect={zoomValue => { console.log(zoomValue); editor.zoom.value = zoomValue }}
    >
      <button class=" btn-ghost py-[3px] px-[5px] h-full text-[12px] flex items-center">
        {zoom.value}
        <FastIcon class="rotate-[90deg] ml-[5px]" size={12} name="IconRight" />
      </button >
    </NDropdown>
  )
}

export default ZoomButton
