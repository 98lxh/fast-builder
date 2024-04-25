import TabTemplate from "./TabTemplate";
import TabMine from "./TabMine";

function HomeContent() {
  const isTemplate = shallowRef(false);

  return (
    <div class="flex-1 p-[24px]">
      <div role="tablist" class="tab tabs-boxed">
        <a
          role="tab h-[auto]"
          class={`tab ${!isTemplate.value && 'tab-active'}`}
          onClick={() => isTemplate.value = false}
        >
          我的页面
        </a>
        <a
          role="tab h-[auto]"
          class={`tab ${isTemplate.value && 'tab-active'}`}
          onClick={() => isTemplate.value = true}
        >
          热门模板
        </a>
      </div>

      <div style="height:calc(100vh - 168px)">
        {
          isTemplate.value
            ? <TabTemplate />
            : <TabMine />
        }
      </div>
    </div>
  )
}

export default HomeContent;
