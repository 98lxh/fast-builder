enum MATERIAL_KEY {
  BASIC = 'BASIC',
  MEDIA = 'MEDIA'
}


export const MaterialCategories = [
  {
    text: '基础',
    key: MATERIAL_KEY.BASIC,
    icon: 'computer'
  },
  {
    text: '图片',
    key: MATERIAL_KEY.MEDIA,
    icon: 'image'
  }
]


type MaterialComponentItem = {
  text: string;
  icon: string
}

export const MaterialComponents:Record<MATERIAL_KEY, MaterialComponentItem[]> = {
  [MATERIAL_KEY.BASIC]: [
    {
      text: '文本组件',
      icon: 'designer/text'
    },
    {
      text: '图片组件',
      icon: 'designer/text'
    }
  ],
  [MATERIAL_KEY.MEDIA]: [

  ]
}
