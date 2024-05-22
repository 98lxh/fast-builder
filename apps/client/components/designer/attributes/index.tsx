import type { CSSProperties } from "vue"
import AttributeForm from "./attribute-form"
import DragLayers from "./drag-layers"
import ArrowButton from "../arrow"
import { useDesignerContext } from "~/composables/designer";

function AttributePanel() {
  const isHidden = shallowRef(false);
  const styles = computed(() => {
    const styles: CSSProperties = {}
    styles.transform = `translate(${isHidden.value ? '100%' : '0px'},0px)`
    styles.transition = 'transform .3s'
    return styles
  })

  return (
    <div
      id="attribute-panel"
      class="flex flex-col bg-base- shadow-custom w-[248px] absolute z-[2] main-height bg-base-100 right-[0px] border-l-1 dark:border-neutral"
      style={styles.value}
    >
      <DragLayers />
      <AttributeForm />
      <ArrowButton v-model={isHidden.value} direction="right" />
    </div>
  )
}

export default AttributePanel
