import React, { forwardRef, useEffect, useState } from 'react';
import ProtectedRoute from '../components/protectedRouts';
import { useSearchParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Toast from '../components/toast';
import { getByIdTags, updateTags } from '../api/api';

const TagEdit = () => {
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
            const response = await getByIdTags(`/tags/${selectId}`);
            setValue("tagname", response?.tagname || '');
            setValue("tagstatus", response?.tagstatus || 'active');
            setValue("tagurl", response?.tagurl || '');
            setValue("tagsathome", response?.tagsathome || false);
            } catch (error) {
            console.error('Failed to fetch data by ID:', error);
            }
        };
        fetchDataById();
    }, [selectId, dataRefresh]);


    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await updateTags(`/tags/${selectId}`, data); 
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
            <div className='custom-container'>
                <div className="custom-row">
                    <div className="custom-col-12">
                        <div className="custom-section-title">
                            <h4>Edit Tag</h4>
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
                                <label>HasTag (Use # Symbole at start)<em>*</em></label>
                                <input className="inputfield" type="text" {...register("tagname", { required: 'This field is required' })} />
                                {errors.tagname && <span className="error-message">{errors.tagname.message}</span>}
                            </div>
                        </div>
                        <div className="inputfielgrid">
                            <div className="inputfieldwrap">
                                <Selectcm {...register("tagstatus")} />
                            </div>
                        </div>
                        <div className="inputfielgrid">
                            <div className="inputfieldwrap">
                                <label>URL (Use full URL with http:// or https://)<em>*</em></label>
                                <input className="inputfield" type="text" {...register("tagurl", { required: 'This field is required1' })} />
                                {errors.tagurl && <span className="error-message">{errors.tagurl.message}</span>}
                            </div>
                        </div>
                        <div className="inputfielgrid">
                            <div className='chkboxbtn-wrap'>
                                <span className='chkboxbtn-label'>Show At Home</span>
                                <label htmlFor="chkboxbtn" className="chkboxbtn" >
                                    <input type="checkbox" id="chkboxbtn" {...register("tagsathome")} />
                                </label>
                            </div>
                        </div>
                    </div>
                        
                    <div className="buttonwrape">
                        <button type="submit" className='buttonst' disabled={loading}>Update Now</button>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    );
}

export default TagEdit;
