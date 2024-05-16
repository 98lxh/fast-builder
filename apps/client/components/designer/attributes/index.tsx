import type { CSSProperties } from "vue";
import { Empty } from "~/components/common";
import AttributeForm from "./attribute-form";
import ArrowButton from "../arrow";

function AttributePanel() {
  const isHidden = shallowRef(false);

  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    styles.transform = `translate(${isHidden.value ? '100%' : '0px'},0px)`
    styles.transition = 'transform .3s'
    return styles
  })

  function description() {
    return (
      <div class="text-center mt-[5px]">
        <p>选中组件后</p>
        <p>在此处设置组件属性</p>
      </div>
    )
  }

  return (
    <div
      class="flex flex-col bg-base-100 shadow-custom w-[248px] absolute z-[2] main-height right-[0px]"
      style={styles.value}
    >
      {/* <AttributeForm /> */}
      <ArrowButton v-model={isHidden.value} direction="right" />
      <Empty class="flex-1" imgUrl="/figure/inform.png" v-slots={{ description }} />
    </div>
  )
}

export default AttributePanel
