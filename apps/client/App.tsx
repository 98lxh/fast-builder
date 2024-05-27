import { useDarkMode } from "./composables/styles/dark"
import { lightThemeOverrides, darkThemeOverrides } from "./constants/overrides"

import { NConfigProvider, darkTheme } from "naive-ui"

function App() {
  const { initDarkMode, isDark } = useDarkMode()
  onMounted(() => initDarkMode())

  const state = computed(() => {
    const theme = isDark.value ? darkTheme : null
    const themeOverride = isDark.value ? darkThemeOverrides : lightThemeOverrides
    return { theme, themeOverride }
  })

  return (
    <NConfigProvider
      theme={state.value.theme}
      themeOverrides={state.value.themeOverride}
    >
      <NuxtPage />
    </NConfigProvider>
  )
}

export default App;
