import HomeSidebar from "~/components/home/Sidebar";
import HomeContent from "~/components/home/Content"

function Home() {
  return (
    <div class="flex w-full">
      <HomeSidebar />
      <HomeContent />
    </div>
  )
}

export default Home;
