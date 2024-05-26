import type { FC } from "vite-plugin-vueact";

import type { CSSProperties } from "vue"
import { useMoveOverflow } from "../util/overflow";
import { getMaxIndex, useDesignerContext } from "~/composables/designer"
import { useHistoryContext } from "~/composables/designer/history";
import { type MoveListenerOptions, useDocumentMouseEvent, useEventOutside } from "~/composables/event"
import type { BlockTranslate } from "../util/editable";
import Editable from "./editable"

import { ContextMenu } from "~/components/common";
import { render } from "@h5-designer/material"

interface DefineProps {
  translate?: BlockTranslate;
}

interface DefineEmits {
  (name: 'updateWrapperRef', wrapperRef: HTMLElement | null): void;
  (name: 'update:translate', translate: BlockTranslate): void;
}

const Block: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const history = useHistoryContext()
  const designer = useDesignerContext()
  const overflow = useMoveOverflow(designer)
  const onMousedown = useDocumentMouseEvent({ down, move, up })
  const contextMenuAttrs = shallowReactive({ show: false, left: 0, top: 0, blockId: '' })

  const wrapperRef = useEventOutside({ isOnlyChildContains: true, event: 'mousedown' }, designer.clearBlockFocus)

  const blockTranslate = useVModel(props, 'translate')

  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    const { height, width } = designer.simulatorData.value.container
    styles.height = height + 'px'
    styles.width = width + 'px'
    return styles
  })

  function down(_: MouseEvent, block: SimulatorBlock) {
    designer.setBlockFocus(block.id)
    overflow.setCurrent(block)
  }

  function move({ currentY, startX, startY, currentX }: MoveListenerOptions, block: SimulatorBlock) {
    const top = currentY - startY + block.style.top
    const left = currentX - startX + block.style.left
    const style = { ...block.style, left, top }
    const updateBlock = { ...block, style }
    designer.setSimulatorDataById(block.id, updateBlock)
    overflow.setCurrent(updateBlock)
    overflow.check()
  }

  function up() {
    overflow.check()
    // 重新设置组件样式 保证组件不出现越界
    designer.setSimulatorStyleById(overflow.current.value.id, overflow.current.value.style!)
    // 重置预览位置元素的状态
    overflow.reset()
    // 记录当前更改到快照
    history.record()
  }

  function handleContextMenu(evt: MouseEvent, blockId: string) {
    evt.preventDefault()
    const { pageX, pageY } = evt
    contextMenuAttrs.blockId = blockId
    contextMenuAttrs.left = pageX
    contextMenuAttrs.top = pageY
    contextMenuAttrs.show = true
  }

  onMounted(() => emit('updateWrapperRef', wrapperRef.value))

  return (
    <Editable
      focus={true}
      mode="container"
      class="absolute top-[95px] left-[calc(50%-150px)]"
      v-model:translate={blockTranslate.value}
    >
      <div
        class={`bg-base-100 cursor-auto dark:border-0 relative`}
        {...{ 'data-theme': 'light' }}
        style={styles.value}
        ref={wrapperRef}
      >
        {designer.simulatorData.value.blocks.map((block) => (
          <Editable
            mode="block"
            class="absolute top-0 left-0 select-none"
            onMousedown={(evt: MouseEvent) => onMousedown(evt, block)}
            onContextmenu={handleContextMenu}
            key={block.id}
            block={block}
          >{render(block.key, block.props)}
          </Editable>
        ))}
        {(() => {
          const { style, id } = overflow.current.value
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
        <ContextMenu {...contextMenuAttrs} {...{ 'onUpdate:show': (value: boolean) => contextMenuAttrs.show = value }} />
      </div >
    </Editable>
  )
}


export default Block
