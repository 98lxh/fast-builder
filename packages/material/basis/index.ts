import { generateMaterialComponents } from "./../_util/generator";
import { MaterialCategory } from "./../_composables/types";

import text from "./text"
import image from "./image"

export default generateMaterialComponents(
  MaterialCategory.BASIS,
  [
    text, 
    image
  ]
)

