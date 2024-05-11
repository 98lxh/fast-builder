import { genarateDefaultSimulator, useDesignerContext, type DesignerContext } from ".";

export interface HistoryContext {
  snapshot: Ref<SimulatorSnapshot>
  record(): void
  undo(): void
  redo(): void
}

export const historyInjectionKey: InjectionKey<HistoryContext> = Symbol('HISTORY_INJECTION_KEY')

const generateDefaultSnapshot = (): SimulatorSnapshot => ({
  data: [],
  index: -1,
  undoable: false,
  redoable: false
})

interface SimulatorSnapshot {
  data: SimulatorData[], // 快照集合
  index: number, // 当前索引
  undoable: boolean // 可撤销
  redoable: boolean // 可重做
}


let designer: DesignerContext | null = null
export function useHistory(context?: DesignerContext): HistoryContext {
  context && (designer = context)
  const snapshot = ref<SimulatorSnapshot>(generateDefaultSnapshot())

  function setDoable() {
    snapshot.value.undoable = snapshot.value.index >= 0
    snapshot.value.redoable = snapshot.value.index < snapshot.value.data.length - 1
  }

  function undo() {
    if (!designer || !snapshot.value.undoable) { return }
    snapshot.value.index--
    designer.setSimulatorData && designer.setSimulatorData(cloneDeep(snapshot.value.data[snapshot.value.index]) || genarateDefaultSimulator())
    setDoable()
  }

  function redo() {
    if (!designer || !snapshot.value.redoable) { return }
    const { data } = snapshot.value
    snapshot.value.index++
    designer.setSimulatorData && designer.setSimulatorData(cloneDeep(data[snapshot.value.index]))
    setDoable()
  }

  function record() {
    if (!designer) { return }
    snapshot.value.data[++snapshot.value.index] = cloneDeep(designer.simulatorData.value)
    if (snapshot.value.index < snapshot.value.data.length - 1) {
      snapshot.value.data = snapshot.value.data.slice(0, snapshot.value.index + 1)
    }
    setDoable()
  }

  return {
    snapshot,
    record,
    undo,
    redo
  }
}


export function useHistoryContext() {
  const context = inject(historyInjectionKey, useHistory())
  return context;
}
