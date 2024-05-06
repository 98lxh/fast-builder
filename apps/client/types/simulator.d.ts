declare interface SimulatorBlock {
  key: string;
  top: number;
  left: number;
  zIndex: number;
  focus: boolean;
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
