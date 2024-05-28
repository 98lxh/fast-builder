import { genarateDefaultData, useDesignerContext } from "./index";
import { cloneDeep } from "@h5-designer/shared"

interface SimulatorSnapshot {
  data: DesignerData[]
  undoable: boolean
  redoable: boolean
  index: number
}

export interface HistoryContext {
  snapshot: Ref<SimulatorSnapshot>
  record(): void
  undo(): void
  redo(): void
}

export const historyInjectionKey: InjectionKey<HistoryContext> = Symbol('HISTORY_INJECTION_KEY')
const generateDefaultSnapshot = (): SimulatorSnapshot => ({
  undoable: false,
  redoable: false,
  index: -1,
  data: []
})

export function useHistory(): HistoryContext {
  const designer = useDesignerContext()
  /* 快照信息 */
  const snapshot = ref<SimulatorSnapshot>(generateDefaultSnapshot())
  function setDoable() {
    snapshot.value.undoable = snapshot.value.index >= 0
    snapshot.value.redoable = snapshot.value.index < snapshot.value.data.length - 1
  }
  /* 撤销 */
  function undo() {
    if (!designer || !snapshot.value.undoable) { return }
    const { data } = snapshot.value
    snapshot.value.index--
    designer.setData && designer.setData(cloneDeep(data[snapshot.value.index]) || genarateDefaultData())
    setDoable()
  }
  /* 重做 */
  function redo() {
    if (!designer || !snapshot.value.redoable) { return }
    const { data } = snapshot.value
    snapshot.value.index++
    designer.setData && designer.setData(cloneDeep(data[snapshot.value.index]))
    setDoable()
  }
  /* 记录当前操作到快照 */
  function record() {
    if (!designer) { return }
    snapshot.value.data[++snapshot.value.index] = cloneDeep(designer.data.value)
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
