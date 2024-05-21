import type { CSSProperties } from "vue"
import AttributeForm from "./attribute-form"
import ArrowButton from "../arrow"
import Layers from "./layers"


function AttributePanel() {
  const isHidden = shallowRef(false);
  const styles = computed(() => {
    const styles: CSSProperties = {}
    styles.transform = `translate(${isHidden.value ? '100%' : '0px'},0px)`
    styles.transition = 'transform .3s'
    return styles
  })


  return (
    <ClientOnly>
      <div class="flex flex-col bg-base- shadow-custom w-[248px] absolute z-[2] main-height bg-base-100 right-[0px]"
        style={styles.value}
      >
        <Layers />
        <AttributeForm />
        <ArrowButton v-model={isHidden.value} direction="right" />
      </div>
    </ClientOnly>
  )
}

export default AttributePanel
