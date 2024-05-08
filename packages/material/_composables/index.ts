import { mapMaterialComponents, previewMaterialComponents } from "./component"
import { materialCategories } from "./categories"

// 获取物料分类
export function getCategories() {
  const values = materialCategories.values()
  return values ? [...values] : []
}

// 获取物料组件(预览)
export function getComponents(category: Symbol) {
  const components = previewMaterialComponents.get(category)
  return components || []
}

// 渲染物料组件
export function render(key: Symbol, props: any) {
  if (!mapMaterialComponents.has(key)) return null
  return mapMaterialComponents.get(key).setup(props)()
}
