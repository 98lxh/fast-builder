import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { useDesignerContext } from "~/composables/designer"
import { generatePointStyles, placements, getHasPosition } from "../util/resizable"

interface DefineProps {
  block: SimulatorBlock
}

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent): void
}

const Resizable: FC<DefineProps, DefineEmits> = function (props, { emit, slots }) {
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

  let blockStyle: Pick<SimulatorBlockStyle, 'height' | 'width' | 'top' | 'left'> | null = null
  function down(evt: MouseEvent) {
    evt.stopPropagation()
    evt.preventDefault()

    const { height, width, top, left } = props.block.style
    blockStyle = { height, width, top, left }
  }

  function move({ currentY, currentX, startY, startX }: MoveListenerOptions, placement: string) {
    let { height, width, top, left } = blockStyle!
    const { hasTop, hasBottom, hasLeft, hasRight } = getHasPosition(placement)
    const disY = currentY - startY
    const disX = currentX - startX
    height = height + (hasTop ? -disY : hasBottom ? disY : 0)
    width = width + (hasLeft ? -disX : hasRight ? disX : 0)
    height = height > 0 ? height : 0
    width = width > 0 ? width : 0
    left = left + (hasLeft ? disX : 0)
    top = top + (hasTop ? disY : 0)
    const style = { ...props.block.style, height, width, left, top }
    setSimulatorDataById(props.block.id, { ...props.block, style })
  }


  return (
    <div
      class="absolute"
      onMousedown={evt => emit('mousedown', evt)}
      style={styles.value}
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


export default Resizable
