import type { CSSProperties } from "vue";
import type { FC } from "vite-plugin-vueact";
import { useDesignerContext } from "~/composables/designer";
import Editable from "./editable";

import { render } from "@h5-designer/material";

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
  const previewStyle = ref({ ...defaultPreview })

  const onMousedown = useDocumentMouseEvent({ down, move, up })

  const styles = computed<CSSProperties>(() => ({
    transform: `translate(${props.translateX}px,${props.translateY}px)`,
    height: simulatorData.value.container?.height + 'px',
    width: simulatorData.value.container?.width + 'px',
  }))

  function down(_: MouseEvent, block: SimulatorBlock) {
    clearBlockFocus()
    const { width, height, left, top } = block.style
    previewStyle.value = { width, height, left, top, show: true }
    block.focus = true
  }

  function move({ currentY, startX, startY, currentX }: MoveListenerOptions, block: SimulatorBlock) {
    const { width, height } = block.style
    const top = currentY - startY + block.style.top
    const left = currentX - startX + block.style.left
    const style = { ...block.style, left, top }
    previewStyle.value = { width, height, left, top, show: true }
    setSimulatorDataById(block.id, { ...block, style })
  }

  function preview() {
    const { width, height, left, top, show } = previewStyle.value
    if (!show) { return null }

    const style = {
      width: width + 'px',
      height: height + 'px',
      transform: `translate(${left}px,${top}px)`
    }

    return (
      <div
        class="absolute border-2 border-primary top-0 left-0 duration-250 border-dashed"
        style={style}
      />
    )
  }


  function editable(block: SimulatorBlock) {
    return (
      <Editable
        onMousedown={(evt: MouseEvent) => onMousedown(evt, block)}
        block={block}
        key={block.id}
      >
        {render(block.key, block.props)}
      </Editable>
    )
  }

  function up() {
    // 预览框样式重置
    previewStyle.value = { ...defaultPreview }
    // 记录当前更改到快照
    record()
  }

  onMounted(() => emit('updateWrapperRef', wrapperRef.value))

  return (
    <div
      class="shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto"
      style={styles.value}
      ref={wrapperRef}
    >
      {simulatorData.value.blocks.map(editable)}
      {preview()}
    </div>
  )
}


export default Block
