import { useDesignerContext } from "~/composables/designer";
import Block from "./block"

import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event";
import type { BlockTranslate } from "../util/editable";

function BlockContainer() {
  const designer = useDesignerContext()
  const wrapperRef = ref<HTMLDivElement | null>(null)
  const containerRef = ref<HTMLDivElement | null>(null)

  const blockTranslate = ref<BlockTranslate>({ x: 0, y: 0 })

  function move({ deltaX, deltaY }: MoveListenerOptions) {
    let { x, y } = blockTranslate.value
    deltaX !== 0 && Number(deltaX) > 0 ? x += deltaX : x -= Math.abs(deltaX)
    deltaY !== 0 && Number(deltaY) > 0 ? y += deltaY : y -= Math.abs(deltaY)
    blockTranslate.value = { x, y }
  }

  const onMousedown = useDocumentMouseEvent({
    down: evt => !(wrapperRef.value?.contains(evt?.target as HTMLElement)),
    move
  })

  watch(() => wrapperRef.value, () => wrapperRef.value && designer.setSimulatorRef(wrapperRef.value), { deep: true })

  return (
    <div
      class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%]"
      onMousedown={onMousedown}
      ref={containerRef}
    >
      <Block 
        v-model:translate={blockTranslate.value} 
        onUpdateWrapperRef={(ref: HTMLDivElement) => wrapperRef.value = ref} 
      />
    </div>
  )
}


export default BlockContainer
