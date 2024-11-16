import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import ProtectedRoute from '../components/protectedRouts';
import { galleryPost } from '../api/api';
import Toast from '../components/toast';

const GalleryAdd = () => {
    const [filefirst, setFilefirst] = useState(null);
    const [categoryFileName, setCategoryFileName] = useState('');
    const [borderRedCat, setBorderRedCat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const { register, handleSubmit, formState: { errors }, reset, clearErrors, setError } = useForm({
        mode: 'onChange', 
        defaultValues: {
            title: "",
            alt: "",
            filefirst: "",
          },
    });

    const handleCategoryFileChange=(e)=>{
    if (e.target.files.length > 0) {
        let filename = e.target.files[0].name;
        let fileFull = e.target.files[0];
        setFilefirst(fileFull);
        setCategoryFileName(filename);
        setBorderRedCat(false);
    }
    }


    const onSubmit = async (data) => {
        setLoading(true);
        if (!filefirst) {
            setBorderRedCat(true);
            setLoading(false);
            return;
            }
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("alt", data.alt);
            formData.append("filefirst", filefirst);
            console.log([...formData])
        try {
            const response = await galleryPost('/gallery', formData);
            if (response.message) {
                setToast({ message: 'gallery added successfully!', type: 'success', visible: true });
                setLoading(false);
                reset(); 
            } else {
                setToast({ message: 'Failed to add gallery. Please try again.', type: 'error', visible: true });
            }
        } catch (error) {
            console.error("Error:", error);
            setToast({ message: 'An error occurred while adding the gallery.', type: 'error', visible: true });
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
                        <h4>Add Gallery</h4>
                    </div>
                </div>
            </div>
        </div>
        {toast.visible && (
            <Toast 
            message={toast.message} 
            type={toast.type} 
            duration={3000} 
            onClose={() => setToast({ ...toast, visible: false })} 
            />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="addStoryform">
            <div className="addStoryformLeft">
                <div className="addStoryformLeftInner">
                    <div className="inputfielgridfull">
                        <div className="inputfieldwrap">
                            <label>Title<em>*</em></label>
                            <input className="inputfield" type="text" {...register("title", { required: 'This field is required' })} />
                            {errors.title && <span className="error-message">{errors.title.message}</span>}
                        </div>
                    </div>
                    <div className="inputfielgridfull">
                        <div className="inputfieldwrap">
                            <label>Alt</label>
                            <input className="inputfield" type="text" {...register("alt")} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="addStoryformRight">
                <div className="addStoryformRightin">
                   <div className='sidetabwrp'>
                        <div className='tabbodymain'>
                            <div className='tabbodymainitem'>
                                <div className="inputfieldwrap">
                                    <label>Gallery Image<em>*</em></label>
                                    <div className='fileuploadewrp'>
                                        <label htmlFor="categoryfile" style={borderRedCat && borderRedCat ? { borderColor: 'red',backgroundColor: '#fff2f2'} : {}}>
                                            <span className="formbold-drop-file">{categoryFileName && categoryFileName ? categoryFileName : 'Select File here'}</span>
                                            <span className="formbold-or">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                                            <span className="formbold-browse">Browse</span>
                                        </label>
                                        <input type="file" name="categoryfile" id="categoryfile" onChange={handleCategoryFileChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
            <div className="buttonwrape">
               <button type="submit" className='buttonst' disabled={loading}>Submit Now</button>
            </div>
        </form>
        </ProtectedRoute>
    );
}

export default GalleryAdd;
