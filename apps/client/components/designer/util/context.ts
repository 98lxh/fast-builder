export interface DesignerContext {
  setSimulatorRef(simulator: HTMLDivElement | null): void
  setSimulatorData(data: SimulatorData): void
  simulatorRef: Ref<HTMLDivElement | null>
  simulatorData: Ref<SimulatorData>
}

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')
