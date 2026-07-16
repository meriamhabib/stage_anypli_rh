    import TaskColumn from "./TaskColumn";
    import type {Task} from "../types/task.types";


    interface Props{

    tasks:Task[];

    }


    export default function KanbanBoard({tasks}:Props){


    const todo = tasks.filter(
    task=>task.status==="to_do"
    );


    const progress = tasks.filter(
    task=>task.status==="in_progress"
    );


    const completed = tasks.filter(
    task=>task.status==="completed"
    );



    return (

    <div>


    <TaskColumn

    title="À faire"

    tasks={todo}

    />



    <TaskColumn

    title="En cours"

    tasks={progress}

    />



    <TaskColumn

    title="Terminées"

    tasks={completed}

    />


    </div>

    );


    }