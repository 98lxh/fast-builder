export const HomeSideItems = [
  {
    patch: '/designer/start',
    class: 'btn-primary',
    text: '开始创作',
    isFinished: true,
    icon: 'i-mdi-monitor'
  },
  {
    patch: '/mine',
    class: 'btn-ghost',
    text: '我的项目',
    isFinished: false,
    icon: 'i-mdi-add-circle'
  },
  {
    divider: true
  },
  {
    patch: '/admin',
    class: 'btn-ghost',
    text: '后台管理',
    isFinished: false,
    icon: 'i-mdi-add-circle'
  },
  {
    patch: '/docs',
    class: 'btn-ghost',
    text: '接口文档',
    isFinished: false,
    icon: 'i-mdi-add-circle'
  }
];


export const DesignerComponents = [
  {
    text: '基础',
    key: 'basic',
    icon: 'i-mdi-monitor'
  },
  {
    text: '图片',
    key: 'image',
    icon: 'i-tabler-photo'
  }
]
