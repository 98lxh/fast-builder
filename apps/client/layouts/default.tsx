import Header from "~/components/Header";

function Layout() {
  return (
    <div class="w-full h-full  transition-colors">
      <div class="flex flex-col h-fit min-h-screen m-auto items-center bg-[transparnet]">
        <Header />
        <div class="flex-1 flex w-full">
          <NuxtPage />
        </div>
      </div>
    </div>
  );
}

export default Layout;
