export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    position?: string;
    role?: string;
}

export type LeaveType = "annual" | "sick" | "personal";
export type LeaveStatus = "pending" | "approved" | "rejected";

export interface LeaveRequest {
    id: number;
    user_id: number;
    user: User;
    leave_type: LeaveType;
    start_date: string;
    end_date: string;
    reason: string;
    medical_certificate?: string | null;
    status: LeaveStatus;
    request_date: string;
    processed_by?: number | null;
    processed_by_user?: User | null;
    processedBy?: User | null;
    comment?: string | null;
}

export interface CreateLeaveDto {
    leave_type: LeaveType;
    start_date: string;
    end_date: string;
    reason: string;
    processed_by?: number;
    medical_certificate?: File | null;
}