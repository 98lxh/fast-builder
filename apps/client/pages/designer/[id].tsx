import {
  designerInjectionKey,
  Simulator,
  Material,
  Setting
} from "~/components/designer"

function Designer() {
  const simulatorRef = ref<HTMLDivElement | null>(null)
  const simulatorData = ref<SimulatorData>(defaultSimulatorData);

  provide(designerInjectionKey, {
    setSimulatorRef: (simulator: HTMLDivElement) => { simulatorRef.value = simulator },
    setSimulatorData: (data: SimulatorData) => { simulatorData.value = data },
    simulatorData,
    simulatorRef
  })

  return (
    <div class="flex w-full">
      <Material />
      <Simulator />
      <Setting />
    </div>
  )
}

export default Designer
