import Component from "~/components/workspace"

function Workspace() {
  return (
    <div class="h-full flex flex-col">
      <Component.Header />
      <Component.Content />
    </div>
  )
}

export default Workspace
