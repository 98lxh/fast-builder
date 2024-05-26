import type { CSSProperties } from "vue"
import type { FC } from "vite-plugin-vueact"
import { getMaxIndex, useDesignerContext } from "~/composables/designer"
import { generatePointStyles, placements, calculateResizeStyle, type SourceStyles, calculateContainerResizeStyle, type BlockTranslate } from "../util/editable"
import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event"
import { useHistoryContext } from "~/composables/designer/history"
import { useResizeOverflow } from "../util/overflow"

interface DefineProps {
  focus?: boolean;
  block?: SimulatorBlock;
  translate?: BlockTranslate;
  mode?: 'container' | 'block';
}

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent): void;
  (name: 'update:translate', translate: BlockTranslate): void;
  (name: 'contextmenu', evt: MouseEvent, blockId?: string): void;
}

const Editable: FC<DefineProps, DefineEmits> = function (props, { emit, slots }) {
  const history = useHistoryContext()
  const designer = useDesignerContext()
  const overflow = useResizeOverflow(designer)
  const onMousedown = useDocumentMouseEvent({ move, down, up: history.record })

  // 容器由外部传入focus受控
  const isControlled = computed(() => props.mode === 'container')
  // 是否选中
  const isFocus = computed(() => isControlled.value ? props.focus : props.block && props.block.focus)

  const translate = useVModel(props, 'translate')

  function generateContainerStyles() {
    const styles: SourceStyles = {} as SourceStyles
    const { simulatorData } = designer
    const { width, height } = simulatorData.value.container
    const { x = 0, y = 0 } = translate.value || {}
    styles.height = height
    styles.width = width
    styles.left = x
    styles.top = y
    return styles
  }

  function generateBlockStyles() {
    const styles: SourceStyles = {} as SourceStyles
    if (!props.block) { return styles }
    let { zIndex, width, height, left, top } = props.block.style
    const { currentBlockID, simulatorData } = designer
    // 当前编辑的块置顶
    if (currentBlockID.value === props.block.id) {
      zIndex = getMaxIndex(simulatorData.value.blocks) + 1
    }
    styles.zIndex = zIndex
    styles.height = height
    styles.width = width
    styles.left = left
    styles.top = top
    return styles
  }

  // 原样式
  const source = computed(() => isControlled.value ? generateContainerStyles() : generateBlockStyles())
  const styles = computed(() => {
    const styles: CSSProperties = {}
    let { zIndex, width, height, left, top } = source.value
    styles.zIndex = zIndex
    styles.width = width + 'px'
    styles.height = height + 'px'
    styles.transform = `translate(${left}px,${top}px)`
    styles.cursor = isFocus ? 'move' : 'pointer'
    return styles
  })

  function down(evt: MouseEvent) {
    evt.stopPropagation()
    evt.preventDefault()
    if (props.block) { overflow.setCurrent(props.block) }
    return source.value
  }

  function move(options: MoveListenerOptions<SimulatorBlockStyle>, placement: string) {
    if (isControlled.value || !props.block) {
      const { height, width, top, left } = calculateContainerResizeStyle(options, placement)
      designer.setSimulatorContainer({ height, width }, true)
      translate.value = { x: left, y: top }
    } else {
      const style = calculateResizeStyle(options, props.block, placement)
      const updatedBlock = { ...props.block, style: { ...style } }
      designer.setSimulatorDataById(props.block.id, updatedBlock)
      overflow.setCurrent(updatedBlock)
      overflow.check()
    }
  }

  function handleContextmenu(evt: MouseEvent) {
    if (isControlled.value) { return emit('contextmenu', evt) }
    emit('contextmenu', evt, props.block ? props.block.id : '')
  }

  return (
    <div
      onMousedown={evt => !isControlled.value && emit('mousedown', evt)}
      onContextmenu={handleContextmenu}
      style={styles.value}
    >
      {(() => {
        if (!isFocus.value) /*EXCLUDE*/ return null
        /*EXCLUDE*/ return placements.map(placement => (
          <div
            class="h-[8px] w-[8px] absolute bg-primary border-1 border-primary  bg-white z-1"
            style={generatePointStyles(placement, source.value)}
            onMousedown={evt => onMousedown(evt, placement)}
            key={placement}
          />
        ))
      })()}

      {isFocus.value && <div class={`h-full w-full absolute block-focus`} />}
      {slots.default && slots.default()}
    </div>
  )
}


export default Editable
