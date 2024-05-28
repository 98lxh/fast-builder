import { type DesignerContext } from "~/composables/designer"
import { useCurrent } from "../../util"

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
    calculateResizeBlockEdge
  } = useCurrent()

  // 检查组件在resize时是否溢出并做相应的溢出处理
  function checkBlock() {
    const style = currentBlock.value.style!
    const { width, height } = designer.data.value.container
    const edge = calculateResizeBlockEdge(designer)
    if (edge.right < 0) { // 右越界
      const updatedWidth = width - style.left
      designer.setBlockStyleById(currentBlock.value.id, { ...currentBlock.value.style!, width: updatedWidth })
      style.width = updatedWidth
    }
    if (edge.left < 0) { // 左越界
      const updatedWidth = width - (width - style.width) + edge.left
      const updatedStyle = { top: edge.top < 0 ? 0 : style.top, left: 0, width: updatedWidth }
      designer.setBlockStyleById(currentBlock.value.id, { ...currentBlock.value.style!, ...updatedStyle })
      style.width = updatedWidth
    }
    if (edge.top < 0) { // 顶部越界
      const updatedHeight = height - (height - style.height) + edge.top
      const updatedStyle = { left: edge.left < 0 ? 0 : style.left, top: 0, height: updatedHeight }
      designer.setBlockStyleById(currentBlock.value.id, { ...currentBlock.value.style!, ...updatedStyle })
      style.height = updatedHeight
    }

    if (edge.bottom < 0) { // 底部越界
      // 更新容器高度
      designer.setContainer({ width, height: height + Math.abs(edge.bottom) })
    }
  }

  // 检查容器在resize时是否溢出并做相应的溢出处理
  function checkContainer() {
    const edge = calculateContainerEdge(designer)
    const { width = 0, height = 0 } = currentContainer.value
    if (width < edge.right) {
      const heightDifference = height - edge.bottom
      const updatedHeight = heightDifference < 0 ? edge.bottom : height
      designer.setContainer({ height: updatedHeight, width: edge.right })
    }

    if (height < edge.bottom) {
      const widthDifference = width - edge.right
      const updatedWidth = widthDifference < 0 ? edge.right : width
      designer.setContainer({ width: updatedWidth, height: edge.bottom })
    }
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
