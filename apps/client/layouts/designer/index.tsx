import { designerInjectionKey, useDesigner } from "~/composables/designer"
import { historyInjectionKey, useHistory } from "~/composables/designer/history"
import Header from "./header"
import Main from "./main"

function Designer() {
  const designer = useDesigner()
  provide(designerInjectionKey, designer)
  provide(historyInjectionKey, useHistory(designer))

  return (
    <div class="w-full h-full bg-base-200 dark:bg-base-300  transition-colors">
      <Header />
      <Main />
    </div>
  )
}


export default Designer
