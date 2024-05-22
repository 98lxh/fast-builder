import { MaterialCategory, MaterialComponent } from "./interface";
import { mapMaterialComponents, previewMaterialComponents } from "./component";

import { materialCategories } from "./categories";

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
export function defineMaterialComponents(categoryKey: string, components: any[]) {
  if (previewMaterialComponents.has(categoryKey)) { return }
  previewMaterialComponents.set(categoryKey, components)
}

export enum MaterialKey {
  component,
  category
}

// 生成key
export function key(key: string, type = MaterialKey.component) {
  const perfix = type === MaterialKey.category ? 'category' : 'component'
  return `${perfix}-${key}`
}
