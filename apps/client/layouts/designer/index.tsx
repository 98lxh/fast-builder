import Header from "./header"
import Main from "./main"

import { 
  historyInjectionKey, 
  designerInjectionKey, 
  hierarchyInjectionKey,
  useHierarchy,
  useDesigner, 
  useHistory 
} from "~/composables/designer"

function Designer() {
  provide(designerInjectionKey,  useDesigner())
  provide(hierarchyInjectionKey, useHierarchy())
  provide(historyInjectionKey, useHistory())

  return (
    <div class="w-full h-full bg-base-200 dark:bg-base-300  transition-colors">
      <Header />
      <Main />
    </div>
  )
}


export default Designer
