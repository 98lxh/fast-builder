import { designerInjectionKey, hierarchyInjectionKey, historyInjectionKey, useDesigner, useHierarchyContext, useHistory } from "./../designer"

export function useProvider() {
  provide(designerInjectionKey, useDesigner())
  provide(hierarchyInjectionKey, useHierarchyContext())
  provide(historyInjectionKey, useHistory())
}
