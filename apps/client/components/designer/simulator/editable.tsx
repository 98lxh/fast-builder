import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { useDesignerContext } from "~/composables/designer"
import { generatePointStyles, placements, getHasPosition, calculateResizeStyle } from "../util/editable"
import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event"

interface DefineProps {
  block: SimulatorBlock
}

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent): void
}

const Editable: FC<DefineProps, DefineEmits> = function (props, { emit, slots }) {
  const { setSimulatorDataById } = useDesignerContext()
  const styles = computed<CSSProperties>(() => ({
    zIndex: props.block.style.zIndex,
    top: props.block.style.top + 'px',
    left: props.block.style.left + 'px',
    width: props.block.style.width + 'px',
    height: props.block.style.height + 'px',
    cursor: props.block.focus ? 'move' : 'pointer'
  }))

  const onMousedown = useDocumentMouseEvent({ move, down })

  function down(evt: MouseEvent) {
    evt.stopPropagation()
    evt.preventDefault()
    return props.block.style
  }

  function move(options: MoveListenerOptions<SimulatorBlockStyle>, placement: string) {
    const style = calculateResizeStyle(options, props.block, placement)
    setSimulatorDataById(props.block.id, { ...props.block, style })
  }

  return (
    <div
      class="absolute"
      style={styles.value}
      onMousedown={evt => emit('mousedown', evt)}
    >
      {
        props.block.focus && placements.map(placement => (
          <div
            class="absolute bg-primary border-1 border-primary  bg-white rounded-[50%] z-1 h-[8px] w-[8px]"
            style={generatePointStyles(placement, props.block.style)}
            onMousedown={evt => onMousedown(evt, placement)}
            key={placement}
          />
        ))
      }

      {props.block.focus && <div class={`h-full w-full absolute block-focus`} />}
      {slots.default && slots.default()}
    </div>
  )
}


export default Editable
