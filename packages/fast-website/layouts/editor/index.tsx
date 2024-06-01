import { EditorProvider } from "@fast-builder/editor"
import Header from "./header"
import Main from "./main"

function Editor() {

  return (
    <EditorProvider>
      <div class="w-full h-full bg-base-200 dark:bg-base-300  transition-colors">
        <Header />
        <Main />
      </div>
    </EditorProvider>
  )
}


export default Editor
