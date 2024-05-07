import type { CSSProperties } from "vue";
import type { FC } from "vite-plugin-vueact";
import { mapMaterialComponents } from "@h5-designer/material";
import Resizable from "./resizable";

interface DefineProps {
  translateX: number;
  translateY: number;
}

interface DefineEmits {
  (name: 'updateWrapperRef', wrapperRef: HTMLDivElement | null): void
}

const Block: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const context = useDesignerContext()
  const wrapperRef = ref<HTMLDivElement | null>(null);

  const data = computed(() => ({
    container: context?.simulatorData.value.container || { height: 0, width: 0 },
    blocks: context?.simulatorData.value.blocks || []
  }))

  const styles = computed<CSSProperties>(() => ({
    transform: `translate(${props.translateX}px,${props.translateY}px`,
    height: data.value.container?.height + 'px',
    width: data.value.container?.width + 'px',
  }))

  function onClickOutside(evt: MouseEvent) {
    if (!wrapperRef.value) { return }
    const child = [...wrapperRef.value.childNodes]
    const isContains = child.some(children => children.contains(evt.target as HTMLElement))
    if (isContains) { return }
    clearBlockFocus();
  }

  function onMousedown(evt: MouseEvent, block: SimulatorBlock) {
    !evt.shiftKey && clearBlockFocus();
    block.focus = true;
  }

  function clearBlockFocus() {
    context?.simulatorData.value.blocks.forEach(block => block.focus = false)
  }

  onMounted(() => {
    emit('updateWrapperRef', wrapperRef.value)
    document.documentElement.addEventListener('mousedown', onClickOutside)
  })

  onUnmounted(() => document.documentElement.removeEventListener('mousedown', onClickOutside))

  return (
    <div
      class={`shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto`}
      style={styles.value}
      ref={wrapperRef}
    >
      {
        data.value.blocks.map((block, index) => (
          <Resizable
            onMousedown={(evt: MouseEvent) => onMousedown(evt, block)}
            block={block}
          >
            {
              mapMaterialComponents[block.key] &&
              mapMaterialComponents[block.key].setup(block.props)()
            }
          </Resizable>
        ))
      }


    </div>
  )
}


export default Block
