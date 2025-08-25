import React, { useEffect, useRef, useState } from 'react';
import AppIcon from './AppIcon';
import AccountButton from './AccountButton';
import ThemeSwitch from './ThemeSwitch';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, type Location, } from 'react-router';
import HomeIcon from "@mui/icons-material/Home"
import DarkModeIcon from "@mui/icons-material/DarkMode";       // Moon / Dark Mode
import FolderOpenIcon from "@mui/icons-material/FolderOpen";   // Project / Folder
import InfoIcon from "@mui/icons-material/Info";   // Project / Folder
import TaskAltIcon from "@mui/icons-material/TaskAlt";         // Task / Completed task
import InventoryIcon from "@mui/icons-material/Inventory";     // Item / Stock
import AllInboxIcon from "@mui/icons-material/AllInbox";       // Box / Container
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Money / Finance
import ScheduleIcon from "@mui/icons-material/CalendarToday";       // Schedule / Calendar
import WeekIcon from "@mui/icons-material/CalendarMonth";       // Schedule / Calendar
import ViewWeekIcon from "@mui/icons-material/ViewWeek";       // Week / Timeline
import PersonIcon from "@mui/icons-material/Person";           // Person / User
import WorkIcon from "@mui/icons-material/Work";           // Person / User
import DashboardIcon from "@mui/icons-material/Dashboard";           // Person / User
import ListAltIcon from "@mui/icons-material/ListAlt";           // Person / User
import { useLocation } from 'react-router';
import type { LocationState } from '../Model/LocationState';
import { userProjects } from '../hooks';
import { useProject } from '../hooks/useProject';
export interface AppHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    onDarkToggle: () => void;
    isDark: boolean;
}
export interface BreadcrumbsComponentProps {
    locationInfo: LocationState
}

const BreadcrumbsComponent: React.FC<BreadcrumbsComponentProps> = ({ locationInfo }) => {

    var className = `max-h-[56px] lg:max-h-[32px] min-h-[32px] items-center flex flex-row`
    switch (locationInfo.pageType) {
        case "about": return (<Breadcrumbs className={className} sx={{ maxHeight: "32px", overflow: "clip" }} aria-label="breadcrumb">
            <Typography
                sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
            >
                <InfoIcon  sx={{ mr: 0.5 }} fontSize="inherit" />
                About
            </Typography>
        </Breadcrumbs>)
        case "projectOverview":
        case "projectTasks": return (
            <Breadcrumbs className={className} sx={{  overflow: "clip" }} aria-label="breadcrumb">
                <RouterLink to={"project"}>
                    <div className='p-1 rounded flex flex-row gap-1 items-center hover:bg-gray-100 dark:hover:bg-gray-800'>
                        <FolderOpenIcon  className="!hidden sm:!inline-block" sx={{ mr: 0.5}} fontSize="inherit" />

                        <div>Projects</div>

                    </div>
                </RouterLink>
                <RouterLink title={locationInfo?.projectName} to={`project/${locationInfo.projectId}/overview`}>
                    <div className='p-1 max-w-32 md:max-w-48 lg:max-w-54 xl:max-w-72 rounded flex flex-row gap-1 items-center hover:bg-gray-100 dark:hover:bg-gray-800'>
                        <DashboardIcon  className="!hidden sm:!inline-block" sx={{ mr: 0.5}} fontSize="inherit" />

                        <div className=' truncate flex-1'>{locationInfo?.projectName}</div>
                        {locationInfo.projectStatus == "Scoping" ? <div className="text-xs font-bold flex-shrink-0  items-center min-w-0 truncate break-all justify-center bg-orange-500/10 text-orange-700 p-2 py-1 rounded-lg shadow">
                            Scoping
                        </div> : null}

                    </div>
                </RouterLink>
                <Typography
                    sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
                >
                    {locationInfo.pageType == "projectOverview" ? <> <InfoIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        <span className="hidden sm:block">Overview</span></> : <><ListAltIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Tasks</>}

                </Typography>
            </Breadcrumbs>);
        case "projects": return (
            <Breadcrumbs className={className} sx={{  overflow: "clip" }}  aria-label="breadcrumb">
                <RouterLink to={"project"}>
                    <div className='p-1 rounded flex flex-row gap-2 items-center hover:bg-gray-100 dark:hover:bg-gray-800'>
                        <FolderOpenIcon sx={{ mr: 0.5 }} fontSize="inherit" />

                        <div>Projects</div>

                    </div>
                </RouterLink>
            </Breadcrumbs>)

        case "home": return (<Breadcrumbs className={className} sx={{  overflow: "clip" }}  aria-label="breadcrumb">
            <Typography
                sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
            >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
            </Typography>
        </Breadcrumbs>)
        case "thisweekOverview":
        case "todayOverview": return (<Breadcrumbs className={className} sx={{  overflow: "clip" }}  aria-label="breadcrumb">
            <Typography
                sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
            >
                {locationInfo.pageType == "thisweekOverview" ? <WeekIcon sx={{ mr: 0.5 }} fontSize="inherit" /> : <ScheduleIcon sx={{ mr: 0.5 }} fontSize="inherit" />}

                {locationInfo.pageType == "thisweekOverview" ? "This Week" : "Today"}
            </Typography>
        </Breadcrumbs>)

    }
}
const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle, children, onDarkToggle, isDark }) => {

    let location = useLocation() as Location<LocationState>

    const [locationInfo, setLocactionInfo] = useState<LocationState | null>(null)
    const [scrolled, setScrolled] = useState<boolean>(false)
    const {data:project, isLoading:isLoadingProject, error:errorProject} = useProject( locationInfo?.projectId??-1, {
        enabled: locationInfo&&locationInfo.pageType==="projectOverview"
        && locationInfo?.projectId&&locationInfo.projectId!==-1&&locationInfo.projectName===undefined

    })

    const breadcrumbRef = useRef(null);
    useEffect(()=>{

        const scrollHndl = ()=>{
            let scrolledVal = window.scrollY>50
            setScrolled(scrolledVal)
        }
        window.addEventListener("scroll", scrollHndl)
        return ()=>{
            window.removeEventListener("scroll", scrollHndl)
        }

    },[])
    useEffect(() => {
        let ignored = false;
        if (location.state) {
            setLocactionInfo(location.state)
        }
        else {
            let projOverviewMatch = location.pathname.match(/\/project\/(\d+)\/overview/);
            let projTaskswMatch = location.pathname.match(/\/project\/(\d+)\/tasks/);
            let projectsMatch = location.pathname.match(/\/project$/);
            let homeMatch = location.pathname.match(/^\/?$/);

            if (projOverviewMatch || projTaskswMatch) {
                const projectNumber = Number.parseInt(projOverviewMatch?.[1] ?? projTaskswMatch?.[1]??"-1");
                setLocactionInfo({ pageType: "projectOverview", projectId: projectNumber, projectName:undefined, projectStatus:undefined })
                /*fetch(`/api/project/${projectNumber}`).then((r) => {
                    r.json().then(r => {
                        if (!ignored) {
                            if (projOverviewMatch) {
                                setLocactionInfo({ pageType: "projectOverview", projectId: r.id, projectName: r.name, projectStatus: r.status })

                            }
                            else if (projTaskswMatch) {
                                setLocactionInfo({ pageType: "projectTasks", projectId: r.id, projectName: r.name, projectStatus: r.status })
                            }
                        }

                    });

                });*/


            }
            else if (homeMatch) {
                setLocactionInfo({ pageType: "home" })
            }
            else if (projectsMatch) {
                setLocactionInfo({ pageType: "projects" })
            }
        }



        return () => {
            ignored = true
            setLocactionInfo(null)

        }

    }, [location])
   useEffect(() => {

        if(project && locationInfo?.projectId&& locationInfo?.projectName===undefined && locationInfo.pageType==="projectOverview"){
            setLocactionInfo({pageType:"projectOverview",projectId:locationInfo.projectId, projectName:project.name, projectStatus:project.status})
        }
        return ()=>{
            
        }

    },[project,locationInfo])

    useEffect(() => {
        if (locationInfo) {
            switch (locationInfo.pageType) {
                case "about":
                    document.title = `About - Freelancer Project Manager`
                    break;
                case "home":
                    document.title = `Dashboard - Freelancer Project Manager`
                    break;
                case "projectOverview":
                    document.title = `${locationInfo.projectName} - Freelancer Project Manager`
                    break;
                case "projectTasks":
                    document.title = `Tasks of '${locationInfo.projectName}' - Freelancer Project Manager`
                    break;
                case "projects":
                    document.title = `Projects - Freelancer Project Manager`
                    break;
                case "tasks":
                    document.title = `Tasks - Freelancer Project Manager`
                    break;
                case "thisweekOverview":
                    document.title = `This Week - Freelancer Project Manager`
                    break;
                case "todayOverview":
                    document.title = `Today - Freelancer Project Manager`
                    break;
                default:
                    break;
            }

        }

        return () => {
            document.title = "Freelancer Project Manager"
        }
    }, [locationInfo])

    return (
        <div className='h-20 z-30 sticky top-0 shrink-0 '>
  <header style={{transition:"height"}} className={`text-gray-900 min-w-0 dark:text-white flex top-0 group h-heade px-6 py-2 bg-white ${scrolled?"scrolled":""} dark:bg-gray-950 shadow-xl transition-height duration-500 ease-in-out`}>
            <div className="flex flex-1  min-w-0 justify-between h-16 group-[.scrolled]:h-10  items-center transition-height duration-500">

                {/* Logo / Title */}
                <div className="flex items-center min-w-0  space-x-3">


                    <RouterLink className='hidden sm:block' to="/" state={{pageType:"home"} as LocationState}>
                                        <AppIcon ></AppIcon>
                    </RouterLink>
                    <div className='flex flex-col max-h-16 gap-0 items-stretch min-w-0 '>
                        {!scrolled?
                        <h1 className="text-2xl truncate min-w-0 font-semibold text-black dark:text-white hidden lg:block">{title}</h1>
                        :null}
                        {locationInfo ? <BreadcrumbsComponent locationInfo={locationInfo}></BreadcrumbsComponent> : null}
                    </div>
                </div>

                {/* Search bar */}
                <div className="flex-1 hidden md:block mx-6 max-w-lg">
                    <div className="relative dark:text-gray-600 text-gray-400 focus-within:text-gray-600">
                        <input autoComplete='tyer'
                            type="text"
                            placeholder="Search..."
                            className="block w-full pl-10 pr-4 py-2 border dark:border-gray-800 border-gray-200 rounded-lg dark:bg-gray-950 bg-gray-50 text-sm dark:placeholder-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <svg
                            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                        </svg>
                    </div>
                </div>

{ <ul className=" flex-row gap-4 p-4 hidden lg:flex">

                    <li className="font-bold hover:underline cursor-pointer"><RouterLink className='truncate ' state={{ pageType: "todayOverview" }} to={"/today"} >Today</RouterLink></li>
                    <li className="font-bold hover:underline cursor-pointer"><RouterLink className='truncate ' state={{ pageType: "thisweekOverview" }} to={"/thisweek"} >This Week</RouterLink></li>
                    <li className="font-bold hover:underline cursor-pointer"><RouterLink className='truncate ' state={{ pageType: "about" }} to={"/about"} >About</RouterLink></li>
                </ul>
                }
                <div className="flex flex-row gap-4  items-center">
                    <ThemeSwitch className="hidden sm:block" onClick={onDarkToggle} isDark={isDark} ></ThemeSwitch>
                    <AccountButton userName="YassinMi" accountInitials="YM" onClick={() => { }}></AccountButton>

                </div>


            </div>
        </header>
        </div>
      
    );
}

export default AppHeader;