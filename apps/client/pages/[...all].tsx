import { NButton } from "naive-ui"

function NotFound() {
  const { push } = useRouter();

  return (
    <div class="w-full">
      <p class="text-2xl text-center">Not Found</p>
      <div class="flex justify-center">
        <NButton type="primary" onClick={() => push('/')}>back</NButton>
      </div>
    </div>
  )
}

export default NotFound;
