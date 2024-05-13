import type { FC } from "vite-plugin-vueact"
import { useHistoryContext } from "~/composables/designer/history"

interface DefineProps {
  type: 'undo' | 'redo' | string
}

const Doable: FC<DefineProps> = function (props) {
  const history = useHistoryContext()

  const state = computed(() => {
    const { snapshot, undo, redo } = history
    const { redoable, undoable } = snapshot.value
    const isUndo = props.type === 'undo'

    return {
      tip: isUndo ? '撤销' : '重做',
      event: () => isUndo ? undo() : redo(),
      icon: isUndo ? 'designer/undo' : 'designer/redo',
      disabled: (isUndo && !undoable) || (!isUndo && !redoable)
    }
  })

  const attrs = computed(() => {
    const { disabled, tip } = state.value
    return {
      class: `tooltip tooltip-left w-full select-none ${disabled && 'cursor-not-allowed'}`,
      ...(!disabled ? { 'data-tip': tip } : {})
    }
  })

  return (
    <div {...attrs.value}>
      <div
        class={`border-1 dark:border-neutral p-[2px]  w-full rounded-sm hover:text-primary box-border ${state.value.disabled && 'do-disabled'}`}
        onClick={state.value.event}
      >
        <NuxtIcon name={state.value.icon} />
      </div>
    </div>
  )
}


export default Doable
