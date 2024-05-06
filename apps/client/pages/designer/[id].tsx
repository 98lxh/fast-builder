import {
  Simulator,
  MaterialPanel,
  AttributePanel
} from "~/components/designer"

function Designer() {
  const simulatorRef = ref<HTMLDivElement | null>(null)
  const simulatorData = ref<SimulatorData>(defaultSimulatorData);

  provide(designerInjectionKey, {
    setSimulatorContainer: (container: SimulatorContainer) => { simulatorData.value.container = container },
    setSimulatorBlocks: (blocks: Array<SimulatorBlock>) => { simulatorData.value.blocks = blocks },
    setSimulatorRef: (simulator: HTMLDivElement) => { simulatorRef.value = simulator },
    setSimulatorData: (data: SimulatorData) => { simulatorData.value = data },
    simulatorData,
    simulatorRef
  })

  return (
    <div class="flex w-full">
      <MaterialPanel />
      <Simulator />
      <AttributePanel />
    </div>
  )
}

export default Designer
