import { NDropdown } from "naive-ui"
import { DesignerMenuOptionKey, designerMenuOptions } from "~/constants/options"

function CreateButton() {
  const router = useRouter()

  function handleSelect(optionKey: DesignerMenuOptionKey) {
    switch (optionKey) {
      case DesignerMenuOptionKey.BackWorkspace:
        router.push('/workspace')
        break
      default:
        console.log('TODO...')
        break;
    }
  }


  return (
    <NDropdown options={designerMenuOptions} size="small" trigger="click" placement="bottom-start" onSelect={handleSelect}>
      <button class=" btn-ghost p-[5px] h-full">
        <NuxtIcon name="menu" />
      </button >
    </NDropdown>
  )
}

export default CreateButton
