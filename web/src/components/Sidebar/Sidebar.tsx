import { SidebarHeading } from "./SidebarHeading";
import { SidebarMenu } from "./SidebarMenu";
export default function Sidebar() {
  return (
    <>
      <div className="w-56 m-1 p-2  rounded-lg  h-screen bg-[#130326] text-white">
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
          <SidebarMenu />
        </div>
      </div>
    </>
  );
}
