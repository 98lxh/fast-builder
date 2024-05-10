import type { FC } from "vite-plugin-vueact";

import type { CSSProperties } from "vue";
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

const defaultPreviewBorderStyles = { show: false, left: 0, top: 0, height: 0, width: 0 }

const Block: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const designer = useDesignerContext()
  const wrapperRef = useEventOutside({ event: 'mousedown', isOnlyChildContains: true }, designer.clearBlockFocus)
  const previewBorderStyles = ref({ ...defaultPreviewBorderStyles })
  const onMousedown = useDocumentMouseEvent({ down, move, up })

  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    const { height, width } = designer.simulatorData.value.container
    const { translateX, translateY } = props
    styles.transform = `translate(${translateX}px,${translateY}px)`
    styles.height = height + 'px'
    styles.width = width + 'px'
    return styles
  })

  function down(_: MouseEvent, block: SimulatorBlock) {
    designer.clearBlockFocus()
    const { width, height, left, top } = block.style
    previewBorderStyles.value = { width, height, left, top, show: true }
    block.focus = true
  }

  function move({ currentY, startX, startY, currentX }: MoveListenerOptions, block: SimulatorBlock) {
    const { width, height } = block.style
    const top = currentY - startY + block.style.top
    const left = currentX - startX + block.style.left
    const style = { ...block.style, left, top }
    previewBorderStyles.value = { width, height, left, top, show: true }
    designer.setSimulatorDataById(block.id, { ...block, style })
  }

  function up() {
    // 预览框样式重置
    previewBorderStyles.value = { ...defaultPreviewBorderStyles }
    // 记录当前更改到快照
    designer.record()
  }

  onMounted(() => emit('updateWrapperRef', wrapperRef.value))

  function previewBorder() {
    const { width, height, left, top } = previewBorderStyles.value
    const classes = "absolute border-2 border-primary top-0 left-0 duration-250 border-dashed"
    const styles: CSSProperties = {
      transform: `translate(${left}px,${top}px)`,
      height: height + 'px',
      width: width + 'px',
    }
    return <div class={classes} style={styles} />
  }

  return (
    <div
      class="shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto border-1 dark:border-neutral"
      style={styles.value}
      ref={wrapperRef}
    >
      {designer.simulatorData.value.blocks.map((block) => (
        <Editable
          onMousedown={(evt: MouseEvent) => onMousedown(evt, block)}
          block={block}
          key={block.id}
        >
          {render(block.key, block.props)}
        </Editable>
      ))}

      {previewBorderStyles.value.show && previewBorder()}
    </div>
  )
}


export default Block
