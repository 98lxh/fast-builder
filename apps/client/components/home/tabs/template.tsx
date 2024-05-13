import Empty from "~/components/empty"

function TabTemplate() {
  const router = useRouter()

  return (
    <div class="w-full h-full relative">
      <Empty
        class="absolute top-[50%] left-[50%] translate-[-50%]"
        description="暂无模版,去创作一个吧"
      >
        <button
          class="btn btn-link"
          onClick={() => router.push('/designer/start')}
        >立即创作</button>
      </Empty>
    </div>
  )
}

export default TabTemplate;
