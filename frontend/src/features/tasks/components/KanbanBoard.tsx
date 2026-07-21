import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import type { Task } from "../types/task.types";
import "./Kanban.css";

interface Props {
    tasks: Task[];
    onDragEnd: (result: DropResult) => void;
}

export default function KanbanBoard({ tasks, onDragEnd }: Props) {
    const todo = tasks.filter((task) => task.status === "to_do");
    const progress = tasks.filter((task) => task.status === "in_progress");
    const completed = tasks.filter((task) => task.status === "completed");

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board">
                <TaskColumn title="À faire" status="to_do" tasks={todo} />
                <TaskColumn title="En cours" status="in_progress" tasks={progress} />
                <TaskColumn title="Terminées" status="completed" tasks={completed} />
            </div>

            {/* Zone Corbeille / Supprimer */}
            <div className="kanban-trash-container">
                <Droppable droppableId="trash">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`kanban-trash-zone ${snapshot.isDraggingOver ? "is-drag-over" : ""}`}
                        >
                            <div className="kanban-trash-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    <line x1="10" y1="11" x2="10" y2="17"/>
                                    <line x1="14" y1="11" x2="14" y2="17"/>
                                </svg>
                            </div>
                            <span className="kanban-trash-text">
                                {snapshot.isDraggingOver ? "Relâcher pour supprimer définitivement !" : "Corbeille — Glisser une tâche ici pour la supprimer"}
                            </span>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}