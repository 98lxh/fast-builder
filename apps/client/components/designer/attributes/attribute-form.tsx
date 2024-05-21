import { BasicForm, type GroupFormItem } from "@h5-designer/shared"
import { Empty } from "~/components/common"
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
    <div class="flex flex-col px-[15px]">
      {(() => {
        if (true) /*EXCLUDE*/ return <Empty class="mt-[300px]" imgUrl="/figure/inform.png" v-slots={{ description }} />
        
        /*EXCLUDE*/ return (
          <>
            <BasicForm
              tag="文本组件"
              class="mt-5"
              formData={formData}
              groupFormItems={groupFormItems}
            />
          </>
        )
      })()}
    </div>
  )
}


export default AttributeForm
