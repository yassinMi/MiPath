import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';




const ProjectPage: React.FC= ({  }) => {

const { projectId } = useParams(); 
const [name, setName] = useState<string|null>(null)

const eff = useEffect(()=>{

  let ignored = false;
  const project = fetch( `/project/${projectId}`).then((r)=>{
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
    <div>
          <h2>Project {name}</h2>
       
    </div>
  );
};

export default ProjectPage;