import SidebarItems from "~/components/sidebar";
import Main from "~/components/home/main"

function Home() {
  return (
    <div class="flex w-full">
      <div class=" shadow-custom bg-base-100 w-[248px] m-[14px] mb-0 ml-0 hidden lg:block p-[25px] border-t-1 border-r-1 dark:border-neutral">
        <SidebarItems />
      </div>

      <Main />
    </div>
  )
}

export default Home;
