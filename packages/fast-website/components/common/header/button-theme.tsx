import { FastIcon } from "@fast-builder/icon";
import { useDarkMode, Theme } from "@fast-builder/shared"

function ThemeButton() {
  const { toggleDarkMode, darkMode } = useDarkMode();
  return (
    <button class=" btn-ghost h-full flex items-center justify-center p-[5px]" onClick={toggleDarkMode}>
      <FastIcon size={20} name={darkMode.value === Theme.DARK ? 'IconDark' : 'IconLight'} />
    </button >
  )
}


export default ThemeButton
