import { HOME_SIDEBAR_ITEMS } from "~/constants/sidebar"
import { MessageBox } from "~/components/common"

import { Fragment } from "vue"

function SidebarItems() {
  const visible = shallowRef(false)

  function render(item: any){
    const { class: itemClass, patch, isFinished } = item;
    const classes = `btn w-full ${itemClass && itemClass}`
    return patch && isFinished
      ? (<NuxtLink class={classes} external to={patch}>{children(item)}</NuxtLink> )
      : (<div class={classes} onClick={() => visible.value = true}>{children(item)}</div>)
  }

  function children(item: any){
    const { icon, text } = item;
    return (
      <Fragment>
        <div class="text-[18px]"> <NuxtIcon name={icon!} /></div>
        <span>{text}</span>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {HOME_SIDEBAR_ITEMS.map((item) => (
        item.divider
           ? <div class="my-2 border-b-1 dark:border-neutral" /> 
           : (<div class="flex justify-center">{render(item)}</div>)
      ))}

      <MessageBox
        v-model:visible={visible.value}
        content="该功能尚未开发完成"
      />
    </Fragment>
  )
}

export default SidebarItems;
