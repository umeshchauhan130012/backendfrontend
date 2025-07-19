import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ProtectedRoute from '../components/protectedRouts';
import { getAllCategory, getAllTags, storyPost } from '../api/api';
import Toast from '../components/toast';
import Div from '../components/div';


const AddPhotoStory = () => {
    const [inputSlugValue, setInputSlugValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [catData, setCateData] = useState([]);
    const [tagData, setTagData] = useState([]);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });


const [galleryItems, setGalleryItems] = useState([
    { id: Date.now(), courtesy: "", title: "", description: "", file: null, fileName: "" }
]);


    const { register, handleSubmit, formState: { errors }, reset, clearErrors, setError } = useForm({
        mode: 'onChange', 
        defaultValues: {
            headline: "",
            inputSlugValue: "",
            category: "",
            tags: "",
            summary: "",
            pagetitle: "",
            metatitle: "",
            metakeyword: "",
            metadescription: "",
          },
    });


    const handleInputChange = (e, index) => {
        const { name, value, type, files } = e.target;
        const newGalleryItems = [...galleryItems];

        if (type === "file") {
            newGalleryItems[index].file = files[0] || null;
            newGalleryItems[index].fileName = files[0] ? files[0].name : "";
        } else {
            newGalleryItems[index][name] = value;
        }

        setGalleryItems(newGalleryItems);
    };



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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getAllCategory('/category');
            setCateData(response);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
        fetchData();
    }, []); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getAllTags('/tags');
             setTagData(response);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
        fetchData();
    }, []); 

    //loop data add


    const addGalleryItem = () => {
        setGalleryItems([
            ...galleryItems,
            { id: Date.now(), courtesy: "", title: "", description: "", file: null, fileName: "" }
        ]);
    };
    const removeGalleryItem = (id) => {
        setGalleryItems(galleryItems.filter(item => item.id !== id));
    };


    //console.log("category",tagData);

    const onSubmit = async (data) => {
        setLoading(true);
            const formData = new FormData();
            formData.append("headline", data.headline);
            formData.append("slug", inputSlugValue);
            formData.append("category", data.category);
            formData.append("tags", data.tags);
            formData.append("summary", data.summary);
            formData.append("pagetitle", data.pagetitle);
            formData.append("metatitle", data.metatitle);
            formData.append("metakeyword", data.metakeyword);
            formData.append("metadescription", data.metadescription);
            
            galleryItems.forEach((item, index) => {
                
                formData.append(`files`, item.file);
                // Append additional metadata about each file
                formData.append(`filename[]`, item.fileName);
                formData.append(`courtesy[]`, item.courtesy);
                formData.append(`title[]`, item.title);
                formData.append(`description[]`, item.description);
            });

        try {
            const response = await storyPost('/photostory', formData);
            if (response.message) {
                setToast({ message: 'Story added successfully!', type: 'success', visible: true });
                setLoading(false);
                reset(); 
                setGalleryItems([{ id: Date.now(), courtesy: "", title: "", description: "", file: null, fileName: "" }]);
                setInputSlugValue('');
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
        <Div className='custom-container'>
            <Div className="custom-row">
                <Div className="custom-col-12">
                    <Div className="custom-section-title">
                        <h4>Add Story</h4>
                    </Div>
                </Div>
            </Div>
        </Div>
        {toast.visible && (
            <Toast 
            message={toast.message} 
            type={toast.type} 
            duration={3000} 
            onClose={() => setToast({ ...toast, visible: false })} 
            />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="addStoryform">
            <Div className="addStoryformLeft">
                <Div className="inputfielgridfull">
                    <Div className="inputfieldwrap">
                        <label>Headline<em>*</em></label>
                        <input className="inputfield" type="text" {...register("headline", { required: 'This field is required' })} />
                        {errors.headline && <span className="error-message">{errors.headline.message}</span>}
                    </Div>
                </Div>
                <Div className="inputfielgrid">
                    <Div className="inputfieldwrap">
                        <label>Slug Text<em>*</em></label>
                        <input className="inputfield" type="text" {...register("slug", { required: 'This field is required1' })} onChange={handleSlugChange} />
                        {errors.slug && <span className="error-message">{errors.slug.message}</span>}
                    </Div>
                </Div>
                <Div className="inputfielgrid">
                    <Div className="inputfieldwrap">
                        <label>Slug View</label>
                        <input className="inputfield readonly" value={inputSlugValue} readOnly />
                    </Div>
                </Div>
                <Div className="inputfielgrid">
                    <Div className="inputfieldwrap">
                    <label>Category<em>*</em></label>
                    <select className="inputfield" {...register("category", { required: 'This field is required' })}>
                        <option>Select...</option>
                        {
                            catData && catData.map((item, ind)=> {
                                return ( <option value={item.catname} key={ind}>{item.catname}</option> )
                            })
                        }
                        
                    </select>
                    {errors.category && <span className="error-message">{errors.category.message}</span>}
                    </Div>
                </Div>
                <Div className="inputfielgrid">
                    <Div className="inputfieldwrap">
                    <label>Tag</label>
                    <select className="inputfield" {...register("tags")}>
                        <option value="">Select...</option>
                       {
                        tagData && tagData.map((item, ind)=>{
                            return(
                                <option value={item.tagname} key={ind}>{item.tagname}</option>
                            )
                        })
                       } 
                    </select>
                    {errors.tags && <span className="error-message">{errors.tags.message}</span>}
                    </Div>
                </Div>
                <Div className="inputfielgridfull">
                    <Div className="inputfieldwrap">
                        <label>Summary</label>
                        <textarea className="inputfield resizenone" rows="3" cols="50" {...register("summary")}></textarea>
                    </Div>
                </Div>
                <Div className="inputfielgridfull">
                    <h3 className="secondrytitle">Photo Repeater</h3>
                    {galleryItems.map((item, index) => (
                        <Div className="inpreapeator" key={item.id}>
                            <Div className="repgalimg">
                                <Div className='fileuploadewrp'>
                                    <label htmlFor={`categoryfile-${index}`}>
                                        <span className="formbold-drop-file">
                                            {item.fileName ? item.fileName : 'Select File here'}
                                        </span>
                                        <span className="formbold-or">Files Supported: jpeg, jpg, png, webp</span>
                                        <span className="formbold-browse">Browse</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="categoryfile"
                                        id={`categoryfile-${index}`}
                                        onChange={(e) => handleInputChange(e, index)}
                                        accept="image/jpeg, image/jpg, image/png, image/webp"
                                    />
                                </Div>
                            </Div>
                            <Div className="reapcontent">
                                <Div className="inputfieldwrap">
                                    <label>Courtesy</label>
                                    <input
                                        className="inputfield"
                                        type="text"
                                        name="courtesy"
                                        value={item.courtesy}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </Div>
                                <Div className="inputfieldwrap">
                                    <label>Title</label>
                                    <input
                                        className="inputfield"
                                        type="text"
                                        name="title"
                                        value={item.title}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </Div>
                                <Div className="inputfieldwrap">
                                    <label>Description</label>
                                    <textarea
                                        className="inputfield resizenone"
                                        rows="3"
                                        cols="50"
                                        name="description"
                                        value={item.description}
                                        onChange={(e) => handleInputChange(e, index)}
                                    ></textarea>
                                </Div>
                            </Div>
                            {galleryItems.length > 1 && (
                                <button type="button" className="remove-btn" onClick={() => removeGalleryItem(item.id)}></button>
                            )}
                        </Div>
                    ))}
                    <Div className="reapetord action-contain">
                        <span className="fa fa-plus" onClick={addGalleryItem} ></span>
                    </Div>
                </Div>
            </Div>
            <Div className="addStoryformRight">
                <Div className="addStoryformRightin">
                   <Div className='sidetabwrp'>
                        <Div className="custom-section-title inputfieldwrap">
                            <h4>SEO</h4>
                        </Div>
                        <Div className='tabbodymain'>
                                <Div className='tabbodymainitem'>
                                    <Div className="inputfielgridfull">
                                        <Div className="inputfieldwrap">
                                            <label>Page title</label>
                                            <input className="inputfield" {...register("pagetitle")} />
                                        </Div>
                                    </Div>
                                    <Div className="inputfielgridfull">
                                        <Div className="inputfieldwrap">
                                            <label>Meta title</label>
                                            <input className="inputfield" {...register("metatitle")} />
                                        </Div>
                                    </Div>
                                    <Div className="inputfielgridfull">
                                        <Div className="inputfieldwrap">
                                            <label>Meta keyword</label>
                                            <textarea className="inputfield resizenone" rows="2" cols="50" {...register("metakeyword")}></textarea>
                                        </Div>
                                    </Div>
                                    <Div className="inputfielgridfull">
                                        <Div className="inputfieldwrap">
                                            <label>Meta Description</label>
                                            <textarea className="inputfield resizenone" rows="3" cols="50" {...register("metadescription")}></textarea>
                                        </Div>
                                    </Div>
                                </Div>
                        </Div>
                   </Div>
                </Div>
            </Div>
            <Div className="buttonwrape">
               <button type="submit" className='buttonst' disabled={loading}>Submit Now</button>
            </Div>
        </form>
        </ProtectedRoute>
    );
}

export default AddPhotoStory;
