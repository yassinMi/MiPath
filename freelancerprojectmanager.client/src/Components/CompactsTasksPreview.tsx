import type React from "react";

import CheckedIcon from '@mui/icons-material/CheckCircle'
import UncheckedIcon from '@mui/icons-material/CheckCircle'


const tasks = ['Research competitors','Wireframe homepage','Review color palette','Initial scoping','Draft layout','Implement dark mode','Responsive design','Data cleaning','Create sample charts','PDF export setup','Vendor contract review','Shipment data analysis']; 
export interface CompactTasksPreviewProps {


}
const CompactTasksPreview : React.FC<CompactTasksPreviewProps> = ({})=>{





    return <div className="flex flex-col garp-1 p-2">
            {tasks.map(t=>(<div className="flex flex-row items-center gap-1">
                {Math.random()>0.5?<CheckedIcon color="success"></CheckedIcon>:<UncheckedIcon color="disabled"></UncheckedIcon>}
                {t}</div>))}

    </div>
}

export default CompactTasksPreview