import { FastIcon } from "@fast-builder/icon"
import { EDITOR_CONTAINER_KEY, useEditorContext, useHierarchyContext } from "../../../../composables"
import { NTooltip, NTree, TreeOption, TreeSelectRenderLabel } from "naive-ui"

function TabHierarchy() {
  const hierarchy = useHierarchyContext()
  const editor = useEditorContext()

  const label: TreeSelectRenderLabel = ({ option }) => {
    const block = option as unknown as Block
    const { icon, name } = block
    return (
      <div class="flex items-center">
        <FastIcon size={16} name={icon} />
        <p class="ml-[5px] line-height-[16px] pt-[1px] text-[12px]">{name}</p>
      </div>
    )
  }

  function handleSelectBlock(_: string[], options: (TreeOption | null)[]) {
    const [selected] = options as unknown as Block[];
    const { data, setBlockFocus } = editor

    /* 选中容器 */
    if (selected.key === EDITOR_CONTAINER_KEY) {
      data.value.container.focus = true
      return
    }

    /* 选中组件 */
    setBlockFocus(selected.id)
  }

  return (
    <div class="flex flex-col">
      {/* 图层搜索 */}
      <div class="flex items-center h-[36px]">
        <div class="flex flex-1">
          <FastIcon class="mr-[5px]" size={18} name="IconSearch" />
          <input class="bg-transparent outline-none text-[12px]" placeholder="搜索" />
        </div>
        <NTooltip placement="bottom" v-slots={{
          trigger: () => <FastIcon class="rotate-[90deg] cursor-pointer mr-[5px]" size={14} name="IconRightDouble" />
        }}>
          <p class="text-[12px]">展开全部</p>
        </NTooltip>
      </div>

      {/* 图层树 */}
      <NTree
        keyField="id"
        labelField="name"
        childrenField="blocks"
        blockLine={true}
        renderLabel={label}
        data={hierarchy.layers.value}
        defaultExpandAll={true}
        selectable={true}
        selectedKeys={editor.currentBlock.value ? [editor.currentBlock.value.id] : []}
        onUpdateSelectedKeys={handleSelectBlock}
      />
    </div>
  )
}

export default TabHierarchy
