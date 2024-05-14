import type { FC } from "vite-plugin-vueact";
import type { DefineProps, DefineEmits, FormItem, GroupFormItem } from "./types";

import {
  NCollapseItem,
  NDatePicker,
  NCollapse,
  NFormItem,
  NGridItem,
  NSelect,
  NInput,
  NGrid,
  NForm,
} from "naive-ui";

const BasicForm: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  function onUpdateData(field, newValue) {
    const formData = { ...props.formData, [field]: newValue }
    emit('update:formData', formData)
  }

  const renderFormItems = (formItems: FormItem[]) => formItems.map(renderFormItem)
  function renderGroupFormItems(groupFormItems: GroupFormItem[]) {
    return (<NCollapse>{groupFormItems.map((group, index) => (
      <NCollapseItem title={group.name} name={index}>
        {renderFormItems(group.formItems)}
      </NCollapseItem>
    ))}
    </NCollapse>)
  }

  function renderFormItem(formItem: FormItem) {
    const { field, rules, options, placeholder, type } = formItem
    const { colLayout } = props.value
    return (<NGridItem span={colLayout} key={field}>
      <NFormItem
        path={field}
        rule={rules}
        labelPlacement="left"
        label={props.value.label + ':'}
        labelWidth={props.value.labelWidth + 'px'}
      >{(() => {
        const attrs = { value: props.formData['field'], 'onUpdate:value': onUpdateData }
        switch (type) {
          case 'input':
          case 'password':
            return (<NInput  {...attrs} {...{ type: type === 'password' ? 'password' : 'text', placeholder }} />)
          case 'datepicker':
            return (<NDatePicker {...attrs}  {...{ ...props.value.otherOptions, type: 'daterange' }} />)
          case 'select':
            return (<NSelect {...attrs} {...{ placeholder, options }} />)
          default:
            return null
        }
      })()}
      </NFormItem>
    </NGridItem>)
  }

  return (
    <div class="mb-[20px]">
      <NForm>
        <NGrid itemResponsive={true} responsive="screen">
          {(() => {
            const { groupFormItems, formItems } = props.value
            if (formItems)  /*EXCLUDE*/ return renderFormItems(formItems)
            if (groupFormItems) /*EXCLUDE*/ return renderGroupFormItems(groupFormItems)
            return null
          })()}
        </NGrid>
      </NForm>
    </div>
  )
}

export default BasicForm
