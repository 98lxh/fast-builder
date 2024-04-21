import Header from "~/components/Header";

function Layout() {
  return (
    <div class="w-full h-full  transition-colors dark:text-slate-300 text-slate-600">
      <div class="flex flex-col h-fit min-h-screen m-auto lg:px-24 xl:px-2 px-7 items-center bg-[transparnet]">
        <Header />
        <div class="flex-1 flex xl:w-[1200px] sm:w-full">
          <NuxtPage />
        </div>
      </div>
    </div>
  );
}

export default Layout;
