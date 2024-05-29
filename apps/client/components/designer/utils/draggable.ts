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

function generateLayer(blocks: Block[]) {
  const { key, text } = currentComponent!
  const index = blocks.filter(block => block.key === key).length

  function generator(index: number, text: string) {
    const layer = `${text} ${index}`
    const block = blocks.find(block => block.layer === layer)
    if (block) { return generator(index + 1, text) }
    return layer
  }

  return generator(index + 1, text)
}

function generateDropEventListener(designer: DesignerContext, record?: () => void) {
  const { setData, data, simulatorRef } = designer
  return function (evt: DragEvent) {
    if (!currentComponent || !simulatorRef.value) { return }

    const rect = simulatorRef.value.getBoundingClientRect()

    const style = {
      ...currentComponent.style,
      left: evt.clientX - rect.x,
      top: evt.clientY - rect.y,
      zIndex: getMaxIndex(data.value.blocks) + 1
    }

    const block = {
      id: nanoid(),
      key: currentComponent.key,
      icon: currentComponent.icon,
      label: currentComponent.text,
      layer: generateLayer(data.value.blocks),
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

