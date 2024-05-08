import { useDesignerContext } from "~/composables/designer";
import { devices, type Device as DeviceType } from "~/composables/designer/device"

function Device() {
  const { simulatorData, setSimulatorData } = useDesignerContext()
  const container = shallowReactive({ width: 0, height: 0 })

  const vm = getCurrentInstance();
  function onInput(evt: Event, key: 'height' | 'width') {
    const value = (evt.target as any).value
    if (!/^\d+$/.test(value)) {
      vm?.proxy?.$forceUpdate();
      return
    }
    container[key] = value;
  }

  function onUpdateContainer(device?: DeviceType) {
    if (device) {
      container.height = device.height
      container.width = device.width
    }
    setSimulatorData({ ...simulatorData.value, container: { ...container } })
  }

  watch(() => simulatorData.value.container, (value) => {
    const { height, width } = value || {};
    if (height === 0 && width === 0) { return }
    container.height = height || 0
    container.width = width || 0;
  }, {
    immediate: true
  })

  return (
    <div class="dropdown dropdown-hover border-1 w-full p-[2px] dropdown-left dark:border-neutral rounded-sm">
      <div class="hover:text-primary">
        <NuxtIcon name="designer/computer" />
      </div>

      <div tab-index={0} class="dropdown-content z-[1] p-4 shadow-custom bg-base-100 w-[300px] border-1 dark:border-neutral">
        <p class="p-2">设置画布尺寸</p>
        <div class="border-b-1 dark:border-neutral" />

        <div class="flex flex-wrap px-1 py-2">
          {
            devices.map(device => (
              <div class="flex flex-col items-center w-[33.33%] my-2" onClick={() => onUpdateContainer(device)}>
                <div class="border-1 w-[30px] h-[45px] mb-1 hover:border-primary"></div>
                <span class="text-nowrap text-xs">{device.name}</span>
              </div>
            ))
          }
        </div>

        <div class="border-b-1 dark:border-neutral" />

        <div class="flex items-center justify-center p-2 pt-4 flex-wrap">
          <div class="w-[50%] flex pr-2">
            <p class="pr-1">宽：</p>
            <input
              value={container.width}
              type="text"
              placeholder="宽度"
              class="input input-bordered w-full input-xs"
              onInput={evt => onInput(evt, 'width')}
            />
          </div>
          <div class="w-[50%] flex">
            <p class="pr-1">高:</p>
            <input
              value={container.height}
              type="text"
              placeholder="高度"
              class="input input-bordered w-full input-xs"
              onInput={evt => onInput(evt, 'height')}
            />
          </div>
          <div class="flex justify-end w-full mt-2">
            <button class="btn btn-primary btn-sm" onClick={() => onUpdateContainer()}>更新</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Device
