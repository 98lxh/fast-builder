import Categories from "./categories"
import Components from "./components"
import ArrowButton from "../arrow"

import { getDefaultCategoryKey } from "@h5-designer/material"

function MaterialPanel() {
  const category = shallowRef(getDefaultCategoryKey())
  const isHidden = shallowRef(false)

  function onCategoryChange(value: string) {
    category.value = value
    isHidden.value === true && (isHidden.value = false)
  }

  return (
    <div class={`flex relative bg-base-100 shadow-custom main-height transition-width duration-300 w-[${isHidden.value ? '60px' : '248px'}]`}>
      <ClientOnly>
        <Categories
          category={category.value}
          isHidden={isHidden.value}
          onChange={onCategoryChange}
        />

        <Components
          category={category.value}
          isHidden={isHidden.value}
        />

        <ArrowButton
          v-model={isHidden.value}
          direction="left"
        />
      </ClientOnly>
    </div>
  )
}

export default MaterialPanel
