import Categories from "./categories"
import Components from "./components"
import ArrowButton from "../arrow"

import { getDefaultCategoryKey } from "@h5-designer/material"

function MaterialPanel() {
  const state = shallowReactive({
    category: getDefaultCategoryKey(),
    isHidden: false
  })

  function onUpdateCategory(category: string) {
    state.category = category
    state.isHidden === true && (state.isHidden = false)
  }

  return (
    <div class={`flex relative bg-base-100 shadow-custom main-height transition-width duration-300 w-[${state.isHidden ? '60px' : '248px'}]`}>
      <ClientOnly>
        <Categories onChange={onUpdateCategory} {...state} />
        <ArrowButton v-model={state.isHidden} direction="left" />
        <Components {...state} />
      </ClientOnly>
    </div>
  )
}

export default MaterialPanel
