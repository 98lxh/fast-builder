import { getDefaultCategoryKey } from "@h5-designer/material"
import type { FC } from "vite-plugin-vueact"

import { Sidebar } from "~/components/common"
import Components from "./components"
import Category from "./category"

interface DefineProps {
  isCollapse?: boolean
}

interface DefineEmits {
  (name: 'update:isCollapse', isCollapse: boolean): void
}

const MaterialPanel: FC<DefineProps, DefineEmits> = function (props) {
  const isCollapse = useVModel(props, 'isCollapse')
  const currentCategory = shallowRef(getDefaultCategoryKey())

  function onUpdateCategory(category: string) {
    currentCategory.value = category;
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
