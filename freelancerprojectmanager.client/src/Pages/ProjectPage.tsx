import React from 'react';
import { useParams } from 'react-router-dom';




const ProjectPage: React.FC= ({  }) => {

const { projectId } = useParams(); 
  return (
    <div>
          <h2>Project</h2>
       
    </div>
  );
};

export default ProjectPage;