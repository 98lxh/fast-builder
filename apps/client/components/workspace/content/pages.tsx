import { Empty } from "~/components/common"

function Pages() {
  return (
    <div class="w-full h-full relative">
      <Empty class="absolute top-[50%] left-[50%] translate-[-50%]" description="您还没有创作过页面" >
        <button class="btn btn-link text-[12px]">立即创作</button>
      </Empty>
    </div>
  )
}

export default Pages
