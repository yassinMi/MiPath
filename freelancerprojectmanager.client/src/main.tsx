import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'
import About from './Pages/About.tsx'
import ProjectsList from './Pages/ProjectsList.tsx'
import ProjectPage from './Pages/ProjectPage.tsx'
import ProjectsPage from './Pages/ProjectsPage.tsx'
import TodayOverview from './Pages/TodayOverview.tsx'
import WeekOverview from './Pages/WeekOverview.tsx'
import ProjectOverview from './Pages/ProjectOverview.tsx'
import ProjectTasks from './Pages/ProjectTasks.tsx'
import HomeDashboard from './Pages/HomeDashboard.tsx'
createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                <Route path='project' element={<ProjectsPage ></ProjectsPage>}></Route>
                <Route path='project/:projectId' element={<ProjectPage ></ProjectPage>}></Route>
                <Route path='project/:projectId/overview' element={<ProjectOverview ></ProjectOverview>}></Route>
                <Route path='project/:projectId/tasks' element={<ProjectTasks ></ProjectTasks>}></Route>
                <Route path='today' element={<TodayOverview ></TodayOverview>}></Route>
                <Route path='thisweek' element={<WeekOverview ></WeekOverview>}></Route>
                <Route path='/' element={<HomeDashboard ></HomeDashboard>}></Route>
            </Route>
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)