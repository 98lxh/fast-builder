import { computed, type CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { layout } from "@fast-builder/shared/constants"
import { NIcon } from "naive-ui";

interface DefineProps {
  isDesigner?: boolean;
  isCollapse?: boolean;
  right?: boolean;
}

interface DefineEmits {
  (name: 'update:isCollapse', isCollapse: boolean): void
}

const Arrow: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const icon = computed(() => {
    const { isCollapse, right } = props
    if (!right) { return isCollapse ? 'direction/right' : 'direction/left' }
    return isCollapse ? 'direction/left' : 'direction/right'
  })

  const styles = computed(() => {
    const styles: CSSProperties = {}
    const { sidebarWidth } = layout
    if (props.right) { styles.right = (sidebarWidth - 8) + 'px' }
    return styles
  })

  const classes = computed(() => {
    let base = "w-[14px] h-[40px] border-1 absolute  top-[50%] translate-[-50%] cursor-pointer duration-300 hover:color-primary"
    const bgClass = props.isDesigner ? 'bg-base-300 dark:bg-base-100' : 'bg-base-100'
    if (!props.right) {
      base += ` ${bgClass} border-l-0 right-[-21px]`
      return base
    }
    base += ` ${bgClass} border-r-0`
    return base
  })

  return (
    <div class={classes.value} style={styles.value} onClick={() => emit('update:isCollapse', !props.isCollapse)}>
      <NIcon>
      </NIcon>
    </div>
  )
}

export default Arrow
