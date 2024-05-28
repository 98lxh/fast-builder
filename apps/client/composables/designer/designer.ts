import { devices } from "./device"

export interface DesignerContext {
  data: Ref<DesignerData>
  setData(data: DesignerData): void
  setSimulatorRef(simulator: HTMLElement | null): void
  setBlockById(id: string, block: Block): void
  setBlockStyleById(id: string, style: BlockStyle): void
  setContainer(container: Partial<Container>, isUpdateOriginal?: boolean): void
  simulatorRef: Ref<HTMLElement | null>
  clearBlockFocus(): void
  deleteBlockById(deleteId: string): void
  setBlockFocus(blockId: string): void
  currentBlockID: Ref<string>
}

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')

export const genarateDefaultSimulator = (): DesignerData => ({
  container: { top: 0, left: 0, focus: false, width: devices[0].width, height: devices[0].height },
  blocks: []
})

export function useDesigner(): DesignerContext {
  const data = ref(genarateDefaultSimulator())
  // 模拟器元素
  const simulatorRef = ref<HTMLDivElement | null>(null)
  // 当前编辑的组件的ID
  const currentBlockID = shallowRef("")
  /* 设置模拟器元素 */
  function setSimulatorRef(simulator: HTMLDivElement) {
    simulatorRef.value = simulator
  }
  /* 设置数据 */
  function setData(updatedData: DesignerData) {
    data.value = updatedData
  }
  /* 设置容器 */
  function setContainer(udapteValue: Partial<Container>) {
    const { container } = data.value
    const updatedContainer = { ...container, ...udapteValue }
    data.value.container = updatedContainer
  }
  /* 清除所有组件的focus状态 */
  function clearBlockFocus() {
    currentBlockID.value = ""
    data.value.blocks.forEach(block => block.focus = false)
  }
  /* 设置组件的focus状态根据组件ID */
  function setBlockFocus(blockId: string) {
    const index = data.value.blocks.findIndex(({ id }) => id === blockId)
    if (index < 0) { return }
    clearBlockFocus()
    data.value.blocks[index].focus = true
    currentBlockID.value = blockId
  }

  /* 设置组件属性根据组件的ID */
  function setBlockById(updateId: string, block: Block) {
    const index = data.value.blocks.findIndex(({ id }) => id === updateId)
    if (index < 0) { return }
    data.value.blocks[index] = { ...block }
  }

  /* 根据组件ID设置组件的样式 */
  function setBlockStyleById(updateId: string, style: BlockStyle) {
    const index = data.value.blocks.findIndex(({ id }) => id === updateId)
    if (index < 0) { return }
    const block = data.value.blocks[index]
    data.value.blocks[index] = { ...block, style }
  }

  /* 根据组件ID删除组件 */
  function deleteBlockById(deleteId: string) {
    const index = data.value.blocks.findIndex(({ id }) => id === deleteId)
    if (index === -1) { return }
    data.value.blocks.splice(index, 1)
  }

  //TODO：移到useLayers 
  // function swapTwoComponentIndex(sourceId: string, targetId: string) {
  //   const { blocks } = data.value
  //   const sourceIndex = blocks.findIndex(({ id }) => id === sourceId)
  //   const targetIndex = blocks.findIndex(({ id }) => id === targetId)
  //   if (sourceIndex === -1 || targetIndex === -1) { return }
  //   const source = blocks[sourceIndex].style.zIndex
  //   const target = blocks[targetIndex].style.zIndex
  //   setBlockStyleById(sourceId, { ...blocks[sourceIndex].style, zIndex: target })
  //   setBlockStyleById(targetId, { ...blocks[targetIndex].style, zIndex: source })
  // }

  return {
    setBlockStyleById,
    deleteBlockById,
    setSimulatorRef,
    clearBlockFocus,
    currentBlockID,
    setBlockFocus,
    setContainer,
    setBlockById,
    simulatorRef,
    setData,
    data
  }
}

// 获取最大层级
export function getMaxIndex(blocks: Block[]) {
  const zIndex = blocks.map(({ style }) => Number(style.zIndex))
  return zIndex.length === 0 ? 0 : Math.max.apply(Math, zIndex)
}

export function useDesignerContext() {
  const context = inject(designerInjectionKey, useDesigner())
  return context;
}
