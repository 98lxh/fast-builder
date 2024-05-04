declare interface SimulatorData {
  container: {
    width: number;
    height: number;
  },
  blocks: {
    key: string;
    top: number;
    left: number;
    zIndex: number;
    props?: Record<string, any>;
  }[]
}
