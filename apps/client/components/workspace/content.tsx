import { Tabs } from "@h5-designer/shared"
import { workspaceTabs } from "~/constants/workspace"
import Tab from "./tabs"

function Content() {
  const currentTab = shallowRef(workspaceTabs[0].value)
  const Component = computed(() => Tab[currentTab.value])

  return (
    <div class="w-full h-full">
      <Tabs v-model:current={currentTab.value} tabs={workspaceTabs} />
      <Component.value />
    </div>
  )
}

export default Content
