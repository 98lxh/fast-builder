import type { FC } from "vite-plugin-vueact";

interface DefineProps {
  direction: 'right' | 'left' | string;
  modelValue?: boolean
}

interface DefineEmits {
  (name: 'update:modelValue', modelValue: boolean): void
}

const ArrowButton: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  return (
    <div
      class={`cursor-pointer absolute h-[80px] bg-base-100  w-[25px] top-[50%] flex items-center ${props.direction === 'right' ? 'left-[-25px]' : 'right-[-25px]'}`}
      style={`border-radius:${props.direction === 'right' ? '16px 0 0 16px'  : '0 16px 16px 0'}`}
      onClick={() => emit('update:modelValue', !props.modelValue)}
    >
      {
        (props.direction === 'right' && !props.modelValue)
          ? <NuxtIcon name="right-arrow" />
          : <NuxtIcon name="left-arrow" />
      }
    </div>
  )
}


export default ArrowButton
