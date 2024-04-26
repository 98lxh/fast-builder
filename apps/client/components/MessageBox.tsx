import { type FC } from "vite-plugin-vueact"
import { Teleport } from "vue";
import useMergeProps from "~/composables/props";

interface DefineProps {
  visible?: boolean;
  title?: string;
  content?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
}

interface DefineEmits {
  (name: 'confirm'): void;
  (name: 'cancel'): void;
  (name: 'update:visible', visible: boolean): void;
}

const MessageBox: FC<DefineProps, DefineEmits> = function (componentProps, { emit }) {
  const props = useMergeProps(componentProps, {
    visible: false,
    title: '提示',
    content: '你确定吗?',
    cancelBtnText: '取消',
    confirmBtnText: '确定'
  })

  const dialogRef = ref<HTMLDialogElement | null>(null);

  function handleCancel() {
    emit('cancel')
    emit('update:visible', false)
  }

  function handleConfirm() {
    emit('cancel')
    emit('update:visible', false)
  }

  return (
    <Teleport to="body">
      <dialog open={props.value.visible} class="modal invisible">
        <div ref={dialogRef} class="modal-box">
          <h3 class="text-lg font-bold">{props.value.title}</h3>
          <p class="py-4">{props.value.content}</p>
          <div class="modal-action">
            <form method="dialog">
              <button onClick={handleCancel} class="cancel btn btn-sm">
                {props.value.cancelBtnText}
              </button>
            </form>
            {
              props.value.confirmBtnText && (
                <button class="confirm btn  btn-sm btn-primary" onClick={handleConfirm}>
                  {props.value.confirmBtnText}
                </button>
              )
            }
          </div >
        </div >
      </dialog>
    </Teleport>
  )
}


export default MessageBox;
