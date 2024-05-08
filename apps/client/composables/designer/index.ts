export interface DesignerContext {
  setSimulatorRef(simulator: HTMLDivElement | null): void
  setSimulatorContainer(container: SimulatorContainer): void
  setSimulatorBlocks(blocks: Array<SimulatorBlock>): void
  setSimulatorData(data: SimulatorData): void
  setSimulatorDataById(id: string, block: SimulatorBlock): void
  clearBlockFocus(): void
  simulatorRef: Ref<HTMLDivElement | null>
  simulatorData: Ref<SimulatorData>
}

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')

export const defaultSimulatorData: SimulatorData = {
  container: { width: 0, height: 0 },
  blocks: []
}

export function useDesigner(): DesignerContext {
  const simulatorRef = ref<HTMLDivElement | null>(null)
  const simulatorData = ref<SimulatorData>(defaultSimulatorData);

  function setSimulatorContainer(container: SimulatorContainer) {
    simulatorData.value.container = { ...container }
  }

  function setSimulatorBlocks(blocks: SimulatorBlock[]) {
    simulatorData.value.blocks = [...blocks]
  }

  function setSimulatorRef(simulator: HTMLDivElement) {
    simulatorRef.value = simulator
  }

  function setSimulatorData(data: SimulatorData) {
    simulatorData.value = data
  }

  function clearBlockFocus() {
    simulatorData.value.blocks.forEach(block => block.focus = false)
  }

  function setSimulatorDataById(updateId: string, block: SimulatorBlock) {
    const index = simulatorData.value.blocks.findIndex(({ id }) => id === updateId)
    if (index < 0) { return }
    simulatorData.value.blocks[index] = { ...block }
  }

  return {
    simulatorRef,
    simulatorData,
    clearBlockFocus,
    setSimulatorDataById,
    setSimulatorRef,
    setSimulatorData,
    setSimulatorBlocks,
    setSimulatorContainer
  }
}

export function useDesignerContext() {
  const context = inject(designerInjectionKey, useDesigner())
  return context;
}
