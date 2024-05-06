import type { CSSProperties } from "vue";
import type { FC } from "vite-plugin-vueact";
import { designerInjectionKey } from "..";

import { mapMaterialComponents } from "@h5-designer/material";

interface DefineProps {
  translateX: number;
  translateY: number;
}

interface DefineEmits {
  (name: 'updateWrapperRef', wrapperRef: HTMLDivElement | null): void
}

const Block: FC<DefineProps, DefineEmits> = function (props, { emit }) {
  const wrapperRef = ref<HTMLDivElement | null>(null);
  const blocksRef = ref<Array<HTMLDivElement>>([])
  const context = inject(designerInjectionKey);

  const wrapperStyles = computed<CSSProperties>(() => {
    const container = context?.simulatorData.value?.container
    return {
      transform: `translate(${props.translateX}px,${props.translateY}px`,
      height: container?.height + 'px',
      width: container?.width + 'px',
    }
  })

  function generateBlockStyles(block: SimulatorBlock) {
    return {
      top: block.top + 'px',
      left: block.left + 'px',
      zIndex: block.zIndex,
      transform: 'translate(-50%,-50%)'
    }
  }

  function onClickOutside(evt: MouseEvent) {
    console.log(blocksRef.value)
    // clearBlockFocus();
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
    document.documentElement.addEventListener('click', onClickOutside)
  })

  onUnmounted(() => document.documentElement.removeEventListener('click', onClickOutside))


  return (
    <div
      class={`shadow-custom  top-[60px] left-[30%] bg-base-100 absolute cursor-auto`}
      style={wrapperStyles.value}
      ref={wrapperRef}
    >
      {
        context?.simulatorData.value?.blocks.map((block, index) => (
          <div
            class={`block absolute ${block.focus ? 'block-focus' : ''}`}
            onMousedown={evt => onMousedown(evt, block)}
            style={generateBlockStyles(block)}
            ref={blocksRef}
            key={index}
          >
            {mapMaterialComponents[block.key] && mapMaterialComponents[block.key](block.props)}
          </div>
        ))
      }
    </div>
  )
}


export default Block
