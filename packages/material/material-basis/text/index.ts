import { defineComponent } from "./../../_util/generator";
import BasisText from "./basis-text"

export default defineComponent({
  style: { width: 100, height: 50 },
  icon: 'designer/basis/text',
  component: BasisText,
  text: '文本组件',
  key: 'text',
})
