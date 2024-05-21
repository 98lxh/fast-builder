import type { FC } from "vite-plugin-vueact";

import type { CSSProperties } from "vue"
import { useMoveOverflow } from "../util/overflow";
import { useDesignerContext } from "~/composables/designer"
import { useHistoryContext } from "~/composables/designer/history";
import { type MoveListenerOptions, useDocumentMouseEvent, useEventOutside } from "~/composables/event"
import Editable from "./editable"

import { render } from "@h5-designer/material"
import ContextMenu from "./context-menu";

interface DefineProps {
  translateX: number;
  translateY: number;
}

interface DefineEmits {
  (name: 'updateWrapperRef', wrapperRef: HTMLElement | null): void
}

const Block: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const history = useHistoryContext()
  const designer = useDesignerContext()
  const overflow = useMoveOverflow(designer)

  const wrapperRef = useEventOutside({ event: 'mousedown', isOnlyChildContains: true }, designer.clearBlockFocus)
  const onMousedown = useDocumentMouseEvent({ down, move, up })

  const contextMenuAttrs = shallowReactive({ show: false, left: 0, top: 0, blockId: '' })


  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    const { translateX, translateY } = props
    const { height, width } = designer.simulatorData.value.container
    styles.transform = `translate(${translateX}px,${translateY}px)`
    styles.height = height + 'px'
    styles.width = width + 'px'
    return styles
  })

  function down(_: MouseEvent, block: SimulatorBlock) {
    designer.clearBlockFocus()
    block.focus = true
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
    <div
      class="shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto border-1 dark:border-neutral"
      style={styles.value}
      ref={wrapperRef}
    >
      {designer.simulatorData.value.blocks.map((block) => (
        <Editable
          onMousedown={(evt: MouseEvent) => onMousedown(evt, block)}
          onContextmenu={handleContextMenu}
          key={block.id}
          block={block}
        >
          {render(block.key, block.props)}
        </Editable>
      ))}

      {(() => {
        const { style, id } = overflow.current.value
        if (!style || !id) /*EXCLUDE*/ return null
        const classes = "absolute border-1 border-primary top-0 left-0 duration-150 border-dashed"
        const { left, top, width, height } = style
        const styles: CSSProperties = {
          transform: `translate(${left}px,${top}px)`,
          height: height + 'px',
          width: width + 'px',
        };
        /*EXCLUDE*/ return <div class={classes} style={styles} />
      })()}

      <ContextMenu {...contextMenuAttrs} {...{ 'onUpdate:show': (value: boolean) => contextMenuAttrs.show = value }} />
    </div>
  )
}


export default Block
