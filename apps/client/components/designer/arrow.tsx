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
      class={`arrow bg-base-100 ${props.direction === 'right' ? 'arrow-right' : 'arrow-left'}`}
      onClick={() => emit('update:modelValue', !props.modelValue)}
    >
      <div class="hover:text-primary">
        {(() => {
          const { direction, modelValue } = props
          const name = direction === 'right'
            ? modelValue ? 'left' : 'right'
            : modelValue ? 'right' : 'left'
         /*EXCLUDE*/ return <NuxtIcon name={name} />
        })()}
      </div>
    </div>
  )
}


export default ArrowButton
