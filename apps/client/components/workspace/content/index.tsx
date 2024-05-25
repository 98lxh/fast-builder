import { Tabs } from "@h5-designer/shared"
import { workspaceTabs } from "~/constants/workspace"

import Pages from "./pages"
import Apps from "./apps"

function Content() {
  const currentTab = shallowRef(workspaceTabs[0].value)
  return (
    <div class="w-full h-full">
      <Tabs v-model:current={currentTab.value} tabs={workspaceTabs} />
      { currentTab.value === workspaceTabs[0].value ? <Pages /> :  <Apps /> }
    </div>
  )
}

export default Content
