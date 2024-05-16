declare interface SimulatorBlockStyle {
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
}

declare interface SimulatorBlock {
  id: string;
  key: string;
  label: string;
  focus: boolean;
  style: SimulatorBlockStyle;
  props?: Record<string, any>;
}

declare interface SimulatorContainer {
  width: number;
  height: number;
}

declare interface SimulatorData {
  container: SimulatorContainer,
  blocks: Array<SimulatorBlock>
}
