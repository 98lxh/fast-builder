import type { FC } from "vite-plugin-vueact"
import { sidebarOptions } from "~/constants/options"

interface DefineProps {
  isCollapse?: boolean
}

const SidebarItems: FC<DefineProps> = function (props) {
  const classes = computed(() => props.isCollapse ? 'collapse' : '')
  const router = useRouter()
  const route = useRoute()

  function toPath(path: string, isExternal: boolean) {
    if (isExternal) return window.open(path)
    router.push(path)
  }

  return (
    <div class="w-full pt-[20px] custom-menu">
      {sidebarOptions.map((item) => (
        <div
          class={`custom-menu-item relative ${item.patch === route.path ? 'active' : ''} ${classes.value}`}
          onClick={() => toPath(item.patch, item.isExternal)}
        >
          <NuxtIcon class=" inline-block" name={item.icon}></NuxtIcon>
          {!props.isCollapse && <p class="text-nowrap ml-[8px]">{item.text}</p>}
          {!props.isCollapse && item.isExternal && <NuxtIcon class="absolute inline-block right-1" name="direction/right-thin" />}
        </div>
      ))}
    </div>
  )
}


export default SidebarItems
