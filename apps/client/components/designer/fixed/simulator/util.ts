import type { DesignerContext } from "~/composables/designer"
import { useCurrent } from "../current"

// 移动组件时是否溢出
export function useMoveOverflow(designer: DesignerContext) {
  const { setCurrentBlock, currentBlock, resetCurrentBlock, calculateMoveBlockEdge } = useCurrent()
  // 检查组件在移动中是否溢出并在溢出后做相应处理
  function check() {
    const style = currentBlock.value.style!
    const { width, height } = designer.data.value.container
    const edge = calculateMoveBlockEdge(designer)
    // 左越界
    if (edge.left < 0) { style.left = 0 }
    // 右越界
    if (edge.right < 0) { style.left = width - style.width }
    // 顶部越界
    if (edge.top < 0) { style.top = 0 }
    // 底部越界
    if (edge.bottom < 0) {
      // 更新容器高度
      designer.setContainer({ width, height: height - edge.bottom })
    }
  }
  return { currentBlock, setCurrentBlock, resetCurrentBlock, check }
}
