import { FastIcon } from "@fast-builder/icon"
import { NScrollbar } from "naive-ui"
import { workspaceButtons } from "~/constants/workspace"

function Header() {
  return (
    <div>
      <NScrollbar xScrollable={true}>
        <div class="w-full flex mb-[10px]">
          {workspaceButtons.map(button => (
            <NuxtLink to={button.path}>
              <div class="h-[54px] w-[238px] border-1 mr-[10px] dark:bg-base-100 hover:border-primary cursor-pointer flex justify-between items-center select-none">
                <div class="flex ml-[8px] items-center">
                  <FastIcon size={24} name={button.icon} />
                  <div class="ml-[8px]">
                    <p class="text-[14px] font-bold text-black dark:text-white">{button.label}</p>
                    <p class="text-[12px] text-coolgray">{button.description}</p>
                  </div>
                </div>
                <FastIcon size={28} name="IconAdd" />
              </div>
            </NuxtLink>
          ))}
        </div>
      </NScrollbar>
    </div>
  )
}

export default Header
