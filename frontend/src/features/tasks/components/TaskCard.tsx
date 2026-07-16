import type { Task } from "../types/task.types";


interface Props{

    task:Task;

}


export default function TaskCard({task}:Props){


return (

<div>


<h3>
{task.title}
</h3>


<p>
{task.description}
</p>


<p>
Priorité : {task.priority}
</p>


</div>

);


}