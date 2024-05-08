import { defineMaterialCategory, defineMaterialComponents } from "./../_composables/define";

import text from "./text"
import image from "./image"

const components = [
  text,
  image
]

const key = Symbol.for('basis')

defineMaterialCategory({ key, text: '基础', icon: 'designer/basis/basis' })
defineMaterialComponents(key, components)

