import type { MaterialComponent } from "@h5-designer/material";
import { nanoid } from "nanoid"

let currentComponent: null | MaterialComponent = null
let currentDropEventListener: null | ((evt:DragEvent) => void) = null

function onDragenter(evt: DragEvent) {
  evt.dataTransfer!.dropEffect = 'move';
}

function onDragover(evt: DragEvent) {
  evt.preventDefault();
}

function onDragleave(evt: DragEvent) {
  evt.dataTransfer!.dropEffect = 'none';
}

function generateDropEventListener(context: DesignerContext) {
  return function (evt: DragEvent) {
    if (!currentComponent || !context) { return }
    const style = {
      ...currentComponent.style,
      top: evt.offsetY,
      left: evt.offsetX, 
      zIndex: 1,
    }

    const block = {
      id: nanoid(),
      key: currentComponent.key,
      focus: false,
      style
    }

    context.setSimulatorBlocks([  ...context.simulatorData.value.blocks, block])
    currentComponent = null
  }
}

export function onDragstart(_: DragEvent, context?: DesignerContext, component?: MaterialComponent) {
  const simulator = context?.simulatorRef.value;

  if (!simulator || !component || !context) {
    return
  }

  simulator.addEventListener('dragenter', onDragenter);
  simulator.addEventListener('dragover', onDragover);
  simulator.addEventListener('dragleave', onDragleave);

  currentDropEventListener = generateDropEventListener(context);
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

