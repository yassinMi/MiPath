import React, { useEffect, useState } from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';
import ProjectComponent from '../Components/ProjectComponent';
import { userProjects } from '../hooks';
import { Button, CircularProgress, styled, type ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { purple, grey,  } from '@mui/material/colors';
import { ArrowLeft, ChevronLeft } from '@mui/icons-material';
import ArrowRight from '@mui/icons-material/ChevronRight';
import { useAccountInfo } from '../hooks/useAccountInfo';
import LoginCard from '../Components/LoginCard';
import { useSnackbar } from '../Components/SnackbarContext';
import { QueryClient } from '@tanstack/react-query';
export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: 'var(--color-gray-900)',
  boxShadow:"unset",
  ...theme.applyStyles('dark', {
      
      backgroundColor: "#ffffff07",
  '&:hover': {
    backgroundColor:"#ffffff20",
  },
   }),
}));

interface HomeDashboardProps {
  
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({  }) => {
  
  //useProjects
  const {data:accountInfo, isLoading:isLoadingAccountInfo, error: errorAccountInfo} = useAccountInfo();
  
  const {data: projects, error:errorProjects, isLoading:isLoadingProjects, refetch:refetchProjects} =  userProjects({enabled:!isLoadingAccountInfo&&!errorAccountInfo});
  const {data: ugentTasks, error:errorUrgentTasks, isLoading:isLoadingUrgentTasks, refetch:refetcUrgentTasksh} =  userProjects({enabled:!isLoadingAccountInfo&&!errorAccountInfo});
  const {showSnackbar} = useSnackbar()
  function loginWithGoogle() {
    const popup = window.open(
      "https://localhost:50272/api/auth/google-login",
      "googleLogin",
      "width=500,height=600"
    );

    window.addEventListener("message", function handler(event) {
      if (event.origin !== "https://localhost:50272") {
        console.log("wrong origin")
      };

      const { token } = event.data;
      if (token) {
        localStorage.setItem("jwt", token);
        window.removeEventListener("message", handler);
        popup?.close();
        new QueryClient().invalidateQueries({queryKey: ["accountInfo"]})
        showSnackbar("Login success", "success")
      }
    });
  }

  return (
     <div className='flex flex-col gap-8 flex-1 overflow-auto '>
                
                
           
           {(isLoadingProjects||isLoadingUrgentTasks||isLoadingAccountInfo)?<div className='flex-1 flex flex-col items-center justify-center'><CircularProgress/></div>:null}
            {accountInfo?.email&&(errorProjects||errorUrgentTasks)? <div className='text-red-500'>Error loading : {(errorProjects as Error)?.message} {(errorUrgentTasks as  Error)?.message}</div>:null}
               {projects&&ugentTasks?
               
                <div className='grid grid-cols-4 grid-rows-[auto_auto_auto] lg:grid-rows-[auto_1px_auto] gap-2 p-6'>
                
               <div className='projects-overview-row flex flex-col col-start-1 col-end-5 lg:col-end-4 row-start-1 row-end-1 flex-1 bg-white dark:bg-gray-950 p-6 rounded'>
                <div className='flex flex-row justify-between items-center mb-4'>
                   <h2 className="font-bold  capitalize">Projects ({projects.length})</h2>
                   <Link to="/project" className='no-underline group'>
              <ColorButton  variant="contained" color="success" onClick={()=>{
                          //navigate to /projects/create
                         
                      }}>View All Projects
                      <ArrowRight sx={{transition:"all 200ms ease-in-out"}} className=" group-hover:translate-x-1 "></ArrowRight>
                      </ColorButton>
                    </Link>
                      {/**a white button to go to all projects page button make it white*/}
                      
                       


                   
                   
                </div>


               
                <div >
                    
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {projects.slice(0, 4).map(project => (
                      <ProjectComponent projectId={project.id} clientName={project.client?.name} projectName={project.name} description={project.description} status={project.status}
                          key={project.id}  project={project}
                          
                      >

                      </ProjectComponent>
                  ))}

              </div>
              
                </div>
               </div>
 <div className='utils-row gap-2 row-start-2 row-end-3 col-start-1 col-end-5 lg:row-start-1 lg:row-end-4 lg:col-start-4 lg:col-end-4 flex flex-row lg:flex-col flex-shrink-0 lg:self-start  '>
                  <div className='clock-section   flex flex-col items-center gap-4  flex-1 bg-white dark:bg-gray-950 p-6 rounded'>
                    
                    <div className='font-thin flex-shrink-0 text-4xl'>12:54 AM</div>
                    <Button variant="contained" className='self-stretch flex-shrink-0 font-bold' color='secondary' onClick={()=>{
                      
                    }}>Clock in</Button>
                  </div>
                  <div className='hidden sm:flex kpis-section text-gray-700 h-64  flex-row lg:flex-col items-stretch gap-4  flex-1 bg-white dark:bg-gray-950 p-6 rounded'>
                    <div className='min-h-22 flex flex-row items-center justify-center bg-gray-100 dark:bg-gray-900'>
                      - indicator placeholder -
                    </div>
                     <div className='min-h-22 flex flex-row items-center justify-center bg-gray-100 dark:bg-gray-900'>
                       - indicator placeholder -

                    </div>
                     <div className='min-h-22 flex flex-row items-center justify-center bg-gray-100 dark:bg-gray-900'>
                         - indicator placeholder -
                    </div>
                    </div>

                
               </div>
           <div className='tasks-overview-row row-start-3 row-end-4 col-start-1 col-end-5 lg:col-end-4 flex-1 bg-white dark:bg-gray-950 p-6 rounded'>

             <div className="min-h-64 flex flex-con items-center justify-center">
                 <div className='text-gray-500'>recent tasks / tasks currently working on</div>
              </div>
           </div>
               
               </div>
               :null}
              {!accountInfo?<><LoginCard onGoogleLogin={loginWithGoogle}></LoginCard></>:null}
          
    
             
            </div>
    
  );
};

export default HomeDashboard;