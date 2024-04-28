import { DesignerComponents } from "~/constants/pageConstant";
import Tabs from "./tabs";

function Library(){
  const active = shallowRef(DesignerComponents[0].key);
  const isHidden = shallowRef(false);

  const styles = computed(() => ({
    height: 'calc(100vh - 103px)',
    width: isHidden.value ? '60px' : '248px',
    borderRadius: isHidden.value ? '16px 0px 0px 16px' :'16px'
  }))

  return (
    <div 
      class="flex  bg-base-100 shadow-custom m-[14px] w-[248px] relative duration-300"
      style={styles.value}
    >
      <Tabs v-model:active={active.value} />

      <div 
        class="cursor-pointer absolute h-[80px] bg-base-100  w-[25px] right-[-25px] top-[50%] flex items-center" 
        onClick={() => isHidden.value = !isHidden.value}
        style="border-radius:0 16px 16px 0"
      >
        { isHidden.value ? <NuxtIcon name="right-arrow" /> : <NuxtIcon name="left-arrow" /> }
      </div>
    </div>
  )
}

export default Library;
