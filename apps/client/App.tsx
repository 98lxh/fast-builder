import "@h5-designer/material"
import { useDarkMode } from "./composables/styles/dark"
import { NConfigProvider, darkTheme } from "naive-ui"

function App() {
  const { initDarkMode, isDark } = useDarkMode()
  onMounted(() => initDarkMode())

  return (
    <NConfigProvider theme={isDark.value ? darkTheme : null}>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NConfigProvider>
  )
}

export default App;
