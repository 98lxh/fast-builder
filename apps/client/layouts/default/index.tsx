import Header from "./header"
import Sidebar from "./sidebar"
import Main from "./main"

function Default() {
  const isCollapse = shallowRef(false)
  
  return (
    <div class="w-full h-full bg-base-200 dark:bg-base-300  transition-colors">
      <Header isCollapse={isCollapse.value} />
      <Sidebar v-model:isCollapse={isCollapse.value} />
      <Main isCollapse={isCollapse.value} />
    </div>
  );
}

export default Default
