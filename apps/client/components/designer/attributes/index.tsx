import type { CSSProperties } from "vue"
import AttributeForm from "./attribute-form"
import ArrowButton from "../arrow"
import Layers from "./layers"

import { NCollapse } from "naive-ui"
import { ATTRIBUTE_TABS } from "~/constants/tab";
import { NTabs, NTabPane } from "naive-ui";

// import AttributeForm from "./attribute-form"

function AttributePanel() {
  const isHidden = shallowRef(false);
  const currentTab = shallowRef(ATTRIBUTE_TABS[0].key)
  const activeClass = 'bg-primary cursor-default hover:bg-primary text-white'
  const styles = computed(() => {
    const styles: CSSProperties = {}
    styles.transform = `translate(${isHidden.value ? '100%' : '0px'},0px)`
    styles.transition = 'transform .3s'
    return styles
  })


  return (
    <div
      class="flex flex-col shadow-custom w-[248px] absolute z-[2] main-height right-[0px]"
      style={styles.value}
    >
      <ClientOnly>
        <div class="flex">
          {ATTRIBUTE_TABS.map(tab => (
            <button
              class={`flex-1 btn border-0 ${currentTab.value === tab.key ? activeClass : 'bg-base-100'}`}
              onClick={() => currentTab.value = tab.key}
            >
              <NuxtIcon name={tab.icon} />
              {tab.text}
            </button>
          ))}
        </div>
        <div class="bg-base-100" style={{ height: `calc(100vh - 110px)` }}>
          {currentTab.value === ATTRIBUTE_TABS[0].key ? <AttributeForm /> : <Layers />}
        </div>
      </ClientOnly>

      <ArrowButton v-model={isHidden.value} direction="right" />
    </div>
  )
}

export default AttributePanel
