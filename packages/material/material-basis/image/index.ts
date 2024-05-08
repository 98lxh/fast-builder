import { defineComponent } from "./../../_util/generator";
import BasisImage from "./basis-image"

export default defineComponent({
  style: { width: 100,  height: 40 },
  icon: 'designer/basis/image',
  component: BasisImage,
  text: '图片组件',
  key: 'image',
})
