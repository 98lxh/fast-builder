import ShortcutKeys from "./shortcut-keys"
import Layers from "./layers"

function VerticalTools() {
  const translate = shallowReactive({ x: 0, y: 0 })
  const onMousedown = useDocumentMouseEvent({ move })
  function move({ deltaX, deltaY }: MoveListenerOptions) {
    deltaX !== 0 && Number(deltaX) > 0 ? translate.x += deltaX : translate.x -= Math.abs(deltaX);
    deltaY !== 0 && Number(deltaY) > 0 ? translate.y += deltaY : translate.y -= Math.abs(deltaY);
  }

  return (
    <div
      class="shadow-custom flex items-center pl-[4px] h-[38px] absolute rounded-sm bg-base-100 bottom-[60px] right-[416px] border-1 dark:border-neutral"
      style={{ transform: `translate(${translate.x}px,${translate.y}px)` }}
    >
      <Layers />
      <div class="w-[1px] h-[20px] ml-[4px] bg-base-300 dark:bg-neutral" />
      <ShortcutKeys />
      <div class="w-[1px] h-[20px] ml-[4px] bg-base-300 dark:bg-neutral" />

      <div class="p-[8px] cursor-move w-[34px] h-full" onMousedown={onMousedown}>
        <NuxtIcon name="designer/holder" />
      </div>
    </div>
  )
}

export default VerticalTools
