import { MaterialCategory, MaterialComponent } from "./_composables/types"

import basis from "./basis"
import media from "./media"

export const previewMaterialComponents = ({
  ...basis,
  ...media
}) as unknown as Record<MaterialCategory, MaterialComponent[]>

export { mapMaterialComponents } from "./_util/generator"
export * from "./_composables/types"
export * from "./_composables/categories"
