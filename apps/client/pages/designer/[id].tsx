import {
  Setting,
  Library,
  Board,
} from "~/components/designer"


function Designer() {
  return (
    <div class="flex w-full">
      <Library />
      <Board />
      <Setting />
    </div>
  )
}


export default Designer
