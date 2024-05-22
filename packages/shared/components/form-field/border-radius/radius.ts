import { RadiusBottomRight, RadiusTopLeft, RadiusTopRight, RadiusBottomLeft } from "@vicons/tabler"

export const radius: RadiusItem[] = [
  {
    type: 'top-left',
    icon: RadiusTopLeft
  },
  {
    type: 'top-right',
    icon: RadiusTopRight
  },
  {
    type: 'bottom-left',
    icon: RadiusBottomLeft
  },
  {
    type: 'bottom-right',
    icon: RadiusBottomRight
  }
]


export interface RadiusItem {
  type: string
  icon: any
}
