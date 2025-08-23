import type { HTMLAttributes, ReactNode } from "react";
import type React from "react";
type ControlPanelLayoutProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
const ControlPanelLayout : React.FC<ControlPanelLayoutProps> = ({ children, className, ...props })=>{

    return  <div className={` control-panel   dark:bg-gray-900 bg-white h-12  rounded p-0 flex flex-row gap-4 items-center shadow m-10 my-4 ${className ?? ""}`} >
    {children}
     {/* <Button sx={{ ml: "auto" }} onClick={handleCreateProject} variant="contained">Create new</Button> */}
              </div>
}

export default ControlPanelLayout