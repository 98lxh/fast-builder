import type { FC } from "vite-plugin-vueact"
import { useDesignerContext } from "~/composables/designer"

interface DefineProps {
  type: 'undo' | 'redo' | string
}

const Do: FC<DefineProps> = function (props) {
  const { undo, redo } = useDesignerContext()

  const state = computed(() => {
    const isUndo = props.type === 'undo'
    return {
      tip: isUndo ? '撤销' : '重做',
      event: () => isUndo ? undo() : redo(),
      icon: isUndo ? 'designer/undo' : 'designer/redo'
    }
  })

  return (
    <div
      class="tooltip tooltip-left w-full"
      data-tip={state.value.tip}
      onClick={state.value.event}
    >
      <div class="border-1 dark:border-neutral p-[2px]  w-full rounded-sm hover:text-primary box-border">
        <NuxtIcon name={state.value.icon} />
      </div>
    </div>
  )
}


export default Do
