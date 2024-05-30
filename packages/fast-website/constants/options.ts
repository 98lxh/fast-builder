import type { DropdownOption } from "naive-ui"

/* 首页侧边栏配置 */
export const sidebarOptions = [
  {
    patch: '/workspace',
    class: 'btn-primary',
    text: '工作空间',
    icon: 'sidebar/page',
    isExternal: false
  },
  {
    patch: '/community',
    text: '社区资源',
    icon: 'sidebar/community',
    isExternal: false
  },
  {
    patch: '/admin',
    text: '后台管理',
    icon: 'sidebar/admin',
    isExternal: true
  }
];

/* designer顶部dropdown */
export enum DesignerMenuOptionKey {
  BackWorkspace
}

const _label = (label: string, icon?: string) => h('div', { class: 'flex text-[12px]' }, [h('p', { class: `${icon ? 'ml-[5px]' : ''}` }, label)])
export const designerMenuOptions: DropdownOption[] = [
  {
    key: DesignerMenuOptionKey.BackWorkspace,
    label: () => _label('返回工作空间')
  }
]

/* 组件的contextmenu */ 
export const blockContextMenuOptions = [
  {
    text: '上移一层',
    key: 'up',
  },
  {
    text: '下移一层',
    key: 'down',
  },
  {
    text: '删除',
    key: 'delete',
  },
]
