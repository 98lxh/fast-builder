import { SidePanel, FixedArrow } from "@fast-builder/shared"
import { useEditorContext } from "../../../composables";
import { attributeTabs } from "../../../constants/tabs";
import Tabs from "./tabs"
import { NTab, NTabs } from "naive-ui";

const defaultTab = attributeTabs[1].value


function AttributePanel() {
  const { collapse } = useEditorContext()
  const current = shallowRef(defaultTab)
  const Tab = computed(() => (Tabs[current.value]))

  return (
    <SidePanel id="attribute" isDesigner={true} isFixed={true} right={true} isCollapse={collapse.right}>
      {/* 切换属性设置/图层管理 */}
      <NTabs class="px-[5px] pt-[5px]" v-model:value={current.value} defaultValue={defaultTab}  type="line" size="small">
        {attributeTabs.map((tab) => ( <NTab name={tab.value}>{tab.label}</NTab> ))}
      </NTabs>

      {/* 显示面板内容 */}
      <Tab.value />

      {/* 折叠面板的箭头 */}
      <FixedArrow isDesigner={true} right={true} v-model:isCollapse={collapse.right} />
    </SidePanel>
  )
}

export default AttributePanel
