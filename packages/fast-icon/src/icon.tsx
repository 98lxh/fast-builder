import { computed, CSSProperties } from "vue"
import { FC } from "vite-plugin-vueact"
import icons from "./icons"

interface DefineProps {
  size?: number;
  name: string;
}

const FastIcon: FC<DefineProps> = function (props) {
  const Icon = computed(() => icons[props.name])

  const styles = computed(() => {
    const styles: CSSProperties = {}
    styles.width = `${props.size || 14}px`
    styles.height = `${props.size || 14}px`
    styles.fontSize = `${props.size || 14}px`
    styles.display = 'inline-block'
    return styles
  })


  return (
    <i style={styles.value}>
      <Icon.value />
    </i>
  )
}

export default FastIcon
