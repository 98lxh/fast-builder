import type { FC } from "vite-plugin-vueact"
import useMergeProps from "~/composables/props"

interface DefineProps {
  description?: string
}

const Empty: FC<DefineProps> = function (componentProps, { slots }) {
  const props = useMergeProps(componentProps, { description: 'nodata' })
  return (
    <div class="flex flex-col justify-center items-center select-none" >
      <NuxtIcon class="w-[54px] h-[54px]" name="empty" />
      {slots.description ? slots.description() : <p class="mt-[15px]"> {props.value.description} </p>}
      {slots.default && slots.default()}
    </div>
  )
}

export default Empty
