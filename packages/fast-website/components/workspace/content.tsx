import { workspaceTabs } from "~/constants/workspace"
import { NTab, NTabs } from "naive-ui"

import Tabs from "./tabs"

const defaultTab = workspaceTabs[0].value
function Content() {
  const current = shallowRef(workspaceTabs[0].value)
  const Tab = computed(() => Tabs[current.value])

  return (
    <div class="w-full h-full">
      <NTabs v-model:value={current.value} defaultValue={defaultTab}  type="line" size="small">
        {workspaceTabs.map((tab) => ( <NTab name={tab.value}>{tab.label}</NTab> ))}
      </NTabs>

      <Tab.value />
    </div>
  )
}

export default Content
