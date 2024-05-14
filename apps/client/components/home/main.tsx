import { HOME_TABS } from "~/constants/tab"
import Template from "./tabs/template"
import Mine from "./tabs/mine"

function Main() {
  const currentTab = shallowRef(HOME_TABS[0].key)
  const isTemplate = computed(() => currentTab.value === 'template')

  const activeClass = 'bg-base-100 hover:bg-base-100 cursor-default'

  return (
    <div class="shadow-custom flex-1 mt-[14px]">
      <div class="flex">
        {HOME_TABS.map(tab => (<button
          class={`btn border-0 ${currentTab.value === tab.key ? activeClass : 'bg-transparent'}`}
          onClick={() => currentTab.value = tab.key}
        >
          <NuxtIcon name={tab.icon} />
          {tab.text}
        </button>
        ))}
      </div>

      <div class="bg-base-100" style={{ height: `calc(100vh - 125px)` }}>
        {isTemplate.value ? <Template /> : <Mine />}
      </div>
    </div>
  )
}

export default Main
