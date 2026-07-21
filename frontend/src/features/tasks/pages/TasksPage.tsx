import { useEffect, useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import TaskForm from "../components/TaskForm";
import KanbanBoard from "../components/KanbanBoard";
import { getTasks, updateTask, deleteTask } from "../services/task.service";
import type { Task } from "../types/task.types";
import "../components/Kanban.css";
import AppLayout from "../../../components/layout/AppLayout";

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [open, setOpen] = useState(false);

    const loadTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const draggedTask = tasks.find((t) => t.id.toString() === draggableId);
        if (!draggedTask) return;

        // Handle deletion when dropped into the Trash zone
        if (destination.droppableId === "trash") {
            const filteredTasks = tasks.filter((t) => t.id !== draggedTask.id);
            setTasks(filteredTasks);

            try {
                await deleteTask(draggedTask.id);
            } catch (error) {
                console.error("Error deleting task:", error);
                loadTasks();
            }
            return;
        }

        const newStatus = destination.droppableId as Task["status"];

        // Optimistic UI update
        const updatedTasks = tasks.map((t) =>
            t.id === draggedTask.id ? { ...t, status: newStatus } : t
        );
        setTasks(updatedTasks);

        try {
            const updatedTaskData = {
                ...draggedTask,
                status: newStatus
            };
            await updateTask(draggedTask.id, updatedTaskData);
        } catch (error) {
            console.log("Error updating task status:", error);
            // Revert on failure
            loadTasks();
        }
    };


    return (
        <AppLayout>
            <div className="kanban-page">
                <div className="kanban-header">
                    <h1 className="page-title">To-Do List</h1>
                    <p className="page-subtitle" style={{ marginTop: 4, marginBottom: 16 }}>Gérez vos tâches avec drag-and-drop entre les colonnes.</p>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setOpen(true)}
                    >
                        + Ajouter une tâche
                    </button>
                </div>

                {open && (
                    <TaskForm
                        onClose={() => setOpen(false)}
                        onSuccess={loadTasks}
                    />
                )}

                <KanbanBoard tasks={tasks} onDragEnd={handleDragEnd} />
            </div>
        </AppLayout>
    );
}