import Header from "~/components/header";

function Layout() {
  return (
    <div class="w-full h-full bg-base-200  transition-colors">
      <Header />
      <NuxtPage />
    </div>
  );
}

export default Layout
