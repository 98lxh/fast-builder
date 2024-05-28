import type { FC } from "vite-plugin-vueact";

interface DefineProps {
  focus: boolean;
  hover: boolean;
  isContainer: boolean;
}

const Border: FC<DefineProps> = function (props) {
  const visible = computed(() => props.focus || props.hover)
  const styles = computed(() => ({ borderWidth: `${props.isContainer ? 3 : 1}px` }))

  return (
    !visible.value ? null : (
      <div
        class="h-full w-full absolute border-primary"
        style={styles.value}
      ></div>
    )
  )
}

export default Border
