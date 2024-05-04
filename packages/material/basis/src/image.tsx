import { FC } from "vite-plugin-vueact"
import { defineMaterialComponent } from "./../../_util/generator"

interface DefineProps {

}

const _Image: FC<DefineProps> = function () {
  return (
    <div>图片组件</div>
  )
}

export default defineMaterialComponent({
  icon: 'designer/image',
  component: _Image,
  text: '图片组件',
  key: 'image'
})
