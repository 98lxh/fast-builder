import { bindMouseEvent } from "../util/board"

function Board() {
  const boardRef = ref<HTMLDivElement | null>(null);
  const contentRef = ref<HTMLDivElement | null>(null);
  const translate = shallowReactive({ x: 0, y: 0 })


  function updateTranslate(deltaX: number, deltaY: number) {
    const moveX = deltaX !== 0;
    const moveY = deltaY !== 0;

    if (moveX) {
      Number(deltaX) > 0 ? translate.x += deltaX :  translate.x -= Math.abs(deltaX);
    }

    if (moveY) {
      Number(deltaY) > 0 ? translate.y += deltaY :  translate.y -= Math.abs(deltaY);
    }
  }

  onMounted(() => bindMouseEvent(
    boardRef.value,
    contentRef.value,
    updateTranslate
  ))

  return (
    <div
      class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%]"
      ref={boardRef}
    >
      <div
        class={`w-[375px] h-[667px] shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto`}
        style={`transform:translate(${translate.x}px,${translate.y}px)`}
        ref={contentRef}
      >
      </div>
    </div>
  )
}


export default Board
