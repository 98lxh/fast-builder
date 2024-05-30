import { CSSProperties, shallowRef } from "vue";
import type { FC } from "vite-plugin-vueact"
import type { FormItem, GroupFormItem } from "./types"

import { BorderRadius } from "../form-field"

import {
  NDatePicker,
  NFormItem,
  NSelect,
  NInput,
  NForm,
  NScrollbar,
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
  const currentTab = shallowRef(props.groupFormItems && props.groupFormItems[0] ? props.groupFormItems[0].name : '')


  function onUpdateData(field, newValue) {
    const formData = { ...props.formData, [field]: newValue }
    emit('update:formData', formData)
  }

  const renderFormItems = (formItems: FormItem[]) => {
    return formItems.map(renderFormItem)
  }

  function renderGroupFormItems(groupFormItems: GroupFormItem[]) {
    const index = groupFormItems.findIndex(({ name }) => currentTab.value === name)
    const styles: CSSProperties = { left: `${index * 60}px`, transition: `left .3s` }
    return (
      <div class="flex flex-col">
        <div role="tablist" class="tabs border-b-2 dark:border-neutral relative">
          {groupFormItems.map(group => (
            <a class="tab" onClick={() => currentTab.value = group.name}>
              {group.name}
            </a>))}
          <div
            class="absolute w-[60px] h-[2px] bg-black dark:bg-light bottom-[-2px]"
            style={styles}
          />
        </div >

        <NScrollbar class="p-[10px]" style={{ maxHeight: 'calc(100vh - 170px)' }}>
          {groupFormItems[index] && renderFormItems(groupFormItems[index].formItems)}
        </NScrollbar>
      </div >
    )
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
