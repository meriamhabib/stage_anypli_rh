import api from '../../services/api';


export function getEmployees(){

    return api.get('/employees');

}



export function createEmployee(data:any){

    return api.post('/employees', data);

}