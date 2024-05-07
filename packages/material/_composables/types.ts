export enum MaterialCategory {
  BASIS = 'BASIS',
  MEDIA = 'MEDIA',
}

export interface MaterialComponentStyle {
  width: number
  height: number
}

export interface MaterialComponent {
  icon: string
  text: string
  key: string
  component: any
  style: MaterialComponentStyle
}
