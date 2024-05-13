import type { CSSProperties } from "vue";
import Empty from "~/components/empty";
import ArrowButton from "../arrow";

function AttributePanel() {
  const isHidden = shallowRef(false);

  const styles = computed<CSSProperties>(() => ({
    transform: `translate(${isHidden.value ? '100%' : '0px'},0px)`,
    transition: 'transform .3s'
  }))

  return (
    <div
      class="flex flex-col bg-base-100 shadow-custom w-[248px] absolute z-[2] main-height right-[0px]"
      style={styles.value}
    >
      <ArrowButton v-model={isHidden.value} direction="right" />

      <Empty class="flex-1" v-slots={{
        description: () => (
          <div class="text-center mt-[5px]">
            <p>选中组件后</p>
            <p>在此处设置组件属性</p>
          </div>
        )        
      }} />
    </div>
  )
}

export default AttributePanel
