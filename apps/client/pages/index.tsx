import {
  HomeSidebar,
  HomeContent
} from "~/components/home";


function Home() {
  return (
    <div class="flex w-full">
      <HomeSidebar />
      <HomeContent />
    </div>
  )
}

export default Home;
