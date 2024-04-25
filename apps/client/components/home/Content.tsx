import TabTemplate from "./TabTemplate";
import TabMine from "./TabMine";

function HomeContent() {
  const isTemplate = shallowRef(false);

  return (
    <div class="flex-1 p-[24px]">
      <div role="tablist" class="tab tabs-boxed mb-2">
        <span role="tab" class={`tab ${!isTemplate.value && 'tab-active'}`} onClick={() => isTemplate.value = false}>我的页面</span>
        <span role="tab" class={`tab ${isTemplate.value && 'tab-active'}`} onClick={() => isTemplate.value = true}>热门模板</span>
      </div>
      
      <div class="hero bg-base-200" style="height:calc(100vh - 168px)">
        {
          isTemplate.value 
            ? <TabTemplate  />
            : <TabMine />
        }
      </div>
    </div>
  )
}

export default HomeContent;
