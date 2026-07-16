import api from '../../services/api';

export function login(data: any) {
    return api.post('/login', data);
}

export function forgotPassword(email: string) {
    return api.post('/forgot-password', {
        email,
    });
}