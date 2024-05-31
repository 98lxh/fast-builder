import { defineMaterialCategory, defineMaterialComponents, key, MaterialKey } from "@fast-builder/material/composables/define";

const components = []
const categoryKey = key('media', MaterialKey.category)

defineMaterialCategory({ key: categoryKey, text: '媒体', icon: 'IconMedia', weight: 9999 })
defineMaterialComponents(categoryKey, components)

export default categoryKey
