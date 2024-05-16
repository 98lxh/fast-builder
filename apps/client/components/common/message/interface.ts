export interface DefineProps {
  visible?: boolean;
  title?: string;
  content?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
}


export interface DefineEmits {
  (name: 'update:visible', visible: boolean): void;
  (name: 'confirm'): void;
  (name: 'cancel'): void;
}
