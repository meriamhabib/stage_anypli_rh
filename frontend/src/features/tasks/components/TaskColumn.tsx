import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task.types";
import "./Kanban.css";

interface Props {
    title: string;
    status: string;
    tasks: Task[];
}

export default function TaskColumn({ title, status, tasks }: Props) {
    return (
        <div className={`kanban-column column-${status === "to_do" ? "todo" : status === "in_progress" ? "progress" : "done"}`}>
            <div className="kanban-column-header">
                <div className="kanban-column-title">
                    {title}
                    <span className="kanban-column-count">{tasks.length}</span>
                </div>
                <button className="kanban-column-add" title="Add task">
                    +
                </button>
            </div>

            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ minHeight: "150px", flex: 1 }}
                        className={snapshot.isDraggingOver ? "is-dragging-over" : ""}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}