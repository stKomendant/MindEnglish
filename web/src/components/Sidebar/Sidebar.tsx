import { SidebarHeading } from "./SidebarHeading";
import { SidebarMenu } from "./SidebarMenu";
import { X } from "lucide-react";
import { useUIStore } from "../../UI/uiStore";

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useUIStore();

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <div
      className={`
  fixed inset-y-0 left-0 z-50 w-56 m-1 p-2 rounded-lg
  bg-[#130326] text-white
  transform transition-transform duration-300
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
  md:static md:translate-x-0 md:h-full
`}
      >
        <button
          onClick={closeSidebar}
          className="md:hidden absolute top-2 right-2 text-white"
        >
          <X size={22} />
        </button>

        <SidebarHeading
          title="MindEng"
          logo={
            <img
              src="./images/icon/logo/Logo.png"
              alt="Logo"
              className="w-13 h-13"
            />
          }
        />

        <div>
          <SidebarMenu onNavigate={closeSidebar} />
        </div>
      </div>
    </>
  );
}