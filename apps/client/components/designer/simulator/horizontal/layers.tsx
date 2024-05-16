import { useDesignerContext } from "~/composables/designer"
import { NListItem, NList, NTag, NEllipsis, NPopover } from "naive-ui"
import { Empty } from "~/components/common"


function Layers() {
  const { simulatorData } = useDesignerContext()

  return (
    <NPopover trigger="hover" v-slots={{
      trigger: () => (<div class="hover:text-primary w-[22px] h-[22px]  ml-1">
        <NuxtIcon name="designer/layer" />
      </div>)
    }}>
      <div class="w-[248px]">
        <p class="p-2 text-center">图层管理</p>
        <div class="border-b-1 dark:border-neutral mb-[10px]"></div>
        {simulatorData.value.blocks.length === 0 ? (<Empty description="无图层" />) : (
          <NList class="bg-base-100">
            {simulatorData.value.blocks.map(item => (
              <NListItem>
                <div class="flex justify-between text-sm">
                  <NEllipsis style="max-width:120px">
                    ID: {item.id}
                  </NEllipsis>
                  <NTag type="info" size="small">
                    {item.label}
                  </NTag>
                </div>
              </NListItem>
            ))}
          </NList>)
        }
      </div>
    </NPopover>
  )
}

export default Layers
