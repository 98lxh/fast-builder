import { devices } from "./device"

export interface DesignerContext {
  setSimulatorRef(simulator: HTMLDivElement | null): void
  setSimulatorDataById(id: string, block: SimulatorBlock): void
  setSimulatorStyleById(id: string, style: SimulatorBlockStyle): void
  setSimulatorContainer(container: SimulatorContainer, isUpdateOriginal?: boolean): void
  setSimulatorData(data: SimulatorData): void
  originalContainer: SimulatorContainer
  simulatorRef: Ref<HTMLDivElement | null>
  simulatorData: Ref<SimulatorData>
  clearBlockFocus(): void
}

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')

export const genarateDefaultSimulator = (): SimulatorData => ({
  container: {
    width: devices[0].width,
    height: devices[0].height
  },
  blocks: []
})

export function useDesigner(): DesignerContext {
  const simulatorData = ref(genarateDefaultSimulator())
  const simulatorRef = ref<HTMLDivElement | null>(null)

  // 原始容器信息
  let originalContainer: SimulatorContainer = genarateDefaultSimulator().container

  function setSimulatorRef(simulator: HTMLDivElement) {
    simulatorRef.value = simulator
  }

  function setSimulatorData(data: SimulatorData) {
    simulatorData.value = data
  }

  function setSimulatorContainer(container: SimulatorContainer, isUpdateOriginal = false) {
    simulatorData.value.container = { ...container }
    isUpdateOriginal && (originalContainer = { ...container })
  }

  function clearBlockFocus() {
    simulatorData.value.blocks.forEach(block => block.focus = false)
  }

  function setSimulatorDataById(updateId: string, block: SimulatorBlock) {
    const index = simulatorData.value.blocks.findIndex(({ id }) => id === updateId)
    if (index < 0) { return }
    simulatorData.value.blocks[index] = { ...block }
  }

  function setSimulatorStyleById(updateId: string, style: SimulatorBlockStyle) {
    const index = simulatorData.value.blocks.findIndex(({ id }) => id === updateId)
    if (index < 0) { return }
    const block = simulatorData.value.blocks[index]
    console.log(style)
    simulatorData.value.blocks[index] = { ...block, style }
  }

  return {
    simulatorRef,
    simulatorData,
    clearBlockFocus,
    setSimulatorRef,
    setSimulatorData,
    setSimulatorDataById,
    setSimulatorStyleById,
    setSimulatorContainer,
    originalContainer
  }
}

export function useDesignerContext() {
  const context = inject(designerInjectionKey, useDesigner())
  return context;
}
