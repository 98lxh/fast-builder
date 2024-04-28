function Setting(){
  const isHidden = shallowRef(false);

  return (
    <div 
      class="flex card bg-base-100 shadow-custom m-[14px] w-[248px] absolute z-[2] duration-300 right-[0px]"
      style={{ transform: `translate(${isHidden.value ? '100%' : '0px'},0px)`,height: 'calc(100vh - 103px)' }}
      >

      <div 
        class="cursor-pointer absolute h-[80px] bg-base-100  w-[25px] left-[-25px] top-[50%] flex items-center" 
        style="border-radius:16px 0px 0px 16px"
        onClick={() => isHidden.value = !isHidden.value}
      >
        { isHidden.value ? <NuxtIcon name="left-arrow" /> : <NuxtIcon name="right-arrow" /> }
      </div>
    </div>
  )
}

export default Setting
