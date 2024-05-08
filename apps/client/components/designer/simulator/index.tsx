import { useDesignerContext } from "~/composables/designer"
import BlockContainer from "./block-container"
import Ruler from "./ruler"
import Tools from "./tools"

import simulatorData from "@h5-designer/mock/data.json"


function Simulator() {
  const { setSimulatorData } = useDesignerContext()
  const el = ref<HTMLDivElement | null>(null)
  const size = reactive(useElementSize(el))

  const props = computed(() => ({
    height: size.height,
    width: size.width,
    offsetX: 0,
    offsetY: 0,
    scale: 1
  }))

  onMounted(() => setSimulatorData(simulatorData as unknown as SimulatorData))
  
  return (
    <div
      class="flex-1 relative overflow-hidden relative cursor-pointer main-height"
      ref={el}
    >
      <Ruler mode="horizontal" {...props.value} />
      <Ruler mode="vertical"  {...props.value} />

      <BlockContainer />

      <Tools />
    </div>
  )
}

export default Simulator;
