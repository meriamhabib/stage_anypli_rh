import axios from "axios";
import type { LeaveRequest, CreateLeaveDto, User } from "../types/leave.types";

const API_BASE = "http://localhost:8000/api";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    };
};

export const getLeaves = async (): Promise<LeaveRequest[]> => {
    const res = await axios.get<LeaveRequest[]>(`${API_BASE}/leave-requests`, {
        headers: getHeaders(),
    });
    return res.data;
};

export const getDirectors = async (): Promise<User[]> => {
    const res = await axios.get<User[]>(`${API_BASE}/directors`, {
        headers: getHeaders(),
    });
    return res.data;
};

export const createLeaveRequest = async (data: CreateLeaveDto): Promise<LeaveRequest> => {
    const formData = new FormData();
    formData.append("leave_type", data.leave_type);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("reason", data.reason);
    
    if (data.processed_by) {
        formData.append("processed_by", data.processed_by.toString());
    }

    if (data.medical_certificate) {
        formData.append("medical_certificate", data.medical_certificate);
    }

    const res = await axios.post<{ data: LeaveRequest }>(
        `${API_BASE}/leave-requests`,
        formData,
        {
            headers: {
                ...getHeaders(),
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data.data;
};

export const updateLeave = async (
    id: number,
    data: Partial<LeaveRequest>
): Promise<LeaveRequest> => {
    const res = await axios.put<{ data: LeaveRequest }>(
        `${API_BASE}/leave-requests/${id}`,
        data,
        {
            headers: getHeaders(),
        }
    );

    return res.data.data || res.data;
};