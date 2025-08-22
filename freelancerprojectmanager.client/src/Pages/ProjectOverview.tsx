import React, { useEffect, useState } from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';



interface ProjectOverviewProps {
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({  }) => {
  
   const { projectId } = useParams(); 
const [name, setName] = useState<string|null>(null)

   const eff = useEffect(()=>{
   
     let ignored = false;
     const project = fetch( `/api/project/${projectId}`).then((r)=>{
       r.json().then(r=>{
         if(!ignored){
         setName(r.name)
         }
         
       });
       
     });
     return ()=>{
         setName(null)
         ignored = true;
       }}
   ,[projectId])
    
  return (
     <div >
                
           
               
          
           project overview {projectId} {name}
    
            </div>
    
  );
};

export default ProjectOverview;