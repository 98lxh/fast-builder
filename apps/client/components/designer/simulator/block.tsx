import type { CSSProperties } from "vue";
import type { FC } from "vite-plugin-vueact";
import { mapMaterialComponents } from "@h5-designer/material";
import { useDesignerContext } from "~/composables/designer";
import Editable from "./editable";

import {
  type MoveListenerOptions,
  useDocumentMouseEvent,
  useEventOutside,
} from "~/composables/event";

interface DefineProps {
  translateX: number;
  translateY: number;
}

interface DefineEmits {
  (name: 'updateWrapperRef', wrapperRef: HTMLElement | null): void
}

const defaultPreview = { show: false, left: 0, top: 0, height: 0, width: 0 }

const Block: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const { simulatorData, setSimulatorDataById, clearBlockFocus, record } = useDesignerContext()
  const wrapperRef = useEventOutside({ event: 'mousedown', isOnlyChildContains: true }, clearBlockFocus)
  const preview = ref({ ...defaultPreview })

  const styles = computed<CSSProperties>(() => ({
    transform: `translate(${props.translateX}px,${props.translateY}px)`,
    height: simulatorData.value.container?.height + 'px',
    width: simulatorData.value.container?.width + 'px',
  }))

  function down(_: MouseEvent, block: SimulatorBlock) {
    clearBlockFocus()
    const { width, height, left, top } = block.style
    preview.value = { width, height, left, top, show: true }
    block.focus = true
  }

  function move({ currentY, startX, startY, currentX }: MoveListenerOptions, block: SimulatorBlock) {
    const { width, height } = block.style
    const top = currentY - startY + block.style.top
    const left = currentX - startX + block.style.left
    const style = { ...block.style, left, top }
    preview.value = { width, height, left, top, show: true }
    setSimulatorDataById(block.id, { ...block, style })
  }

  function up(){
    // 预览框重置
    preview.value = { ...defaultPreview }
    // 记录当前更改到快照
    record()
  }

  const onMousedown = useDocumentMouseEvent({ down, move, up })
  onMounted(() => emit('updateWrapperRef', wrapperRef.value))

  return (
    <div
      class="shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto"
      style={styles.value}
      ref={wrapperRef}
    >
      {
        simulatorData.value.blocks.map(block => (
          <Editable
            onMousedown={(evt: MouseEvent) => onMousedown(evt, block)}
            block={block}
            key={block.id}
          >
            { mapMaterialComponents[block.key] && mapMaterialComponents[block.key].setup(block.props)() }
          </Editable>
        ))
      }

      {preview.value.show && (<div
          class="absolute border-2 border-primary top-0 left-0 duration-150"
          style={{ 
            width: preview.value.width + 'px',  
            height: preview.value.height + 'px',
            transform: `translate(${preview.value.left}px,${preview.value.top}px)` 
          }}
        />
      )}
    </div>
  )
}


export default Block
