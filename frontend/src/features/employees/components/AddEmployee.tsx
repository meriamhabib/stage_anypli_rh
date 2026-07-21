import {useState} from "react";
import {createEmployee} from "../employee.service";


function AddEmployee(){


    const [form,setForm] = useState({

        first_name:"",
        last_name:"",
        email:"",
        phone:"",
        position:"",
        hire_date:""

    });



    const handleChange=(e:any)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };




    const handleSubmit=async(e:any)=>{


        e.preventDefault();


        try{


            const response = await createEmployee(form);


            console.log(response.data);


            alert("Employé ajouté avec succès");



        }catch(error:any){


            console.error(error.response?.data ?? error);


            alert(
                error.response?.data?.message ||
                "Erreur lors de l'ajout"
            );


        }


    };



    return (

        <div>


            <h2>
                Ajouter un employé
            </h2>



            <form onSubmit={handleSubmit}>


                <input
                    name="first_name"
                    placeholder="First name"
                    onChange={handleChange}
                />


                <input
                    name="last_name"
                    placeholder="Last name"
                    onChange={handleChange}
                />


                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={handleChange}
                />


                <input
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />


                <input
                    name="position"
                    placeholder="Position"
                    onChange={handleChange}
                />


                <input
                    name="hire_date"
                    type="date"
                    onChange={handleChange}
                />



                <button type="submit">

                    Ajouter

                </button>



            </form>


        </div>

    );

}


export default AddEmployee;