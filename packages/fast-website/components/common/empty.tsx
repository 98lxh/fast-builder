import type { FC } from "vite-plugin-vueact"
import type { CSSProperties } from "vue";

import { useMergeProps } from "@fast-builder/shared"

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
      <NuxtIcon class="inline-block w-[84px] h-[80px]" name="empty" />
      {slots.description ? slots.description() : <p style={styles}> {props.description} </p>}
      {button()}
    </div>
  )
}

export default Empty
