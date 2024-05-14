import { Empty } from "~/components/common";

function NotFound() {
  const router = useRouter()

  return (
    <div class="w-full main-height relative">
      <Empty class="absolute top-[50%] left-[50%] translate-[-50%]" description="没有找到这个页面">
        <button class="btn btn-link" onClick={() => router.push('/')} >
          返回首页
        </button>
      </Empty>
    </div>
  )
}

export default NotFound;
