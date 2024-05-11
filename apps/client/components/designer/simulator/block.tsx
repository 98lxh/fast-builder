import type { FC } from "vite-plugin-vueact";

import type { CSSProperties } from "vue"
import { useDesignerContext } from "~/composables/designer"
import { useHistoryContext } from "~/composables/designer/history";
import Editable from "./editable"

import { render } from "@h5-designer/material"

import {
  type MoveListenerOptions,
  useDocumentMouseEvent,
  useEventOutside,
} from "~/composables/event"

interface DefineProps {
  translateX: number;
  translateY: number;
}

interface DefineEmits {
  (name: 'updateWrapperRef', wrapperRef: HTMLElement | null): void
}


const Block: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const designer = useDesignerContext()
  const history = useHistoryContext()

  const wrapperRef = useEventOutside({ event: 'mousedown', isOnlyChildContains: true }, designer.clearBlockFocus)
  const onMousedown = useDocumentMouseEvent({ down, move, up })

  // 当前操作的组件样式
  const current = ref<{ style: SimulatorBlockStyle | null, id: string }>({ style: null, id: '' })

  const styles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {}
    const { height, width } = designer.simulatorData.value.container
    const { translateX, translateY } = props
    styles.transform = `translate(${translateX}px,${translateY}px)`
    styles.height = height + 'px'
    styles.width = width + 'px'
    return styles
  })

  function down(_: MouseEvent, block: SimulatorBlock) {
    designer.clearBlockFocus()
    block.focus = true

    const { id, style } = block
    current.value = { id, style: { ...style } }
  }

  function move({ currentY, startX, startY, currentX }: MoveListenerOptions, block: SimulatorBlock) {
    const top = currentY - startY + block.style.top
    const left = currentX - startX + block.style.left
    const style = { ...block.style, left, top }
    designer.setSimulatorDataById(block.id, { ...block, style })

    current.value = {
      id: block.id,
      style: { ...style },
    }

    current.value.style && checkOverflow()
  }

  function checkOverflow() {
    const { width, height } = designer.simulatorData.value.container
    const style = current.value.style!
    const overflow = {
      top: style.top,
      left: style.left,
      right: (style.width + style.left) - width,
      bottom: (style.top + style.height) - height
    }
    // 左越界
    if (overflow.left < 0) { style.left = 0 }
    // 顶部越界
    if (overflow.top < 0) { style.top = 0 }
    // 右越界
    if (overflow.right > 0) {
      style.left = width - style.width
    }
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

  function up() {
    // 重新设置组件样式 保证组件不出现越界
    designer.setSimulatorStyleById(current.value.id, current.value.style!)
    // 重置预览位置元素的状态
    current.value = { id: '', style: null }
    // 记录当前更改到快照
    history.record()
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
          block={block}
          key={block.id}
        >
          {render(block.key, block.props)}
        </Editable>
      ))}

      {(() => {
        if (!current.value.style) /*EXCLUDE*/ return null
        const classes = "absolute border-1 border-primary top-0 left-0 duration-150 border-dashed"
        const { left, top, width, height } = current.value.style
        const styles: CSSProperties = {
          transform: `translate(${left}px,${top}px)`,
          height: height + 'px',
          width: width + 'px',
        };
        /*EXCLUDE*/ return <div class={classes} style={styles} />
      })()}
    </div>
  )
}


export default Block
