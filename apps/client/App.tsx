import "@h5-designer/material"
import { useDarkMode } from "./composables/styles/dark"
import { NConfigProvider, darkTheme } from "naive-ui"
import { themeOverrides } from "./constants/overrides"

function App() {
  const { initDarkMode, isDark } = useDarkMode()
  onMounted(() => initDarkMode())

  return (
    <NConfigProvider theme={isDark.value ? darkTheme : null} themeOverrides={themeOverrides}>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NConfigProvider>
  )
}

export default App;
