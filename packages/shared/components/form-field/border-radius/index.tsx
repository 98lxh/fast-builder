import { CSSProperties, computed, shallowRef } from "vue"
import { NInput, NIcon, NTooltip } from "naive-ui"
import { radius, type RadiusItem } from "./radius"

import { FullScreenMaximize24Regular, FullScreenMinimize24Regular } from "@vicons/fluent"

function BorderRadius() {
  const isMore = shallowRef(false)

  const styles = computed(() => {
    const _styles: CSSProperties = {}
    _styles.left = isMore.value ? '45%' : ''
    _styles.right = isMore.value ? '' : '0px'
    return _styles
  })

  function slot(item: RadiusItem) {
    const { type, icon } = item
    const name = type.indexOf('left') !== -1 ? 'prefix' : 'suffix'
    return { [name]: () => (<NIcon>{icon.render()}</NIcon>) }
  }

  function trigger() {
    return (
      <NIcon class="flex justify-center items-center">
        {isMore.value ? <FullScreenMaximize24Regular /> : <FullScreenMinimize24Regular />}
      </NIcon>
    )
  }

  return (
    <div class="flex items-center flex-wrap">
      {(isMore.value ? [radius[0]] : radius).map(item => (
        <div class="w-[43%] ml-[5px] mb-[5px]">
          <NInput v-slots={{ ...slot(item) }} placeholder="" />
        </div>
      ))}

      <div
        class="cursor-pointer ml-[5px] text-[18px] hover:text-primary h-auto absolute top-[8px]"
        onClick={() => isMore.value = !isMore.value}
        style={styles.value}
      >
        <NTooltip v-slots={{ trigger }}>
          {isMore.value ? '独立圆角' : '圆角'}
        </NTooltip>
      </div>
    </div>
  )
}

export default BorderRadius
