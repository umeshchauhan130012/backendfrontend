import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { loginApi } from '../api/api';
import Toast from '../components/toast';


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
        <div className="custom-loginpage-wrapper">
            {toast.visible && (
                <Toast 
                message={toast.message} 
                type={toast.type} 
                duration={3000} 
                onClose={() => setToast({ ...toast, visible: false })} 
                />
            )}
            <div className="custom-loginpage">
                <div className="custom-loginpage-form">
                    <div className="custom-login-formtitle">
                        <h1>Welcome Back !</h1>
                        <p>Sign in to continue to Velzon.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <div className="custom-logininput-control">
                            <select name="cms-selector">
                                <option disabled selected value="">--Select--</option>
                                <option value="the-jbt">The JBT</option>
                                <option value="">Indian Top News</option>
                                <option value="">India Daily Live</option>
                                <option value="">Punjabi Story Line</option>
                            </select>
                        </div> */}
                        <div className="custom-logininput-control">
                            <input type="email" className="custom-loginform-control" placeholder="username" {...register("email", { required: true })} />
                        </div>
                        {errors.name && <p>This field is required</p>}
                        <div className="custom-logininput-control">
                            <input type="password" className="custom-loginform-control" placeholder="password input" {...register("password", { required: true })} />
                        </div>
                        <div className="custom-loginbutton-control">
                            <button type="submit" disabled={loading}>Sign In</button>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
