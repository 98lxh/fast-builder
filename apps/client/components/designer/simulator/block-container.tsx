import { useDesignerContext } from "~/composables/designer";
import Block from "./block"

import {
  useDocumentMouseEvent,
  type MoveListenerOptions
} from "~/composables/event";


function BlockContainer() {
  const { setSimulatorRef } = useDesignerContext();

  const containerRef = ref<HTMLDivElement | null>(null)
  const wrapperRef = ref<HTMLDivElement | null>(null)
  const translate = shallowReactive({ x: 0, y: 0 })

  
  function updateTranslate(deltaX: number, deltaY: number) {
    const moveX = deltaX !== 0;
    const moveY = deltaY !== 0;
    moveX && Number(deltaX) > 0 ? translate.x += deltaX : translate.x -= Math.abs(deltaX);
    moveY && Number(deltaY) > 0 ? translate.y += deltaY : translate.y -= Math.abs(deltaY);
  }

  const onMousedown = useDocumentMouseEvent({
    down: evt => !(wrapperRef.value?.contains(evt?.target as HTMLElement)),
    move: ({ deltaX, deltaY }: MoveListenerOptions) => updateTranslate(deltaX, deltaY)
  })

  watch(() => wrapperRef.value, () => wrapperRef.value && setSimulatorRef(wrapperRef.value), { deep: true })

  return (
    <div
      ref={containerRef}
      class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%]"
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
