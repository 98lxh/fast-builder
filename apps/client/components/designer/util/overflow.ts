import { type DesignerContext } from "~/composables/designer"


export type ICurrentBlockStyles = { style: SimulatorBlockStyle | null, id: string }
export const generateCurrentBlock = (): ICurrentBlockStyles => ({ style: null, id: '' })

// 移动组件时是否溢出
export function useMoveOverflow(designer: DesignerContext) {
  const { setCurrent, current, reset } = useCurrent()

  function check() {
    const style = current.value.style!
    const { width, height } = designer.simulatorData.value.container

    const overflow = {
      right: width - (style.width + style.left),
      bottom: height - (style.top + style.height),
      left: style.left,
      top: style.top
    }

    // 左越界
    if (overflow.left < 0) { style.left = 0 }
    // 右越界
    if (overflow.right < 0) { style.left = width - style.width }
    // 顶部越界
    if (overflow.top < 0) { style.top = 0 }
    // 底部越界
    if (overflow.bottom < 0) {
      // 更新容器高度
      designer.setSimulatorContainer({ width, height: height - overflow.bottom })
    } else {
      const { container } = designer.simulatorData.value
      const originalHeight = designer.originalContainer.height
      const updateHeight = height - overflow.bottom
      if (updateHeight <= originalHeight && container.height !== originalHeight) {
        designer.setSimulatorContainer({ width, height: originalHeight })
      }
    }
  }

  return { current, check, setCurrent, reset }
}

// resize组件时是否溢出
export function useResizeOverflow(designer: DesignerContext) {
  const { current, ...rest } = useCurrent()

  function check() {
    const { width, height } = designer.simulatorData.value.container
    const style = current.value.style!

    const overflow = {
      right: width - (style.left + style.width),
      bottom: height - (style.top + style.height),
      left: style.left,
      top: style.top
    }

    if (overflow.right < 0) { // 右越界
      const updatedWidth = width - style.left
      designer.setSimulatorStyleById(current.value.id, { ...current.value.style!, width: updatedWidth })
      style.width = updatedWidth
    }

    if (overflow.left < 0) { // 左越界
      const updatedWidth = width - (width - style.width) + overflow.left
      const updatedStyle = { top: overflow.top < 0 ? 0 : style.top, left: 0, width: updatedWidth }
      designer.setSimulatorStyleById(current.value.id, { ...current.value.style!, ...updatedStyle })
      style.width = updatedWidth
    }

    if (overflow.top < 0) { // 顶部越界
      const updatedHeight = height - (height - style.height) + overflow.top
      const updatedStyle = { left: overflow.left < 0 ? 0 : style.left, top: 0, height: updatedHeight }
      designer.setSimulatorStyleById(current.value.id, { ...current.value.style!, ...updatedStyle })
      style.height = updatedHeight
    }

    if (overflow.bottom < 0) { // 底部越界
      // 更新容器高度
      designer.setSimulatorContainer({ width, height: height + Math.abs(overflow.bottom) })
    } else {
      const { container } = designer.simulatorData.value
      const originalHeight = designer.originalContainer.height
      const updatedHeight = height - overflow.bottom
      if (updatedHeight <= originalHeight && container.height !== originalHeight) {
        designer.setSimulatorContainer({ width, height: originalHeight })
      }
    }
  }

  return { current, check, ...rest }
}


function useCurrent() {
  const current = ref(generateCurrentBlock())
  return {
    reset: () => { current.value = generateCurrentBlock() },
    setCurrent(block: SimulatorBlock) {
      const { style, id } = block
      current.value = { style: cloneDeep(style), id }
    },
    current
  }
}
