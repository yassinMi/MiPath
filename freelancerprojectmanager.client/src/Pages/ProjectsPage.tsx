import { useEffect, useState, type FC } from "react";
import ProjectsList from "../Components/ProjectsList";
import { Box, Button, ButtonGroup, CircularProgress, Menu, MenuItem, Modal, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import ListIcon from "@mui/icons-material/ViewStream"
import CardIcon from "@mui/icons-material/ViewModule"
import React from "react";
import ProjectsCards from "../Components/ProjectsCards";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ControlPanelLayout from "../Components/ControlPanelLayout";
import { userProjects } from "../hooks";
import CreatProjectForm from "../Components/CreateProjectForm";
import type { Project } from "../Model/Project";
import type { CreateProjectCommand } from "../Model/Commands";
import { data } from "react-router-dom";
import { apiCreateProject, apiFetchProject } from "../services/api";



const options_ = ["Create Project", "Create Pre-project"];
export interface SplitButtonProps {
    sx:any,
    options: string[],
    onClick?: (index:number)=>void
}
  export const SplitButton:FC<SplitButtonProps>= ({sx, options, onClick}) =>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = (index:number) => {
    if(onClick) onClick(index)

  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    handleClick(index)
  };

  return (
    <>
      <ButtonGroup sx={{...sx, ml:"auto"}} variant="contained">
        <Button sx={{fontWeight:"800"}} className='whitespace-nowrap' color="secondary" onClick={()=>handleClick(selectedIndex)}>{options[selectedIndex]}</Button>
        <Button color="secondary"
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}


const ProjectsPage : FC = ({})=>{
    const [projects, setProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = React.useState<'listView'|'cardView'>('cardView');
  const [isLoadingProjects,setIsLoadingProjects  ] = useState<boolean>(false)
  const {data:projects_, isLoading:isLoadingProjects_, error:errorProjects_, refetch: refetchProjects, isRefetching:isRefetchingProjects_} = userProjects()
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode:'listView'|'cardView',
  ) => {
    setViewMode(newMode);
  };

  useEffect(() => {
    if(projects_){
              console.log("projects assigned from cach", projects_)

      setProjects(projects_);

      }
    
  }, [projects_])

 useEffect(() => {
        //populateWeatherData();
    }, []);
    const handleCreateProjectModalOpen = (preprojectTemplate:boolean) =>{
      
       setCreateProjectModalOpen(true);

    }
    const handleCreateProjectModalClose = () => {

      setCreateProjectModalOpen(false);

    }
    const handleCreateProjectSubmit = async (data:CreateProjectCommand) =>{
      console.log("handleCreateProjectSubmit", data)
      //call api to create project
      try {
         const newProjId = await apiCreateProject(data);
         console.log("newProjId", newProjId)
        //close modal
        setCreateProjectModalOpen(false);
        //push card to top of list without refetching 

        var newProject = await apiFetchProject (newProjId);

        console.log("newProject fetched", newProject)
        setProjects(prev=>[newProject, ...prev])




        //navigate or scrol into viw

      }
      catch(err){
        console.error("Error creating project", err)
      }

     
    
    }
    const handleSplitButtonClick = (index:number) => {
      if(index==0) handleCreateProjectModalOpen(false) 
      else if (index==1) handleCreateProjectModalOpen(true)
    }
     const handleCreateProjectClickFromSuggestedActionUI = async () => {
      handleCreateProjectModalOpen(false)
        };
    return (

        <div className="text-gray-800 dark:text-gray-200">
               <ControlPanelLayout  className="projects  ">
  <ToggleButtonGroup
      value={viewMode}
      exclusive
      onChange={handleViewModeChange}
      aria-label="text alignment"
    >
      <ToggleButton value="cardView" aria-label="left aligned">
        <CardIcon />
      </ToggleButton>
      <ToggleButton value="listView" aria-label="centered">
        <ListIcon />
      </ToggleButton>
      
    </ToggleButtonGroup>
     <SplitButton onClick={handleSplitButtonClick} options={options_} sx={{ ml: "auto" }}></SplitButton>
     {/* <Button sx={{ ml: "auto" }} onClick={handleCreateProject} variant="contained">Create new</Button> */}
              </ControlPanelLayout>
              <Modal 
  open={createProjectModalOpen}
  onClose={handleCreateProjectModalClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border rounded-lg p-6">
    
      <CreatProjectForm  onSubmit={handleCreateProjectSubmit}/>
    
  </Box>
</Modal>

{isLoadingProjects_?<div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <CircularProgress color="primary" />
    </div>: errorProjects_?<>Error loading projects: {(errorProjects_ as Error).message}</>:null}
            {projects &&!(isLoadingProjects_)&&!errorProjects_&&

               (viewMode=="cardView"? <ProjectsCards handleCreate={handleCreateProjectClickFromSuggestedActionUI} projects={projects} ></ProjectsCards>
            :<ProjectsList handleCreate={handleCreateProjectClickFromSuggestedActionUI} projects={projects} ></ProjectsList>    
            )
          }

        </div>
    

)



        function delay(ms:number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

}

export default ProjectsPage