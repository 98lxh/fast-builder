import { FC } from "vite-plugin-vueact"

interface DefineProps {
  editable: boolean
}

const BasisText:FC<DefineProps> = function(props){
  
  return (
    <div class="text-center">文本</div>
  )
}

export default BasisText
