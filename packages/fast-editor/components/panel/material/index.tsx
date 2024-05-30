import { useEditorContext } from "../../../composables"
import type { FC } from "vite-plugin-vueact"
import Components from "./components"
import Category from "./category"

import { getDefaultCategoryKey } from "@fast-builder/material"
import { SidePanel } from "@fast-builder/shared"

interface DefineProps {
  isCollapse?: boolean
}

interface DefineEmits {
  (name: 'update:isCollapse', isCollapse: boolean): void
}

const MaterialPanel: FC<DefineProps, DefineEmits> = function (props) {
  const { collapse } = useEditorContext()
  const currentCategory = shallowRef(getDefaultCategoryKey())

  function onUpdateCategory(category: string) {
    currentCategory.value = category;
    collapse.left === true && (collapse.left = false);
  }

  return (
    <SidePanel class="flex-wrap overflow-hidden" isDesigner={true} isCollapse={collapse.left}>
      <Category v-model:isCollapse={collapse.left} category={currentCategory.value} onChange={onUpdateCategory} />
      <Components category={currentCategory.value}  />
    </SidePanel>
  )
}

export default MaterialPanel
