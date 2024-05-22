import { MaterialCategory } from "./interface"

// 物料组件分类
export const materialCategories: Map<string, MaterialCategory> = new Map()

// 定义物料分类
export function defineMaterialCategory(category: MaterialCategory) {
  if (materialCategories.has(category.key)) { return }
  materialCategories.set(category.key, category)
}
