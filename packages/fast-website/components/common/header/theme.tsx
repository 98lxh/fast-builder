import { useDarkMode, Theme } from "@fast-builder/shared"

function ThemeButton() {
  const { toggleDarkMode, darkMode } = useDarkMode();
  return (
    <div class="flex items-center" >
      <button class=" btn-ghost p-[5px] text-[20px] h-full" onClick={toggleDarkMode}>
        <NuxtIcon name={darkMode.value === Theme.DARK ? 'dark' : 'light'} />
      </button >
    </div >
  )
}


export default ThemeButton
