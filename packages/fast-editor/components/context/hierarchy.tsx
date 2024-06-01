import { hierarchyInjectionKey, useHierarchy } from "../../composables"
import { FC } from "vite-plugin-vueact"

const HierarchyProvider: FC<unknown> = function (_, { slots }) {
  provide(hierarchyInjectionKey, useHierarchy())
  return slots.default && slots.default()
}

export default HierarchyProvider
