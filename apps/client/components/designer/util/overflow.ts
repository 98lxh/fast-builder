import { type DesignerContext } from "~/composables/designer"


export type ICurrentBlockStyles = { style: SimulatorBlockStyle | null, id: string }
export const generateCurrentBlock = (): ICurrentBlockStyles => ({ style: null, id: '' })


// 移动组件时是否溢出
export function useBlockMoveOverflow(designer: DesignerContext) {
  const { setCurrent, current, resetCurrent } = useCurrentBlock()

  function check() {
    const { width, height } = designer.simulatorData.value.container
    const style = current.value.style!
    const overflow = { right: (style.width + style.left) - width, bottom: (style.top + style.height) - height }
    // 左越界
    if (style.left < 0) { style.left = 0 }
    // 顶部越界
    if (style.top < 0) { style.top = 0 }
    // 右越界
    if (overflow.right > 0) { style.left = width - style.width }
    // 底部越界
    if (overflow.bottom > 0) {
      // 更新容器高度
      designer.setSimulatorContainer({ width, height: height + overflow.bottom })
    } else {
      const { container } = designer.simulatorData.value
      const originalHeight = designer.originalContainer.height
      const updateHeight = height + overflow.bottom
      if (updateHeight <= originalHeight && container.height !== originalHeight) {
        designer.setSimulatorContainer({ width, height: originalHeight })
      }
    }
  }

  return { current, setCurrent, resetCurrent, check }
}


// resize组件时是否溢出
export function useBlockResizeOverflow(designer: DesignerContext) {
  const { current, ...rest } = useCurrentBlock()

  function check() {
    const { width, height } = designer.simulatorData.value.container
    const style = current.value.style!

    const overflow = {
      right: width - (style.left + style.width),
      bottom: height - (style.top + style.height),
    }

    if (overflow.right < 0) { // 右越界
      const updatedWidth = width - style.left
      designer.setSimulatorStyleById(current.value.id, { ...current.value.style!, width: updatedWidth })
      style.width = updatedWidth
    }

    if (overflow.bottom < 0) { // 底部越界
      const updatedHeight = height - style.top
      designer.setSimulatorStyleById(current.value.id, { ...current.value.style!, height: updatedHeight })
      style.height = updatedHeight
    }
  }

  return { current, check, ...rest }
}


function useCurrentBlock() {
  const current = ref(generateCurrentBlock())

  function setCurrent(block: SimulatorBlock) {
    const { style, id } = block
    current.value = { style: cloneDeep(style), id }
  }

  return {
    current,
    setCurrent,
    resetCurrent: () => { current.value = generateCurrentBlock() }
  }
}
