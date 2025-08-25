import { Button, Input, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
    return <div className="flex flex-col gap-4">
      
      
         <form className="flex flex-col m-4 gap-4 w-80">
           <Input inputRef={inputRef} multiline className='flex-grow-0 w-full' value={taskTitle}  onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task Title" aria-label='desc' />
     
      
        <div>
             <div className="h-40">

                  <textarea onKeyDown={handleKeyDown} placeholder="Description"  onChange={(e) => setDescription(e.target.value)} value={description} className='h-full w-full max-h-[50vh] outline-none resize-none'></textarea>
               </div>
        </div>
       
       
        <Button className="w-full" variant="contained" color="success" onClick={handleSubmitClick} type="submit">Add Task</Button>
        

         
       </form>
    </div>
}


export default AddTaskForm;
