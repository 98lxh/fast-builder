import type { FC } from "vite-plugin-vueact";

import type { CSSProperties } from "vue"
import { useDesignerContext } from "~/composables/designer"
import Editable from "./editable"

import { render } from "@h5-designer/material"

import {
  type MoveListenerOptions,
  useDocumentMouseEvent,
  useEventOutside,
} from "~/composables/event"

interface DefineProps {
  translateX: number;
  translateY: number;
}

interface DefineEmits {
  (name: 'updateWrapperRef', wrapperRef: HTMLElement | null): void
}

const defaultState = { show: false, left: 0, top: 0, height: 0, width: 0 }

const Block: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const context = useDesignerContext()
  const state = ref({ ...defaultState })
  const wrapperRef = useEventOutside({ event: 'mousedown', isOnlyChildContains: true }, context.clearBlockFocus)
  const onMousedown = useDocumentMouseEvent({ down, move, up })


  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    const { height, width } = context.simulatorData.value.container
    const { translateX, translateY } = props
    styles.transform = `translate(${translateX}px,${translateY}px)`
    styles.height = height + 'px'
    styles.width = width + 'px'
    return styles
  })

  function down(_: MouseEvent, block: SimulatorBlock) {
    context.clearBlockFocus()
    const { width, height, left, top } = block.style
    state.value = { width, height, left, top, show: true }
    block.focus = true
  }

  function move({ currentY, startX, startY, currentX }: MoveListenerOptions, block: SimulatorBlock) {
    const { width, height } = block.style
    const top = currentY - startY + block.style.top
    const left = currentX - startX + block.style.left
    const style = { ...block.style, left, top }
    state.value = { width, height, left, top, show: true }
    context.setSimulatorDataById(block.id, { ...block, style })
  }

  function up() {
    // 预览框样式重置
    state.value = { ...defaultState }
    // 记录当前更改到快照
    context.record()
  }

  onMounted(() => emit('updateWrapperRef', wrapperRef.value))

  return (
    <div
      class="shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto border-1 dark:border-neutral"
      style={styles.value}
      ref={wrapperRef}
    >
      {context.simulatorData.value.blocks.map((block) => (
        <Editable
          onMousedown={(evt: MouseEvent) => onMousedown(evt, block)}
          block={block}
          key={block.id}
        >
          {render(block.key, block.props)}
        </Editable>
      ))}

      {(() => {
        const { width, height, left, top, show } = state.value
        if (!show) /*EXCLUDE*/ return null
        const classes = "absolute border-2 border-primary top-0 left-0 duration-250 border-dashed"
        const styles: CSSProperties = {
          transform: `translate(${left}px,${top}px)`,
          height: height + 'px',
          width: width + 'px',
        };

        /*EXCLUDE*/ return <div class={classes} style={styles} />
      })()}
    </div>
  )
}


export default Block
