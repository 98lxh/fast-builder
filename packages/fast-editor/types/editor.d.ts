declare interface BasicStyle {
  top: number;
  left: number;
  width: number;
  height: number;
}

declare interface Block {
  name: string; // 可自定义组件名|图层名
  id: string; // 组件ID
  key: string; // 组件Key
  icon: string; // 组件图标
  label: string; // 组件名称
  focus: boolean; // 是否选中
  style: BlockStyle; // 组件样式
  blocks?: Block[] // 子组件
  props?: Record<string, any>; // 组件属性
}

declare interface BlockStyle extends BasicStyle {
  zIndex: number;
}

declare interface Container extends BasicStyle {
  id: string // 容器ID
  name: string  // 可自定义容器名 | 图层名
  focus: boolean // 容器是否选中是否选中
}

declare interface DesignerData {
  container: Container,
  blocks: Array<Block>
}

declare interface Layer {
  key: string;
  icon: string;
  label: string;
  zIndex: number;
  children?: Layer[]
}
