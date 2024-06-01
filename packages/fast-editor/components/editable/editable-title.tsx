import type { FC } from "vite-plugin-vueact"
import { primaryColor, useEventOutside } from "@fast-builder/shared"
import { useEditorContext } from "../../composables";

interface DefineProps {
  isContainer: boolean;
  hover: boolean;
}

interface DefineEmits {
  (name: 'mouseenter', evt: MouseEvent): void
  (name: 'mouseleave', evt: MouseEvent): void
}

const EditableTitle: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const editor = useEditorContext()
  const { data } = editor

  const editableTitleRef = useEventOutside({
    event: 'mousedown',
    excludeId: ['editable', 'attribute']
  }, () => onUpdateValue(false))

  function onUpdateValue(focus: boolean, clear = false) {
    editor.setContainer({ focus })
    clear && editor.clearBlockFocus()
  }

  return (
    !(props.isContainer) ? null : (
      <p
        class="absolute top-[-20px] left-[2px] text-[13px] text-[#939393] dark:text-[#616162] select-none"
        style={{ color: props.hover || data.value.container.focus ? primaryColor : undefined }}
        onMouseenter={(evt) => emit('mouseenter', evt)}
        onMouseleave={(evt) => emit('mouseleave', evt)}
        onMousedown={() => onUpdateValue(true, true)}
        ref={editableTitleRef}
      >
        {data.value.container.name}
      </p>
    )
  )
}

export default EditableTitle
