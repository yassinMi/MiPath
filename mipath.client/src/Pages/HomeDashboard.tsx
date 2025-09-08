import React, { useEffect, useState } from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';
import ProjectComponent from '../Components/ProjectComponent';
import { userProjects } from '../hooks';
import { Button, CircularProgress, LinearProgress, styled, type ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { purple, grey, } from '@mui/material/colors';
import { ArrowLeft, ChevronLeft } from '@mui/icons-material';
import ArrowRight from '@mui/icons-material/ChevronRight';
import { useAccountInfo } from '../hooks/useAccountInfo';
import LoginCard from '../Components/LoginCard';
import { useSnackbar } from '../Components/SnackbarContext';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import Clock from '../Components/Clock';
import World from '../Components/DayCompact';
import DayCompact from '../Components/DayCompact';
import WeekCompact from '../Components/WeekCompact';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

import { FloatingTicket } from '../Components/FloatingTicket';
export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: 'var(--color-gray-900)',
  boxShadow: "unset",
  ...theme.applyStyles('dark', {

    backgroundColor: "#ffffff07",
    '&:hover': {
      backgroundColor: "#ffffff20",
    },
  }),
}));

interface HomeDashboardProps {

}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ }) => {

  //useProjects
  const { data: accountInfo, isLoading: isLoadingAccountInfo, error: errorAccountInfo } = useAccountInfo();

  const { data: projects, error: errorProjects, isLoading: isLoadingProjects, refetch: refetchProjects } = userProjects({ enabled: !isLoadingAccountInfo && !errorAccountInfo && !accountInfo?.isGuest });
  const { data: ugentTasks, error: errorUrgentTasks, isLoading: isLoadingUrgentTasks, refetch: refetcUrgentTasksh } = userProjects({ enabled: !isLoadingAccountInfo && !errorAccountInfo && !accountInfo?.isGuest });
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient();
  function loginWithGoogle() {
    const width = 500;
    const height = 600;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      "/api/auth/google-login",
      "googleLogin",
      `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars`
    );


    window.addEventListener("message", function handler(event) {
      const expectedOrigin = window.location.origin;

      if (event.origin !== expectedOrigin) {
        console.warn("unexpected origin:", event.origin);
      }


      const { token } = event.data;
      if (token) {
        localStorage.setItem("jwt", token);
        window.removeEventListener("message", handler);
        popup?.close();
        queryClient.invalidateQueries({ queryKey: ["accountInfo"] })
        showSnackbar("Login success", "success")
      }
    });
  }

  return (
    <div className='flex flex-col gap-8 flex-1 overflow-auto '>



      {(isLoadingProjects || isLoadingUrgentTasks || isLoadingAccountInfo) ? <div className='flex-1 flex flex-col items-center justify-center'><CircularProgress /></div> : null}
      {accountInfo?.email && (errorProjects || errorUrgentTasks) ? <div className='text-red-500'>Error loading : {(errorProjects as Error)?.message} {(errorUrgentTasks as Error)?.message}</div> : null}
      {projects && ugentTasks ?

        <div className='grid grid-cols-4 grid-rows-[auto_auto_auto] lg:grid-rows-[auto_1px_auto] gap-2 p-6'>

          <div className='projects-overview-row flex flex-col col-start-1 col-end-5 lg:col-end-4 row-start-1 row-end-1 flex-1 bg-white dark:bg-gray-950 p-6 rounded'>
            <div className='flex flex-row justify-between items-center mb-4'>
              <h2 className="font-bold text-2xl capitalize flex flex-row gap-2 items-center justify-center "><div>Projects</div> <div className='rounded-full font-bold h-8 w-8 text-lg bg-gray-800 flex flex-col items-center justify-center '>{projects.length}</div></h2>
              <Link to="/project" className='no-underline group'>
                <ColorButton variant="contained" color="success" onClick={() => {
                  //navigate to /projects/create

                }}>View All Projects
                  <ArrowRight sx={{ transition: "all 200ms ease-in-out" }} className=" group-hover:translate-x-1 "></ArrowRight>
                </ColorButton>
              </Link>
              {/**a white button to go to all projects page button make it white*/}






            </div>



            <div >

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {projects.slice(0, 4).map(project => (
                  <ProjectComponent projectId={project.id} clientName={project.client?.name} projectName={project.name} description={project.description} status={project.status}
                    key={project.id} project={project}

                  >

                  </ProjectComponent>
                ))}

              </div>

            </div>
          </div>
          <div className='utils-row gap-2 row-start-2 row-end-3 col-start-1 col-end-5 lg:row-start-1 lg:row-end-4 lg:col-start-4 lg:col-end-4 flex flex-row lg:flex-col flex-shrink-0 lg:self-start  '>
            <div className='clock-section   flex flex-col items-center gap-4  flex-1 bg-white dark:bg-gray-950 p-6 rounded'>

              <Clock></Clock>
              <Button variant="contained" className='self-stretch flex-shrink-0 font-bold' color='secondary' onClick={() => {

              }}>Clock in</Button>
            </div>
            <div className='hidden sm:flex kpis-section text-white h-64  flex-row lg:flex-col items-stretch gap-4  flex-1 bg-white dark:bg-gray-950 p-6 rounded'>


              {/* <FloatingTicket label='Upcoming'>
                <div className='flex flex-row gap-4 items-center'>
                  <div className='relative shrink-0 h-[30px] w-[30px] text-[#b039f7]'>
                    <CircularProgress thickness={4} size={30} className='absolute top-0 left-0' sx={{ color: "#b039f7" }} variant='determinate' value={89}></CircularProgress>
                    <div className=' h-[30px] w-[30px] flex flex-col items-center justify-center'>
                      <LocalShippingIcon className=' w-[16px] h-[16px] ' sx={{ color: "#b039f7", height: "16px", width: "16px" }}></LocalShippingIcon>

                    </div>
                  </div>
                  <div className='text-lg font-bold'>E-commerce Redesign </div>
                </div>

              </FloatingTicket> */}
               <FloatingTicket iconType='performance' label='Performance'>
                <div className='flex flex-col gap-2 my-2'>    
                  <div>
                    <div className='text-lg text-gray-500 font-semibold'>On-Time Delivery Rate</div>
                    <LinearProgress className="rounded-md" color='success' variant='buffer' sx={{height:16}} value={50}></LinearProgress>
                  </div>    
                   <div>
                    <div className='text-lg text-gray-500 font-semibold'>Overdue Tasks</div>
                    <LinearProgress className="rounded-md" color='warning' variant='buffer' sx={{height:16}} value={30}></LinearProgress>
                  </div>   
                  <div>
                    <div className='text-lg text-gray-500 font-semibold'>Efficiency</div>
                    <LinearProgress className="rounded-md" color='success' variant='buffer' sx={{height:16}} value={12}></LinearProgress>
                  </div>                          
                  
                </div>
              </FloatingTicket>
              <FloatingTicket iconType='money' label='Est. earnings today'>
                <div className='flex flex-col items-stretch gap-2 my-2 flex-1'>    
                    
                  <div>
                    {/* <LinearProgress color='success' variant='buffer' sx={{height:16}} value={12}></LinearProgress> */}
                    <div className='text-lg  font-semibold'>
                       <div>                        
                  <div className='font-bold text-lg inline'>$13</div>
                  <div className='font-bold text-lg text-gray-500 inline'> / $54</div>
                </div>
                    </div>
                  </div>                          
                  
                </div>
               
              </FloatingTicket>
              <FloatingTicket iconType='money' sub='Est. Project payout: $5000' value='$ 75 / Hr' label='Projected earnings'></FloatingTicket>
             

            </div>


          </div>
          <div className='tasks-overview-row row-start-3 max-w-[1800px] w-full justify-self-center row-end-4 col-start-1 col-end-5 lg:col-end-4 flex-1 bg-white dark:bg-gray-950 p-6 rounded'>
            <div className='font-bold text-2xl'>Weekly timeline</div>
            <div className="min-h-64 flex flex-col  items-center justify-center">
              <div className='text-gray-500 flex flex-col items-center w-full'>
                <WeekCompact></WeekCompact>
              </div>
              <div className='bg-gray-900 h-[2px] w-full m-6'  ></div>
              <div className='text-gray-500 flex flex-col items-center w-full'>
                <DayCompact></DayCompact>
              </div>
              <div className='bg-gray-900 h-[2px] w-full m-6'  ></div>


            </div>
          </div>

        </div>
        : null}
      {accountInfo?.isGuest ? <div className='flex flex-col flex-1 items-center justify-center'><LoginCard onGoogleLogin={loginWithGoogle}></LoginCard></div> : null}



    </div>

  );
};

export default HomeDashboard;