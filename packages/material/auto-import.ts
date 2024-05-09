await (async function () {
  if (typeof window === 'undefined') { return }
  const modules = await import.meta.glob('./components/*/index.ts')
  Object.values(modules).forEach(async (module) => await module())
})()
