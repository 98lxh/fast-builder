import { inject, InjectionKey } from "vue";

export const hierarchyInjectionKey: InjectionKey<HierarchyContext> = Symbol('HIERARCHY_INJECTION_KEY')

export function useHierarchy() {
  //TODO 交换两个组件的图层
  // function swapTwoBlock(sourceId: string, targetId: string) {
  //   const { blocks } = data.value
  //   const sourceIndex = blocks.findIndex(({ id }) => id === sourceId)
  //   const targetIndex = blocks.findIndex(({ id }) => id === targetId)
  //   if (sourceIndex === -1 || targetIndex === -1) { return }
  //   const source = blocks[sourceIndex].style.zIndex
  //   const target = blocks[targetIndex].style.zIndex
  //   setBlockStyleById(sourceId, { ...blocks[sourceIndex].style, zIndex: target })
  //   setBlockStyleById(targetId, { ...blocks[targetIndex].style, zIndex: source })
  // }
  return {}
}

export type HierarchyContext = ReturnType<typeof useHierarchy>

export function useHierarchyContext() {
  const context = inject(hierarchyInjectionKey, useHierarchy())
  return context;
}
