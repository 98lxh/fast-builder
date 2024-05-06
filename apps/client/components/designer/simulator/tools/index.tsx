import Device from "./device"

function Tools() {
  return (
    <div class="shadow-custom w-[42px] absolute rounded-sm bg-base-100 right-[300px] top-[60px] p-2">
      <div class="rotate-[90deg] p-[4px] cursor-move mb-2">
        <NuxtIcon name="holder" />
      </div>
      <Device />
    </div>
  )
}

export default Tools
