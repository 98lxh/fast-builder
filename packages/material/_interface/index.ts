export interface MaterialComponentStyle {
  width: number
  height: number
}

export interface MaterialComponent {
  key: Symbol
  icon: string
  text: string
  component: any
  style: MaterialComponentStyle
}


export interface MaterialCategory {
  key: Symbol
  text: string
  icon: string
}
