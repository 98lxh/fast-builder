import { useDesignerContext } from "~/composables/designer";
import Block from "./block"

import simulatorData from "@h5-designer/mock/data.json"
import type { MoveListenerOptions } from "~/composables/event";


function BlockContainer() {
  const context = useDesignerContext();
  const containerRef = ref<HTMLDivElement | null>(null)
  const wrapperRef = ref<HTMLDivElement | null>(null)
  const translate = shallowReactive({ x: 0, y: 0 })

  function updateTranslate(deltaX: number, deltaY: number) {
    const moveX = deltaX !== 0;
    const moveY = deltaY !== 0;
    moveX && Number(deltaX) > 0 ? translate.x += deltaX : translate.x -= Math.abs(deltaX);
    moveY && Number(deltaY) > 0 ? translate.y += deltaY : translate.y -= Math.abs(deltaY);
  }

  function move({ currentX, lastX, currentY, lastY }: MoveListenerOptions) {
    const deltaX = currentX - lastX;
    const deltaY = currentY - lastY;
    updateTranslate(deltaX, deltaY);
  }

  const onMousedown = useDocumentMouseEvent({
    down: evt => !(wrapperRef.value?.contains(evt?.target as HTMLElement)),
    move
  })

  watch(() => wrapperRef.value, (wrapper) => {
    if (!wrapper || !context) { return }
    context.setSimulatorData(simulatorData as unknown as SimulatorData)
    context.setSimulatorRef(wrapperRef.value)
  }, {
    deep: true
  })

  return (
    <div
      class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%]"
      ref={containerRef}
      onMousedown={onMousedown}
    >
      <Block
        translateX={translate.x}
        translateY={translate.y}
        onUpdateWrapperRef={(ref: HTMLDivElement | null) => wrapperRef.value = ref}
      />
    </div>
  )
}


export default BlockContainer
