import { cloneDeep } from "@fast-builder/shared"
import type { EditorContext } from "../context"

export const generateCurrentBlock = (): Block => ({ style: { top: 0, left: 0, width: 0, height: 0, zIndex: 0 }, id: '' } as Block)
export const generateCurrentContainer = (): Partial<Container> => ({ width: 0, height: 0 })

export function useCurrent() {
  /* 当前组件信息 */
  const currentBlock = ref(generateCurrentBlock())
  /* 重置当前编辑的组件 */
  const resetCurrentBlock = () => { currentBlock.value = generateCurrentBlock() }
  /* 当前容器信息 */
  const currentContainer = ref(generateCurrentContainer())
  /* 重置当前容器信息 */
  const resetCurrentContainer = () => { currentContainer.value = generateCurrentContainer() }
  /* 设置当前容器 */
  const setCurrentContainer = (container: Container) => { currentContainer.value = { ...container } }

  /* 设置当前组件 */
  function setCurrentBlock(block: Block) {
    const { style, id } = block
    currentBlock.value = { style: cloneDeep(style), id } as Block
  }

  /* 计算组件resize后的边缘 */
  function calculateResizeBlockEdge(designer: EditorContext) {
    // 组件resize后
    const { width, height } = designer.data.value.container
    // 当前组件的样式
    const style = currentBlock.value.style!
    const top = style.top
    const left = style.left
    const right = width - (style.left + style.width)
    const bottom = height - (style.top + style.height)
    return { right, bottom, left, top }
  }

  /* 计算组件move后的边缘 */
  function calculateMoveBlockEdge(designer: EditorContext) {
    // 组件移动后..
    const { width, height } = designer.data.value.container
    // 当前组件的样式
    const style = currentBlock.value.style!
    const left = style.left
    const top = style.top
    const right = width - (style.width + style.left)
    const bottom = height - (style.top + style.height)
    return { right, bottom, left, top }
  }

  /* 计算当前容器边缘 */
  function calculateContainerEdge(designer: EditorContext) {
    const { blocks } = designer.data.value
    const position = blocks.map(block => ({ right: block.style.left + block.style.width, bottom: block.style.top + block.style.height }))
    const right = Math.max.apply(Math, position.map(({ right }) => right))
    const bottom = Math.max.apply(Math, position.map(({ bottom }) => bottom))
    return { right, bottom }
  }

  return {
    calculateResizeBlockEdge,
    calculateMoveBlockEdge,
    calculateContainerEdge,
    resetCurrentContainer,
    setCurrentContainer,
    resetCurrentBlock,
    currentContainer,
    setCurrentBlock,
    currentBlock,
  }
}
