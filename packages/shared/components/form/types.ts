import type { SelectOption, FormItemRule } from "naive-ui";

export type FormItemType = "input" | "password" | "datepicker" | "select" | "border-radius";

export interface FormItem {
  label?: string;
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
  padding?: string | number
  formItems: FormItem[]
}


export interface DefineProps {
  formItems?: FormItem[];
  padding?: number | string;
  groupFormItems?: GroupFormItem[];
  labelWidth?: number;
  colLayout?: string;
  formData: any;
  tag?: string;
}
