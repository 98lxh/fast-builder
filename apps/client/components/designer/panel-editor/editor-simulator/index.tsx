import { useDesignerContext } from "~/composables/designer"
import Blocks from "./blocks"

import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event"

function Simulator() {
  const designer = useDesignerContext()
  const containerRef = ref<HTMLDivElement | null>(null)

  function move({ deltaX, deltaY }: MoveListenerOptions) {
    let { left, top } = designer.data.value.container
    deltaX !== 0 && Number(deltaX) > 0 ? left += deltaX : left -= Math.abs(deltaX)
    deltaY !== 0 && Number(deltaY) > 0 ? top += deltaY : top -= Math.abs(deltaY)
    designer.setContainer({ left, top })
  }

  const down = (evt: MouseEvent) => !(designer.simulatorRef.value?.contains(evt?.target as HTMLElement))
  const onMousedown = useDocumentMouseEvent({ down, move })

  return (
    <div class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%]"
      onMousedown={onMousedown}
      ref={containerRef}
    >
      <Blocks />
    </div>
  )
}

export default Simulator
