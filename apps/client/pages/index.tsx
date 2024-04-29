import {
  SidebarItems,
  TabTemplate,
  TabMine,
} from "~/components/home";


function Home() {
  return (
    <div class="flex w-full">
      <div class="card shadow-custom bg-base-100 w-[248px] m-[14px] hidden lg:block">
        <div class="card-body">
          <SidebarItems />
        </div>
      </div>

      <div class="card bg-base-100  shadow-custom m-[14px] flex-1" style="height:calc(100vh - 103px)">
        <TabMine /> 
        <TabTemplate />
      </div>
    </div>
  )
}

export default Home;
