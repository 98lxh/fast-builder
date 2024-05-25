import type { FC } from "vite-plugin-vueact"
import { useMergeProps } from "@h5-designer/shared"

interface DefineProps {
  description?: string;
  imgUrl?: string;
}

const Empty: FC<DefineProps> = function (componentProps, { slots }) {
  const props = useMergeProps(componentProps, {
    description: 'nodata',
    imgUrl: '/figure/empty.png'
  })

  return (
    <div class="flex flex-col justify-center items-center select-none" >
      <NuxtIcon class="inline-block w-[48px] h-[48px]" name="empty" />
      {slots.description ? slots.description() : <p class="mt-[15px]" style="font-size:12px"> {props.value.description} </p>}
      {slots.default && slots.default()}
    </div>
  )
}

export default Empty
