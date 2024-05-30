import { defineMaterialComponent, key } from "@fast-builder/material/composables/define";
import BasisImage from "./basis-image"

export default defineMaterialComponent({
  style: { width: 100, height: 40 },
  icon: 'designer/basis/image',
  component: BasisImage,
  key: key('image'),
  text: '图片组件',
  weight: 9999
})
