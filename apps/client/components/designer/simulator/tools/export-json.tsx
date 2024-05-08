import { useDesignerContext } from "~/composables/designer";
import { devices, type Device as DeviceType } from "~/composables/designer/device"

function ExportJSON() {
  return (
    <div class="tooltip tooltip-left w-full" data-tip="导出JSON">
      <div class="border-1 dark:border-neutral p-[2px]  w-full rounded-sm hover:text-primary box-border">
        <NuxtIcon name="export" />
      </div>
    </div>
  )
}


export default ExportJSON
