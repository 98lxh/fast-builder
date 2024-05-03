function Tools() {
  return (
    <div class="shadow-custom w-[42px] absolute rounded-sm bg-base-100 right-[300px] top-[60px] p-2">
      <div class="rotate-[90deg] p-[5px] cursor-move">
        <NuxtIcon name="holder" />
      </div>

      <div class="dropdown dropdown-hover border-1 w-full p-[3px] dropdown-left dark:border-gray">
        <NuxtIcon name="phone" />
        <div tab-index={0} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-52">
          <div>111</div>
          <div>111</div>
          <div>111</div>
          <div>111</div>
        </div>
      </div>
    </div>
  )
}

export default Tools
