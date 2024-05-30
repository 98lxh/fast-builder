import type { FC } from "vite-plugin-vueact"

interface DefineProps {
  container?: Container;
  isContainer: boolean;
  block?: Block;
  focus: boolean
}

const EditableSize: FC<DefineProps> = function (props) {
  const size = computed(() => {
    const { container, block, isContainer } = props
    const height = (isContainer ? container?.height : block?.style.height || 0)
    const width = (isContainer ? container?.width : block?.style.width || 0)
    return { height, width }
  })

  return (
    !props.focus ? null : (
      <p class="absolute bottom-[-38px] left-[50%] text-[13px] translate-[-50%] px-[10px] bg-primary text-white text-nowrap" >
        {size.value.width} x {size.value.height}
      </p>
    )
  )
}

export default EditableSize
