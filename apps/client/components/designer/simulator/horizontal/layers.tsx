import { NTag, NPopover } from "naive-ui"
import { useDesignerContext } from "~/composables/designer"
import { Empty } from "~/components/common"


import Draggable from "vuedraggable"


function Layers() {
  const designer = useDesignerContext()

  const trigger = () => (
    <div class="hover:text-primary w-[22px] h-[22px]  ml-1">
      <NuxtIcon name="designer/layer" />
    </div>
  )

  return (
    <NPopover trigger="hover" v-slots={{ trigger }}>
      <div class="w-[248px]">
        <p class="p-2 text-center">图层管理</p>
        <div class="border-b-1 dark:border-neutral mb-[10px]" />
        {(() => {
          const { blocks } = designer.simulatorData.value
          if (blocks.length === 0)  /*EXCLUDE*/ return <Empty description="无图层" />
          /*EXCLUDE*/ return (
            <Draggable tag="div" list={blocks}>
              {blocks.map(block => (
                <div class="flex justify-between" key={block.id}>
                  <div class="text-sm">
                    ID: {block.id}
                  </div>

                  <NTag type="info" size="small">
                    {block.label}
                  </NTag>
                </div>
              ))}
            </Draggable>
          )
        })()}
      </div>
    </NPopover>
  )
}

export default Layers
