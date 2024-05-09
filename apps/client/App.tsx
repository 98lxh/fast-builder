import "@h5-designer/material"

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
