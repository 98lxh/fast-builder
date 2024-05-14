import { NTag } from "naive-ui"
import { SHORTCUT_KEYS } from "~/constants/shortcutKeys"

function ShortcutKeys() {
  return (
    <div class="dropdown dropdown-hover w-[32px] h-full dropdown-top rounded-sm flex items-center justify-center text-[20px]">
      <div class="hover:text-primary">
        <NuxtIcon name="designer/keyboard" />
      </div>

      <div tab-index={0} class="dropdown-content z-[1] p-4 shadow-custom bg-base-100 w-[300px] border-1 dark:border-neutral text-[14px]">
        <p class="p-2 text-center">快捷键</p>
        <div class="border-b-1 dark:border-neutral mb-[10px]" />
        {SHORTCUT_KEYS.map(item => (<div class="flex justify-between mt-[10px]">
          <div class="flex items-center">
            {item.keys.map((key, index) => (<>
              <kbd class="kbd kbd-sm">{key}</kbd>
              {index !== item.keys.length - 1 && <p class="px-[10px]"> +</p>}
            </>))}
          </div>
          <NTag type="info">{item.text}</NTag>
        </div>))}
      </div>
    </div>
  )
}

export default ShortcutKeys
