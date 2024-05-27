import type { FC } from "vite-plugin-vueact"

import type { CSSProperties } from "vue"
import { getMaxIndex, useDesignerContext, useHistoryContext } from "~/composables/designer"
import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event"
import type { SourceStyles, BlockTranslate } from "../util/editable"
import { useResizeOverflow } from "../util/overflow"

import {
  blockPlacements,
  containerPlacements,
  generatePointStyles,
  calculateResizeStyle,
  calculateContainerResizeStyle
} from "../util/editable"



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
  const designer = useDesignerContext()
  const history = useHistoryContext()

  /* mouseup时记录一下记录到历史快照中 */
  const onMousedown = useDocumentMouseEvent({ move, down, up: history.record })

  const isContainer = computed(() => props.mode === 'container')
  const overflow = useResizeOverflow(designer)

  /* 组件的focus状态由内部的mouse事件决定而容器的focus状态由父组件传入 */
  const isFocus = computed(() => isContainer.value ? props.focus : props.block && props.block.focus)

  /* 转换容器或组件的位置和尺寸信息为统一的格式 */
  const source = computed(() => isContainer.value ? convertContainerStyles() : convertBlockStyles())
  function convertContainerStyles() {
    const styles: SourceStyles = {} as SourceStyles
    const { simulatorData } = designer
    const { width, height } = simulatorData.value.container
    const { x = 0, y = 0 } = props.translate || {}
    styles.height = height
    styles.width = width
    styles.left = x
    styles.top = y
    return styles
  }

  function convertBlockStyles() {
    const styles: SourceStyles = {} as SourceStyles
    if (!props.block) { return styles }
    const { currentBlockID, simulatorData } = designer
    let { zIndex, width, height, left, top } = props.block.style
    // 当前编辑的组件暂时放到顶层
    if (currentBlockID.value === props.block.id) { zIndex = getMaxIndex(simulatorData.value.blocks) + 1 }
    styles.zIndex = zIndex
    styles.height = height
    styles.width = width
    styles.left = left
    styles.top = top
    return styles
  }

  /* 计算样式 */
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

  /* 控制尺寸的point的Mousedown事件监听器 */
  function down(evt: MouseEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    // 编辑的是组件时记录一下当前的组件
    (props.block && !isContainer.value) && overflow.setCurrentBlock(props.block)
    // 这里返回的相当于是编辑前样式信息,返回给move事件计算时使用
    return source.value
  }

  /* 控制尺寸的point的Mousemove事件监听器 */
  function move(options: MoveListenerOptions<SimulatorBlockStyle>, placement: string) {
    if (isContainer.value || !props.block) {
      // 编辑的是容器更新容器的信息
      const { height, width } = calculateContainerResizeStyle(options, placement)
      const updatedContainer = { height, width }
      designer.setSimulatorContainer(updatedContainer, true)
      overflow.setCurrentContainer(updatedContainer)
      // 检查是否溢出
      overflow.checkContainer()
    } else {
      // 编辑的是组件更新组件样式
      const style = calculateResizeStyle(options, props.block, placement)
      const updatedBlock = { ...props.block, style: { ...style } }
      designer.setSimulatorDataById(props.block.id, updatedBlock)
      overflow.setCurrentBlock(updatedBlock)
      // 检查是否溢出
      overflow.checkBlock()
    }
  }

  function handleContextmenu(evt: MouseEvent) {
    if (isContainer.value) { return emit('contextmenu', evt) }
    emit('contextmenu', evt, props.block ? props.block.id : '')
  }

  function renderResizePoints() {
    if (!isFocus.value) { return null }
    return (isContainer.value ? containerPlacements : blockPlacements).map(placement => (
      <div
        key={placement}
        onMousedown={evt => onMousedown(evt, placement)}
        style={generatePointStyles(placement, source.value)}
        class="h-[8px] w-[8px] absolute bg-primary border-1 border-primary  bg-white z-1"
      />
    ))
  }

  return (
    <div
      onMousedown={evt => !isContainer.value && emit('mousedown', evt)}
      onContextmenu={handleContextmenu}
      style={styles.value}
    >
      {renderResizePoints()}
      {isFocus.value && <div class={`h-full w-full absolute block-focus`} />}
      {slots.default && slots.default()}
    </div>
  )
}


export default Editable
