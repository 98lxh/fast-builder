declare interface SimulatorBlockStyle {
  width: number;
  height: number;
  top: number;
  left: number;
  zIndex: number;
}

declare interface SimulatorBlock {
  id: string;
  key: string;
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
