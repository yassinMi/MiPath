import type React from "react";

import CheckedIcon from '@mui/icons-material/CheckCircle'
import UncheckedIcon from '@mui/icons-material/CheckCircle'
import CevronRightIcon from '@mui/icons-material/ChevronRight'
import type { PTask } from "../Model/PTask";


const tasks = ['Research competitors','Wireframe homepage','Review color palette','Initial scoping','Draft layout','Implement dark mode','Responsive design','Data cleaning','Create sample charts','PDF export setup','Vendor contract review','Shipment data analysis']; 
export interface CompactTasksPreviewProps {
 pTasks:PTask[]

}
const CompactTasksPreview : React.FC<CompactTasksPreviewProps> = ({pTasks})=>{





    return <div className="flex flex-col gap-0 p-0">
            {pTasks.map(t=>(<div key={t.id} className="flex flex-row items-center group gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-800  rounded cursor-pointer">
                {t.status=="Done"?<CheckedIcon fontSize="small" color="success"></CheckedIcon>:
                t.status=="InProgress"?<UncheckedIcon fontSize="small" sx={{color:"orange"}}></UncheckedIcon>
                :t.status=="Canceled"?<UncheckedIcon fontSize="small" sx={{color:"gray"}}></UncheckedIcon>
                :<UncheckedIcon fontSize="small" sx={{color:"gray"}}></UncheckedIcon>
            }
                <div title={t.title} className="truncate flex-1">{t.title}</div>
                <CevronRightIcon className="opacity-0 group-hover:opacity-100" fontSize="small" ></CevronRightIcon>
                </div>))}

    </div>
}

export default CompactTasksPreview