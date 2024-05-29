import { getDefaultCategoryKey } from "@h5-designer/material"
import { useDesignerContext } from "~/composables/designer"
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
  const { collapse } = useDesignerContext()
  const currentCategory = shallowRef(getDefaultCategoryKey())

  function onUpdateCategory(category: string) {
    currentCategory.value = category;
    collapse.left === true && (collapse.left = false);
  }

  return (
    <Sidebar class="flex-wrap overflow-hidden" isDesigner={true} isCollapse={collapse.left}>
      <Category v-model:isCollapse={collapse.left} category={currentCategory.value} onChange={onUpdateCategory} />
      <Components category={currentCategory.value}  />
    </Sidebar>
  )
}

export default MaterialPanel
