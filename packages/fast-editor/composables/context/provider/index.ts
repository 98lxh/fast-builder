import { editorInjectionKey, hierarchyInjectionKey, historyInjectionKey, useEditor, useHierarchyContext, useHistory } from "../editor"

export function useProvider() {
  provide(editorInjectionKey, useEditor())
  provide(hierarchyInjectionKey, useHierarchyContext())
  provide(historyInjectionKey, useHistory())
}
