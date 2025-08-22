import { useEffect, useState, type FC } from "react";
import ProjectsList from "./ProjectsList";
import type { CreateProjectCommand, Project } from "../Model/Project";
import { Button, ButtonGroup, CircularProgress, Menu, MenuItem, ToggleButton, ToggleButtonGroup } from "@mui/material";

import ListIcon from "@mui/icons-material/ViewStream"
import CardIcon from "@mui/icons-material/ViewModule"
import React from "react";
import ProjectsCards from "./ProjectsCards";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";



const options = ["Create Project", "Create Task", "Create Pre-project"];
export interface SplitButtonProps {
    sx:any
}
  const SplitButton:FC<SplitButtonProps>= ({sx}) =>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    alert(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonGroup sx={{...sx, ml:"auto"}} variant="contained">
        <Button sx={{fontWeight:"800"}} color="secondary" onClick={handleClick}>{options[selectedIndex]}</Button>
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

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode:'listView'|'cardView',
  ) => {
    setViewMode(newMode);
  };

 useEffect(() => {
        populateWeatherData();
    }, []);
     const handleCreateProject = async () => {
            try {
                console.log("handleCreateProject called")
    
                var project: CreateProjectCommand = {
                    name: "New Project", description: "short description",
                    clientName:"yass" 
    
                }
                const res = await fetch("/api/project", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(project) // change as needed
                });
                const newProject = await res.json();
                setProjects(prev => [...prev, newProject]); // add the new project to state
            } catch (err) {
                console.error(err);
            }
        };
    return (

        <div className="text-gray-800 dark:text-gray-200">
               <div  className="projects-control-panel    z-50 dark:bg-gray-900 bg-white h-12  rounded p-0 flex flex-row gap-4 items-center shadow m-10 my-4">
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
     <SplitButton sx={{ ml: "auto" }}></SplitButton>
     {/* <Button sx={{ ml: "auto" }} onClick={handleCreateProject} variant="contained">Create new</Button> */}
              </div>

{isLoadingProjects?<div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <CircularProgress color="primary" />
    </div>:

                viewMode=="cardView"? <ProjectsList handleCreate={handleCreateProject} projects={projects} ></ProjectsList>
            :<ProjectsCards handleCreate={handleCreateProject} projects={projects} ></ProjectsCards>    
            }
                  

        </div>
    

)

    async function populateWeatherData() {
            console.log("populate")
            setIsLoadingProjects(true)
            try {
            const response = await fetch('/api/project');
            await delay(1000)
            if (response.ok) {
                
                const data = await response.json();
                setProjects(data);
            }
            }
            finally{
              setIsLoadingProjects(false)
            }
           
        }

        function delay(ms:number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

}

export default ProjectsPage