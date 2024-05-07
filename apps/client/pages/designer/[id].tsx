import {
  Simulator,
  MaterialPanel,
  AttributePanel
} from "~/components/designer"

function Designer() {
  provide(designerInjectionKey, useDesigner())

  return (
    <div class="flex w-full">
      <MaterialPanel />
      <Simulator />
      <AttributePanel />
    </div>
  )
}

export default Designer
