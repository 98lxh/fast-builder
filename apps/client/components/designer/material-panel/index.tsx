import type { CSSProperties } from "vue"
import Categories from "./categories"
import Components from "./components"
import ArrowButton from "../arrow"

import { getDefaultCategoryKey } from "@h5-designer/material"

function MaterialPanel() {
  const category = shallowRef(getDefaultCategoryKey())
  const isHidden = shallowRef(false)

  const styles = computed<CSSProperties>(() => ({
    width: isHidden.value ? '60px' : '248px',
    transition: 'width .3s'
  }))

  function onUpdateCategory(value: string) {
    category.value = value
    isHidden.value === true && (isHidden.value = false)
  }

  return (
    <div
      class="flex  bg-base-100 shadow-custom w-[248px] main-height relative"
      style={styles.value}
    >
      <ClientOnly>
        <Categories
          category={category.value}
          isHidden={isHidden.value}
          onChange={onUpdateCategory}
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

export default MaterialPanel;
