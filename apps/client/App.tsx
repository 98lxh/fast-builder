import { useDarkMode } from "./composables/styles/dark"
import { lightThemeOverrides, darkThemeOverrides } from "./constants/overrides"
import { NConfigProvider, darkTheme } from "naive-ui"
import "@h5-designer/material"

function App() {
  const { initDarkMode, isDark } = useDarkMode()
  onMounted(() => initDarkMode())

  const style = computed(() => ({
    theme: isDark.value ? darkTheme : null,
    themeOverride: isDark.value ? darkThemeOverrides : lightThemeOverrides,
  }))

  return (
    <NConfigProvider theme={style.value.theme} themeOverrides={style.value.themeOverride}>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NConfigProvider>
  )
}

export default App;
