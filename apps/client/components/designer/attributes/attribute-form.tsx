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
          type: 'input',
          label: '图层名称',
          placeholder: '图层名称',
          otherOptions: {
            disabled: true
          }
        },
        {
          field: 'background',
          type: 'input',
          label: '背景颜色',
          placeholder: '背景颜色'
        }
      ]
    },
    {
      name: '动画',
      formItems: [
        {
          field: 'layer',
          type: 'input',
          label: '图层名称1',
          placeholder: '图层名称',
          otherOptions: {
            disabled: true
          }
        },
        {
          field: 'background',
          type: 'input',
          label: '背景颜色',
          placeholder: '背景颜色'
        }
      ]
    }
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
          <p>属性设置</p>
        </div>
        <NTag class="mr-[10px]" size="small" type="info" bordered={false}>
          {designer.currentEdit.value ? designer.currentEdit.value.label : '未选择'}
        </NTag>
      </div>
      {designer.currentEdit.value === null
        ? (<Empty class="mt-[100px]" imgUrl="/figure/inform.png" v-slots={{ description }} />)
        : (<div class="border-t-1 dark:border-neutral pt-[5px]">
          <BasicForm
            class="px-[10px]"
            formData={formData}
            groupFormItems={groupFormItems}
          />
        </div>)}
    </div>
  )
}


export default AttributeForm
