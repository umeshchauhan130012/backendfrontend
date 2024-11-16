import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from "react-hook-form";
import { useSearchParams } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRouts';
import { storyGetById, storyUpdate } from '../api/api';
import Toast from '../components/toast';
import Config from '../api/baseUrl';

const StoryEdit = () => {
    const [searchParams] = useSearchParams();
    const [filefirst, setFilefirst] = useState(null);
    const [filesecond, setFilesecond] = useState(null);
    const [categoryFileName, setCategoryFileName] = useState('');
    const [featureFileName, setFeatureFileName] = useState('');
    const [inputSlugValue, setInputSlugValue] = useState('');
    const [firstImagePath, setFirstImagePath] = useState('');
    const [secondImagePath, setSecondImagePath] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
	const [bodytext, setBodytext] = useState('');
    const [dataRefresh, setDataRefresh] = useState(false);
    const selectId = searchParams.get('id');
    const { register, handleSubmit, formState: { errors }, reset, clearErrors, setError, setValue } = useForm();
    const editor = useRef(null);
    const config = useMemo(
        () => ({
            readonly: false,
            height: 500,
            showPoweredBy: false,
            removeButtons: ['speechRecognition'], 
            toolbarSticky: false,
        })
    );
    const createSlug = (text) => {
        return text
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    };
    const handleSlugChange = (event) => {
        const value = event.target.value;
        setInputSlugValue(createSlug(value));
        if (inputSlugValue.length > 2) {
            clearErrors("slug");
          } else {
            setError("slug", { type: "manual", message: "This field is required1" });
          }
    };
    const handleCategoryFileChange=(e)=>{
    if (e.target.files.length > 0) {
        let filename = e.target.files[0].name;
        let fileFull = e.target.files[0];
        setFilefirst(fileFull);
        setCategoryFileName(filename);
        // setBorderRedCat(false);
    }
    }
    const handleFeatureFileChange=(e)=>{
    if (e.target.files.length > 0) {
        let filename = e.target.files[0].name;
        let fileFull = e.target.files[0];
        setFilesecond(fileFull);
        setFeatureFileName(filename);
        // setBorderRedFet(false);
    }
    }

    useEffect(() => {
        const fetchDataById = async () => {
            try {
            const response = await storyGetById(`/story/${selectId}`);
            setBodytext(response?.bodytext);
            setValue("headline", response?.headline || '');
            setValue("subheadline", response?.subheadline || '');
            setValue("slug", response?.slug || '');
            setValue("summary", response?.summary || '');
            setValue("bodytext", response?.bodytext || '');
            setValue("pagetitle", response?.pagetitle || '');
            setValue("metatitle", response?.metatitle || '');
            setValue("metakeyword", response?.metakeyword || '');
            setValue("metadescription", response?.metadescription || '');

            const imageUrl1 = `${Config.baseURL}/${response?.filefirst.path}`;
            setFirstImagePath(imageUrl1);
            const responseImage1 = await fetch(imageUrl1);
            const imageBlob1 = await responseImage1.blob();
            const file1 = new File([imageBlob1], `${response?.filefirst.filename}`, { type: imageBlob1.type });
            setFilefirst(file1);

            const imageUrl2 = `${Config.baseURL}/${response?.filesecond.path}`;
            setSecondImagePath(imageUrl2);
            const responseImage2 = await fetch(imageUrl2);
            const imageBlob2 = await responseImage2.blob();
            const file2 = new File([imageBlob2], response?.filesecond.filename, { type: imageBlob2.type });
            setFilesecond(file2);

            } catch (error) {
            console.error('Failed to fetch data by ID:', error);
            }
        };
        fetchDataById();
    }, [selectId, dataRefresh]);

    const onSubmit = async (data) => {
        setLoading(true);
            const formData = new FormData();
            formData.append("headline", data.headline);
            formData.append("subheadline", data.subheadline);
            formData.append("slug", data.slug || inputSlugValue);
            formData.append("summary", data.summary);
            formData.append("bodytext", bodytext);
            formData.append("pagetitle", data.pagetitle);
            formData.append("metatitle", data.metatitle);
            formData.append("metakeyword", data.metakeyword);
            formData.append("metadescription", data.metadescription);
            if (filefirst) {
                formData.append("filefirst", filefirst);
            }
            if (filesecond) {
                formData.append("filesecond", filesecond);
            }
            try {
                await storyUpdate(`/story/${selectId}`, formData);
                setToast({ message: 'Story Updated successfully!', type: 'success', visible: true });
                setLoading(false);
                setDataRefresh(prev => !prev);
                reset(); 
            } catch (error) {
                console.error("Error:", error);
                setToast({ message: 'An error occurred while adding the story.efwefwe', type: 'error', visible: true });
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
                        <h4>Edit Story</h4>
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
                        <label>Headline<em>*</em></label>
                        <input className="inputfield" type="text" {...register("headline", { required: 'This field is required' })} />
                        {errors.headline && <span className="error-message">{errors.headline.message}</span>}
                    </div>
                </div>
                <div className="inputfielgrid">
                    <div className="inputfieldwrap">
                        <label>Sub Headline</label>
                        <input className="inputfield" type="text" {...register("subheadline")} />
                    </div>
                </div>
                <div className="inputfielgrid">
                    <div className="inputfieldwrap">
                        <label>Slug Text<em>*</em></label>
                        <input className="inputfield" type="text" {...register("slug", { required: 'This field is required1' })} onChange={handleSlugChange} />
                        {errors.slug && <span className="error-message">{errors.slug.message}</span>}
                    </div>
                </div>
                <div className="inputfielgrid">
                    <div className="inputfieldwrap">
                        <label>Slug View</label>
                        <input className="inputfield readonly" value={inputSlugValue} readOnly />
                    </div>
                </div>
                <div className="inputfielgridfull">
                    <div className="inputfieldwrap">
                        <label>Summary</label>
                        <textarea className="inputfield resizenone" rows="3" cols="50" {...register("summary")}></textarea>
                    </div>
                </div>
                <div className="inputfielgridfull">
                    <div className="inputfieldwrap">
                        <label>Body Text</label>
                        <JoditEditor
                            ref={editor}
                            value={bodytext}
                            config={config}
                            tabIndex={1}
                            onBlur={(newContenttype) => { setBodytext(newContenttype) }}
                        />
                    </div>
                </div> 
            </div>
            <div className="addStoryformRight">
                <div className="addStoryformRightin">
                   <div className='sidetabwrp'>
                        <div className='tabbtnmain'>
                            <button type="button" className={`static-tab-button ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>Images</button>
                            <button type="button" className={`static-tab-button ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>SEO</button>
                        </div>
                        <div className='tabbodymain'>
                            {activeTab === 0 && 
                                <div className='tabbodymainitem'>
                                    <div className="inputfieldwrap">
                                        <label>Category Image<em>*</em></label>
                                        <div className='fileuploadewrp'>
                                            <label htmlFor="categoryfile">
                                                <span className="formbold-drop-file">{categoryFileName && categoryFileName ? categoryFileName : <img src={firstImagePath} alt="thumb" width={100} height={47} /> }</span>
                                                <span className="formbold-or">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                                                <span className="formbold-browse">Browse</span>
                                            </label>
                                            <input type="file" name="categoryfile" id="categoryfile" onChange={handleCategoryFileChange} />
                                        </div>
                                    </div>
                                    <div className="inputfieldwrap">
                                        <label>Featured Image<em>*</em></label>
                                        <div className='fileuploadewrp'>
                                            <label htmlFor="featurefile">
                                                <span className="formbold-drop-file">{featureFileName && featureFileName ? featureFileName : <img src={secondImagePath} alt="thumb" width={100} height={47} /> }</span>
                                                <span className="formbold-or">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                                                <span className="formbold-browse">Browse</span>
                                            </label>
                                            <input type="file" name="featurefile" id="featurefile" onChange={handleFeatureFileChange}/>
                                        </div>
                                    </div>
                                </div>
                            }
                            {activeTab === 1 && 
                                <div className='tabbodymainitem'>
                                    <div className="inputfielgridfull">
                                        <div className="inputfieldwrap">
                                            <label>Page title</label>
                                            <input className="inputfield" {...register("pagetitle")} />
                                        </div>
                                    </div>
                                    <div className="inputfielgridfull">
                                        <div className="inputfieldwrap">
                                            <label>Meta title</label>
                                            <input className="inputfield" {...register("metatitle")} />
                                        </div>
                                    </div>
                                    <div className="inputfielgridfull">
                                        <div className="inputfieldwrap">
                                            <label>Meta keyword</label>
                                            <textarea className="inputfield resizenone" rows="2" cols="50" {...register("metakeyword")}></textarea>
                                        </div>
                                    </div>
                                    <div className="inputfielgridfull">
                                        <div className="inputfieldwrap">
                                            <label>Meta Description</label>
                                            <textarea className="inputfield resizenone" rows="3" cols="50" {...register("metadescription")}></textarea>
                                        </div>
                                    </div>
                                </div>
                            }
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

export default StoryEdit;
