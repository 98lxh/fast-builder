export interface DesignerContext {
  setSimulatorRef(simulator: HTMLDivElement | null): void
  simulatorRef: Ref<HTMLDivElement | null>
}

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')
