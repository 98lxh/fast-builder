import { useIsMobile } from "~/composables/styles/viewport"
import Sidebar from "./sidebar"
import Header from "./header"
import Main from "./main"

function Default() {
  const isMobile = useIsMobile()
  const isCollapse = shallowRef(false)

  const stop = watch(() => isMobile.value, () => isCollapse.value = isMobile.value, {
    immediate: true
  })

  onUnmounted(stop)
  
  return (
    <div class="w-full h-full bg-base-200 dark:bg-base-300  transition-colors">
      <Header isCollapse={isCollapse.value} isMobile={isMobile.value} />
      <Sidebar v-model:isCollapse={isCollapse.value} isMobile={isMobile.value} />
      <Main isCollapse={isCollapse.value} isMobile={isMobile.value} />
    </div>
  );
}

export default Default
