import { defineMaterialComponent, key } from "@fast-builder/material/composables/define";
import BasisText from "./basis-text"

export default defineMaterialComponent({
  style: { width: 100, height: 50 },
  icon: 'designer/basis/text',
  component: BasisText,
  key: key('text'),
  text: '文本组件',
  weight: 10000
})
