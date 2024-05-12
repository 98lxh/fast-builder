import BlockContainer from "./block-container"
import Ruler from "./ruler"
import Tools from "./tools"


function Simulator() {
  const el = ref<HTMLDivElement | null>(null)
  const size = reactive(useElementSize(el))

  const attrs = computed(() => ({
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
      <Ruler mode="horizontal" {...attrs.value} />
      <Ruler mode="vertical"  {...attrs.value} />
      <BlockContainer />
      <Tools />
    </div>
  )
}

export default Simulator
