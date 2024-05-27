import { type DesignerContext } from "~/composables/designer"
import { cloneDeep } from "@h5-designer/shared"

export type ICurrentBlockStyles = { style: SimulatorBlockStyle | null, id: string }
export const generateCurrentBlock = (): ICurrentBlockStyles => ({ style: null, id: '' })
export const generateCurrentContainer = ():SimulatorContainer => ({ width: 0, height: 0 })

// 移动组件时是否溢出
export function useMoveOverflow(designer: DesignerContext) {
  const { setCurrentBlock, currentBlock, resetCurrentBlock, calculateBlockEdge } = useCurrent()

  // 检查组件在移动中是否溢出并在溢出后做相应处理
  function check() {
    const style = currentBlock.value.style!
    const { width, height } = designer.simulatorData.value.container
    const edge = calculateBlockEdge(designer)
    // 左越界
    if (edge.left < 0) { style.left = 0 }
    // 右越界
    if (edge.right < 0) { style.left = width - style.width }
    // 顶部越界
    if (edge.top < 0) { style.top = 0 }
    // 底部越界
    if (edge.bottom < 0) {
      // 更新容器高度
      designer.setSimulatorContainer({ width, height: height - edge.bottom })
    } else {
      const { container } = designer.simulatorData.value
      const originalHeight = designer.originalContainer.height
      const updateHeight = height - edge.bottom
      if (updateHeight <= originalHeight && container.height !== originalHeight) {
        designer.setSimulatorContainer({ width, height: originalHeight })
      }
    }
  }

  return { currentBlock, setCurrentBlock, resetCurrentBlock, check }
}

// resize组件时是否溢出
export function useResizeOverflow(designer: DesignerContext) {
  const {
    currentBlock,
    setCurrentBlock,
    currentContainer,
    resetCurrentBlock,
    setCurrentContainer,
    resetCurrentContainer,
    calculateContainerEdge,
    calculateBlockEdge
  } = useCurrent()

  // 检查组件在resize时是否溢出并做相应的溢出处理
  function checkBlock() {
    const style = currentBlock.value.style!
    const { width, height } = designer.simulatorData.value.container
    const edge = calculateBlockEdge(designer)
    if (edge.right < 0) { // 右越界
      const updatedWidth = width - style.left
      designer.setSimulatorStyleById(currentBlock.value.id, { ...currentBlock.value.style!, width: updatedWidth })
      style.width = updatedWidth
    }
    if (edge.left < 0) { // 左越界
      const updatedWidth = width - (width - style.width) + edge.left
      const updatedStyle = { top: edge.top < 0 ? 0 : style.top, left: 0, width: updatedWidth }
      designer.setSimulatorStyleById(currentBlock.value.id, { ...currentBlock.value.style!, ...updatedStyle })
      style.width = updatedWidth
    }
    if (edge.top < 0) { // 顶部越界
      const updatedHeight = height - (height - style.height) + edge.top
      const updatedStyle = { left: edge.left < 0 ? 0 : style.left, top: 0, height: updatedHeight }
      designer.setSimulatorStyleById(currentBlock.value.id, { ...currentBlock.value.style!, ...updatedStyle })
      style.height = updatedHeight
    }
    if (edge.bottom < 0) { // 底部越界
      // 更新容器高度
      designer.setSimulatorContainer({ width, height: height + Math.abs(edge.bottom) })
    } else {
      const { container } = designer.simulatorData.value
      const updatedHeight = height - edge.bottom
      const originalHeight = designer.originalContainer.height

      if (updatedHeight <= originalHeight && container.height !== originalHeight) {
        designer.setSimulatorContainer({ width, height: originalHeight })
      }
    }
  }

  // 检查容器在resize时是否溢出并做相应的溢出处理
  function checkContainer() {
    let overflowX = false
    let overflowY = false
    const edge = calculateContainerEdge(designer)
    const { width, height } = currentContainer.value
    if (width < edge.right) {
      const _height = height - edge.bottom
      designer.setSimulatorContainer({ height: _height < 0 ? edge.right : height, width: edge.right }, true)
      overflowX = true
      overflowY = _height < 0
    }
    if (height < edge.bottom) {
      const _width = width - edge.right
      designer.setSimulatorContainer({ height: edge.bottom, width: _width < 0 ? edge.right : width }, true)
      overflowY = true
      overflowX = _width < 0
    }
    return { overflowX, overflowY }
  }

  return {
    resetCurrentBlock,
    resetCurrentContainer,
    setCurrentContainer,
    setCurrentBlock,
    checkContainer,
    checkBlock
  }
}


const useCurrent = () => {
  // 当前组件信息
  const currentBlock = ref(generateCurrentBlock())
  // 重置当前编辑的组件
  const resetCurrentBlock = () => { currentBlock.value = generateCurrentBlock() }
  // 当前容器信息
  const currentContainer = ref(generateCurrentContainer())
  // 重置当前容器信息
  const resetCurrentContainer = () => { currentContainer.value = generateCurrentContainer() }
  const setCurrentContainer = (container: SimulatorContainer) => { currentContainer.value = {...container} }
  // 设置当前组件
  function setCurrentBlock(block: SimulatorBlock) {
    const { style, id } = block
    currentBlock.value = { style: cloneDeep(style), id }
  }
  
  // 计算组件resize后的边缘
  function calculateBlockEdge(designer: DesignerContext) {
    // 容器的宽高
    const { width, height } = designer.simulatorData.value.container
    // 当前组件的样式
    const style = currentBlock.value.style!
    return {
      right: width - (style.left + style.width),
      bottom: height - (style.top + style.height),
      left: style.left,
      top: style.top
    }
  }

  // 计算当前容器边缘
  function calculateContainerEdge(designer: DesignerContext) {
    const { blocks } = designer.simulatorData.value
    const position = blocks.map(({ style }) => ({ right: style.left + style.width, bottom: style.top + style.height }))
    return {
      right: Math.max.apply(Math, position.map(({ right }) => right)),
      bottom: Math.max.apply(Math, position.map(({ bottom }) => bottom)),
    }
  }

  return {
    currentBlock,
    currentContainer,
    calculateBlockEdge,
    calculateContainerEdge,
    setCurrentBlock,
    setCurrentContainer,
    resetCurrentBlock,
    resetCurrentContainer,
  }
}
