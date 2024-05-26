import {
  Simulator,
  MaterialPanel,
  AttributePanel
} from "~/components/designer"

import "@h5-designer/material"

function Designer() {
  return (
    <div class="flex h-full w-full">
      <MaterialPanel />
      <AttributePanel />
    </div>
  )
}

export default Designer
