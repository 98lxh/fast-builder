import MenuButton from "./button-menu"
import { Header as CommonHeader } from "~/components/common"
 
import { NTabPane, NTabs } from "naive-ui"

const tabs = [
  { label: '属性设置', key: 'attribute' },
  { label: '图层管理', key: 'layer' },
]

function Header() {
  const tab = (label: string) => (<span class="text-[12px] hover:text-black dark:hover:text-white">{label}</span>)
  const tabValue = shallowRef(tabs[1].key)

  return (
    <CommonHeader isDesigner={true}>
      <div class="flex-1 h-full">
        <MenuButton />
      </div>
      <div class="flex">
        <NTabs class="mt-[8px] mr-[5px] w-[165px]" type="segment" v-model:value={tabValue.value} size="small">
          {tabs.map(item => (<NTabPane v-slots={{ tab: () => tab(item.label) }} name={item.key} />))}
        </NTabs>
      </div>
    </CommonHeader >
  )
}

export default Header
