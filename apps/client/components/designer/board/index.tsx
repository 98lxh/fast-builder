import Ruler from "./ruler"


function Board() {
  return (
    <div class="m-[15px] flex-1 relative overflow-hidden relative" style="height:calc(100vh - 103px)">
      <Ruler mode="horizontal" offsetX={0} offsetY={0} scale={1} />
      <Ruler mode="vertical" offsetX={0} offsetY={0} scale={1} />
    </div>
  )
}

export default Board;
