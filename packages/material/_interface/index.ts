export interface MaterialComponentStyle {
  width: number
  height: number
}

export interface MaterialComponent {
  key: string
  icon: string
  text: string
  component: any
  weight:number
  style: MaterialComponentStyle
}


export interface MaterialCategory {
  key: string
  text: string
  icon: string
  weight: number
}
