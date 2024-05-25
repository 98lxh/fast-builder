import type { CSSProperties } from "vue";

import { layout } from "~/constants/layouts";

function Main() {
  const styles = computed(() => {
    const _styles: CSSProperties = {}
    const { designerHeaderHeight } = layout
    _styles.paddingTop = `${designerHeaderHeight}px`
    return _styles
  })

  return (
    <div class="w-[100vw] h-[100vh] bg-base-400" style={styles.value}>
      <div class="p-[15px] h-full">
        <NuxtPage />
      </div>
    </div>
  )
}


export default Main
