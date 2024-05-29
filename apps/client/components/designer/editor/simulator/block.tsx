import type { FC } from "vite-plugin-vueact"
import { useDesignerContext } from "~/composables/designer"
import { Editable } from "../../editable"

import { render } from "@h5-designer/material"

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent, block: Block): void
}

const Block: FC<unknown, DefineEmits> = function (_, { emit }) {
  const designer = useDesignerContext()
  return designer.data.value.blocks.map((block) => (
    <Editable
      mode="block"
      block={block}
      key={block.id}
      class="absolute top-0 left-0 select-none"
      onMousedown={(evt: MouseEvent) => emit('mousedown', evt, block)}
    >
      {render(block.key, block.props)}
    </Editable>
  ))
}

export default Block
