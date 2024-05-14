import type { SelectOption, FormItemRule } from "naive-ui";

export type FormItemType = "input" | "password" | "datepicker" | "select";

export interface FormItem {
  label: string;
  field: string;
  placeholder?: any;
  rules?: FormItemRule[] | FormItemRule;
  type?: FormItemType;
  options?: SelectOption[];
  isHidden?: boolean;
  otherOptions?: any;
};

export interface GroupFormItem {
  name: string
  formItems: FormItem[]
}

export interface DefineProps {
  formItems?: FormItem[];
  groupFormItems?: GroupFormItem[];
  labelWidth?: number;
  colLayout?: string;
  title?: string;
  formData: any
}


export interface DefineEmits {
  (name: 'update:formData', formData: any): void
}
