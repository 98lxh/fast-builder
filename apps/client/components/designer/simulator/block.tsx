import type { FC } from "vite-plugin-vueact";

import type { CSSProperties } from "vue"
import { useMoveOverflow } from "../util/overflow";
import { getMaxIndex, useDesignerContext, useHistoryContext } from "~/composables/designer"
import { type MoveListenerOptions, useDocumentMouseEvent, useEventOutside } from "~/composables/event"
import Editable from "./editable"

import { render } from "@h5-designer/material"

interface DefineProps { }

interface DefineEmits {
  (name: 'updateWrapperRef', wrapperRef: HTMLElement | null): void;
}

const Block: FC<DefineProps, DefineEmits> = function (_, { emit }) {
  const history = useHistoryContext()
  const designer = useDesignerContext()
  const overflow = useMoveOverflow(designer)
  const onMousedown = useDocumentMouseEvent({ down, move, up })

  const wrapperRef = useEventOutside({ isOnlyChildContains: true, event: 'mousedown' }, designer.clearBlockFocus)

  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    const { height, width } = designer.simulatorData.value.container
    styles.height = height + 'px'
    styles.width = width + 'px'
    return styles
  })

  function down(_: MouseEvent, block: SimulatorBlock) {
    const { setSimulatorContainer, setBlockFocus } = designer
    setBlockFocus(block.id)
    setSimulatorContainer({ focus: false })
    overflow.setCurrentBlock(block)
  }

  function move({ currentY, startX, startY, currentX }: MoveListenerOptions, block: SimulatorBlock) {
    const top = currentY - startY + block.style.top
    const left = currentX - startX + block.style.left
    const style = { ...block.style, left, top }
    const updateBlock = { ...block, style }
    designer.setSimulatorDataById(block.id, updateBlock)
    overflow.setCurrentBlock(updateBlock)
    overflow.check()
  }

  function up() {
    overflow.check()
    // 重新设置组件样式 保证组件不出现越界
    designer.setSimulatorStyleById(overflow.currentBlock.value.id, overflow.currentBlock.value.style!)
    // 重置预览位置元素的状态
    overflow.resetCurrentBlock()
    // 记录当前更改到快照
    history.record()
  }

  onMounted(() => emit('updateWrapperRef', wrapperRef.value))

  return (
    <Editable
      mode="container"
      class="absolute top-[100px] left-[calc(50%-150px)]"
      container={designer.simulatorData.value.container}
    >
      <div
        class="bg-base-100 cursor-auto dark:border-0 relative top-[50%] left-[50%] translate-[-50%]"
        {...{ 'data-theme': 'light' }}
        style={styles.value}
        ref={wrapperRef}
      >
        {designer.simulatorData.value.blocks.map((block) => (
          <Editable
            mode="block"
            class="absolute top-0 left-0 select-none"
            onMousedown={(evt: MouseEvent) => onMousedown(evt, block)}
            key={block.id}
            block={block}
          >{render(block.key, block.props)}
          </Editable>
        ))}
        {(() => {
          const { style, id } = overflow.currentBlock.value
          if (!style || !id) /*EXCLUDE*/ return null
          const classes = "absolute border-1 border-primary top-0 left-0 duration-150 border-dashed"
          const { left, top, width, height } = style
          const zIndex = getMaxIndex(designer.simulatorData.value.blocks)
          const styles: CSSProperties = {
            transform: `translate(${left}px,${top}px)`,
            height: height + 'px',
            width: width + 'px',
            zIndex
          };
        /*EXCLUDE*/ return <div class={classes} style={styles} />
        })()}
      </div >
    </Editable>
  )
}


export default Block
