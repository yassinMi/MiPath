import { useEffect, useState } from 'react';
import './App.css';
import ProjectComponent from './ProjectComponent';
import ProjectsList from './ProjectsList';
import type { CreateProjectCommand, Project } from './Model/Project';
interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const [projects, setProjects] = useState<Project[]>([]);

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

    const contents = projects === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has sssstarted. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div aria-labelledby="tableLabel">
            <ProjectsList handleCreate={handleCreateProject} projects={projects} ></ProjectsList>
            <ProjectComponent projectName="proj1" clientName="yass" deadline="2025" status="pending" key="4" ></ProjectComponent>
        </div>;

    return (
        <div>
            freelancer project manager
            {contents}
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