import type { MaterialComponent } from "@h5-designer/material";

let currentComponent: null | MaterialComponent = null

function onDragenter(evt: DragEvent) {
  evt.dataTransfer!.dropEffect = 'move';
}

function onDragover(evt: DragEvent) {
  evt.preventDefault();
}

function onDragleave(evt: DragEvent) {
  evt.dataTransfer!.dropEffect = 'none';
}

function onDrop(evt: DragEvent, context: DesignerContext) {
  if (!currentComponent || !context) {
    return;
  }

  context.setSimulatorBlocks([
    ...context.simulatorData.value.blocks,
    {
      top: evt.offsetY,
      left: evt.offsetX,
      key: currentComponent!.key,
      focus: false,
      zIndex: 1
    }
  ])

  currentComponent = null;
}

export function onDragstart(evt: DragEvent, context?: DesignerContext, component?: MaterialComponent) {
  const simulator = context?.simulatorRef.value;

  if (!simulator || !component || !context) {
    return
  }

  simulator.addEventListener('dragenter', onDragenter);
  simulator.addEventListener('dragover', onDragover);
  simulator.addEventListener('dragleave', onDragleave);
  simulator.addEventListener('drop', evt => onDrop(evt, context));
  currentComponent = component;
}


export function onDragend(evt: DragEvent, context?: DesignerContext) {
  const simulator = context?.simulatorRef.value;

  if (!simulator) {
    return
  }

  simulator.removeEventListener('dragenter', onDragenter);
  simulator.removeEventListener('dragover', onDragover);
  simulator.removeEventListener('dragleave', onDragleave);
  // simulator.removeEventListener('drop', onDrop);
}

