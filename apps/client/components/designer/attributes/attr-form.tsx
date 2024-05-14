import { BasicForm, type GroupFormItem } from "@h5-designer/material"
import { NTag } from "naive-ui"


function AttrForm() {
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
      <div class="flex flex-col">
        <div class="flex items-center py-[10px] border-b-1 dark:border-neutral">
          <h5 class="text-xl mr-2 ml-2">属性设置</h5>
          <NTag type="info">文本组件</NTag>
        </div>

        <BasicForm
          class="mt-2"
          formData={formData}
          groupFormItems={groupFormItems}
        />
      </div>
    </ClientOnly>
  )
}


export default AttrForm
