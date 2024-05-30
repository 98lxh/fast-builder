import { Tabs } from "@fast-builder/shared"
import { workspaceTabs } from "~/constants/workspace"
import Tab from "./tabs"

function Content() {
  const currentTab = shallowRef(workspaceTabs[0].value)
  const WorkspaceTab = computed(() => Tab[currentTab.value])

  return (
    <div class="w-full h-full">
      <Tabs v-model:current={currentTab.value} tabs={workspaceTabs} />
      <WorkspaceTab.value />
    </div>
  )
}

export default Content
