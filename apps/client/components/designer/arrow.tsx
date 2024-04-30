import type { FC } from "vite-plugin-vueact";
import type { CSSProperties } from "vue";

interface DefineProps {
  direction: 'right' | 'left' | string;
  modelValue?: boolean
}

interface DefineEmits {
  (name: 'update:modelValue', modelValue: boolean): void
}

const ArrowButton: FC<DefineProps, DefineEmits> = function (props, { emit }) {

  const styles = computed<CSSProperties>(() => ({
    transform: 'translateY(-50%)',
    borderRadius: props.direction === 'right' ? '8px 0 0 8px' : '0 8px 8px 0'
  }))


  return (
    <div
      style={styles.value}
      onClick={() => emit('update:modelValue', !props.modelValue)}
      class={`
        cursor-pointer absolute h-[70px] bg-base-100  w-[20px] top-[50%] flex items-center justify-center
        ${props.direction === 'right' ? 'left-[-20px]' : 'right-[0px]'}
      `}
    >

      <div class="hover:text-primary">
        {
          (props.modelValue
            ? <NuxtIcon name={props.direction === 'right' ? 'left-arrow' : 'right-arrow'} />
            : <NuxtIcon name={props.direction === 'right' ? 'right-arrow' : 'left-arrow'} />
          )
        }
      </div>
    </div>
  )
}


export default ArrowButton
