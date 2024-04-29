import { MaterialCategories, MaterialComponents } from "~/constants/material"
import ArrowButton from "./../utils/arrow-button"
import Categories from "./categories"
import Components from "./components"

function Material(){
  const isHidden = shallowRef(false);
  const category = shallowRef(MaterialCategories[0].key);

  const components = computed(() => MaterialComponents[category.value] || []);

  const styles = computed(() => ({
    transition: 'width .3s',
    width: isHidden.value ? '60px' : '248px',
  }))

  return (
    <div 
      class="flex  bg-base-100 shadow-custom w-[248px] main-height relative"
      style={styles.value}
    >
      <Categories v-model:category={category.value} isHidden={isHidden.value} />
      <Components components={components.value} isHidden={isHidden.value} />
      <ArrowButton v-model={isHidden.value} direction="left" />
    </div>
  )
}

export default Material;
