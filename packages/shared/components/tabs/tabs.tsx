import { FC } from "vite-plugin-vueact"
import { shallowRef, ref, onMounted, computed, CSSProperties } from "vue"
import { Tab } from "./types"

interface DefineProps {
  tabs: Tab[];
  current?: string;
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

  const styles = computed(() => {
    const styles: CSSProperties = {}
    const { offset, width } = state.value
    styles.transition = "left ease-in-out .3s"
    styles.width = `${width}px`
    styles.left = `${offset}px`
    return styles
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
    <div role="tablist" class={`tabs border-b-1 dark:border-neutral relative ${props.background ? 'bg-base-100 p-[5px]' : 'bg-transparent'}`}>
      {props.tabs.map((tab, index) => (
        <a
          class={`tab text-[14px] line-height-[14px] px-[10px] relative z-2 ${index === currentIndex.value ? 'text-black dark:text-coolgray' : ''}`}
          ref={(ref: any) => tabPanelRef.value.push(ref)}
          onClick={() => handleClick(index)}>
          {tab.label}
        </a>))}
      <div class="absolute w-[55px] bg-black dark:bg-light h-[2px] bottom-[-2px]" style={styles.value} />
    </div >
  )
}

export default Tabs
