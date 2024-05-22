import type { FC } from "vite-plugin-vueact"
import { Teleport, type CSSProperties } from "vue";

import { useDesignerContext } from "~/composables/designer";
import { CONTEXT_MENU_KEYS } from "~/constants/shortcutKeys";

interface DefineProps {
  top: number;
  left: number;
  show: boolean;
  blockId: string;
}

interface DefineEmits {
  (name: 'update:show', show: boolean): void
}

const ContextMenu: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const designer = useDesignerContext()

  const close = () => emit('update:show', false)
  const wrapperRef = useEventOutside({ event: 'click' }, close)

  const styles = computed(() => {
    const _styles: CSSProperties = {}
    const { top, left, show } = props
    _styles.display = show ? 'block' : 'none'
    _styles.left = left + 'px'
    _styles.top = top + 'px'
    return _styles
  })

  const methods: Record<string, Function> = {
    delete: () => designer.deleteBlockById(props.blockId),
    up: () => {
      const { layers, swapTwoComponentIndex } = designer
      const index = layers.value.findIndex(({ key }) => key === props.blockId)
      if (index === 0 || index === -1) { return }
      swapTwoComponentIndex(layers.value[index].key, layers.value[index - 1].key)
    },
    down: () => {
      const { layers, swapTwoComponentIndex } = designer
      const index = layers.value.findIndex(({ key }) => key === props.blockId)
      if (index === layers.value.length - 1 || index === -1) { return }
      swapTwoComponentIndex(layers.value[index].key, layers.value[index + 1].key)
    }
  }

  function handleClick(key: string) {
    methods[key] && methods[key]()
    close()
  }

  return (
    <Teleport to="body" >
      <ul
        class="fixed dropdown-content z-[1] menu p-1 bg-base-100 rounded-box w-52 shadow-custom border-1 dark:border-neutral rounded-0"
        style={styles.value}
        ref={wrapperRef}
      >
        {CONTEXT_MENU_KEYS.map(item => (<li onClick={() => handleClick(item.key)}><a>{item.text}</a></li>))}
      </ul>
    </Teleport>
  )
}


export default ContextMenu
