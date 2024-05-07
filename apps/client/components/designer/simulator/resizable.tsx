import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { generatePointStyles, placements, onMousedown } from "../util/resizable"

interface DefineProps {
  block: SimulatorBlock
}

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent): void
}

const Resizable: FC<DefineProps, DefineEmits> = function (props, { emit, slots }) {
  const context = useDesignerContext()

  const styles = computed<CSSProperties>(() => ({
    zIndex: props.block.style.zIndex,
    top: props.block.style.top + 'px',
    left: props.block.style.left + 'px',
    transform: `translate(-50%, -50%)`,
    width: props.block.style.width + 'px',
    height: props.block.style.height + 'px',
  }))

  return (
    <div
      class={`absolute hover:cursor-pointer`}
      onMousedown={evt => emit('mousedown', evt)}
      style={styles.value}
    >
      {
        props.block.focus && placements.map(placement => (
          <div
            class="absolute bg-primary border-1 border-primary  bg-white rounded-[50%] z-1 h-[8px] w-[8px]"
            style={generatePointStyles(placement, props.block.style)}
            onMousedown={evt => onMousedown(evt, placement, props.block, context)}
            key={placement}
          />
        ))
      }

      {props.block.focus && <div class={`h-full w-full absolute border-1 border-primary border-dashed`} />}
      {slots.default && slots.default()}
    </div>
  )
}


export default Resizable
