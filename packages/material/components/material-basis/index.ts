import { defineMaterialCategory, defineMaterialComponents, key, MaterialKey } from "./../../_composables/define";

import text from "./text"
import image from "./image"

const components = [
  text,
  image
]

const categoryKey = key('basis', MaterialKey.category)

defineMaterialCategory({ key: categoryKey, text: '基础', icon: 'designer/basis/basis', weight: 10000 })
defineMaterialComponents(categoryKey, components)

export default categoryKey
