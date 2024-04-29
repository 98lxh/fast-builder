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
      style={`border-radius:${props.direction === 'right' ? '16px 0 0 16px' : '0 16px 16px 0'}`}
      onClick={() => emit('update:modelValue', !props.modelValue)}
      class={`
        cursor-pointer absolute h-[80px] bg-base-100  w-[25px] top-[50%] flex items-center justify-center
        ${props.direction === 'right' ? 'left-[-25px]' : 'right-[-25px]'}
      `}
    >
      {
        ( props.modelValue
          ? <NuxtIcon name={props.direction === 'right' ? 'left-arrow' : 'right-arrow'} />
          : <NuxtIcon name={props.direction === 'right' ? 'right-arrow' : 'left-arrow'} />
        )
      }

    </div>
  )
}


export default ArrowButton
