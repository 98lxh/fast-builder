import { useDesignerContext } from "~/composables/designer";
import Block from "./block"

import {
  useDocumentMouseEvent,
  type MoveListenerOptions
} from "~/composables/event";


function BlockContainer() {
  const context = useDesignerContext();
  const containerRef = ref<HTMLDivElement | null>(null)
  const wrapperRef = ref<HTMLDivElement | null>(null)
  const translate = shallowReactive({ x: 0, y: 0 })
  
  function move({ deltaX, deltaY }: MoveListenerOptions) {
    deltaX !== 0 && Number(deltaX) > 0 ? translate.x += deltaX : translate.x -= Math.abs(deltaX);
    deltaY !== 0 && Number(deltaY) > 0 ? translate.y += deltaY : translate.y -= Math.abs(deltaY);
  }

  const onMousedown = useDocumentMouseEvent({
    down: evt => !(wrapperRef.value?.contains(evt?.target as HTMLElement)),
    move
  })

  watch(() => wrapperRef.value, () => wrapperRef.value && context.setSimulatorRef(wrapperRef.value), { deep: true })

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
