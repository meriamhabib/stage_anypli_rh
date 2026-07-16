export interface Task {

    id:number;

    user_id:number;

    title:string;

    description:string;

    priority:"low"|"medium"|"high";

    status:
    |"to_do"
    |"in_progress"
    |"on_hold"
    |"completed";

    due_date:string|null;

}