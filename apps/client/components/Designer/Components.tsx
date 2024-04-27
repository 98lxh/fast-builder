import { DesignerComponents } from "~/constants/pageConstant";

function Components() {

  return (
    <div class="flex card shadow-custom m-[14px] w-[248px]">
      <div role="tablist" class="tabs h-full tabs-bordered flex-col w-[62px] border-r-1 dark:border-neutral">
        {
          DesignerComponents.map((item) => (
            <p role="tab" class="tab flex flex-col p-[0] w-[62px] h-[68px] border-r-2 border-primary" key={item.key}>
              <i class={item.icon} />
              <span class="text-primary font-bold">{item.text}</span>
            </p>
          ))
        }


      </div>
    </div>
  )
}

export default Components;
