import { defineMaterialComponent } from "./../../_util/generator";
import BasisText from "./basis-text"

export default defineMaterialComponent({
  component: BasisText,
  icon: 'designer/text',
  text: '文本组件',
  key: 'text',
  style: {
    width: 100,
    height: 50
  }
})
