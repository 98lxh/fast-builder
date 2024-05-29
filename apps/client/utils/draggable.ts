import type { MaterialComponent } from "@h5-designer/material";
import { getMaxIndex, type DesignerContext } from "~/composables/designer";
import { nanoid } from "nanoid"

let currentComponent: null | MaterialComponent = null
let currentDropEventListener: null | ((evt: DragEvent) => void) = null

function onDragenter(evt: DragEvent) {
  evt.dataTransfer!.dropEffect = 'move';
}

function onDragover(evt: DragEvent) {
  evt.preventDefault();
}

function onDragleave(evt: DragEvent) {
  evt.dataTransfer!.dropEffect = 'none';
}

function generateBlockName(blocks: Block[]) {
  const { key, text } = currentComponent!
  // 找出同类组件的长度
  const length = blocks.filter(block => block.key === key).length
  const generator = (index: number, text: string) => {
    // 生成一个默认名称： 文本组件 1
    const name = `${text} ${index}`
    // 查看是否存在这个组件名
    const block = blocks.find(block => block.name === name)
    if (block) return generator(index + 1, text)
    return name
  }
  return generator(length + 1, text)
}

function generateDropEventListener(designer: DesignerContext, record?: () => void) {
  const { setData, data, simulatorRef } = designer
  return function (evt: DragEvent) {
    if (!currentComponent || !simulatorRef.value) { return }
    const rect = simulatorRef.value.getBoundingClientRect()

    const style = {
      ...currentComponent.style,
      top: evt.clientY - rect.y,
      left: evt.clientX - rect.x,
      zIndex: getMaxIndex(data.value.blocks) + 1
    }

    const block = {
      id: nanoid(),
      name: generateBlockName(designer.data.value.blocks),
      key: currentComponent.key,
      icon: currentComponent.icon,
      label: currentComponent.text,
      focus: false,
      style
    }

    setData({ ...data.value, blocks: [...data.value.blocks, block] })
    record && record()
    currentComponent = null
  }
}

export function onDragstart(_: DragEvent, record: () => void, designer?: DesignerContext, component?: MaterialComponent) {
  const simulator = designer?.simulatorRef.value;
  if (!simulator || !component) { return }
  simulator.addEventListener('dragenter', onDragenter);
  simulator.addEventListener('dragover', onDragover);
  simulator.addEventListener('dragleave', onDragleave);
  currentDropEventListener = generateDropEventListener(designer!, record);
  simulator.addEventListener('drop', currentDropEventListener);
  currentComponent = component;
}


export function onDragend(_: DragEvent, designer?: DesignerContext) {
  const simulator = designer?.simulatorRef.value;

  if (!simulator || !currentDropEventListener) { return }
  simulator.removeEventListener('dragenter', onDragenter);
  simulator.removeEventListener('dragover', onDragover);
  simulator.removeEventListener('dragleave', onDragleave);
  simulator.removeEventListener('drop', currentDropEventListener);
  currentDropEventListener = null;
}

