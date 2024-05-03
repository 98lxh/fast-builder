import type { CSSProperties } from "vue";
import { bindMouseEvent } from "../util/board"
import { designerInjectionKey } from "../util/context"
import dataSource from "./data.json"

function Board() {
  const context = inject(designerInjectionKey);

  const containerRef = ref<HTMLDivElement | null>(null);
  const boardRef = ref<HTMLDivElement | null>(null);
  const translate = shallowReactive({ x: 0, y: 0 })


  const styles = computed<CSSProperties>(() => ({
    width: dataSource.container.width + 'px',
    height: dataSource.container.height + 'px',
    transform: `translate(${translate.x}px,${translate.y}px`
  }))

  function updateTranslate(deltaX: number, deltaY: number) {
    const moveX = deltaX !== 0;
    const moveY = deltaY !== 0;

    if (moveX) {
      Number(deltaX) > 0 ? translate.x += deltaX : translate.x -= Math.abs(deltaX);
    }

    if (moveY) {
      Number(deltaY) > 0 ? translate.y += deltaY : translate.y -= Math.abs(deltaY);
    }
  }

  onMounted(() => {
    bindMouseEvent(containerRef.value, boardRef.value, updateTranslate)
    context?.setSimulatorRef(boardRef.value);
  })

  return (
    <div
      class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%]"
      ref={containerRef}
    >
      <div
        class={`shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto`}
        style={styles.value}
        ref={boardRef}
      >
        {
          dataSource.blocks.map(block => (
            <div
              class={`absolute`}
              style={{ top: block.top + 'px', left: block.left + 'px', zIndex: block.zIndex }}>
              {block.component}
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default Board
