import { Tabs } from "@h5-designer/shared"
import { workspaceTabs } from "~/constants/workspace"

import TabPage from "./tab-page"
import TabApp from "./tab-app"

function ContentArea() {
  const currentTab = shallowRef(workspaceTabs[0].value)
  return (
    <div class="w-full h-full">
      <Tabs v-model:current={currentTab.value} tabs={workspaceTabs} />
      { currentTab.value === workspaceTabs[0].value ? <TabPage /> :  <TabApp /> }
    </div>
  )
}

export default ContentArea
