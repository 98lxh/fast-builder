import type { FC } from "vite-plugin-vueact"
import { useDesignerContext } from "@fast-builder/editor/composables/designer"
import { primaryColor, useEventOutside } from "@fast-builder/shared"

interface DefineProps {
  isContainer: boolean;
  hover: boolean;
}

interface DefineEmits {
  (name: 'mouseenter', evt: MouseEvent): void
  (name: 'mouseleave', evt: MouseEvent): void
}

const EditableTitle: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const editableTitleRef = useEventOutside({ event: 'mousedown', excludeId: ['editable'] }, () => onUpdateValue(false))
  const designer = useDesignerContext()
  const { data } = designer

  function onUpdateValue(focus: boolean, clear = false) {
    designer.setContainer({ focus })
    clear && designer.clearBlockFocus()
  }

  return (
    !(props.isContainer) ? null : (
      <p
        class="absolute top-[-20px] left-[2px] text-[13px] text-[#939393] dark:text-white select-none"
        style={{ color: props.hover || data.value.container.focus ? primaryColor : undefined }}
        onMouseenter={(evt) => emit('mouseenter', evt)}
        onMouseleave={(evt) => emit('mouseleave', evt)}
        onMousedown={() => onUpdateValue(true, true)}
        ref={editableTitleRef}
      >
        { designer.data.value.container.name }
      </p>
    )
  )
}

export default EditableTitle
