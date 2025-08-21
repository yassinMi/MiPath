import { useEffect, useState } from 'react';
import './App.css';
import ProjectComponent from './ProjectComponent';
import ProjectsList from './ProjectsList';
import type { CreateProjectCommand, Project } from './Model/Project';
import AppHeader from './AppHeader';
import AppIcon from './AppIcon';
interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [darkMode, setDarkMode] = useState(prefersDark);
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
    useEffect(() => {
        populateWeatherData();
    }, []);
    const onDarkToggle = () => {
        setDarkMode((p) => !p);
    }
    const contents = projects === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started</em></p>
        : <div aria-labelledby="tableLabel">
            <ProjectsList handleCreate={handleCreateProject} projects={projects} ></ProjectsList>
        </div>;

    return (
        <div className={darkMode ? "dark" : "light"}>
            <AppHeader onDarkToggle={onDarkToggle} subtitle="Projects" title="Freelancer Project Manager"></AppHeader>
            <div>
                
              
                <div className="text-3xl font-bold underline">hi</div>
                {contents}
            </div>
        </div>
       
    );

    async function populateWeatherData() {
        console.log("populate")
        const response = await fetch('/api/project');
        if (response.ok) {
            
            const data = await response.json();
            setProjects(data);
        }
    }
}

export default App;