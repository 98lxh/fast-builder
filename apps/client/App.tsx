import "@h5-designer/material"
import { useDarkMode } from "./composables/styles/dark";

function App() {
  const { initDarkMode } = useDarkMode()
  onMounted(() => initDarkMode())

  return (
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  )
}

export default App;
