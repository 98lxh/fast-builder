import type { CSSProperties } from "vue"
import Tabs from "~/components/tabs"
import Components from "./components"
import ArrowButton from "../arrow"

import {
  getCategories,
  getDefaultCategoryKey,
  type MaterialCategory
} from "@h5-designer/material"

function MaterialPanel() {
  const state  = shallowReactive({
    category: getDefaultCategoryKey(),
    isHidden: false
  })

  const styles = computed<CSSProperties>(() => ({
    width: state.isHidden ? '60px' : '248px',
    transition: 'width .3s'
  }))

  function onUpdateCategory(value: MaterialCategory) {
    state.category = value;
    state.isHidden === true && (state.isHidden = false);
  }

  return (
    <div
      class="flex  bg-base-100 shadow-custom w-[248px] main-height relative"
      style={styles.value}
    >
      <ClientOnly>
        <Tabs 
          data={getCategories()}
          v-model={state.category}
        />

        <Components
          category={state.category}
          isHidden={state.isHidden}
        />

        <ArrowButton
          v-model={state.isHidden}
          direction="left"
        />
      </ClientOnly>
    </div>
  )
}

export default MaterialPanel;
