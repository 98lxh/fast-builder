import { MaterialCategory } from "_interface"

// 物料组件分类
export const materialCategories: Map<Symbol, MaterialCategory> = new Map()

export function defineMaterialCategory(category: MaterialCategory) {
  if (materialCategories.has(category.key)) {
    return
  }
  materialCategories.set(category.key, category)
}
