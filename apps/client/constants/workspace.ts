import type { Tab } from "@h5-designer/shared";

/* 工作台标签页配置 */
export const workspaceTabs: Tab[] = [
  {
    label: '我的页面',
    value: 'Pages'
  },
  {
    label: '我的应用',
    value: 'Apps'
  }
]

/* 工作台顶部按钮配置 */
export const workspaceButtons = [
  {
    label: '创建页面',
    description: '拖拽组件组成一个H5页面',
    icon: 'workspace/page',
    path: '/designer/start'
  },
  {
    label: '创建应用',
    description: '将H5页面组成为一个应用',
    icon: 'workspace/application',
    path: '/todo'
  }
]
