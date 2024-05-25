import { NScrollbar } from "naive-ui"
import { workspaceButtons } from "~/constants/workspace"

function Header() {
  return (
    <div>
      <NScrollbar xScrollable={true}>
        <div class="w-full flex mb-[15px]">
          {workspaceButtons.map(button => (
            <NuxtLink to={button.path}>
              <div class="h-[45px] w-[205px] border-2 mr-[10px] hover:border-primary cursor-pointer flex justify-between items-center select-none">
                <div class="flex ml-[8px] items-center">
                  <NuxtIcon class="w-[20px] h-[20px] inline-block" name={button.icon} />
                  <div class="ml-[8px]">
                    <p class="text-[12px] font-bold text-black dark:text-white">{button.label}</p>
                    <p class="text-[10px] text-coolgray">{button.description}</p>
                  </div>
                </div>

                <NuxtIcon class="w-[25px] h-[25px] mr-[5px] inline-block" name="add" />
              </div>
            </NuxtLink>
          ))}
        </div>
      </NScrollbar>
    </div>
  )
}

export default Header
