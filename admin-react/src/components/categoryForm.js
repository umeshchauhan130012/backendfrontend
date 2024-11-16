import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const CategoryForm = () => {

const { register, handleSubmit, formState: { errors }, reset } = useForm();
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null); // reset success state on new submission


    const formData = new FormData();
    formData.append('file', data.file[0]); 
    formData.append('name', data.name);
    try {
    await axios.post('http://localhost:8080/story', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    setSuccess("Data submitted successfully!");
    console.log(formData);
    reset();
    } catch (err) {
    setError(err.response?.data?.message || err.message); // handle API or other errors
    } finally {
    setLoading(false);
    setTimeout(() => {
        setSuccess();
    }, 3000);
    
    }
};

  return (
    <div className="tagformwrapmain">
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div className="tagformwrap">
            <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Enter tag name" {...register("name", { required: true })} />
            {errors.name && <p>This field is required</p>}
            <br/>
            <input {...register("file", { required: true })} type="file" />
            <br/>
            <button type="submit" disabled={loading}>Submit</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            </form>
        </div>
    </div>
  )
}

export default CategoryForm;