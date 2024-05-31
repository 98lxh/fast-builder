import { convert } from "@fast-builder/shared"

import * as common from "./common"
import * as material from "./material"
import * as direction from "./direction"

export default convert({
  ...common,
  ...direction,
  ...material.default
})
