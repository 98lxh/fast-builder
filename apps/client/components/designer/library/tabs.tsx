import type { FC } from "vite-plugin-vueact";
import { DesignerCategories } from "~/constants/designer";

interface DefineProps {
  active?: string
}

interface DefineEmits {
  (name: 'update:active', active: string): void
}

const Tabs: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  return (
    <div role="tablist" class="tabs h-full tabs-bordered flex-col w-[62px] border-r-1 dark:border-neutral">
      {
        DesignerCategories.map((item) => (
          <p
            role="tab"
            key={item.key}
            class={`tab flex flex-col p-[0] w-[62px] h-[68px] box-border border-r-2 ${item.key === props.active ? 'border-primary' : 'border-transparent'}`}
            onClick={() => emit('update:active', item.key)}
          >
            <NuxtIcon name={item.icon} />
            <span class={`${item.key === props.active ? 'text-primary' : ''}`}>
              {item.text}
            </span>
          </p>
        ))
      }
    </div>
  )
}


export default Tabs;
