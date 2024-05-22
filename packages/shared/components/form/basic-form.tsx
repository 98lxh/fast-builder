import type { FC } from "vite-plugin-vueact"
import type { FormItem, GroupFormItem } from "./types"

import { BorderRadius } from "./../form-field"

import {
  NCollapseItem,
  NDatePicker,
  NCollapse,
  NFormItem,
  NSelect,
  NInput,
  NForm,
  NTag,
} from "naive-ui";

interface DefineProps {
  formItems?: FormItem[];
  padding?: number | string;
  groupFormItems?: GroupFormItem[];
  labelWidth?: number;
  colLayout?: string;
  formData: any;
  tag?: string;
}

interface DefineEmits {
  (name: 'update:formData', formData: any): void
}

const BasicForm: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  function onUpdateData(field, newValue) {
    const formData = { ...props.formData, [field]: newValue }
    emit('update:formData', formData)
  }


  const renderFormItems = (formItems: FormItem[]) => formItems.map(renderFormItem)
  function renderGroupFormItems(groupFormItems: GroupFormItem[]) {
    return groupFormItems.map((group, index) => (renderFormItems(group.formItems)))
  }

  function renderFormItem(formItem: FormItem) {
    const { field, rules, options, placeholder, type, label } = formItem
    return (
      <NFormItem
        path={field}
        rule={rules}
        labelAlign="left"
        labelPlacement="left"
        label={label ? (label + ':') : ''}
        labelWidth={(label ? (props.labelWidth || 80) : 0) + 'px'}
      >{(() => {
        const attrs = { value: props.formData[field], 'onUpdate:value': onUpdateData }
        switch (type) {
          case 'input':
          case 'password':
            return <NInput  {...attrs} {...{ type: type === 'password' ? 'password' : 'text', placeholder, ...props.otherOptions }} />
          case 'datepicker':
            return <NDatePicker {...attrs}  {...{ ...props.otherOptions, type: 'daterange' }} />
          case 'select':
            return <NSelect {...attrs} {...{ placeholder, options }} />
          case 'border-radius':
            return <BorderRadius />
          default:
            return null
        }
      })()}
      </NFormItem>)
  }

  return (
    <div class="mb-[20px]">
      <NForm model={props.formData}>
        {(() => {
          const { groupFormItems, formItems } = props
          if (formItems)  /*EXCLUDE*/ return renderFormItems(formItems)
          if (groupFormItems) /*EXCLUDE*/ return renderGroupFormItems(groupFormItems)
          /*EXCLUDE*/ return null
        })()}
      </NForm>
    </div>
  )
}

export default BasicForm
