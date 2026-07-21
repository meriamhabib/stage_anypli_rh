import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import KanbanBoard from "../components/KanbanBoard";
import { getTasks } from "../services/task.service";
import type { Task } from "../types/task.types";


export default function TasksPage(){

    const [tasks,setTasks] = useState<Task[]>([]);
    const [open,setOpen] = useState(false);
    const [error,setError] = useState<string | null>(null);



    const loadTasks = async()=>{

        try{

            const response = await getTasks();

            setTasks(response.data);

            setError(null);

        }
        catch(error){

            console.error(error);

            setError("Impossible de charger les tâches. Veuillez réessayer.");

        }

    }



    useEffect(()=>{

        loadTasks();

    },[]);



    return (

        <div>


            <h1>
                Ma To Do List
            </h1>


            {
                error && (

                    <p style={{ color: "red" }}>
                        {error}
                    </p>

                )
            }


            <button
                onClick={()=>setOpen(true)}
            >
                Ajouter une tâche
            </button>



            {
                open && (

                    <TaskForm
                        onClose={()=>setOpen(false)}
                        onSuccess={loadTasks}
                    />

                )
            }



            <KanbanBoard
                tasks={tasks}
            />


        </div>

    );

}