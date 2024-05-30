import type { CSSProperties } from "vue";
import { layout } from "@fast-builder/shared";

function Main() {
  const styles = computed(() => {
    const _styles: CSSProperties = {}
    const { designerHeaderHeight } = layout
    _styles.paddingTop = `${designerHeaderHeight}px`
    return _styles
  })

  return (
    <div class="w-[100vw] h-[100vh] bg-base-400 dark:bg-base-300" style={styles.value}>
      <div class="h-full w-full">
        <NuxtPage />
      </div>
    </div>
  )
}


export default Main
