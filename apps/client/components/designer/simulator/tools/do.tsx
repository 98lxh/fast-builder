import type { FC } from "vite-plugin-vueact"

interface DefineProps {
  type: 'undo' | 'redo' | string
}

const Do:FC<DefineProps> = function(props) {
  return (
    <div class="tooltip tooltip-left w-full" data-tip={props.type === 'undo' ? '撤销' : '重做'}>
      <div class="border-1 dark:border-neutral p-[2px]  w-full rounded-sm hover:text-primary box-border">
        <NuxtIcon name={props.type} />
      </div>
    </div>
  )
}


export default Do
