const root = '/'
const workspace = '/workspace'

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()
  if (to.path === root) { router.push(workspace) }
})
