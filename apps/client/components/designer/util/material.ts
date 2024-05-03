import type { MaterialComponent } from "~/constants/material";
import { type DesignerContext } from "./context";

let currentComponent: null | MaterialComponent = null;

function onDragenter(evt: DragEvent) {
  evt.dataTransfer!.dropEffect = 'move';

}

function onDragover(evt: DragEvent) {
  evt.preventDefault();
}

function onDragleave(evt: DragEvent) {
  evt.dataTransfer!.dropEffect = 'none';
}

function onDrop(evt: DragEvent) {
  console.log(currentComponent);
  currentComponent = null;
}

export function onDragstart(evt: DragEvent, context?: DesignerContext, component?: MaterialComponent) {
  const simulator = context?.simulatorRef.value;

  if (!simulator || !component) {
    return
  }


  simulator.addEventListener('dragenter', onDragenter);
  simulator.addEventListener('dragover', onDragover);
  simulator.addEventListener('dragleave', onDragleave);
  simulator.addEventListener('drop', onDrop);
  currentComponent = component;
}

