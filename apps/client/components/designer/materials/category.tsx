import type { FC } from "vite-plugin-vueact";
import type { CSSProperties } from "vue";

import { NTooltip } from "naive-ui"

import { getCategories } from "@h5-designer/material";
import { layout } from "~/constants/layouts"

interface DefineProps {
  isCollapse?: boolean;
  category: string
}

interface DefineEmits {
  (name: 'update:isCollapse', isCollapse: boolean): void
  (name: 'change', category: string): void
}

const Category: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const styles = computed(() => {
    const styles: CSSProperties = {}
    const { designerCollapseSidebarWidth } = layout
    styles.width = `${designerCollapseSidebarWidth}px`
    return styles
  })

  function trigger(key: string, icon: string) {
    const active = props.category === key ? 'active' : ''
    const classes = `w-full h-full custom-menu-item collapse relative flex-col ${active}`
    return (
      <div class={classes} onClick={() => emit('change', key)}>
        <NuxtIcon class="w-[20px] h-[20px] inline-block" name={icon}></NuxtIcon>
      </div>
    )
  }

  return (
    <div class="h-full border-r-1 relative custom-menu custom-category" style={styles.value}>
      <div class="absolute bottom-0 left-[50%] translate-[-50%] cursor-pointer hover:text-primary" onClick={() => emit('update:isCollapse', !props.isCollapse)}>
        <NuxtIcon class="inline-block w-[12px] h-[12px]" name={props.isCollapse ? 'direction/right-double' : 'direction/left-double'} />
      </div>
      {getCategories().map(({ key, icon, text }) => (
        <NTooltip placement="right" v-slots={{ trigger: () => trigger(key, icon) }}>
          <span class="text-[14px]">{text}</span>
        </NTooltip>
      ))}
    </div>
  )
}


export default Category
