import Components from "~/components/Designer/Components"
import Board from "~/components/Designer/Board"
import Setting from "~/components/Designer/Setting"

function Designer() {

  return (
    <div class="flex w-full">
      <Components />
      <Board />
      <Setting />
    </div>
  )
}


export default Designer
