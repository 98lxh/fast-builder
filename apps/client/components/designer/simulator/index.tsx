import Ruler from "./ruler"

function Simulator() {
  const el = ref<HTMLDivElement | null>(null)
  const size = reactive(useElementSize(el))

  return (
    <div
      class="m-[15px] flex-1 relative overflow-hidden relative cursor-pointer"
      style="height:calc(100vh - 103px)"
      ref={el}
    >

      <Ruler
        mode="horizontal"
        width={size.width}
        height={size.height}
        offsetX={0}
        offsetY={0}
        scale={1}
      />

      <Ruler
        mode="vertical"
        width={size.width}
        height={size.height}
        offsetX={0}
        offsetY={0}
        scale={1}
      />
    </div>
  )
}

export default Simulator;
