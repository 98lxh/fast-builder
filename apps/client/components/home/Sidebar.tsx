import MessageBox from "~/components/MessageBox";
import { HomeSideItems } from "~/constants/pageConstant";

function Sidebar() {
  const visible = shallowRef(false)
  const router = useRouter();

  function patch(isFinished: boolean, path: string) {
    if (!isFinished || !path) {
      visible.value = true;
      return;
    }
    router.push(path);
  }

  return (
    <div class="w-[248px] p-[24px] border-r-1 dark:border-neutral">
      {
        HomeSideItems.map((item) => (
          item.divider ? <div class="my-2 border-b-1 dark:border-neutral" /> : (
            <button
              class={`btn w-full mt-2 ${item.class || ''}`}
              onClick={() => patch(item.isFinished!, item.patch!)}
            >
              {item.text}
            </button>
          )
        ))
      }
      <MessageBox
        v-model:visible={visible.value}
        content="该功能尚未开发完成"
      />
    </div>
  )
}


export default Sidebar;
