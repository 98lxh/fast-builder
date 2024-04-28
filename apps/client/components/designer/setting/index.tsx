import ArrowButton from "~/components/ArrowButton";

function Setting(){
  const isHidden = shallowRef(false);

  return (
    <div 
      class="flex card bg-base-100 shadow-custom m-[14px] w-[248px] absolute z-[2] duration-300 right-[0px]"
      style={{ transform: `translate(${isHidden.value ? '100%' : '0px'},0px)`,height: 'calc(100vh - 103px)' }}
      >

     <ArrowButton v-model={isHidden.value} direction="right" />
    </div>
  )
}

export default Setting
