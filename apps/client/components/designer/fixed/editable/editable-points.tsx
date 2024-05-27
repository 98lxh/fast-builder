import type { FC } from "vite-plugin-vueact";
import { blockPlacements, containerPlacements, generatePointStyles } from "./utils/editable";
import type { CSSProperties } from "vue";

interface DefineProps {
  isContainer: boolean;
  style: CSSProperties;
  focus: boolean;
}

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent, placement: string): void
}

const Points: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const placements = computed(() => props.isContainer ? containerPlacements : blockPlacements)
  return (
    props.focus
      ? placements.value.map(placement => (
        <div
          key={placement}
          onMousedown={evt => emit('mousedown', evt, placement)}
          style={generatePointStyles(placement, props.style)}
          class="h-[8px] w-[8px] absolute bg-primary border-1 border-primary  bg-white z-1"
        />
      ))
      : null
  )
}


export default Points
