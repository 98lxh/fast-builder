import { useDesignerContext } from "~/composables/designer";
import Blocks from "./blocks"

import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event";

function BlockContainer() {
  const designer = useDesignerContext()
  const wrapperRef = ref<HTMLDivElement | null>(null)
  const containerRef = ref<HTMLDivElement | null>(null)

  function move({ deltaX, deltaY }: MoveListenerOptions) {
    let { left, top } = designer.data.value.container
    deltaX !== 0 && Number(deltaX) > 0 ? left += deltaX : left -= Math.abs(deltaX)
    deltaY !== 0 && Number(deltaY) > 0 ? top += deltaY : top -= Math.abs(deltaY)
    designer.setContainer({ left, top })
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
      <Blocks onUpdateWrapperRef={(ref: HTMLDivElement) => wrapperRef.value = ref} />
    </div>
  )
}


export default BlockContainer
