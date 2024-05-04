export enum MaterialCategory {
  BASIS = 'BASIS',
  MEDIA = 'MEDIA'
}

export interface MaterialComponent {
  icon: string
  text: string
  key: string
  component: any
}
