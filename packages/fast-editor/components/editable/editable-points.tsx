import type { FC } from "vite-plugin-vueact";
import { placements, generatePointStyles } from "../../composables";

interface DefineProps {
  isContainer: boolean;
  style: BlockStyle;
  focus: boolean;
}

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent, placement: string): void
}

const Points: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  return (
    !props.focus ? null : (placements.map(placement => (
      <div
        key={placement}
        onMousedown={evt => emit('mousedown', evt, placement)}
        style={generatePointStyles(placement, props.style)}
        class="h-[8px] w-[8px] absolute bg-primary border-1 border-primary  bg-white z-1"
      ></div>
    ))
    )
  )
}


export default Points
