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
    wrapper.transform = `translateY(${state.open ? 'calc(100% - 32px)' : '0'})`
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
      <div class="border-t-1 border-b-1 dark-border-neutral mb-[-1px] flex px-[5px] select-none h-[30px] items-center">
        <p class="flex-1">图层管理</p>
        <div
          class="w-[18px] h-[18px] rotate-[90deg] cursor-pointer hover:text-primary"
          onClick={() => state.open = !state.open}
          style={styles.value.arrow}
        >
          <NuxtIcon name="right" />
        </div>
      </div>

      {(() => {
        const { layers } = designer

        if (layers.value.length === 0) {
          /*EXCLUDE*/ return <Empty class="py-[20px]" imgUrl="/figure/inform.png" description="暂无图层" />
        }

         /*EXCLUDE*/ return (
          <NScrollbar style={{ maxHeight: 'calc(300px - 32px)' }}>
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
                  <div class="flex justify-between border-b-1 border-t-1 dark-border-neutral p-[10px] cursor-move mb-[-1px]" key={layer.id}>
                    <NEllipsis class="text-sm" style="max-width:140px" tooltip={{ placement: 'bottom' }}>
                      ID: {layer.id}
                    </NEllipsis>

                    <NTag type="info" size="small">
                      {layer.label}
                    </NTag>
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
