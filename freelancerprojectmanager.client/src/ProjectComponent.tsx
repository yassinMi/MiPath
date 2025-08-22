import React from 'react';
import type { ProjectStatus } from './Model/ProjectStatus';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

interface ProjectComponentProps {
  projectName: string;
  clientName?: string;
    deadline?: string;
    status: ProjectStatus;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({
  projectName,
  clientName,
  deadline,
  status,
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
     navigate("/project/1/overview")

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
      <div onClick={handleCardClick} className="project-component cursor-pointer h-48  flex flex-col gap-2 max-w-sm bg-white dark:bg-[#060606] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="project-card-header  flex m-4 mt-6 flex-row items-center justify-between h-4 " >
              <h3 className="text-lg pointer-events-none">{projectName}</h3>
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
          <div className="project-card-body flex-1 pointer-events-none " ></div>
          <div className="separator h-px bg-gray-300 dark:bg-gray-900 mx-4 pointer-events-none"></div>
          <div className="project-card-footer h-4 m-4 pointer-events-none" >

          </div>
    </div>
  );
};

export default ProjectComponent;