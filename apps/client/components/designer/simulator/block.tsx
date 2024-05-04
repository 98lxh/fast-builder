import type { CSSProperties } from "vue";
import { bindMouseEvent } from "../util/board"
import { designerInjectionKey } from "../util/context"
import { mapMaterialComponents } from "@h5-designer/material";

import simulatorData from "@h5-designer/mock/data.json"


function Block() {
  const context = inject(designerInjectionKey);
  const containerRef = ref<HTMLDivElement | null>(null);
  const blockRef = ref<HTMLDivElement | null>(null);
  const translate = shallowReactive({ x: 0, y: 0 })

  const styles = computed<CSSProperties>(() => {
    const { width, height } = context?.simulatorData.value?.container || {};

    return {
      width: (width || 0) + 'px',
      height: (height || 0) + 'px',
      transform: `translate(${translate.x}px,${translate.y}px`
    }
  })

  function updateTranslate(deltaX: number, deltaY: number) {
    const moveX = deltaX !== 0;
    const moveY = deltaY !== 0;

    if (moveX) {
      Number(deltaX) > 0 ? translate.x += deltaX : translate.x -= Math.abs(deltaX);
    }

    if (moveY) {
      Number(deltaY) > 0 ? translate.y += deltaY : translate.y -= Math.abs(deltaY);
    }
  }

  onMounted(() => {
    bindMouseEvent(containerRef.value, blockRef.value, updateTranslate)
    context?.setSimulatorRef(blockRef.value);
    context?.setSimulatorData(simulatorData as unknown as SimulatorData);
  })

  return (
    <div
      class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%]"
      ref={containerRef}
    >
      <div
        class={`shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto`}
        style={styles.value}
        ref={blockRef}
      >
        {
          context?.simulatorData.value?.blocks.map(block => (
            <div
              class={`absolute`}
              style={{ top: block.top + 'px', left: block.left + 'px', zIndex: block.zIndex }}>
              {mapMaterialComponents[block.key] && mapMaterialComponents[block.key](block.props)}
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default Block
