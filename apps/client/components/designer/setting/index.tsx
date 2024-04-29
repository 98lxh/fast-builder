import ArrowButton from "./../utils/arrow-button";

function Setting() {
  const isHidden = shallowRef(false);

  const styles = computed(() => ({
    transform: `translate(${isHidden.value ? '100%' : '0px'},0px)`,
    transition: 'transform .3s'
  }))

  return (
    <div
      class="flex bg-base-100 shadow-custom w-[248px] absolute z-[2] main-height  right-[0px]"
      style={styles.value}
    >

      <ArrowButton v-model={isHidden.value} direction="right" />
    </div>
  )
}

export default Setting
