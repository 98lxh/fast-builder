declare interface SimulatorBlock {
  key: string;
  top: number;
  left: number;
  zIndex: number;
  focus: boolean;
  props?: Record<string, any>;
}


declare interface SimulatorData {
  container: {
    width: number;
    height: number;
  },
  blocks: Array<SimulatorBlock>
}
