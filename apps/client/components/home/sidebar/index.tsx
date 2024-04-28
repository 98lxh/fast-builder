import SidebarItems from "./SidebarItems";

function Sidebar() {
  return (
    <div class="card shadow-custom bg-base-100 w-[248px] m-[14px] hidden lg:block">
      <div class="card-body">
        <SidebarItems />
      </div>
    </div>
  )
}

export default Sidebar;
