import { generateMaterialComponents } from "./../_util/generator";
import { MaterialCategory } from "./../_composables/types";

import text from "./src/text"
import image from "./src/image";

export default generateMaterialComponents(
  MaterialCategory.BASIS,
  [text, image]
)

