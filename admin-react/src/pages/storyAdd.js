import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from "react-hook-form";
import ProtectedRoute from '../components/protectedRouts';
import { storyPost } from '../api/api';
import Toast from '../components/toast';

const AddStory = () => {
    const [filefirst, setFilefirst] = useState(null);
    const [filesecond, setFilesecond] = useState(null);
    const [categoryFileName, setCategoryFileName] = useState('');
    const [featureFileName, setFeatureFileName] = useState('');
    const [borderRedCat, setBorderRedCat] = useState(false)
    const [borderRedFet, setBorderRedFet] = useState(false)
    const [inputSlugValue, setInputSlugValue] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
	const [bodytext, setBodytext] = useState('');
    const { register, handleSubmit, formState: { errors }, reset, clearErrors, setError } = useForm({
        mode: 'onChange', 
        defaultValues: {
            headline: "",
            subheadline: "",
            inputSlugValue: "",
            summary: "",
            bodytext: "",
            pagetitle: "",
            metatitle: "",
            metakeyword: "",
            metadescription: "",
            filefirst: "",
            filesecond: "",
          },
    });
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
        setBorderRedCat(false);
    }
    }
    const handleFeatureFileChange=(e)=>{
    if (e.target.files.length > 0) {
        let filename = e.target.files[0].name;
        let fileFull = e.target.files[0];
        setFilesecond(fileFull);
        setFeatureFileName(filename);
        setBorderRedFet(false);
    }
    }

    const onSubmit = async (data) => {
        setLoading(true);
        if (!filefirst) {
            setBorderRedCat(true);
            setLoading(false);
            return;
            }
        if (!filesecond) {
            setBorderRedFet(true);
            setLoading(false);
            return;
            }
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
            formData.append("filefirst", filefirst);
            formData.append("filesecond", filesecond);
            console.log([...formData])
        try {
            const response = await storyPost('/story', formData);
            if (response.message) {
                setToast({ message: 'Story added successfully!', type: 'success', visible: true });
                setLoading(false);
                reset(); 
            } else {
                setToast({ message: 'Failed to add story. Please try again.', type: 'error', visible: true });
            }
        } catch (error) {
            console.error("Error:", error);
            setToast({ message: 'An error occurred while adding the story.', type: 'error', visible: true });
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
                        <h4>Add Story</h4>
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
                                            <label htmlFor="categoryfile" style={borderRedCat && borderRedCat ? { borderColor: 'red',backgroundColor: '#fff2f2'} : {}}>
                                                <span className="formbold-drop-file">{categoryFileName && categoryFileName ? categoryFileName : 'Select File here'}</span>
                                                <span className="formbold-or">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                                                <span className="formbold-browse">Browse</span>
                                            </label>
                                            <input type="file" name="categoryfile" id="categoryfile" onChange={handleCategoryFileChange} />
                                        </div>
                                    </div>
                                    <div className="inputfieldwrap">
                                        <label>Featured Image<em>*</em></label>
                                        <div className='fileuploadewrp'>
                                            <label htmlFor="featurefile" style={borderRedFet && borderRedFet ? { borderColor: 'red',backgroundColor: '#fff2f2' } : {}}>
                                                <span className="formbold-drop-file">{featureFileName && featureFileName ? featureFileName : 'Select File here'}</span>
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

export default AddStory;
