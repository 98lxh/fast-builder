import type { FC } from "vite-plugin-vueact"
import type { CSSProperties } from "vue";

import { useMergeProps } from "@fast-builder/shared"
import { FastIcon } from "@fast-builder/icon";

interface DefineProps {
  description?: string;
  buttonText?: string;
}

interface DefineEmits {
  (name: 'click', evt: MouseEvent): void
}

const Empty: FC<DefineProps, DefineEmits> = function (props, { emit, slots }) {
  const styles: CSSProperties = {
    fontSize: '14px',
    height: '14px'
  }

  function onClick(evt: MouseEvent) {
    evt.stopPropagation()
    evt.preventDefault()
    emit('click', evt)
  }

  function button() {
    const { buttonText } = props
    if (!buttonText) { return null }
    const attrs = { onClick, style: styles, class: 'btn btn-link text-[12px]' }
    return <button {...attrs}>{buttonText}</button>
  }

  return (
    <div class="flex flex-col justify-center items-center select-none text-blueGray" >
      <FastIcon size={80} name="IconEmpty" />
      {slots.description ? slots.description() : <p style={styles}> {props.description} </p>}
      {button()}
    </div>
  )
}

export default Empty
