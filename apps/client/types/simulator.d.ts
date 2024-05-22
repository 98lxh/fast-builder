declare interface SimulatorBlockStyle {
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
}

declare interface SimulatorBlock {
  id: string; // 组件ID
  key: string; // 组件Key
  layer: string; // 图层名
  icon: string; // 组件图标
  label: string; // 组件名称
  focus: boolean; // 是否选中
  style: SimulatorBlockStyle; // 组件样式
  props?: Record<string, any>; // 组件属性
}

declare interface SimulatorContainer {
  width: number;
  height: number;
}

declare interface SimulatorData {
  container: SimulatorContainer,
  blocks: Array<SimulatorBlock>
}


declare interface SimulatorLayer {
  key: string;
  icon: string;
  label: string;
  zIndex: number;
  children?: SimulatorLayer[]
}
