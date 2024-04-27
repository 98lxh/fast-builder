import { HomeSideItems } from "~/constants/pageConstant";
import MessageBox from "../MessageBox";

function SidebarItems() {
  const visible = shallowRef(false)

  return (
    <>
      {
        HomeSideItems.map((item) => (
          item.divider ? <div class="my-2 border-b-1 dark:border-neutral" /> : (
              <div class="flex justify-center">
                <div class={`btn w-full ${item.class && item.class}`} onClick={() => !item.isFinished && (visible.value = true)}>
                    <i class={item.icon} />
                    <span>{item.text}</span>
                </div>
              </div>
          )
        ))
      }

      <MessageBox
        v-model:visible={visible.value}
        content="该功能尚未开发完成"
      />
    </>
  )
}

export default SidebarItems;
