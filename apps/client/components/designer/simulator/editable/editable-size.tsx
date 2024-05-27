import type { FC } from "vite-plugin-vueact"

interface DefineProps {
  container?: SimulatorContainer;
  block?: SimulatorBlock;
  isContainer: boolean;
  focus: boolean
}

const EditableSize: FC<DefineProps> = function (props) {

  const size = computed(() => {
    const size = { width: 0, height: 0 }

    if (props.container && props.isContainer) {
      size.width = props.container.width
      size.height = props.container.height
    }

    if (props.block && !props.isContainer) {
      size.width = props.block.style.width
      size.height = props.block.style.height
    }

    return size
  })

  return (
    !props.focus ? null : (
      <p class="absolute bottom-[-38px] left-[50%] text-[13px] translate-[-50%] px-[10px] bg-primary text-white text-nowrap">
        {size.value.width} x {size.value.height}
      </p>
    )
  )
}

export default EditableSize
