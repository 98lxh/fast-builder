import { MaterialCategories, MaterialComponents } from "~/constants/material";
import ArrowButton from "./../utils/arrow-button";
import Tabs from "./tabs";

function Material(){
  const isHidden = shallowRef(false);
  const category = shallowRef(MaterialCategories[0].key);

  const components = computed(() => MaterialComponents[category.value] || []);

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
      <Tabs v-model:active={category.value} />
      <ArrowButton v-model={isHidden.value} direction="left" />
      
      <div class={`flex m-2 gap-2 overflow-hidden duration-300 w-[${isHidden.value ? 'auto' : '0px'}]`}>
        {
          components.value.map(item => (
            <div class="flex flex-col border-2 justify-center items-center h-[80px] w-[80px]  cursor-move">
              <NuxtIcon name={item.icon} size="48px" color="#1A5CFF" />
              <p class="text-sm whitespace-nowrap select-none">{item.text}</p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Material;
