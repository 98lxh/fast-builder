import Ruler from "./ruler"
import BlockContainer from "./block-container"

function Simulator() {
  const el = ref<HTMLDivElement | null>(null)
  const size = reactive(useElementSize(el))

  const props = computed(() => ({
    height: size.height,
    width: size.width,
    offsetX: 0,
    offsetY: 0,
    scale: 1
  }))

  return (
    <div
      class="flex-1 relative overflow-hidden relative cursor-pointer main-height"
      ref={el}
    >
      <Ruler mode="horizontal" {...props.value} />
      <Ruler mode="vertical"  {...props.value} />
      <BlockContainer />
    </div>
  )
}

export default Simulator;
