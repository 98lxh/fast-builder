import { historyInjectionKey, useHistory } from "../../composables"
import { FC } from "vite-plugin-vueact"

const HistoryProvider: FC<unknown> = function (_, { slots }) {
  provide(historyInjectionKey, useHistory())
  return slots.default && slots.default()
}

export default HistoryProvider
