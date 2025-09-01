import { Button, Input, MenuItem, Select, TextField, Typography } from "@mui/material";
import type { CreateProjectCommand } from "../Model/Commands";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useClients } from "../hooks/useClients";




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

  const {data:clients, isLoading:isLoadingClients_, error:errorClients_, refetch: refetchClients, isRefetching:isRefetchingClients_} = useClients()
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
   const inputRef = useRef<HTMLInputElement>(null);
     useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, []);
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); 
        handleSubmitClick(e);
      }
    };
    return <div className="flex flex-col m-4 gap-4 ">
      
      
         <form className="flex flex-col m-4 gap-4 w-80">
           <Input inputRef={inputRef} className='flex-grow-0 w-full' value={projectName}  onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" aria-label='desc' />
     
        <div>
          <label>
            Select client
          </label>
            <Select  className="w-full" value={clientID} onChange={(e)=>setClientID(e.target.value?Number(e.target.value):undefined)}>
               
                {isLoadingClients_&& <option value={undefined}>--loading--</option>}
                <MenuItem className="opacity-40" value=""><em>None</em>
                  </MenuItem>
                {clients?.map((client:any)=><MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>)}
            </Select>
            <div>or</div>
            <Input className='flex-grow-0 w-full' value={newClientName}  onChange={(e) => setNewClientName(e.target.value)} placeholder="Enter new client name" aria-label='desc'
                />
        </div>
        <div>
             <div className="h-40">

                  <textarea placeholder="Description" onKeyDown={handleKeyDown} onChange={(e) => setDescription(e.target.value)} value={description} className='h-full w-full outline-none resize-none'></textarea>
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

