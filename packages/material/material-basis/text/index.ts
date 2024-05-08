import { defineMaterialComponent } from "./../../_composables/define";
import BasisText from "./basis-text"

export default defineMaterialComponent({
  style: { width: 100, height: 50 },
  icon: 'designer/basis/text',
  component: BasisText,
  key: Symbol('text'),
  text: '文本组件'
})
