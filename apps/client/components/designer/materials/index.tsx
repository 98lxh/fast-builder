import { getDefaultCategoryKey } from "@h5-designer/material"
import { Sidebar } from "~/components/common"
import Category from "./category"

function MaterialPanel() {
  const state = shallowReactive({ category: getDefaultCategoryKey(), isCollapse: false })

  function onUpdateCategory(value: string) {
    state.category = value;
    state.isCollapse === true && (state.isCollapse = false);
  }

  return (
    <Sidebar isDesigner={true} isCollapse={state.isCollapse}>
      <Category v-model:isCollapse={state.isCollapse} category={state.category} onChange={onUpdateCategory} />
    </Sidebar>
  )
}

export default MaterialPanel
