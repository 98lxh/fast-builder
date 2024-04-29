import Ruler from "./ruler"
import Board from "./board"
import Tools from "./tools"

function Simulator() {
  const el = ref<HTMLDivElement | null>(null)
  const size = reactive(useElementSize(el))

  const rulerProps = computed(() => ({
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
      <Ruler mode="horizontal" {...rulerProps.value} />
      <Ruler mode="vertical"  {...rulerProps.value} />
      <Board />
      <Tools />
    </div>
  )
}

export default Simulator;
