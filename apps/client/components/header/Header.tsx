import { HomeSidebarItems } from "~/components/home"
import ThemeButton from "./ThemeButton"

function Header() {
  const router = useRouter();

  return (
    <header class="navbar bg-base-100 mt-2 rounded-xl shadow-custom" style="width:calc(100vw - 25px)">
      <div class="flex-none lg:hidden block">
        <div class="dropdown">
          <div tabindex={0} role="button" class="btn  btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </div>

          <ul tabindex={0} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <HomeSidebarItems />
          </ul>
        </div>
      </div>

      <div class="flex-1">
        <a class="btn btn-ghost text-lg color-primary relative" onClick={() => router.push('/')}>
          <img class="w-[30px] h-[30px]" src="/logo.png" />
          H5 Designer
        </a>
      </div>

      <div class="flex-none">
        <ThemeButton />
        {/* <button class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </button> */}
      </div>
    </header>
  )
}

export default Header
