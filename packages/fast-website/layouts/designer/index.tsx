import Header from "./header"
import Main from "./main"

import { useProvider } from "@fast-builder/editor"

function Designer() {
  useProvider()

  return (
    <div class="w-full h-full bg-base-200 dark:bg-base-300  transition-colors">
      <Header />
      <Main />
    </div>
  )
}


export default Designer
