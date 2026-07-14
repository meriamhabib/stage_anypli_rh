import api from '../../services/api';


export function login(data: any) {

    return api.post('/login', data);

}


