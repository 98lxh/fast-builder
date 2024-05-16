import type { MaterialComponent } from "@h5-designer/material";
import type { DesignerContext } from "~/composables/designer";
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

function generateDropEventListener({ setSimulatorData, simulatorData, simulatorRef }: DesignerContext, record?: () => void) {
  return function (evt: DragEvent) {
    if (!currentComponent || !simulatorRef.value) { return }

    const rect = simulatorRef.value.getBoundingClientRect()
    const zIndex = simulatorData.value.blocks.map(({ style }) => Number(style.zIndex))
    const max = zIndex.length === 0 ? 0 : Math.max.apply(Math, zIndex)

    const style = {
      ...currentComponent.style,
      left: evt.clientX - rect.x,
      top: evt.clientY - rect.y,
      zIndex: max + 1
    }

    const block = {
      id: nanoid(),
      key: currentComponent.key,
      label: currentComponent.text,
      focus: false,
      style
    }

    setSimulatorData({ ...simulatorData.value, blocks: [...simulatorData.value.blocks, block] })
    record && record()
    currentComponent = null
  }
}

export function onDragstart(_: DragEvent, record: () => void, context?: DesignerContext, component?: MaterialComponent) {
  const simulator = context?.simulatorRef.value;

  if (!simulator || !component || !context) {
    return
  }

  simulator.addEventListener('dragenter', onDragenter);
  simulator.addEventListener('dragover', onDragover);
  simulator.addEventListener('dragleave', onDragleave);

  currentDropEventListener = generateDropEventListener(context, record);
  simulator.addEventListener('drop', currentDropEventListener);
  currentComponent = component;
}


export function onDragend(_: DragEvent, context?: DesignerContext) {
  const simulator = context?.simulatorRef.value;

  if (!simulator || !currentDropEventListener) {
    return
  }

  simulator.removeEventListener('dragenter', onDragenter);
  simulator.removeEventListener('dragover', onDragover);
  simulator.removeEventListener('dragleave', onDragleave);
  simulator.removeEventListener('drop', currentDropEventListener);
  currentDropEventListener = null;
}

