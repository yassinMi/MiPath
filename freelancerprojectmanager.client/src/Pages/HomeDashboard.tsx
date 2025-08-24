import React, { useEffect, useState } from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';
import ProjectComponent from '../Components/ProjectComponent';



interface HomeDashboardProps {
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({  }) => {
  
   const { projectId } = useParams(); 
const [projects, setprojects] = useState<Project[]|null>(null)

   const eff = useEffect(()=>{
   
     let ignored = false;
     const project = fetch( `/api/project`).then((r)=>{
       r.json().then(r=>{
         if(!ignored){
         setprojects(r)
         }
         
       });
       
     });
     return ()=>{
         setprojects(null)
         ignored = true;
       }}
   ,[projectId])
    
  return (
     <div className='flex flex-col gap-8'>
                
           
               <div className='flex flex-col gap-2'>

                <h2>Projects ({projects?.length})</h2>
                <div >
                    {projects?
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {projects.slice(0, 5).map(project => (
                      <ProjectComponent projectId={project.id} clientName={project.clientName} projectName={project.name} description={project.description} status={project.status}
                          key={project.id}    
                          
                      >

                      </ProjectComponent>
                  ))}

              </div>:null}
              
                </div>
               </div>
          
    
               <div className='flex flex-col gap-2'>

                <h2>Pending Tasks ({projects?.length})</h2>
                <div >
                    
                </div>
               </div>
          
            </div>
    
  );
};

export default HomeDashboard;