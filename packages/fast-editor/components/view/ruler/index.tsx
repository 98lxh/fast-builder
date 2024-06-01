import { Fragment } from "vue";
import type { FC } from "vite-plugin-vueact";

import Scale from "./scale";
import Mask from "./mask"

interface DefineProps {
  mode?: 'vertical' | 'horizontal';
  offsetX: number;
  offsetY: number;
  height: number;
  width: number;
  scale: number;
}

const Ruler: FC<DefineProps> = function (props) {
  return (
    <Fragment>
      <Mask {...props} />
      <Scale {...props} />
    </Fragment>
  )
}

export default Ruler;
