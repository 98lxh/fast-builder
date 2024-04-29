import {
  SidebarItems,
  TabTemplate,
  TabMine,
} from "~/components/home";


function Home() {
  return (
    <div class="flex w-full">
      <div class=" shadow-custom bg-base-100 w-[248px] m-[14px] mb-0 ml-0 hidden lg:block">
        <div class="card-body">
          <SidebarItems />
        </div>
      </div>

      <div class=" bg-base-100  shadow-custom m-[14px] mr-0 mb-0 flex-1">
        <TabMine />
        <TabTemplate />
      </div>
    </div>
  )
}

export default Home;
