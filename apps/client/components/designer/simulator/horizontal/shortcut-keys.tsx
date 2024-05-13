function Device() {
  return (
    <div class="dropdown dropdown-hover w-[32px] h-full dropdown-top rounded-sm flex items-center justify-center text-[20px]">
      <div class="hover:text-primary">
        <NuxtIcon name="designer/keyboard" />
      </div>

      <div tab-index={0} class="dropdown-content z-[1] p-4 shadow-custom bg-base-100 w-[300px] border-1 dark:border-neutral text-[14px]">
        <p class="p-2 text-center">快捷键</p>
        <div class="border-b-1 dark:border-neutral mb-[10px]" />

        <div class="flex justify-between">
          <div class="flex items-center">
            <kbd class="kbd">ctrl</kbd>
            <p class="px-[10px]"> +</p>
            <kbd class="kbd">z</kbd>
          </div>
          <p>撤销</p>
        </div>
      </div>
    </div>
  )
}

export default Device
