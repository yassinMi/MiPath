import { Button, Input, TextField, Typography } from "@mui/material";
import type { CreateProjectCommand } from "../Model/Commands";
import { useState } from "react";




export interface CreateProjectFormProps {
   onSubmit?: (data:CreateProjectCommand)=>void
}
/* "/api/projects/create": {
      "post": {
        "tags": [
          "Project"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateProjectCommand"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateProjectCommand"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateProjectCommand"
              }
            }
          }
        },
        
         "CreateProjectCommand": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "clientID": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "newClientName": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "$ref": "#/components/schemas/ProjectCreationStatus"
          }
        },
        "additionalProperties": false
      },*/
const CreatProjectForm: React.FC<CreateProjectFormProps> = ({onSubmit}) => {

  const [projectName, setProjectName] = useState("New Project (1)");
  const [description, setDescription] = useState("");
  const [clientID, setClientID] = useState<number|undefined>(undefined);
  const [newClientName, setNewClientName] = useState("");
  const [status, setStatus] = useState<"Scoping"|"Active">("Scoping");

  const handleSubmitClick = (e:any) =>{
      e.preventDefault();
      //validate data and call onSubmit
      console.log("submit clicked")
      
      if(clientID===undefined && newClientName.trim()===""){
        alert("Please provide either a client ID or a new client name.");
        return;
      }
      if(clientID&& newClientName.trim()!==""){
        alert("Please provide either a client ID or a new client name, not both.");
        return;
      }
      if(projectName.trim()===""){
        alert("Project name is required.");
        return;
      }
      const data:CreateProjectCommand = {
        name: projectName,
        description,
        clientID,
        newClientName: clientID?undefined:newClientName,
        status
      }
      console.log("submit command:", data);
      if(onSubmit) onSubmit(data);


  }
    return <div>
      
      
         <form>
           <Input  className='flex-grow-0 w-full' value={projectName}  onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" aria-label='desc' />
     
        <div>
            <label>Client</label>
            <select name="clientID">
                <option value="">Select a client</option>
                {/* Options would be populated dynamically */}
            </select>
            <div>or</div>
            <Input className='flex-grow-0 w-full' value={newClientName}  onChange={(e) => setNewClientName(e.target.value)} placeholder="New client Name" aria-label='desc'
                />
        </div>
        <div>
            <label>Description</label>
             <div style={{ padding: "8px", height: "100%" }}>

                  <textarea  onChange={(e) => setDescription(e.target.value)} value={description} className='h-full w-full outline-none resize-none'></textarea>
               </div>
        </div>
       
        <div>
            <label>Status</label>
            <select name="status">
                <option value="Scoping">Scoping (pre-project)</option>
                <option value="Active">Active</option>
            </select>
        </div>
        <Button className="w-full" variant="contained" color="success" onClick={handleSubmitClick} type="submit">Create Project</Button>
        

         
       </form>
    </div>
}


export default CreatProjectForm;
