import { useDesignerContext } from "~/composables/designer";
import Block from "./block"

import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event";
import type { BlockTranslate } from "../util/editable";

function BlockContainer() {
  const context = useDesignerContext();
  const containerRef = ref<HTMLDivElement | null>(null)
  const wrapperRef = ref<HTMLDivElement | null>(null)

  const translate = ref<BlockTranslate>({ x: 0, y: 0 })

  function move({ deltaX, deltaY }: MoveListenerOptions) {
    deltaX !== 0 && Number(deltaX) > 0 ? translate.value.x += deltaX : translate.value.x -= Math.abs(deltaX);
    deltaY !== 0 && Number(deltaY) > 0 ? translate.value.y += deltaY : translate.value.y -= Math.abs(deltaY);
  }

  const onMousedown = useDocumentMouseEvent({
    down: evt => !(wrapperRef.value?.contains(evt?.target as HTMLElement)),
    move
  })

  watch(() => wrapperRef.value, () => wrapperRef.value && context.setSimulatorRef(wrapperRef.value), { deep: true })

  return (
    <div
      class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%]"
      onMousedown={onMousedown}
      ref={containerRef}
    >
      <Block v-model:translate={translate.value} onUpdateWrapperRef={(ref: HTMLDivElement) => wrapperRef.value = ref}/>
    </div>
  )
}


export default BlockContainer
