import { FC } from "vite-plugin-vueact"
import { defineMaterialComponent } from "./../../_util/generator"

interface DefineProps {

}

const _Text: FC<DefineProps> = function () {
  return (
    <div>文本组件</div>
  )
}

export default defineMaterialComponent({
  icon: 'designer/text',
  component: _Text,
  text: '文本组件',
  key: 'text'
})