import TaskCard from "./TaskCard";
import type {Task} from "../types/task.types";


interface Props{

    title:string;

    tasks:Task[];

}


export default function TaskColumn({title,tasks}:Props){


return (

<div>


<h2>
{title}
</h2>


{
tasks.map(task=>(

<TaskCard
key={task.id}
task={task}
/>

))
}


</div>


);


}