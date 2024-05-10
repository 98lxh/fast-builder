import { cloneDeep } from "~/utils/clone-deep"
import { devices } from "./device"

export interface DesignerContext {
  setSimulatorRef(simulator: HTMLDivElement | null): void
  setSimulatorData(data: SimulatorData): void
  setSimulatorDataById(id: string, block: SimulatorBlock): void
  simulatorRef: Ref<HTMLDivElement | null>
  simulatorData: Ref<SimulatorData>
  snapshot: Ref<SimulatorSnapshot>
  clearBlockFocus(): void
  record(): void
  undo(): void
  redo(): void
}

interface SimulatorSnapshot {
  data: SimulatorData[], // 快照集合
  index: number, // 当前索引
  undoable: boolean // 可撤销
  redoable: boolean // 可重做
}

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')

export const genarateDefaultSimulator = (): SimulatorData => ({
  container: {
    width: devices[0].width,
    height: devices[0].height
  },
  blocks: []
})

const generateDefaultSnapshot = (): SimulatorSnapshot => ({
  data: [],
  index: -1,
  undoable: false,
  redoable: false
})

export function useDesigner(): DesignerContext {
  const { simulatorData, ...doable } = useUndo()
  const simulatorRef = ref<HTMLDivElement | null>(null)

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
    ...doable,
    simulatorRef,
    simulatorData,
    clearBlockFocus,
    setSimulatorRef,
    setSimulatorData,
    setSimulatorDataById
  }
}


function useUndo() {
  const snapshot = ref<SimulatorSnapshot>(generateDefaultSnapshot())
  const simulatorData = ref<SimulatorData>(genarateDefaultSimulator());

  function setDoable() {
    snapshot.value.undoable = snapshot.value.index >= 0
    snapshot.value.redoable = snapshot.value.index < snapshot.value.data.length - 1
  }

  function undo() {
    if (snapshot.value.undoable) {
      snapshot.value.index--
      simulatorData.value = cloneDeep(snapshot.value.data[snapshot.value.index]) || genarateDefaultSimulator()
    }
    setDoable()
  }

  function redo() {
    if (snapshot.value.redoable) {
      const { data } = snapshot.value
      snapshot.value.index++
      simulatorData.value = cloneDeep(data[snapshot.value.index])
    }
    setDoable()
  }

  function record() {
    snapshot.value.data[++snapshot.value.index] = cloneDeep(simulatorData.value)
    if (snapshot.value.index < snapshot.value.data.length - 1) {
      snapshot.value.data = snapshot.value.data.slice(0, snapshot.value.index + 1)
    }
    setDoable()
  }

  return {
    simulatorData,
    snapshot,
    record,
    undo,
    redo
  }
}

export function useDesignerContext() {
  const context = inject(designerInjectionKey, useDesigner())
  return context;
}
