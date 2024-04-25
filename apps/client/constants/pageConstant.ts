import TabMine from "~/components/home/TabMine";
import TabTemplate from "~/components/home/TabTemplate";

export const HomeSideItems = [
  {
    patch: '/designer',
    class: 'btn-primary',
    text: '开始创作',
    isFinished: true
  },
  {
    patch: '/mine',
    class: 'btn-ghost',
    text: '我的项目',
    isFinished: false
  },
  {
    divider: true
  },
  {
    patch: '/admin',
    class: 'btn-ghost',
    text: '后台管理',
    isFinished: false
  },
  {
    patch: '/docs',
    class: 'btn-ghost',
    text: '接口文档',
    isFinished: false
  }
];
