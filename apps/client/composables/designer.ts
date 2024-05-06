export interface DesignerContext {
  setSimulatorRef(simulator: HTMLDivElement | null): void
  setSimulatorContainer(container: SimulatorContainer): void
  setSimulatorBlocks(blocks: Array<SimulatorBlock>): void
  setSimulatorData(data: SimulatorData): void
  simulatorRef: Ref<HTMLDivElement | null>
  simulatorData: Ref<SimulatorData>
}

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')

export const defaultSimulatorData: SimulatorData = {
  container: {
    width: 0,
    height: 0
  },
  blocks: [

  ]
}



