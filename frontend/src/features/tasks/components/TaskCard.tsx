import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../types/task.types";
import "./Kanban.css";

interface Props {
    task: Task;
    index: number;
}

export default function TaskCard({ task, index }: Props) {
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`kanban-card ${snapshot.isDragging ? "is-dragging" : ""}`}
                >
                    <h3 className="kanban-card-title">{task.title}</h3>
                    <p className="kanban-card-desc">{task.description}</p>
                    <span className={`kanban-priority priority-${task.priority}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                </div>
            )}
        </Draggable>
    );
}