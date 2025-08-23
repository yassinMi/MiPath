import type React from "react";

import CheckedIcon from '@mui/icons-material/CheckCircle'
import UncheckedIcon from '@mui/icons-material/CheckCircle'
import CevronRightIcon from '@mui/icons-material/ChevronRight'


const tasks = ['Research competitors','Wireframe homepage','Review color palette','Initial scoping','Draft layout','Implement dark mode','Responsive design','Data cleaning','Create sample charts','PDF export setup','Vendor contract review','Shipment data analysis']; 
export interface CompactTasksPreviewProps {


}
const CompactTasksPreview : React.FC<CompactTasksPreviewProps> = ({})=>{





    return <div className="flex flex-col gap-0 p-0">
            {tasks.map(t=>(<div className="flex flex-row items-center group gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-800  rounded cursor-pointer">
                {Math.random()>0.5?<CheckedIcon fontSize="small" color="success"></CheckedIcon>:<UncheckedIcon fontSize="small" color="disabled"></UncheckedIcon>}
                <div title={t} className="truncate flex-1">{t}</div>
                <CevronRightIcon className="opacity-0 group-hover:opacity-100" fontSize="small" ></CevronRightIcon>
                </div>))}

    </div>
}

export default CompactTasksPreview