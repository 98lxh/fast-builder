import type { CSSProperties } from "vue";
import type { FC } from "vite-plugin-vueact";
import { getCategories } from "@h5-designer/material";

interface DefineProps {
  category?: string;
  isHidden?: boolean;
}

interface DefineEmits {
  (name: 'change', category: string): void
}

const Categories: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const state = shallowReactive({ height: 68, index: 0 })
  const styles = computed<CSSProperties>(() => ({ top: state.index * state.height + 'px' }))
  function onUpdate(category: string, index: number) {
    emit('change', category)
    state.index = index;
  }

  return (
    <div class="tabs main-height tabs-bordered flex-col w-[60px] border-r-1 dark:border-neutral relative">
      {<div class={`w-[2px] h-[${state.height}px] bg-primary absolute duration-300`} style={styles.value} />}
      {getCategories().map(({ key, text, icon }, index) => (
        <p
          class="tab flex flex-col p-[0] w-[62px] h-[68px] box-border"
          onClick={() => onUpdate(key, index)}
          role="tab"
          key={index}
        >
          <NuxtIcon class="w-[24px] h-[24px]" name={icon} />
          <span class={`${key === props.category ? 'text-primary' : ''}`}>
            {text}
          </span>
        </p>
      ))}
    </div>
  )
}


export default Categories;
