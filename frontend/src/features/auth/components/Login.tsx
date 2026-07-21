import { useState } from 'react';
import { login } from '../auth.service';
import './Login.css';
import { Link } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e: any) => {

        e.preventDefault();


        try {

            const response = await login({
                email,
                password
            });


            console.log(response.data);


            localStorage.setItem(
                'token',
                response.data.token
            );


            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            );


            alert('Connexion réussie');


            // Redirection selon le rôle

            if(response.data.user.role === "directeur"){

                window.location.href = "/directeur";

            }else{

                window.location.href = "/employee";

            }


        } catch (error: any) {


            console.error(error.response?.data ?? error);

            alert(
                error.response?.data?.message ||
                'Erreur de connexion'
            );

        }

    };



    return (

        <div className="login-page">


            <div className="login-card">


                <h1>
                    GRH Anypli
                </h1>


                <p>
                    Connectez-vous à votre espace
                </p>



                <form onSubmit={handleLogin}>


                    <div className="form-group">

                        <label>Email</label>

                        <input

                            type="email"

                            placeholder="Votre email"

                            value={email}

                            onChange={(e)=>setEmail(e.target.value)}

                            required

                        />

                    </div>




                    <div className="form-group">


                        <label>
                            Mot de passe
                        </label>


                        <input

                            type="password"

                            placeholder="Votre mot de passe"

                            value={password}

                            onChange={(e)=>setPassword(e.target.value)}

                            required

                        />


                    </div>




                  <div className="forgot">

                    <Link to="/forgot-password">

                        Mot de passe oublié ?

                    </Link>

                 </div>



                    <button type="submit">

                        Se connecter

                    </button>



                </form>



            </div>


        </div>

    );

}


export default Login;