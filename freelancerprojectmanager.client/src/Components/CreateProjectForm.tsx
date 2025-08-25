



export interface CreateProjectFormProps {

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
const CreatProjectForm: React.FC<CreateProjectFormProps> = ({}) => {
    return <div>
       <div>Create New Project</div>
         <form>
        <div>
            <label>Project Name</label>
            <input type="text" name="name" />
        </div>
        <div>
            <label>Description</label>
            <textarea name="description" />
        </div>
        <div>
            <label>Client</label>
            <select name="clientID">
                <option value="">Select a client</option>
                {/* Options would be populated dynamically */}
            </select>
            <div>or</div>
            <input type="text" name="newClientName" placeholder="New Client Name"
                />
        </div>
        <div>
            <label>Status</label>
            <select name="status">
                <option value="NotStarted">Not Started</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
        <button type="submit">Create Project</button>
        

         
       </form>
    </div>
}


export default CreatProjectForm;
