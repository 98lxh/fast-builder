import type { FC } from "vite-plugin-vueact";
import { MaterialCategories } from "~/constants/material";

interface DefineProps {
  category?: string;
  isHidden?: boolean;
}

interface DefineEmits {
  (name: 'update:category', category: string): void
}

const Categories: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const state = shallowReactive({
    height: 68,
    index: 0
  })

  function onUpdate(category: string, index: number) {
    emit('update:category', category)
    state.index = index;
  }

  return (
    <div
      class="tabs main-height tabs-bordered flex-col w-[60px] border-r-1 dark:border-neutral relative"
      role="tablist"
    >
      {
        MaterialCategories.map((item, index) => (
          <p
            class={`tab flex flex-col p-[0] w-[62px] h-[68px] box-border`}
            onClick={() => onUpdate(item.key, index)}
            role="tab"
            key={item.key}
          >
            <div class="text-[18px]">
              <NuxtIcon name={item.icon} />
            </div>

            <span class={`${item.key === props.category ? 'text-primary' : ''}`}>
              {item.text}
            </span>
          </p>
        ))
      }

      {
        !props.isHidden &&
        (<div class={`w-[2px] h-[${state.height}px] bg-primary absolute`}
          style={{ top: (state.index * state.height) + 'px', transition: 'top .3s' }}
        />
        )
      }
    </div>
  )
}


export default Categories;
