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
    borderRadius: isHidden.value ? '16px 0px 0px 16px' :'16px'
  }))

  return (
    <div 
      class="flex  bg-base-100 shadow-custom m-[14px] w-[248px] main-height relative"
      style={styles.value}
    >

      <Categories v-model:category={category.value} />

      
      <div class={`flex m-2 gap-2 overflow-hidden w-[${isHidden.value ? 'auto' : '0px'}]`}>
        <Components components={components.value} />
      </div>


      <ArrowButton v-model={isHidden.value} direction="left" />
    </div>
  )
}

export default Material;
