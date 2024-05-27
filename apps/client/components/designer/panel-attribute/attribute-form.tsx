import { BasicForm, type GroupFormItem } from "@h5-designer/shared"
import { useDesignerContext } from "~/composables/designer"
import { Empty } from "~/components/common"
import { NTag } from "naive-ui"

function AttributeForm() {
  const designer = useDesignerContext()

  const groupFormItems: GroupFormItem[] = [
    {
      name: '基础',
      formItems: [
        {
          field: 'layer',
          type: 'border-radius'
        }
      ]
    },
    {
      name: '动画',
      formItems: [
        {
          field: 'layer',
          type: 'input'
        }
      ]
    },
  ]

  const currentBlock = computed(() => {
    const { currentBlockID, data } = designer
    if (!currentBlockID.value) return null
    return data.value.blocks.find(({ id }) => id === currentBlockID.value)
  })

  const formData = reactive({
    layer: '图层1',
    background: '#000000'
  })

  const description = () => (
    <div class="text-center mt-[5px]">
      <p>选中组件后</p>
      <p>在此处设置组件属性</p>
    </div>
  )

  return (
    <div class="flex flex-col">
      <div class="flex justify-between items-center h-[40px]">
        <div class="flex items-center ml-[5px]">
          <NuxtIcon class="w-[16px] h-[16px] mr-1" name="designer/setting" />
          <p>{currentBlock.value ? currentBlock.value.layer : '未选择图层'}</p>
        </div>
        <NTag class="mr-[5px]" size="small" type="info" bordered={false}>
          {currentBlock.value ? currentBlock.value.label : '未选择'}
        </NTag>
      </div>

      {currentBlock.value === null
        ? (<Empty class="mt-[100px]" imgUrl="/figure/inform.png" v-slots={{ description }} />)
        : (<BasicForm formData={formData} groupFormItems={groupFormItems} />)}
    </div>
  )
}


export default AttributeForm
