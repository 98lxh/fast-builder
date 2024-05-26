import { NDropdown } from "naive-ui"
import { workspaceButtons } from "~/constants/workspace"

function CreateButton() {
  const options = workspaceButtons.map(({ path: key, icon, label }) => ({ key, label: _label(icon, label) }))
  function _label(icon: string, label: string) {
    return () => (
      <div class="flex text-[14px]">
        <NuxtIcon name={icon} />
        <p class="ml-[5px]">{label}</p>
      </div>
    )
  }

  return (
    <NDropdown options={options} placement="bottom-start">
      <button class=" btn-ghost h-full">
        <NuxtIcon name="add" />
      </button >
    </NDropdown>
  )
}

export default CreateButton
