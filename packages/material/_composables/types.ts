export enum MATERIAL_KEY {
  BASIS = 'BASIS',
  MEDIA = 'MEDIA'
}

export interface MaterialComponent {
  component: any
  icon: string
  text: string
  key: string
}
