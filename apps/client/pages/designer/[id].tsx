import {
  Simulator,
  Material,
  Setting
} from "~/components/designer"


function Designer() {
  return (
    <div class="flex w-full">
      <Material />
      <Simulator />
      <Setting />
    </div>
  )
}


export default Designer
