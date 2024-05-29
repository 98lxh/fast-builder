import { TransitionGroup, type CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"

import { useDesignerContext } from "~/composables/designer"
import { NTree, type TreeOption, type TreeDropInfo } from "naive-ui"
import { Empty } from "~/components/common"

function ControlLayers() {
  const designer = useDesignerContext()
  const state = shallowReactive({ drag: false, open: false })

  const styles = computed(() => {
    const wrapper: CSSProperties = {}
    const arrow: CSSProperties = {}
    const transition = 'transform 0.3s'
    arrow.transform = `rotate(${state.open ? '270deg' : '90deg'})`
    wrapper.transform = `translateY(${state.open ? 'calc(100% - 39px)' : '0'})`
    arrow.transition = transition
    wrapper.transition = transition
    return { wrapper, arrow }
  })

  function renderTreeLabel(layer: DesignerLayer) {
    const { icon, label } = layer
    return (
      <div class="flex">
        <NuxtIcon class="mr-[5px]" name={icon} />
        <p>{label}</p>
      </div>
    )
  }


  function Header() {
    const { arrow } = styles.value
    return (
      <div class="border-t-1 border-b-1 dark-border-neutral mb-[-1px] flex px-[5px] select-none h-[35px] items-center">
        <div class="flex-1 flex items-center">
          <NuxtIcon class="w-[18px] h-[18px] mr-1" name="designer/layer" />
          <p>图层</p>
        </div>
        <div class="w-[16px] h-[16px] rotate-[90deg] cursor-pointer hover:text-primary"
          onClick={() => state.open = !state.open}
          style={arrow}
        >
          <NuxtIcon class="w-[18px] h-[18px]" name="right" />
        </div>
      </div>
    )
  }

  return (
    <div class="flex flex-col absolute bottom-0 w-full min-h-[300px] z-[100] bg-base-100" style={styles.value.wrapper}>
      {Header()}
      {(() => {
        const { currentBlockID, setBlockFocus } = designer
        const length = layers.value.length
        const selectKeys = currentBlockID.value ? [currentBlockID.value] : []
        const data = (layers.value as unknown as TreeOption[]).map((layer: any) => ({ ...layer, label: () => renderTreeLabel(layer) }))
        if (length === 0) /*EXCLUDE*/ return (<Empty class="py-[20px]" imgUrl="/figure/inform.png" description="暂无图层" />)
         /*EXCLUDE*/ return (
          <NTree
            data={data}
            draggable={true}
            blockLine={true}
            selectable={true}
            virtualScroll={true}
            style="height: 260px"
            selectedKeys={selectKeys}
            {...{ 'onUpdate:selectedKeys': (keys) => keys.length === 1 && setBlockFocus(keys[0]) }}
          />
        )
      })()}
    </div>
  )
}

export default ControlLayers
