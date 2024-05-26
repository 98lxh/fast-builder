import { getDefaultCategoryKey } from "@h5-designer/material"
import { Sidebar } from "~/components/common"
import Category from "./category"
import Components from "./components"
import type { FC } from "vite-plugin-vueact"

interface DefineProps {
  isCollapse?: boolean
}

interface DefineEmits {
  (name:'update:isCollapse',isCollapse:boolean):void
}

const MaterialPanel:FC<DefineProps,DefineEmits> = function(props) {
  const currentCategory = shallowRef(getDefaultCategoryKey())
  const isCollapse = useVModel(props,'isCollapse')

  function onUpdateCategory(value: string) {
    currentCategory.value = value;
    isCollapse.value === true && (isCollapse.value = false);
  }

  return (
    <Sidebar class="flex-wrap overflow-hidden" isDesigner={true} isCollapse={isCollapse.value}>
      <Category v-model:isCollapse={isCollapse.value} category={currentCategory.value} onChange={onUpdateCategory} />
      <Components category={currentCategory.value}  />
    </Sidebar>
  )
}

export default MaterialPanel
