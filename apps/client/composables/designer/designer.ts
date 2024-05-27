import { devices } from "./device"

export interface DesignerContext {
  setSimulatorRef(simulator: HTMLDivElement | null): void // 设置元素
  setSimulatorDataById(id: string, block: SimulatorBlock): void // 根据block id设置block
  setSimulatorStyleById(id: string, style: SimulatorBlockStyle): void // 根据block id 设置 block style
  setSimulatorContainer(container: Partial<SimulatorContainer>, isUpdateOriginal?: boolean): void // 设置容器
  setSimulatorData(data: SimulatorData): void // 设置数据
  simulatorRef: Ref<HTMLDivElement | null> // 元素
  simulatorData: Ref<SimulatorData> // 数据
  clearBlockFocus(): void // 清除所有block的focus状态
  swapTwoComponentIndex(sourceId: string, targetId: string): void
  deleteBlockById(deleteId: string): void
  layers: ComputedRef<SimulatorLayer[]>
  setBlockFocus(blockId: string): void

  currentBlockID: Ref<string>
}

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')

export const genarateDefaultSimulator = (): SimulatorData => ({
  container: {
    top: 0,
    left: 0,
    focus: false,
    width: devices[0].width,
    height: devices[0].height,
  },
  blocks: []
})

export function useDesigner(): DesignerContext {
  const simulatorData = ref(genarateDefaultSimulator())
  // 模拟器元素
  const simulatorRef = ref<HTMLDivElement | null>(null)
  // 当前编辑的块的ID
  const currentBlockID = shallowRef("")
  const layers = computed(() => {
    const { blocks } = simulatorData.value
    const _layers: SimulatorLayer[] = blocks.map(({ id, style, layer, icon }) => ({ key: id, label: layer, icon, zIndex: style.zIndex, children: [] }))
    _layers.sort((a, b) => b.zIndex - a.zIndex)
    return _layers
  })

  function setSimulatorRef(simulator: HTMLDivElement) {
    simulatorRef.value = simulator
  }

  function setSimulatorData(data: SimulatorData) {
    simulatorData.value = data
  }

  function setSimulatorContainer(udapteValue: Partial<SimulatorContainer>) {
    const { container } = simulatorData.value
    const updatedContainer = { ...container, ...udapteValue }
    simulatorData.value.container = updatedContainer
  }

  function clearBlockFocus() {
    currentBlockID.value = ""
    simulatorData.value.blocks.forEach(block => block.focus = false)
  }

  function setBlockFocus(blockId: string) {
    const index = simulatorData.value.blocks.findIndex(({ id }) => id === blockId)
    if (index < 0) { return }
    clearBlockFocus()
    simulatorData.value.blocks[index].focus = true
    currentBlockID.value = blockId
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
    simulatorData.value.blocks[index] = { ...block, style }
  }

  function swapTwoComponentIndex(sourceId: string, targetId: string) {
    const { blocks } = simulatorData.value
    const sourceIndex = blocks.findIndex(({ id }) => id === sourceId)
    const targetIndex = blocks.findIndex(({ id }) => id === targetId)

    if (sourceIndex === -1 || targetIndex === -1) { return }

    const source = blocks[sourceIndex].style.zIndex
    const target = blocks[targetIndex].style.zIndex
    setSimulatorStyleById(sourceId, { ...blocks[sourceIndex].style, zIndex: target })
    setSimulatorStyleById(targetId, { ...blocks[targetIndex].style, zIndex: source })
  }

  function deleteBlockById(deleteId: string) {
    const index = simulatorData.value.blocks.findIndex(({ id }) => id === deleteId)
    if (index === -1) { return }
    simulatorData.value.blocks.splice(index, 1)
  }

  return {
    currentBlockID,
    setBlockFocus,
    simulatorRef,
    simulatorData,
    clearBlockFocus,
    setSimulatorRef,
    setSimulatorData,
    setSimulatorDataById,
    setSimulatorStyleById,
    setSimulatorContainer,
    swapTwoComponentIndex,
    deleteBlockById,
    layers
  }
}

// 获取最大层级
export function getMaxIndex(blocks: SimulatorBlock[]) {
  const zIndex = blocks.map(({ style }) => Number(style.zIndex))
  return zIndex.length === 0 ? 0 : Math.max.apply(Math, zIndex)
}

export function useDesignerContext() {
  const context = inject(designerInjectionKey, useDesigner())
  return context;
}
