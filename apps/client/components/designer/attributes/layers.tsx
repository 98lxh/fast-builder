import { BasicForm, type GroupFormItem } from "@h5-designer/shared"
import { useDesignerContext } from "~/composables/designer"
import type { FC } from "vite-plugin-vueact"

import { Empty } from "~/components/common"
import { NTag, NScrollbar, NEllipsis } from "naive-ui"
import { VueDraggableNext } from "vue-draggable-next"
import { TransitionGroup, type CSSProperties } from "vue"


const Draggable = VueDraggableNext as unknown as FC

function Layers() {
  const designer = useDesignerContext()
  const state = shallowReactive({ drag: false, open: false })

  const styles = computed(() => {
    const wrapper: CSSProperties = {}
    const arrow: CSSProperties = {}
    const transition = 'transform 0.3s'
    wrapper.transform = `translateY(${state.open ? 'calc(100% - 35px)' : '0'})`
    arrow.transform = `rotate(${state.open ? '270deg' : '90deg'})`
    wrapper.transition = transition
    arrow.transition = transition
    return { wrapper, arrow }
  })

  function handleChange(evt: any) {
    const { moved } = evt;
    const { layers } = designer
    const { oldIndex, newIndex } = moved
    const sourceId = layers.value[oldIndex].id
    const targetId = layers.value[newIndex].id
    designer.swapTwoComponentIndex(sourceId, targetId)
  }

  return (
    <div class="flex flex-col absolute bottom-0 w-full min-h-[300px]" style={styles.value.wrapper}>
      <div class="border-t-1 border-b-1 dark-border-neutral mb-[-1px] flex px-[5px] select-none h-[35px] items-center">
        <div class="flex-1 flex items-center">
          <NuxtIcon class="w-[18px] h-[18px] mr-1" name="designer/layer" />
          <p>图层</p>
        </div>

        <div
          class="w-[16px] h-[16px] rotate-[90deg] cursor-pointer hover:text-primary"
          onClick={() => state.open = !state.open}
          style={styles.value.arrow}
        >
          <NuxtIcon class="w-[18px] h-[18px]" name="right" />
        </div>
      </div>

      {(() => {
        const { layers } = designer
        if (layers.value.length === 0) {
          /*EXCLUDE*/ return <Empty class="py-[20px]" imgUrl="/figure/inform.png" description="暂无图层" />
        }

         /*EXCLUDE*/ return (
          <NScrollbar style={{ maxHeight: 'calc(300px - 40px)', minHeight: 'calc(300px - 40px)' }}>
            <Draggable
              tag="div"
              animation={200}
              list={layers.value}
              onStart={() => state.drag = true}
              onEnd={() => state.drag = false}
              onChange={handleChange}
            >
              <TransitionGroup name={state.drag ? 'flip-list' : undefined} type="transition">
                {layers.value.map(layer => (
                  <div
                    class="select-none flex justify-between mb-[-1px] py-[3px] px-[10px] cursor-pointer border-1 border-dashed border-transparent hover:border-primary"
                    key={layer.id}
                  >
                    <div class="flex items-center">
                      <NuxtIcon class="w-[18px] h-[18px] mr-1" name={layer.icon} />
                      <NEllipsis class="text-sm" style="max-width:140px" tooltip={{ placement: 'bottom' }}>
                        {layer.name}
                      </NEllipsis>
                    </div>
                  </div>
                ))}
              </TransitionGroup>
            </Draggable>
          </NScrollbar>
        )
      })()}
    </div>
  )
}

export default Layers
