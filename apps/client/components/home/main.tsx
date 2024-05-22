import { HOME_TABS } from "~/constants/tab"
import Template from "./tabs/template"
import Mine from "./tabs/mine"

function Main() {
  const currentTab = shallowRef(HOME_TABS[0].key)
  const isTemplate = computed(() => currentTab.value === 'template')

  const activeClass = 'bg-base-100 hover:bg-base-100 cursor-default border-1 border-b-0 dark:border-neutral'

  return (
    <div class="shadow-custom flex-1 mt-[14px]">
      <div class="flex mb-[-1px]">
        {HOME_TABS.map(tab => (
          <button
            class={`btn ${currentTab.value === tab.key ? activeClass : 'bg-transparent border-0 border-b-1 dark:border-neutral'}`}
            onClick={() => currentTab.value = tab.key}
          >
            <NuxtIcon name={tab.icon} />
            {tab.text}
          </button>
        ))}
      </div>

      <div class="bg-base-100 border-l-1 border-t-1 dark:border-neutral" style={{ height: `calc(100vh - 125px)` }}>
        {isTemplate.value ? <Template /> : <Mine />}
      </div>
    </div>
  )
}

export default Main
