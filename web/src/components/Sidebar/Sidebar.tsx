import { SidebarHeading } from "./SidebarHeading";
import { SidebarMenu } from "./SidebarMenu";
import logo from "../../../public/logo/logo.png";
export default function Sidebar() {
  return (
    <>
      <div className="w-56 m-1 p-3 rounded-lg  h-screen bg-[#0f021e] text-white">
        <SidebarHeading
          title="MindEng"
          logo={<img src={logo} alt="Logo" className="w-13 h-13" />}
        />

        <div>
          <SidebarMenu />
        </div>
      </div>
    </>
  );
}
