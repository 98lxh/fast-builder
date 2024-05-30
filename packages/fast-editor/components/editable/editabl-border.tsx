import type { FC } from "vite-plugin-vueact";

interface DefineProps {
  focus: boolean;
  hover: boolean;
  isContainer: boolean;
}

const Border: FC<DefineProps> = function (props) {
  const visible = computed(() => props.focus || props.hover)
  return !visible.value ? null : <div class="h-full w-full absolute border-primary border-[1px]" />
}

export default Border
