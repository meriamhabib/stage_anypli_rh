import axios from "axios";
import type { Task } from "../types/task.types";


const API_URL = "http://localhost:8000/api/tasks";


// GET toutes les tâches
export const getTasks = () => {

    return axios.get<Task[]>(
        API_URL,
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

};



// CREATE tâche
export const createTask = (
    data: Partial<Task>
) => {

    return axios.post(
        API_URL,
        data,
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

};



// UPDATE tâche
export const updateTask = (
    id:number,
    data:Partial<Task>
)=>{

    return axios.put(
        `${API_URL}/${id}`,
        data,
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

};



// DELETE tâche (optionnel)
export const deleteTask = (
    id:number
)=>{

    return axios.delete(
        `${API_URL}/${id}`,
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

};