import { workspaceButtons } from "~/constants/workspace"
import { FastIcon } from "@fast-builder/icon"
import { NDropdown } from "naive-ui"

function CreateButton() {
  const options = workspaceButtons.map(({ path: key, icon, label }) => ({ key, label: _label(icon, label) }))
  function _label(icon: string, label: string) {
    return () => (
      <div class="flex text-[14px] items-center">
        <FastIcon name={icon} />
        <p class="ml-[5px]">{label}</p>
      </div>
    )
  }

  return (
    <NDropdown options={options} placement="bottom-start">
      <button class=" btn-ghost h-full">
        <FastIcon size={24} name="IconAdd" />
      </button >
    </NDropdown>
  )
}

export default CreateButton
