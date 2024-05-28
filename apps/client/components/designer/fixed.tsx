import { NButton, NPopover } from "naive-ui"

function FixedButton() {
  const trigger = () => null

  return (
    <NPopover v-slots={{ trigger }} trigger="click" placement="bottom-end">
      <div>
        TODO:xx
      </div>
    </NPopover>
  )
}

export default FixedButton
