import type { FC } from "vite-plugin-vueact"
import { useEditorContext } from "../../../composables";
import Editable from "@fast-builder/editor/components/editable"
import { render } from "@fast-builder/material"

interface DefineEmits {
  (name: 'mousedown', evt: MouseEvent, block: Block): void
}

const Block: FC<unknown, DefineEmits> = function (_, { emit }) {
  const designer = useEditorContext()
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
