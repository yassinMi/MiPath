import { Button, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { CreateTaskCommand } from "../Model/Commands";




export interface AddTaskFormProps {
   onSubmit?: (data:CreateTaskCommand)=>void
   projectId: number
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({onSubmit, projectId}) => {

  const [taskTitle, setTaskTitle] = useState("New Task (1)");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Scoping"|"Active">("Scoping");

  const handleSubmitClick = (e:any) =>{
      e.preventDefault();
      //validate data and call onSubmit
      console.log("submit clicked")
      
     
      if(taskTitle.trim()===""){
        alert("Project name is required.");
        return;
      }
      const data:CreateTaskCommand = {
        title: taskTitle,
        description,
        projectID: projectId,
        
      }
      console.log("submit command:", data);
      if(onSubmit) onSubmit(data);


  }
    return <div>
      
      
         <form>
           <Input  className='flex-grow-0 w-full' value={taskTitle}  onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task Title" aria-label='desc' />
     
      
        <div>
            <label>Description</label>
             <div style={{ padding: "8px", height: "100%" }}>

                  <textarea  onChange={(e) => setDescription(e.target.value)} value={description} className='h-full w-full outline-none resize-none'></textarea>
               </div>
        </div>
       
       
        <Button className="w-full" variant="contained" color="success" onClick={handleSubmitClick} type="submit">Add Task</Button>
        

         
       </form>
    </div>
}


export default AddTaskForm;
