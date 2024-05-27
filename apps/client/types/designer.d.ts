declare interface BlockStyle {
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
}

declare interface Block {
  id: string; // 组件ID
  key: string; // 组件Key
  layer: string; // 图层名
  icon: string; // 组件图标
  label: string; // 组件名称
  focus: boolean; // 是否选中
  style: BlockStyle; // 组件样式
  props?: Record<string, any>; // 组件属性
}

declare interface Container {
  width: number;
  height: number;
  top: number;
  left: number;
  focus: boolean; // 是否选中
}

declare interface DesignerData {
  container: Container,
  blocks: Array<Block>
}


declare interface DesignerLayer {
  children?: DesignerLayer[]
  key: string;
  icon: string;
  label: string;
  zIndex: number;
}
