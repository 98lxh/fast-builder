import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { getMaxIndex, useDesignerContext } from "~/composables/designer"
import { generatePointStyles, placements, calculateResizeStyle } from "../util/editable"
import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event"
import { useHistoryContext } from "~/composables/designer/history"
import { useResizeOverflow } from "../util/overflow"

interface DefineProps {
  block: SimulatorBlock
}

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent): void
  (name: 'contextmenu', evt: MouseEvent, blockId: string): void
}

const Editable: FC<DefineProps, DefineEmits> = function (props, { emit, slots }) {
  const history = useHistoryContext()
  const designer = useDesignerContext()
  const overflow = useResizeOverflow(designer)
  const onMousedown = useDocumentMouseEvent({ move, down, up: history.record })

  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    let { zIndex, width, height, left, top } = props.block.style
    const { currentBlockID, simulatorData } = designer

    // 当前编辑的块置顶
    if (currentBlockID.value === props.block.id) {
      zIndex = getMaxIndex(simulatorData.value.blocks) + 1
    }

    styles.zIndex = zIndex
    styles.width = width + 'px'
    styles.height = height + 'px'
    styles.transform = `translate(${left}px,${top}px)`
    styles.cursor = props.block.focus ? 'move' : 'pointer'
    return styles
  })


  function down(evt: MouseEvent) {
    evt.stopPropagation()
    evt.preventDefault()
    overflow.setCurrent(props.block)
    return props.block.style
  }

  function move(options: MoveListenerOptions<SimulatorBlockStyle>, placement: string) {
    const style = calculateResizeStyle(options, props.block, placement)
    const updatedBlock = { ...props.block, style: { ...style } }
    designer.setSimulatorDataById(props.block.id, updatedBlock)
    overflow.setCurrent(updatedBlock)
    overflow.check()
  }

  return (
    <div
      class="absolute top-0 left-0 select-none"
      onMousedown={evt => emit('mousedown', evt)}
      onContextmenu={evt => emit('contextmenu', evt, props.block.id)}
      style={styles.value}
    >
      {props.block.focus && placements.map(placement => (
        <div
          class="h-[8px] w-[8px] absolute bg-primary border-1 border-primary  bg-white rounded-[50%] z-1"
          style={generatePointStyles(placement, props.block.style)}
          onMousedown={evt => onMousedown(evt, placement)}
          key={placement}
        />
      ))}

      {props.block.focus && <div class={`h-full w-full absolute block-focus`} />}
      {slots.default && slots.default()}
    </div>
  )
}


export default Editable
