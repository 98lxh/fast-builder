import { NDropdown } from "naive-ui"
import { workspaceButtons } from "~/constants/workspace"

function CreateButton() {
  const options = workspaceButtons.map(({ path: key, icon, label }) => ({ key, label: _label(icon, label) }))
  function _label(icon: string, label: string) {
    return () => (
      <div class="flex text-[12px]">
        <NuxtIcon name={icon} />
        <p class="ml-[5px]">{label}</p>
      </div>
    )
  }

  return (
    <NDropdown options={options} size="small" trigger="click" placement="bottom-start">
      <button class=" btn-ghost p-[1px] h-full">
        <NuxtIcon name="add" />
      </button >
    </NDropdown>
  )
}

export default CreateButton
