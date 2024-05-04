import { MaterialCategories, MaterialCategory, previewMaterialComponents } from "@h5-designer/material"
import type { CSSProperties } from "vue"
import Categories from "./categories"
import Components from "./components"
import ArrowButton from "../arrow"

function Material() {
  const isHidden = shallowRef(false);
  const category = shallowRef(MaterialCategories[0].key);

  const components = computed(() => previewMaterialComponents[category.value] || []);

  const styles = computed<CSSProperties>(() => ({
    transition: 'width .3s',
    width: isHidden.value ? '60px' : '248px',
  }))


  function onUpdateCategory(value: MaterialCategory) {
    category.value = value;
    isHidden.value === true && (isHidden.value = false);
  }

  return (
    <div
      class="flex  bg-base-100 shadow-custom w-[248px] main-height relative"
      style={styles.value}
    >
      <Categories
        category={category.value}
        isHidden={isHidden.value}
        onUpdate:category={onUpdateCategory}
      />

      <Components
        components={components.value}
        isHidden={isHidden.value}
      />

      <ArrowButton
        v-model={isHidden.value}
        direction="left"
      />
    </div>
  )
}

export default Material;
