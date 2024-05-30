import { isFunction } from "@fast-builder/shared"
import { mapMaterialComponents, previewMaterialComponents } from "./component"
import { materialCategories } from "./categories"

// 获取物料分类
export function getCategories() {
  const values = materialCategories.values()
  const categories = values ? [...values] : []
  categories.sort((a, b) => b.weight - a.weight)
  return categories
}

// 获取默认物料分类(基础分类)
export function getDefaultCategoryKey() {
  const categories = getCategories();
  return categories.length !== 0 ? categories[0].key : ''
}

// 获取物料组件(预览)
export function getComponents(category: string) {
  const components = previewMaterialComponents.get(category) || []
  components.sort((a, b) => b.weight - a.weight)
  return components
}

// 渲染物料组件
export function render(key: string, props: any) {
  if (!mapMaterialComponents.has(key)) return null
  const component = mapMaterialComponents.get(key)
  return isFunction(component) ? component(props) : component.setup(props)
}

export * from "./interface"
