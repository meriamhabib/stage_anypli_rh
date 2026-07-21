import axios from "axios";

const API = "http://localhost:8000/api/documents";

const token = localStorage.getItem("token");

const headers = {
    Authorization: `Bearer ${token}`,
};

export const getDocuments = () =>
    axios.get(API, { headers });

export const createDocument = (data: FormData) =>
    axios.post(API, data, {
        headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
        },
    });

export const updateDocument = (id: number, data: FormData) =>
    axios.post(`${API}/${id}?_method=PUT`, data, {
        headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteDocument = (id: number) =>
    axios.delete(`${API}/${id}`, { headers });

export const downloadDocument = (id: number) =>
    axios.get(`${API}/${id}/download`, {
        headers,
        responseType: "blob",
    });