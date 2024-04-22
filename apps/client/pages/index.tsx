import type { FC } from "vite-plugin-vueact";

const Index: FC = function () {
  return (
    <div class="flex w-full">
      <div class="w-[248px] p-[24px]">
        <button class="btn btn-primary w-full">开始创作</button>
        <button class="btn btn-ghost w-full mt-2">我的项目</button>
        <div class="divider" />
        <button class="btn btn-ghost w-full mt-2">后台管理</button>
        <button class="btn btn-ghost w-full mt-2">接口文档</button>
      </div>

      <div class="flex-1 p-[24px]">
        <div role="tablist" class="tab tabs-boxed mb-2">
          <a role="tab" class="tab tab-active">我的页面</a>
          <a role="tab" class="tab">热门模板</a>
        </div>

        <div class="hero bg-base-200" style="height:calc(100vh - 168px)">
          <div class="">
            <img src="" />
            <div>
              <p class="py-2">
                您还没没有创建过页面
                <button class="btn btn-link">立即创建</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Index;
