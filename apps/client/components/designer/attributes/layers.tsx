import { TransitionGroup, type CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"

import { useDesignerContext } from "~/composables/designer"
import { NTag, NScrollbar, NEllipsis } from "naive-ui"
import { VueDraggableNext } from "vue-draggable-next"
import { Empty } from "~/components/common"


const Draggable = VueDraggableNext as unknown as FC

function Layers() {
  const designer = useDesignerContext()
  const state = shallowReactive({ drag: false, open: false })

  const styles = computed(() => {
    const wrapper: CSSProperties = {}
    const arrow: CSSProperties = {}
    const transition = 'transform 0.3s'
    arrow.transform = `rotate(${state.open ? '270deg' : '90deg'})`
    wrapper.transform = `translateY(${state.open ? 'calc(100% - 35px)' : '0'})`
    arrow.transition = transition
    wrapper.transition = transition
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

  function Header() {
    const { arrow } = styles.value
    return (<div class="border-t-1 border-b-1 dark-border-neutral mb-[-1px] flex px-[5px] select-none h-[35px] items-center">
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
    </div>)
  }

  return (
    <div class="flex flex-col absolute bottom-0 w-full min-h-[300px]" style={styles.value.wrapper}>
      {Header()}
      {(() => {
        const { layers } = designer
        const length = layers.value.length
        if (length === 0) /*EXCLUDE*/ return (<Empty class="py-[20px]" imgUrl="/figure/inform.png" description="暂无图层" />)
         /*EXCLUDE*/ return (
          <NScrollbar style={{ maxHeight: 'calc(300px - 40px)', minHeight: 'calc(300px - 40px)' }}>
            <Draggable
              tag="div"
              animation={200}
              list={layers.value}
              onChange={handleChange}
              onStart={() => state.drag = true}
              onEnd={() => state.drag = false}
            >
              <TransitionGroup name={state.drag ? 'flip-list' : undefined} type="transition">
                {layers.value.map(layer => {
                  const { currentEdit, setBlockFocus } = designer
                  const styles: CSSProperties = {}
                  const isCurrent = currentEdit.value?.id === layer.id
                  const classes = `select-none flex justify-between mb-[-1px] py-[2px] px-[10px] border-1 border-transparent hover:border-primary
                   cursor-pointer ${isCurrent ? 'bg-primary-1' : 'bg-transparent'}
                  `
                  /*EXCLUDE*/ return (
                    <div class={classes} key={layer.id} onClick={() => setBlockFocus(layer.id)}>
                      <div class="flex items-center">
                        <NuxtIcon class="w-[18px] h-[18px] mr-1" name={layer.icon} />
                        <NEllipsis class="text-sm" style="max-width:140px" tooltip={{ placement: 'bottom' }}>
                          {layer.name}
                        </NEllipsis>
                      </div>
                    </div>
                  )
                })}
              </TransitionGroup>
            </Draggable>
          </NScrollbar>
        )
      })()}
    </div>
  )
}

export default Layers
