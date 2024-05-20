import { BasicForm, type GroupFormItem } from "@h5-designer/shared"
import { NTag } from "naive-ui"

function AttributeForm() {
  const groupFormItems: GroupFormItem[] = [
    {
      name: '基础属性',
      formItems: [
        {
          field: 'layer',
          type: 'input',
          label: '图层名称',
          placeholder: '图层名称'
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

  const formData = {
    layer: '图层1',
    background: '#000000'
  }

  return (
    <ClientOnly>
      <div class="flex flex-col px-[15px]">
        <div class="flex items-center justify-between py-[8px] border-b-1 dark:border-neutral">
          <h5 class="text-lg mr-2 ml-2">属性设置</h5>
          <NTag type="info" size="small">文本组件</NTag>
        </div>

        <BasicForm
          class="mt-5"
          formData={formData}
          groupFormItems={groupFormItems}
        />
      </div>
    </ClientOnly>
  )
}


export default AttributeForm
