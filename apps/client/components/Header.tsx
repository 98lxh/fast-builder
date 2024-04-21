function Header() {
  const { toggleDarkMode, darkMode } = useDarkMode();

  return (
    <header class="top-0 bg-opacity-50 backdrop-blur-xl z-40 font-customFont w-full"  >
      <div class="mx-auto max-w-screen-xl mt-2">
        <div class="flex h-16 items-center justify-between">
          <div class="logo flex items-center w-[32px] h-[32px] relative">
            <div class="logo-bg"></div>
            <img class="w-[30px] h-[30px] absolute" src="/logo.png" />
            <span class="absolute left-[42px] text-2xl">start</span>
          </div>

          {/* 主题 */}
          < div class="login-out flex items-center" >
            < button class="btn btn-sm btn-ghost rounded-md mx-1 w-8 h-8 p-0" onClick={toggleDarkMode}>
              {
                darkMode.value === Theme.DARK ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M233.54 142.23a8 8 0 0 0-8-2a88.08 88.08 0 0 1-109.8-109.8a8 8 0 0 0-10-10a104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88a104.84 104.84 0 0 0 37-52.91a8 8 0 0 0-1.98-7.98m-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104a106 106 0 0 0 14.92-1.06a89 89 0 0 1-26.02 31.4"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                )
              }
            </button >
          </div >
        </div>
      </div>
    </header>
  )
}

export default Header
