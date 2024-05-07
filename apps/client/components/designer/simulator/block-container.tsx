import { bindMouseEvent } from "../util/board"
import Block from "./block"

import simulatorData from "@h5-designer/mock/data.json"


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

  watch(() => wrapperRef.value, (wrapper) => {
    if (!wrapper || !context) { return }
    bindMouseEvent(containerRef.value, wrapperRef.value, updateTranslate)

    console.log('init', simulatorData)
    context.setSimulatorData(simulatorData as unknown as SimulatorData)
    context.setSimulatorRef(wrapperRef.value)
  }, {
    deep: true
  })

  return (
    <div
      class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%]"
      ref={containerRef}
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
