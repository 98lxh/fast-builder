import ExportJSON from "./export-json"
import Device from "./device"
import Do from "./do"

function Tools() {
  const translate = shallowReactive({ x: 0, y: 0 })

  const onMousedown = useDocumentMouseEvent({
    move({ deltaX, deltaY }: MoveListenerOptions) {
      deltaX !== 0 && Number(deltaX) > 0 ? translate.x += deltaX : translate.x -= Math.abs(deltaX);
      deltaY !== 0 && Number(deltaY) > 0 ? translate.y += deltaY : translate.y -= Math.abs(deltaY);
    }
  });

  return (
    <div
      class="shadow-custom w-[38px] absolute rounded-sm bg-base-100 p-[6px] top-[60px] right-[316px] border-1 dark:border-neutral"
      style={{ transform: `translate(${translate.x}px,${translate.y}px)` }}
    >
      <div
        class="rotate-[90deg] p-[3px] cursor-move mb-2"
        onMousedown={onMousedown}
      >
        <NuxtIcon name="holder" />
      </div>

      <Device />
      <ExportJSON />
      <Do type="undo" />
      <Do type="redo" />
    </div>
  )
}

export default Tools
