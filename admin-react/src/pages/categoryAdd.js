import React, { forwardRef, useState } from 'react';
import ProtectedRoute from '../components/protectedRouts';
import { useForm } from "react-hook-form";
import Toast from '../components/toast';
import { addCategory } from '../api/api';

const CategoryAdd = () => {
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });


    const Selectcm = forwardRef(({ onChange, name }, ref) => (
        <>
            <label>Status</label>
            <select className="cms-all-selector" name={name} ref={ref} onChange={onChange} >
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
                <option value="delete">Delete</option>
            </select>
        </>
      )); 

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            console.log(data);
            await addCategory('/category', data); 
            setToast({ message: 'Tag submited successfully done!', type: 'success', visible: true });
            reset();
        } catch (err) {
            setError(err.response?.data?.message || err.message); 
        } finally {
            setLoading(false);
        }  
    };
    return (
        <ProtectedRoute>
            <div className='custom-container'>
                <div className="custom-row">
                    <div className="custom-col-12">
                        <div className="custom-section-title">
                            <h4>Add New Category</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="custom-fullform-wrapper">
            {toast.visible && (
                <Toast 
                message={toast.message} 
                type={toast.type} 
                duration={3000} 
                onClose={() => setToast({ ...toast, visible: false })} 
                />
            )}
                <form onSubmit={handleSubmit(onSubmit)} className="formbithout-sectionm">
                    <div className="formbithout-section">
                        <div className="inputfielgrid">
                            <div className="inputfieldwrap">
                                <label>Category<em>*</em></label>
                                <input className="inputfield" type="text" {...register("catname", { required: 'This field is required' })} />
                                {errors.catname && <span className="error-message">{errors.catname.message}</span>}
                            </div>
                        </div>
                        <div className="inputfielgrid">
                            <div className="inputfieldwrap">
                                <Selectcm {...register("catstatus")} />
                            </div>
                        </div>
                        <div className="inputfielgrid">
                            <div className="inputfieldwrap">
                                <label>Category URL<em>*</em></label>
                                <input className="inputfield" type="text" {...register("catslug", { required: 'This field is required1' })} />
                                {errors.catslug && <span className="error-message">{errors.catslug.message}</span>}
                            </div>
                        </div>

                        <div className="inputfielgrid">
                            <div className='chkboxbtn-wrap'>
                                <span className='chkboxbtn-label'>Show At Home</span>
                                <label htmlFor="chkboxbtn" className="chkboxbtn" >
                                    <input type="checkbox" id="chkboxbtn" {...register("catathome")} />
                                </label>
                            </div>
                        </div>
                    </div>
                        
                    <div className="buttonwrape">
                        <button type="submit" className='buttonst' disabled={loading}>Submit Now</button>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    );
}

export default CategoryAdd;
