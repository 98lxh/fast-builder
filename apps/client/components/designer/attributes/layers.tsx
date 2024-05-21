import { BasicForm, type GroupFormItem } from "@h5-designer/shared"
import { useDesignerContext } from "~/composables/designer"
import type { FC } from "vite-plugin-vueact"

import { Empty } from "~/components/common"
import { NTag, NPopover, NEllipsis } from "naive-ui"
import { VueDraggableNext } from "vue-draggable-next"
import { TransitionGroup } from "vue"


const Draggable = VueDraggableNext as unknown as FC
function Layers() {
  const designer = useDesignerContext()
  const drag = shallowRef(false)

  const layers = computed(() => {
    const { blocks } = designer.simulatorData.value
    const _layers = blocks.map(({ id, style, label }) => ({ id, label, zIndex: style.zIndex }))
    _layers.sort((a, b) => b.zIndex - a.zIndex)
    return _layers
  })

  function handleChange(evt: any) {
    const { moved } = evt;
    const { oldIndex, newIndex } = moved
    const sourceId = layers.value[oldIndex].id
    const targetId = layers.value[newIndex].id
    designer.swapTwoComponentIndex(sourceId, targetId)
  }

  return (
    <div class="flex flex-col">
      {(() => {
        if (layers.value.length === 0) {
          /*EXCLUDE*/ return <Empty class="mt-[300px]" imgUrl="/figure/inform.png" description="暂无图层" />
        }
         /*EXCLUDE*/ return (
          <Draggable
            tag="div"
            animation={200}
            list={layers.value}
            onStart={() => drag.value = true}
            onEnd={() => drag.value = false}
            onChange={handleChange}
          >
            <TransitionGroup name={drag.value ? 'flip-list' : undefined} type="transition">
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
        )
      })()}
    </div>
  )
}

export default Layers
