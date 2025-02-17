import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { loginApi } from '../api/api';
import Toast from '../components/toast';
import Div from '../components/div';


const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });

    const onSubmit = async (data) => {
        try {
            const response = await loginApi('/login', data); 
            localStorage.setItem('authToken', response.token);
            setTimeout(() => navigate('/dashboard'), 1000)
            setToast({ message: 'Login successfully!', type: 'success', visible: true });
            reset();
        } catch (err) {
            setError(err.response?.data?.message || err.message); 
        } finally {
            setLoading(false);
        }  
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
          navigate('/dashboard');
        }
      }, [navigate]);

    return (
        <Div className="custom-loginpage-wrapper">
            {toast.visible && (
                <Toast 
                message={toast.message} 
                type={toast.type} 
                duration={3000} 
                onClose={() => setToast({ ...toast, visible: false })} 
                />
            )}
            <Div className="custom-loginpage">
                <Div className="custom-loginpage-form">
                    <Div className="custom-login-formtitle">
                        <h1>Welcome Back !</h1>
                        <p>Sign in to continue to Velzon.</p>
                    </Div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <Div className="custom-logininput-control">
                            <select name="cms-selector">
                                <option disabled selected value="">--Select--</option>
                                <option value="the-jbt">The JBT</option>
                                <option value="">Indian Top News</option>
                                <option value="">India Daily Live</option>
                                <option value="">Punjabi Story Line</option>
                            </select>
                        </Div> */}
                        <Div className="custom-logininput-control">
                            <input type="email" className="custom-loginform-control" placeholder="username" {...register("email", { required: true })} />
                        </Div>
                        {errors.name && <p>This field is required</p>}
                        <Div className="custom-logininput-control">
                            <input type="password" className="custom-loginform-control" placeholder="password input" {...register("password", { required: true })} />
                        </Div>
                        <Div className="custom-loginbutton-control">
                            <button type="submit" disabled={loading}>Sign In</button>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                        </Div>
                    </form>
                </Div>
            </Div>
        </Div>
    );
}

export default Login;
