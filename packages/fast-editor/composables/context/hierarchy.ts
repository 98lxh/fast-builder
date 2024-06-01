import { inject, InjectionKey } from "vue";
import { convertContainerToBlock, useEditorContext } from "./editor";
import { TreeOption } from "naive-ui";

export const hierarchyInjectionKey: InjectionKey<HierarchyContext> = Symbol('HIERARCHY_INJECTION_KEY')


export function useHierarchy() {
  const { data } = useEditorContext()
  const layers = ref<TreeOption[]>([])


  /* 将数据转换为渲染图层树的数据格式 */
  watch(() => data.value, () => {
    const { container, blocks } = data.value
    const containerBlock = convertContainerToBlock(container, blocks)
    layers.value = [containerBlock] as unknown as TreeOption[]
  }, {
    immediate: true
  })

  return { layers }
}

export type HierarchyContext = ReturnType<typeof useHierarchy>
export function useHierarchyContext() {
  const context = inject(hierarchyInjectionKey, useHierarchy())
  return context;
}
