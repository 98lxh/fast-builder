async function autoImport() {
  if(typeof window === 'undefined') {
    return
  }

  const modules = await import.meta.glob('./components/*/index.ts')
  const entires = Object.keys(modules)
  entires.forEach(entry => import(entry))
  
}
autoImport()
