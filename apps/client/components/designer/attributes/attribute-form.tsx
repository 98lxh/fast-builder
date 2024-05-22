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
  ]

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
        <div class="flex items-center ml-[10px]">
          <NuxtIcon class="w-[16px] h-[16px] mr-1" name="designer/setting" />
          <p>{designer.currentEdit.value ? designer.currentEdit.value.layer : '未选择图层'}</p>
        </div>
        <NTag class="mr-[10px]" size="small" type="info" bordered={false}>
          {designer.currentEdit.value ? designer.currentEdit.value.label : '未选择'}
        </NTag>
      </div>

      {/* {designer.currentEdit.value === null
        ? (<Empty class="mt-[100px]" imgUrl="/figure/inform.png" v-slots={{ description }} />)
        : (<BasicForm  class="px-[10px]"  formData={formData} groupFormItems={groupFormItems} />)} */}
      <BasicForm class="px-[10px]" formData={formData} groupFormItems={groupFormItems} />
    </div>
  )
}


export default AttributeForm
