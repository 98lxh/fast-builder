import {
  Simulator,
  Material,
  Setting,
  designerInjectionKey
} from "~/components/designer"


function Designer() {
  const simulatorRef = ref<HTMLDivElement | null>(null)

  provide(designerInjectionKey, {
    setSimulatorRef: (simulator: HTMLDivElement) => { simulatorRef.value = simulator },
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
