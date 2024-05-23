import Header from "~/components/header";

function Default() {
  return (
    <div class="w-full h-full bg-base-200 dark:bg-base-300  transition-colors">
      <Header />
      <NuxtPage />
    </div>
  );
}

export default Default
