import React from 'react';
import type { ProjectStatus } from './Model/ProjectStatus';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

interface ProjectComponentProps {
  projectId: number;
  projectName: string;
  clientName?: string;
    deadline?: string;
    status: ProjectStatus;
    description?:string;
}
const projects = [
  {
    id: 1,
    title: "Website Redesign for GreenLeaf Co.",
    clientName: "GreenLeaf Co.",
    tags: ["web design", "UI/UX", "frontend"],
    status: "Active", // could be Idea, Scoping, Active, On Hold, Completed
    priority: "High",
    estimatedHours: 40,
    actualHours: 18.5,
    price: 1200, // total project value in USD
    startDate: "2025-08-15",
    longDescription: `Client reached out with a website redesign request.
The old site is outdated, not mobile-friendly, and needs a modern look.
They want a fresh color palette, improved navigation, and better SEO.
Initial messages included links to competitor websites and notes on existing pain points.
The client emphasized responsiveness and fast loading times.
The project includes wireframing, design, and implementing front-end HTML/CSS.`,
    tasks: [
      {
        id: 101,
        name: "Scoping / Research",
        type: "pre-project",
        estimatedHours: 5,
        timeEntries: [{ date: "2025-08-15", duration: 2 }],
      },
      {
        id: 102,
        name: "Wireframing",
        type: "task",
        estimatedHours: 8,
        timeEntries: [{ date: "2025-08-16", duration: 3 }],
      },
      {
        id: 103,
        name: "UI Design",
        type: "task",
        estimatedHours: 12,
        timeEntries: [{ date: "2025-08-17", duration: 6 }],
      },
      {
        id: 104,
        name: "Front-end Implementation",
        type: "task",
        estimatedHours: 15,
        timeEntries: [{ date: "2025-08-18", duration: 7.5 }],
      },
    ],
  },
  {
    id: 2,
    title: "Marketing Analytics Dashboard",
    clientName: "BlueWave Marketing",
    tags: ["analytics", "dashboard", "data visualization"],
    status: "Scoping",
    priority: "Medium",
    estimatedHours: 25,
    actualHours: 6,
    price: 900,
    startDate: "2025-08-20",
    longDescription: `Client wants a custom analytics dashboard to track social media campaigns.
They are currently using spreadsheets but need a visual, interactive interface.
Initial client messages included CSV exports of past campaigns and KPIs they want to track.
We need to investigate charting libraries, integrate data sources, and create filters.
The client mentioned automating weekly report generation.
We also discussed whether to include forecast projections based on past trends.`,
    tasks: [
      {
        id: 201,
        name: "Scoping / Initial Research",
        type: "pre-project",
        estimatedHours: 3,
        timeEntries: [{ date: "2025-08-20", duration: 2 }],
      },
      {
        id: 202,
        name: "Draft Dashboard Layout",
        type: "pre-project",
        estimatedHours: 2,
        timeEntries: [{ date: "2025-08-21", duration: 1 }],
      },
      {
        id: 203,
        name: "Select Visualization Library",
        type: "task",
        estimatedHours: 5,
        timeEntries: [],
      },
      {
        id: 204,
        name: "Prototype Charts",
        type: "task",
        estimatedHours: 15,
        timeEntries: [],
      },
    ],
  },
];


const ProjectComponent: React.FC<ProjectComponentProps> = ({
  projectId,
  projectName,
  clientName,
  deadline,
  status,
  description
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleCardClick=(e: React.MouseEvent<HTMLDivElement>)=>{
    if (e.target === e.currentTarget) {
     navigate(`/project/${projectId}/overview`, {state :{projectId,projectName,deadline,status,description} })

    }
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
   const handleDeleteMenuItemClick: React.MouseEventHandler<HTMLLIElement> = (e :React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    handleClose()
  };
  return (
      <div data-status={(status)} onClick={handleCardClick} className="project-component group cursor-pointer h-48  flex flex-col gap-2 max-w-sm bg-white dark:bg-[#060606] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300  
    data-[status=Scoping]:border-2
    dark:border-white
    border-amber-700
    data-[status=Scoping]:border-dashed
    dark:data-[status=Scoping]:opacity-50
    data-[status=Scoping]:opacity-40
    dark:data-[status=Scoping]:bg-[repeating-linear-gradient(45deg,#060606,#060606_20px,#101828_20px,#101828_21px)]
    data-[status=Scoping]:bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_20px,#B45309_20px,#B45309_21px)]
">
          <div onClick={handleCardClick}  className="project-card-header  flex m-4 mt-6 flex-row items-center justify-between h-4 " >
              <h3 title={projectName} onClick={handleCardClick}  className="text-lg group-hover:underline line-clamp-2">{projectName}</h3>
              <IconButton onClick={handleClick} className="text-gray-800 dark:text-gray-200">
                  <MoreVertIcon className="text-gray-800 dark:text-gray-200"></MoreVertIcon>
              </IconButton>
               <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleDeleteMenuItemClick}>Delete project</MenuItem>
        <MenuItem onClick={handleDeleteMenuItemClick}>Close as canceled</MenuItem>
        <MenuItem onClick={handleDeleteMenuItemClick}>Close as completed</MenuItem>
        <MenuItem onClick={handleDeleteMenuItemClick}>Set on hold</MenuItem>
      </Menu>
          </div>
          <div className="separator h-px bg-gray-300 dark:bg-gray-900 mx-4 pointer-events-none"></div>
          <div className="project-card-body flex flex-col flex-1 min-h-0 pointer-events-none " >
       

          <div className="relative flex-1 overflow-hidden min-h-0">
      <p className="text-gray-900 mx-4 text-xs dark:text-gray-100 min-h-0">
   {description}
  </p>
    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white group-data-[status=Scoping]:from-transparent dark:from-[#060606] to-transparent pointer-events-none"></div>

</div>
          </div>
          <div className="separator h-px bg-gray-300 dark:bg-gray-900 mx-4 pointer-events-none"></div>
          <div className="project-card-footer items-center flex flex-row gap-2 h-4 m-4 pointer-events-none" >
 <div className="text-xs font-bold  items-center min-w-0 truncate break-all justify-center bg-orange-500/10 text-orange-700 p-2 py-1 rounded-lg shadow">
    3/5 h
  </div>
  <div className="text-xs font-bold  items-center min-w-0 truncate break-word justify-self-start justify-center bg-green-500/10 text-green-700 p-2 py-1 rounded-lg shadow">
    3/9 tasks
  </div>
  <div className="text-xs font-bold  items-center truncate break-all justify-center bg-blue-500/10 text-blue-700 p-2 py-1 rounded-lg shadow">
    200$
  </div>
  <div className="text-xs font-bold  items-center truncate break-all justify-center bg-purple-500/10 text-purple-700 p-2 py-1 rounded-lg shadow">
    12$/h
  </div>
          </div>
    </div>
  );
};

export default ProjectComponent;