import { shallowRef, type VNode } from "vue"
import { NInput, NIcon } from "naive-ui"
import { radius } from "./radius"

import { FullScreenMaximize24Regular, FullScreenMinimize24Regular } from "@vicons/fluent"

 function BorderRadius() {
  const isMore = shallowRef(false)
  const suffix = (icon: any) => (<NIcon>{icon}</NIcon>)

  return (
    <div class="flex items-center">
      {(isMore.value ? [radius[0]] : radius).map(item => (
        <div class="w-[50%]">
          <NInput v-slots={{ suffix: () => suffix(item.icon) }} placeholder="" />
        </div>
      ))}

      <div class="cursor-pointer ml-[5px] text-[22px] hover:text-primary h-auto" onClick={() => isMore.value = !isMore.value}>
        <NIcon class="flex justify-center items-center">
          {isMore.value ? <FullScreenMaximize24Regular /> : <FullScreenMinimize24Regular />}
        </NIcon>
      </div>
    </div>
  )
}

export default BorderRadius
