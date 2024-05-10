import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { useDesignerContext } from "~/composables/designer"
import { generatePointStyles, placements, calculateResizeStyle } from "../util/editable"
import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event"

interface DefineProps {
  block: SimulatorBlock
}

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent): void
}

const Editable: FC<DefineProps, DefineEmits> = function (props, { emit, slots }) {
  const { setSimulatorDataById, record: up } = useDesignerContext()

  const onMousedown = useDocumentMouseEvent({ move, down, up })

  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    const { zIndex ,width, height, left, top } = props.block.style
    styles.zIndex = zIndex
    styles.width = width + 'px'
    styles.height = height + 'px'
    styles.cursor = props.block.focus ? 'move' : 'pointer'
    styles.transform = `translate(${left}px,${top}px)`
    return styles
  })


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
      class="absolute top-0 left-0"
      onMousedown={evt => emit('mousedown', evt)}
      style={styles.value}
    >
      {
        props.block.focus && placements.map(placement => (
          <div
            class="h-[8px] w-[8px] absolute bg-primary border-1 border-primary  bg-white rounded-[50%] z-1"
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
