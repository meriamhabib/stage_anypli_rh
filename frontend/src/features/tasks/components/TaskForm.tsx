import { useState } from "react";
import type { Task } from "../types/task.types";
import { createTask, updateTask } from "../services/task.service";


interface Props {

    task?: Task;

    onClose:()=>void;

    onSuccess:()=>void;

}



export default function TaskForm({
    task,
    onClose,
    onSuccess
}:Props){



const user = JSON.parse(
    localStorage.getItem("user") || "{}"
);



const [title,setTitle] = useState(
    task?.title || ""
);



const [description,setDescription] = useState(
    task?.description || ""
);



const [priority,setPriority] = useState<Task["priority"]>(
    task?.priority || "low"
);



const [status,setStatus] = useState<Task["status"]>(
    task?.status || "to_do"
);



const [error,setError] = useState<string | null>(null);




const handleSubmit = async(
    e:React.FormEvent
)=>{


e.preventDefault();

setError(null);



try{


const data:Partial<Task> = {


    user_id:user.id,

    title,

    description,

    priority,

    status


};




console.log(
    "DATA ENVOYEE :",
    data
);




if(task){


await updateTask(
    task.id,
    data
);


}
else{


await createTask(
    data
);


}



onSuccess();


onClose();



}
catch(error:any){


console.error(
    "Erreur création tâche :",
    error.response?.data || error.message
);


setError(
    error.response?.data?.message ||
    "Impossible d'enregistrer la tâche. Veuillez réessayer."
);


}



};







return (

<div
style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.5)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>



<div
style={{
background:"white",
padding:"25px",
width:"400px",
borderRadius:"10px"
}}
>



<h2>
{
task
?
"Modifier tâche"
:
"Nouvelle tâche"
}
</h2>




{
error && (

<p style={{ color: "red", marginBottom: "10px" }}>
{error}
</p>

)
}




<form onSubmit={handleSubmit}>



<input

value={title}

placeholder="Titre"

onChange={
(e)=>setTitle(e.target.value)
}

style={{
width:"100%",
padding:"10px",
marginBottom:"10px"
}}

/>





<textarea

value={description}

placeholder="Description"

onChange={
(e)=>setDescription(e.target.value)
}


style={{
width:"100%",
padding:"10px",
marginBottom:"10px"
}}

/>





<select

value={priority}

onChange={
(e)=>
setPriority(
e.target.value as Task["priority"]
)
}


style={{
width:"100%",
padding:"10px",
marginBottom:"10px"
}}

>


<option value="low">
Low
</option>


<option value="medium">
Medium
</option>


<option value="high">
High
</option>


</select>







<select

value={status}

onChange={
(e)=>
setStatus(
e.target.value as Task["status"]
)
}


style={{
width:"100%",
padding:"10px",
marginBottom:"20px"
}}

>


<option value="to_do">
À faire
</option>


<option value="in_progress">
En cours
</option>


<option value="on_hold">
En attente
</option>


<option value="completed">
Terminée
</option>


</select>







<button type="submit">

{
task
?
"Modifier"
:
"Créer"
}

</button>




<button
type="button"
onClick={onClose}
>

Fermer

</button>




</form>


</div>



</div>


);


}