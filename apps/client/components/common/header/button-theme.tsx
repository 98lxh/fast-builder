import { Theme, useDarkMode } from "~/composables/styles/dark";

function ThemeButton() {
  const { toggleDarkMode, darkMode } = useDarkMode();
  return (
    <div class="flex items-center" >
      <button class=" btn-ghost p-[5px] text-[16px] h-full" onClick={toggleDarkMode}>
        <NuxtIcon name={darkMode.value === Theme.DARK ? 'dark' : 'light'} />
      </button >
    </div >
  )
}


export default ThemeButton
