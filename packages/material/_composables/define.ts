import { MaterialComponent } from "../_interface";
import { mapMaterialComponents, previewMaterialComponents } from "./component";

import { MaterialCategory, materialCategories } from "./categories";

// 定义物料组件
export function defineMaterialComponent(materialComponent: MaterialComponent) {
  const { key, component, icon, text, style } = materialComponent
  if (!mapMaterialComponents.has(key)) mapMaterialComponents.set(key, component)
  return { icon, text, key, style };
}

// 定义物料分类
export function defineMaterialCategory(category: MaterialCategory) {
  if (materialCategories.has(category.key)) {
    return
  }
  materialCategories.set(category.key, category)
}

// 定义物料组件集合
export function defineMaterialComponents(
  category: Symbol,
  components: Omit<MaterialComponent, 'component'>[]
) {

  if (previewMaterialComponents.has(category)) {
    return
  }

  previewMaterialComponents.set(category, components)
}
