import type { CSSProperties } from "vue"
import { useEditorContext, useHistoryContext, useMoveOverflow } from "../../../composables";
import Editable from "@fast-builder/editor/components/editable"
import Border from "./border";
import Block from "./block";

import { type MoveListenerOptions, useDocumentMouseEvent, useEventOutside } from "@fast-builder/shared"


function Blocks() {
  const history = useHistoryContext()
  const designer = useEditorContext()
  const overflow = useMoveOverflow(designer)
  const onMousedown = useDocumentMouseEvent({ down, move, up })

  const wrapperRef = useEventOutside({
    isOnlyChildContains: true,
    excludeId: ['attribute'],
    event: 'mousedown'
  }, designer.clearBlockFocus)

  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    const { height, width } = designer.data.value.container
    styles.height = height + 'px'
    styles.width = width + 'px'
    return styles
  })

  function down(_: MouseEvent, block: Block) {
    const { setContainer, setBlockFocus } = designer
    setBlockFocus(block.id)
    setContainer({ focus: false })
    overflow.setCurrentBlock(block)
  }

  function move({ currentY, startX, startY, currentX }: MoveListenerOptions, block: Block) {
    const top = currentY - startY + block.style.top
    const left = currentX - startX + block.style.left
    const style = { ...block.style, left, top }
    const updateBlock = { ...block, style }
    designer.setBlockById(block.id, updateBlock)
    overflow.setCurrentBlock(updateBlock)
    overflow.check()
  }

  function up() {
    overflow.check()
    // 重新设置组件样式 保证组件不出现越界
    designer.setBlockStyleById(overflow.currentBlock.value.id, overflow.currentBlock.value.style!)
    // 重置预览位置元素的状态
    overflow.resetCurrentBlock()
    // 记录当前更改到快照
    history.record()
  }

  onMounted(() => designer.simulatorRef.value = wrapperRef.value!)

  return (
    <Editable mode="container" class="absolute" container={designer.data.value.container}>
      <div
        class="bg-base-100 cursor-auto dark:border-0"
        {...{ 'data-theme': 'light' }}
        style={styles.value}
        ref={wrapperRef}
      >
        <Block onMousedown={onMousedown} />
        <Border currentBlock={overflow.currentBlock.value} />
      </div >
    </Editable>
  )
}


export default Blocks
