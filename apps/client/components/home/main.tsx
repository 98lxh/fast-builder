import { Tabs } from "~/constants/page"
import Template from "./tabs/template"
import Mine from "./tabs/mine"

function Main() {
  const currentTab = shallowRef(Tabs[0].key)
  const isTemplate = computed(() => currentTab.value === 'template')

  return (
    <div class=" bg-base-100  shadow-custom flex-1 mt-[14px]">
      <div role="tablist" class="tabs tabs-bordered border-b-1 dark:border-neutral h-[45px]">
        {Tabs.map(tab => (
          <p class={`tab text-lg h-full box-border border-b-2 ${currentTab.value === tab.key ? 'border-primary' : 'border-transparent'} `}
            onClick={() => currentTab.value = tab.key}
            key={tab.key}
            role="tab"
          >{tab.text}</p>
        ))}
      </div>

      <div style={{ height: `calc(100vh - 125px)` }}>
        {isTemplate.value ? <Template /> : <Mine />}
      </div>
    </div>
  )
}

export default Main
