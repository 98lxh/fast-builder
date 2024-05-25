import { FC } from "vite-plugin-vueact"
import { shallowRef, ref, onMounted, computed } from "vue"
import { Tab } from "./types"

interface DefineProps {
  tabs: Tab[]
  current?: string
}

interface DefineEmits {
  (name: 'update:current', current: string)
  (name: 'change', current: string)
}

const Tabs: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const currentIndex = shallowRef(0)
  const tabPanelWidth = ref<number[]>([])
  const tabPanelRef = ref<HTMLElement[]>([])

  const state = computed(() => {
    const index = currentIndex.value
    const width = tabPanelWidth.value[index]
    const offset = tabPanelWidth.value.slice(0, index).reduce((prev, current) => prev + current, 0)
    return { width, offset }
  })

  function handleClick(index: number) {
    const current = props.tabs[index]
    if (!current) { return }
    currentIndex.value = index
    emit('update:current', current.value)
    emit('change', current.value)
  }

  function getTabPanelWidth() {
    const width: number[] = []
    for (const element of tabPanelRef.value) {
      width.push(element.clientWidth)
    }
    tabPanelWidth.value = width
  }

  onMounted(getTabPanelWidth)

  return (
    <div role="tablist" class="tabs border-b-1 dark:border-neutral relative">
      {props.tabs.map((tab, index) => (
        <a
          class={`tab text-[12px] line-height-[12px] ${index === currentIndex.value ? 'text-black dark:text-coolgray' : ''}`}
          ref={(ref: any) => tabPanelRef.value.push(ref)}
          onClick={() => handleClick(index)}>
          {tab.label}
        </a>))}

      <div
        class="absolute w-[55px] h-[2px] bottom-[0px] bg-black dark:bg-light bottom-[-2px]"
        style={{ left: `${state.value.offset}px`, transition: `left .3s`, width: `${state.value.width}px` }}
      />
    </div >
  )
}

export default Tabs
