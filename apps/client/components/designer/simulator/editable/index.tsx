import type { FC } from "vite-plugin-vueact"

import type { CSSProperties } from "vue"
import { getMaxIndex, useDesignerContext, useHistoryContext } from "~/composables/designer"
import { useDocumentMouseEvent, type MoveListenerOptions } from "~/composables/event"
import { useResizeOverflow } from "../../util/overflow"


import Border from "./editable-border"
import Points from "./editable-points"
import Title from "./editable-title"
import Size from "./editable-size"

import {
  type BlockTranslate,
  calculateResizeStyle,
  calculateContainerResizeStyle,
  convertContainerStyles,
  convertBlockStyles
} from "../../util/editable"

interface DefineProps {
  block?: SimulatorBlock;
  container?: SimulatorContainer;
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

  const state = shallowReactive({ focus: false, hover: false })
  const isContainer = computed(() => props.mode === 'container')
  const overflow = useResizeOverflow(designer)

  /* 转换容器或组件的位置和尺寸信息为统一的格式 */
  const source = computed(() => {
    if (isContainer.value) { return convertContainerStyles(props.container!) }
    return convertBlockStyles(designer, props.block!)
  })

  /* 计算样式 */
  const styles = computed(() => {
    const styles: CSSProperties = {}
    let { zIndex, width, height, left, top } = source.value
    styles.zIndex = zIndex
    styles.width = width + 'px'
    styles.height = height + 'px'
    styles.transform = `translate(${left}px,${top}px)`
    styles.cursor = state.focus ? 'move' : 'pointer'
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
      designer.setSimulatorContainer(updatedContainer)
      overflow.setCurrentContainer(designer.simulatorData.value.container)
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

  const onMouseenter = () => state.hover = true
  const onMouseleave = () => state.hover = false

  // 编辑的是组件时focus状态由组件的focus决定
  watch(() => [props.block?.focus, props.container?.focus], ([block, container]) => {
    state.focus = !!(block || container)
  }, {
    immediate: true
  })

  return (
    <div
      id="editable"
      onMousedown={evt => !isContainer.value && emit('mousedown', evt)}
      onMouseenter={!isContainer.value ? onMouseenter : undefined}
      onMouseleave={!isContainer.value ? onMouseleave : undefined}
      onContextmenu={handleContextmenu}
      style={styles.value}
    >
      {/* 容器的标题 */}
      <Title
        hover={state.hover}
        isContainer={isContainer.value}
        onMouseenter={onMouseenter}
        onMouseleave={onMouseleave}
      />

      {/* 编辑点位 */}
      <Points
        style={source.value}
        focus={state.focus}
        onMousedown={onMousedown}
        isContainer={isContainer.value}
      />

      {/* 预览边框 */}
      <Border
        hover={state.hover}
        focus={state.focus}
        isContainer={isContainer.value}
      />

      {/* 尺寸信息 */}
      <Size
        isContainer={isContainer.value}
        container={props.container}
        block={props.block}
        focus={state.focus}
      />

      {slots.default && slots.default()}
    </div>
  )
}

export default Editable
