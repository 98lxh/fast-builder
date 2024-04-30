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

      <div class=" bg-base-100  shadow-custom flex-1 mt-[14px]">
        <TabMine />
        <TabTemplate />
      </div>
    </div>
  )
}

export default Home;
