import { designerInjectionKey, useDesigner } from "~/composables/designer"
import { historyInjectionKey, useHistory } from "~/composables/designer/history"
import { Simulator, MaterialPanel, AttributePanel } from "~/components/designer"

function Designer() {
  const designer = useDesigner()
  provide(designerInjectionKey, designer)
  provide(historyInjectionKey, useHistory(designer))

  return (
    <NuxtLayout name="designer">
      <div class="flex w-full">
        <MaterialPanel />
        <Simulator />
        <AttributePanel />
      </div>
    </NuxtLayout>
  )
}

export default Designer
