import { MaterialCategory, MaterialComponent } from "_composables/types"
import basis from "./material-basis"
import media from "./material-media"

export const previewMaterialComponents = ({
  ...basis,
  ...media
}) as unknown as Record<MaterialCategory, MaterialComponent[]>


export { mapMaterialComponents } from "./_util/generator"
