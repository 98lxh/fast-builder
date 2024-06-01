import { Fragment } from "vue"
import { FC } from "vite-plugin-vueact"
import { editorInjectionKey, useEditor } from "../../composables"
import HierarchyProvider from "./hierarchy"
import HistoryProvider from "./history"

const EditorProvider: FC<unknown> = function (_, { slots }) {
  provide(editorInjectionKey, useEditor())

  return (
    <Fragment>
      <HierarchyProvider></HierarchyProvider>
      <HistoryProvider></HistoryProvider>
      {slots.default && slots.default()}
    </Fragment>
  )
}

export default EditorProvider
