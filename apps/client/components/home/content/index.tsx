import TabTemplate from "./TabTemplate"
import TabMine from "./TabMine"

function HomeContent() {
  const isTemplate = shallowRef(false);

  return (
    <div class="card bg-base-100  shadow-custom m-[14px] flex-1" style="height:calc(100vh - 103px)">
        <div>
          {isTemplate.value ? <TabTemplate /> : <TabMine />}
        </div>
    </div>
  )
}

export default HomeContent;
