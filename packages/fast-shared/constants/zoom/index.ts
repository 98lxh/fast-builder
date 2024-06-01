import { DropdownOption } from "naive-ui";
import { h } from "vue";


const _label = (label: string) => h('p', { class: 'px-[10px] text-[12px]' }, label)
/* 容器的缩放等级 */
export const zoomOptions: DropdownOption[] = [
  { label: () => _label('25%'), key: '0.25' },
  { label: () => _label('50%'), key: '0.5' },
  { label: () => _label('75%'), key: '0.75' },
  { label: () => _label('100%'), key: '1' },
  { label: () => _label('200%'), key: '2' }
]
