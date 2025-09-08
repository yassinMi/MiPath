import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'
import About from './Pages/About.tsx'
import ProjectsList from './Components/ProjectsList.tsx'
import ProjectsPage from './Pages/ProjectsPage.tsx'
import TodayOverview from './Pages/TodayOverview.tsx'
import WeekOverview from './Pages/WeekOverview.tsx'
import ProjectOverview from './Pages/ProjectOverview.tsx'
import ProjectTasks from './Pages/ProjectTasks.tsx'
import HomeDashboard from './Pages/HomeDashboard.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Privacy from './Pages/Privacy.tsx'
import Terms from './Pages/Terms.tsx'
createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                <Route path='project' element={<ProjectsPage ></ProjectsPage>}></Route>
                <Route path='project/:projectId/overview' element={<ProjectOverview ></ProjectOverview>}></Route>
                <Route path='project/:projectId/tasks' element={<ProjectTasks ></ProjectTasks>}></Route>
                <Route path='today' element={<TodayOverview ></TodayOverview>}></Route>
                <Route path='thisweek' element={<WeekOverview ></WeekOverview>}></Route>
                <Route path='/dashboard' element={<HomeDashboard ></HomeDashboard>}></Route>
                <Route path='/login' element={<HomeDashboard isLogin={true} ></HomeDashboard>}></Route>
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
            </Route>
               
            </Routes>
        </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)