import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { getMaxIndex, useDesignerContext } from "~/composables/designer"

interface DefineProps {
  currentBlock: Block
}

const Border: FC<DefineProps> = function (props) {
  const { data } = useDesignerContext()
  const styles = computed(() => {
    const styles: CSSProperties = {}
    if (!props.currentBlock) return styles
    const { left, top, width, height } = props.currentBlock.style
    const zIndex = getMaxIndex(data.value.blocks)
    styles.transform = `translate(${left}px,${top}px)`
    styles.height = height + 'px'
    styles.width = width + 'px'
    styles.zIndex = zIndex
    return styles
  })

  return (
    (!props.currentBlock.id || !props.currentBlock.style) ? null :
      (<div class="absolute border-1 border-primary top-0 left-0 duration-150 border-dashed" style={styles.value} />)
  )
}

export default Border
