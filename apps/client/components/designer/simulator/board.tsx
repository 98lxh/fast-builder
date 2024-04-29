function Board() {
  const boardRef = ref<HTMLDivElement | null>(null);
  const contentRef = ref<HTMLDivElement | null>(null);
  const translate = shallowReactive({ x: 0, y: 0 })
  

  function bindUpdateBoardEvent() {
    const dom = boardRef.value;
    if (!dom) { return }


    dom.onmousedown = function (evt: MouseEvent) {
      evt.preventDefault();

      if(contentRef.value?.contains(evt.target as HTMLElement)){
        return;
      }

      const startX = evt.pageX;
      const startY = evt.pageY;

      let lastX = startX;
      let lastY = startY;

      document.onmousemove = function (evt: MouseEvent) {
        evt.preventDefault();
        const currentX = evt.pageX;
        const currentY = evt.pageY;

        // 计算从上一次到这一次的移动距离
        const deltaX = currentX - lastX;
        const deltaY = currentY - lastY;

        // 对历史坐标进行更新
        lastX = currentX;
        lastY = currentY;

        const moveX = deltaX !== 0;
        const moveY = deltaY !== 0;

        if(moveX) {
          if(Number(deltaX) > 0){
            translate.x += deltaX;
          } else {
            translate.x -= Math.abs(deltaX);
          }
        }

        if(moveY) {
          if(Number(deltaY) > 0){
            translate.y += deltaY;
          } else {
            translate.y -= Math.abs(deltaY);
          }
        }
      };

      // 解绑事件
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  onMounted(bindUpdateBoardEvent)

  return (
    <div
      class="w-full h-full absolute top-[50%] left-[50%] translate-[-50%] flex items-center justify-center"
      ref={boardRef}
    >
      <div 
        class={`w-[375px] h-[667px] shadow-custom  bg-base-100 absolute cursor-auto`} 
        style={`transform:translate(${translate.x}px,${translate.y}px)`}
        ref={contentRef}
      >
      </div>
    </div>
  )
}


export default Board
