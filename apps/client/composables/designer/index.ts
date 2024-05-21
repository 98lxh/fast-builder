import type { ComputedGetter } from "vue";
import { devices } from "./device"

interface simulatorLayer {
  id: string;
  label: string;
  zIndex: number;
}

export interface DesignerContext {
  setSimulatorRef(simulator: HTMLDivElement | null): void // 设置元素
  setSimulatorDataById(id: string, block: SimulatorBlock): void // 根据block id设置block
  setSimulatorStyleById(id: string, style: SimulatorBlockStyle): void // 根据block id 设置 block style
  setSimulatorContainer(container: SimulatorContainer, isUpdateOriginal?: boolean): void // 设置容器
  setSimulatorData(data: SimulatorData): void // 设置数据
  originalContainer: SimulatorContainer // 原容器
  simulatorRef: Ref<HTMLDivElement | null> // 元素
  simulatorData: Ref<SimulatorData> // 数据
  clearBlockFocus(): void // 清除所有block的focus状态
  swapTwoComponentIndex(sourceId: string, targetId: string): void
  deleteBlockById(deleteId: string): void
  layers: ComputedRef<simulatorLayer[]>
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

  const layers = computed(() => {
    const { blocks } = simulatorData.value
    const _layers: simulatorLayer[] = blocks.map(({ id, style, label }) => ({ id, label, zIndex: style.zIndex }))
    _layers.sort((a, b) => b.zIndex - a.zIndex)
    return _layers
  })

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
    simulatorRef,
    simulatorData,
    clearBlockFocus,
    setSimulatorRef,
    setSimulatorData,
    originalContainer,
    setSimulatorDataById,
    setSimulatorStyleById,
    setSimulatorContainer,
    swapTwoComponentIndex,
    deleteBlockById,
    layers
  }
}

export function useDesignerContext() {
  const context = inject(designerInjectionKey, useDesigner())
  return context;
}
