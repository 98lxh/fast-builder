import { getCategories } from "@h5-designer/material";
import type { FC } from "vite-plugin-vueact";
import type { CSSProperties } from "vue";

interface TabData {
  key: string;
  text: string;
  icon?: string;
}

interface DefineProps {
  data: TabData[];
  height?: number
  width?: number
  modelValue?: string
}

interface DefineEmits {
  (name: 'update:modelValue', modelValue: string): void
}

const Tabs: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const currentIndex = shallowRef(0)
  const mode = computed(() => props.height ? 'vertical' : 'horizontal')

  const borderStyle = computed<CSSProperties>(() => ({
    width: mode.value === 'horizontal' ? props.width + 'px' : '2px',
    height: mode.value === 'horizontal' ? '2px' : props.width,
    ...mode.value === 'horizontal'
      ? ({ bottom: 0, left: (currentIndex.value * props.width!) + 'px' })
      : ({ right: 0, top: (currentIndex.value * props.height!) + 'px' })
  }))

  function onUpdateValue(index: number){
    const { key } = props.data[index]
    currentIndex.value = index
    emit('update:modelValue', key)
  }

  return (
    <div
      class="tabs main-height tabs-bordered flex-col w-[60px] border-r-1 dark:border-neutral relative"
      role="tablist"
    >
      {props.data.map(({ key, icon, text }, index) => (
        <p
          class="tab flex flex-col p-[0]  box-border"
          role="tab"
          key={index}
          onClick={() => onUpdateValue(index)}
        >
          {icon && <NuxtIcon size={6} name={icon} />}
          <span class={`${key === props.category ? 'text-primary' : ''}`}>
            {text}
          </span>
        </p>
      ))}


      <div class="bg-primary absolute duration-300" style={borderStyle.value} />
    </div>
  )
}


export default Tabs
