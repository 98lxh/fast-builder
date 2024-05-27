import { NPopover, NTag } from "naive-ui"
import { shortcutKeys } from "~/constants/shortcutKeys"

function ShortcutKeys() {
  const trigger = () => (
    <div class="hover:text-primary w-[20px] h-[20px] mx-2">
      <NuxtIcon name="designer/keyboard" />
    </div>
  )

  return (
    <NPopover trigger="hover" v-slots={{ trigger }}>
      <div class="w-[248px]">
        <p class="p-2 text-center">快捷键</p>
        <div class="border-b-1 dark:border-neutral mb-[10px]"></div>
        {shortcutKeys.map(item => (<div class="flex justify-between mt-[10px]">
          <div class="flex items-center">
            {item.keys.map((key, index) => (<>
              <kbd class="kbd kbd-sm">{key}</kbd>
              {index !== item.keys.length - 1 && <p class="px-[10px]"> +</p>}
            </>))}
          </div>
          <NTag type="info">{item.text}</NTag>
        </div>))}
      </div>
    </NPopover>
  )
}

export default ShortcutKeys
