import type { FC } from "vite-plugin-vueact";

import { getCategories } from "@h5-designer/material";

interface DefineProps {
  category?: Symbol;
  isHidden?: boolean;
}

interface DefineEmits {
  (name: 'update:category', category: Symbol): void
}

const Categories: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const state = shallowReactive({ height: 68, index: 0 })

  function onUpdate(category: Symbol, index: number) {
    emit('update:category', category)
    state.index = index;
  }

  function categories() {
    return getCategories().map(({ key, text, icon }, index) => (
      <p
        class="tab flex flex-col p-[0] w-[62px] h-[68px] box-border"
        onClick={() => onUpdate(key, index)}
        role="tab"
        key={index}
      >
        <NuxtIcon size={6} name={icon} />

        <span class={`${key === props.category ? 'text-primary' : ''}`}>
          {text}
        </span>
      </p>
    ))
  }

  function activated() {
    if (props.isHidden) { return null }
    const { index, height } = state
    const top = index * height

    return (
      <div
        class={`w-[2px] h-[${state.height}px] bg-primary absolute duration-300`}
        style={{ top: top + 'px' }}
      />
    )
  }

  return (
    <div
      class="tabs main-height tabs-bordered flex-col w-[60px] border-r-1 dark:border-neutral relative"
      role="tablist"
    >
      {categories()}
      {activated()}
    </div>
  )
}


export default Categories;
