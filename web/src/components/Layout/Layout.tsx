import Sidebar from "../Sidebar/Sidebar";
import type { PropsWithChildren } from "react";

const LayoutApp = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className=" min-h-screen bg-gradient-to-br from-[#0F0328] via-[#16053A] to-[#0A011A] h-full text-[#CFC5E9] grid grid-cols-[256px_1fr]">
        <Sidebar />

        <div className="p-3 ">
          <h1 className="text-3xl font-bold">Header</h1>
          <div className="">{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutApp;
