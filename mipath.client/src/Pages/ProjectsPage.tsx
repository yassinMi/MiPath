import { useCallback, useEffect, useState, type FC } from "react";
import ProjectsList from "../Components/ProjectsList";
import { Box, Button, ButtonGroup, CircularProgress, Menu, MenuItem, Modal, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

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
import { useSnackbar } from "../Components/SnackbarContext";
import { truncateString } from "../services/utils";


export const StyledBox = styled(Box)(({theme})=>({
   position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'var(--color-gray-100)',
  border: '1px solid',
  borderRadius: 16,


  p: 3,
  ...theme.applyStyles('dark', {
      backgroundColor: "var(--color-gray-950)",
      borderColor: "var(--color-gray-700)",
    })

}));;

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
  const {showSnackbar} = useSnackbar()
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
         var truncatedTitle = truncateString(data.name || "Unnamed Project", 30);
         showSnackbar(`Created project: '${truncatedTitle}'`, "success")
         
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
  <StyledBox >
    
      <CreatProjectForm  onSubmit={handleCreateProjectSubmit}/>
    
  </StyledBox>
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