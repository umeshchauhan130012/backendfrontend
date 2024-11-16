import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSearchParams } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRouts';
import { galleryGetById, galleryUpdate } from '../api/api';
import Toast from '../components/toast';
import Config from '../api/baseUrl';

const GalleryEdit = () => {
    const [searchParams] = useSearchParams();
    const [filefirst, setFilefirst] = useState(null);
    const [categoryFileName, setCategoryFileName] = useState('');
    const [firstImagePath, setFirstImagePath] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const [dataRefresh, setDataRefresh] = useState(false);
    const selectId = searchParams.get('id');
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();


    const handleCategoryFileChange=(e)=>{
    if (e.target.files.length > 0) {
        let filename = e.target.files[0].name;
        let fileFull = e.target.files[0];
        setFilefirst(fileFull);
        setCategoryFileName(filename);
        // setBorderRedCat(false);
    }
    }

    useEffect(() => {
        const fetchDataById = async () => {
            try {
            const response = await galleryGetById(`/gallery/${selectId}`);
            setValue("title", response?.title || '');
            setValue("alt", response?.alt || '');

            const imageUrl1 = `${Config.baseURL}/${response?.filefirst.path}`;
            setFirstImagePath(imageUrl1);
            const responseImage1 = await fetch(imageUrl1);
            const imageBlob1 = await responseImage1.blob();
            const file1 = new File([imageBlob1], `${response?.filefirst.filename}`, { type: imageBlob1.type });
            setFilefirst(file1);

            } catch (error) {
            console.error('Failed to fetch data by ID:', error);
            }
        };
        fetchDataById();
    }, [selectId, dataRefresh]);

    const onSubmit = async (data) => {
        setLoading(true);
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("alt", data.alt);
            if (filefirst) {
                formData.append("filefirst", filefirst);
            }
            try {
                await galleryUpdate(`/gallery/${selectId}`, formData);
                setToast({ message: 'gallery Updated successfully!', type: 'success', visible: true });
                setLoading(false);
                setDataRefresh(prev => !prev);
                reset(); 
            } catch (error) {
                console.error("Error:", error);
                setToast({ message: 'An error occurred while adding the gallery.efwefwe', type: 'error', visible: true });
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
                        <h4>Edit Gallery</h4>
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
                <div className="inputfielgrid">
                    <div className="inputfieldwrap">
                        <label>Title<em>*</em></label>
                        <input className="inputfield" type="text" {...register("title", { required: 'This field is required' })} />
                        {errors.title && <span className="error-message">{errors.title.message}</span>}
                    </div>
                </div>
                <div className="inputfielgrid">
                    <div className="inputfieldwrap">
                        <label>Alt</label>
                        <input className="inputfield" type="text" {...register("alt")} />
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
                                        <label htmlFor="categoryfile">
                                            <span className="formbold-drop-file">{categoryFileName && categoryFileName ? categoryFileName : <img src={firstImagePath} alt="thumb" width={100} height={47} /> }</span>
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

export default GalleryEdit;
