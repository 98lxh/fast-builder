import { cloneDeep } from "~/utils/clone-deep"
import { devices } from "./device"

export interface DesignerContext {
  setSimulatorRef(simulator: HTMLDivElement | null): void
  setSimulatorData(data: SimulatorData): void
  setSimulatorDataById(id: string, block: SimulatorBlock): void
  clearBlockFocus(): void
  undo(): void
  redo(): void
  record(): void
  simulatorRef: Ref<HTMLDivElement | null>
  simulatorData: Ref<SimulatorData>
}

interface SimulatorSnapshot {
  data: SimulatorData[],
  index: number
}

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')

export const genarateDefaultSimulator = (): SimulatorData => ({
  container: { width: devices[0].width, height: devices[0].height },
  blocks: []
})

const generateDefaultSnapshot = (): SimulatorSnapshot => ({
  index: -1,
  data: []
})

export function useDesigner(): DesignerContext {
  const { simulatorData, ...undo } = useUndo()

  const simulatorRef = ref<HTMLDivElement | null>(null)
  const snapshot = ref<SimulatorSnapshot>(generateDefaultSnapshot())


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
    ...undo,
    simulatorRef,
    simulatorData,
    clearBlockFocus,
    setSimulatorRef,
    setSimulatorData,
    setSimulatorDataById
  }
}


function useUndo(){
  const simulatorData = ref<SimulatorData>(genarateDefaultSimulator());
  const snapshot = ref<SimulatorSnapshot>(generateDefaultSnapshot())

  function undo() {
    if (snapshot.value.index >= 0) {
      snapshot.value.index--
      simulatorData.value = cloneDeep(snapshot.value.data[snapshot.value.index]) || genarateDefaultSimulator()
      console.log(cloneDeep(snapshot.value.data[snapshot.value.index]))
    }
  }

  function redo() {
    if (snapshot.value.index < snapshot.value.data.length - 1) {
      const { index, data } = snapshot.value
      snapshot.value.index++
      simulatorData.value = cloneDeep(data[snapshot.value.index])
    }
  }

  function record() {
    snapshot.value.data[++snapshot.value.index] = cloneDeep(simulatorData.value)
    if (snapshot.value.index < snapshot.value.data.length - 1) {
      snapshot.value.data = snapshot.value.data.slice(0, snapshot.value.index + 1)
    }
  }

  return {
    simulatorData,
    undo,
    redo,
    record
  }
}

export function useDesignerContext() {
  const context = inject(designerInjectionKey, useDesigner())
  return context;
}
