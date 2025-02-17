import React, { forwardRef, useEffect, useState } from 'react';
import ProtectedRoute from '../components/protectedRouts';
import { useSearchParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Toast from '../components/toast';
import { getByIdCategory, updateCategory } from '../api/api';
import Div from '../components/div';

const CategoryEdit = () => {
    const [searchParams] = useSearchParams();
    const { register, handleSubmit, formState: { errors }, reset, setError, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const [dataRefresh, setDataRefresh] = useState(false);
    const selectId = searchParams.get('id');

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


    useEffect(() => {
        const fetchDataById = async () => {
            try {
            const response = await getByIdCategory(`/category/${selectId}`);
            setValue("catname", response?.catname || '');
            setValue("catstatus", response?.catstatus || 'active');
            setValue("catslug", response?.catslug || '');
            setValue("catathome", response?.catathome || false);
            } catch (error) {
            console.error('Failed to fetch data by ID:', error);
            }
        };
        fetchDataById();
    }, [selectId, dataRefresh]);


    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await updateCategory(`/category/${selectId}`, data); 
            setToast({ message: 'Tag Updated successfully done!', type: 'success', visible: true });
            setDataRefresh(prev => !prev);
            reset();
        } catch (err) {
            setError(err.response?.data?.message || err.message); 
        } finally {
            setLoading(false);
        }  
    };
    return (
        <ProtectedRoute>
            <Div className='custom-container'>
                <Div className="custom-row">
                    <Div className="custom-col-12">
                        <Div className="custom-section-title">
                            <h4>Add New Category</h4>
                        </Div>
                    </Div>
                </Div>
            </Div>
            <Div className="custom-fullform-wrapper">
            {toast.visible && (
                <Toast 
                message={toast.message} 
                type={toast.type} 
                duration={3000} 
                onClose={() => setToast({ ...toast, visible: false })} 
                />
            )}
                <form onSubmit={handleSubmit(onSubmit)} className="formbithout-sectionm">
                    <Div className="formbithout-section">
                        <Div className="inputfielgrid">
                            <Div className="inputfieldwrap">
                                <label>Category<em>*</em></label>
                                <input className="inputfield" type="text" {...register("catname", { required: 'This field is required' })} />
                                {errors.catname && <span className="error-message">{errors.catname.message}</span>}
                            </Div>
                        </Div>
                        <Div className="inputfielgrid">
                            <Div className="inputfieldwrap">
                                <Selectcm {...register("catstatus")} />
                            </Div>
                        </Div>
                        <Div className="inputfielgrid">
                            <Div className="inputfieldwrap">
                                <label>Category URL<em>*</em></label>
                                <input className="inputfield" type="text" {...register("catslug", { required: 'This field is required1' })} />
                                {errors.catslug && <span className="error-message">{errors.catslug.message}</span>}
                            </Div>
                        </Div>

                        <Div className="inputfielgrid">
                            <Div className='chkboxbtn-wrap'>
                                <span className='chkboxbtn-label'>Show At Home</span>
                                <label htmlFor="chkboxbtn" className="chkboxbtn" >
                                    <input type="checkbox" id="chkboxbtn" {...register("catathome")} />
                                </label>
                            </Div>
                        </Div>
                    </Div>
                        
                    <Div className="buttonwrape">
                        <button type="submit" className='buttonst' disabled={loading}>Submit Now</button>
                    </Div>
                </form>
            </Div>
        </ProtectedRoute>
    );
}

export default CategoryEdit;
