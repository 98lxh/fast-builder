import type { FC } from "vite-plugin-vueact"
import { CSSProperties } from "vue"

import { useEditorContext, useHistoryContext } from "@fast-builder/editor/composables"
import { useDocumentMouseEvent, type MoveListenerOptions } from "@fast-builder/shared"

import {
  calculateContainerResizeStyle,
  convertContainerStyles,
  calculateResizeStyle,
  type BlockTranslate,
  convertBlockStyles,
  useResizeOverflow
} from "../../composables"

import Points from "./editable-points"
import Border from "./editabl-border"
import Title from "./editable-title"
import Size from "./editable-size"


interface DefineProps {
  block?: Block;
  container?: Container;
  mode?: 'container' | 'block';
}

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent): void;
  (name: 'update:translate', translate: BlockTranslate): void;
  (name: 'contextmenu', evt: MouseEvent, blockId?: string): void;
}

const Editable: FC<DefineProps, DefineEmits> = function (props, { emit, slots }) {
  const editor = useEditorContext()
  const history = useHistoryContext()

  const onMousedown = useDocumentMouseEvent<BlockStyle>({
    /* move时更新(容器or组件)的样式 */
    move: (options, placement) => isContainer.value ? updateContainer(options!, placement) : updateBlock(options!, placement),
    /* mouseup时记录一下记录到历史快照中 */
    up: history.record,
    /* 设置选中状态并保存按下鼠标时的(容器or组件)的样式 */
    down
  })

  const state = shallowReactive({ focus: false, hover: false })
  const isContainer = computed(() => props.mode === 'container')
  const overflow = useResizeOverflow(editor)

  /* 转换容器或组件的位置和尺寸信息为统一的格式 */
  const source = computed(() => {
    if (isContainer.value) { return convertContainerStyles(props.container!, editor.zoom.value) }
    return convertBlockStyles(editor, props.block!)
  })

  /* 计算样式 */
  const styles = computed(() => {
    const styles: CSSProperties = {}
    let { zIndex, width, height, left, top, zoom } = source.value
    styles.zIndex = zIndex
    styles.width = width + 'px'
    styles.height = height + 'px'
    styles.transform = `translate(${left}px,${top}px)`
    if (zoom) styles.transform += ` scale(${zoom})`
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

  /* 编辑的时容器更新容器的信息 */
  function updateContainer(options: MoveListenerOptions<BlockStyle>, placement: string) {
    const { height, width, top, left } = calculateContainerResizeStyle(options, placement)
    const updatedContainer = { height, width, top, left }
    editor.setContainer(updatedContainer)
    overflow.setCurrentContainer(editor.data.value.container)
    overflow.checkContainer()
  }

  /* 编辑时组件更新组件样式 */
  function updateBlock(options: MoveListenerOptions<BlockStyle>, placement: string) {
    const style = calculateResizeStyle(options, props.block!, placement)
    const updatedBlock = { ...props.block!, style: { ...style } }
    editor.setBlockById(props.block!.id, updatedBlock)
    overflow.setCurrentBlock(updatedBlock)
    overflow.checkBlock()
  }

  function handleContextmenu(evt: MouseEvent) {
    if (isContainer.value) { return emit('contextmenu', evt) }
    emit('contextmenu', evt, props.block ? props.block.id : '')
  }

  const onMouseenter = () => state.hover = true
  const onMouseleave = () => state.hover = false

  watch(() => [props.block?.focus, props.container?.focus], ([block, container]) => state.focus = !!(block || container), {
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
        isContainer={isContainer.value}
        onMouseenter={onMouseenter}
        onMouseleave={onMouseleave}
        hover={state.hover}
      />

      {/* 编辑点位 */}
      <Points
        isContainer={isContainer.value}
        onMousedown={onMousedown}
        style={source.value}
        focus={state.focus}
      />

      {/* 预览边框 */}
      <Border
        isContainer={isContainer.value}
        hover={state.hover}
        focus={state.focus}
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
