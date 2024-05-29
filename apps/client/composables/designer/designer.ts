import { devices } from "~/constants/devices"

export const designerInjectionKey: InjectionKey<DesignerContext> = Symbol('DESIGNER_INJECTION_KEY')

export const genarateDefaultData = (): DesignerData => ({
  container: { top: 0, left: 0, focus: false, name: devices[0].name, width: devices[0].width, height: devices[0].height },
  blocks: []
})

export function useDesigner() {
  const data = ref(genarateDefaultData())
  // 左右侧面边的折叠状态
  const collapse = shallowReactive({ left: false, right: false })
  // 模拟器元素
  const simulatorRef = ref<HTMLElement | null>(null)
  // 当前编辑的组件的ID
  const currentBlockID = shallowRef("")
  // 当前编辑的组件
  const currentBlock = computed(() => {
    const block = data.value.blocks.find(({ id }) => currentBlockID.value === id)
    return block
  })
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

  return {
    collapse,
    setBlockStyleById,
    deleteBlockById,
    clearBlockFocus,
    currentBlockID,
    currentBlock,
    setBlockFocus,
    setContainer,
    setBlockById,
    simulatorRef,
    setData,
    data
  }
}

export type DesignerContext = ReturnType<typeof useDesigner>

// 获取最大层级
export function getMaxIndex(blocks: Block[]) {
  const zIndex = blocks.map(({ style }) => Number(style.zIndex))
  return zIndex.length === 0 ? 0 : Math.max.apply(Math, zIndex)
}

export function useDesignerContext() {
  const context = inject(designerInjectionKey, useDesigner())
  return context;
}
