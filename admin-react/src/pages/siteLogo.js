import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from "react-hook-form";
import ProtectedRoute from '../components/protectedRouts';
import { getlogoHead, logoHeadGetById, logoHeadUpdate, getlogoFoot, logoFootGetById, logoFootUpdate, getCopyright, getCopyrightById, updateCopyrightById, getYoutubeLink, getYoutubeLinkById, updateYoutubeLinkById } from '../api/api';
import Config from '../api/baseUrl';
import Toast from '../components/toast';
import Div from '../components/div';

const SiteLogo = ({ statusData }) => {
    const [showPopupHLogo, setShowPopupHLogo] = useState(false); 
    const [hLogodata, setHLogodata] = useState([]);
    const [logohead, setLogoHead] = useState(null);
    const [categoryFileName, setCategoryFileName] = useState('');
    const [firstImagePath, setFirstImagePath] = useState('');
    const [getHLogoId, setGetHLogoId] = useState(null);
    const [borderRedCat, setBorderRedCat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(false);
    
    const [showPopupFLogo, setShowPopupFLogo] = useState(false); 
    const [fLogodata, setFLogodata] = useState([]);
    const [logoFoot, setLogoFoot] = useState(null);
    const [getFLogoId, setGetFLogoId] = useState(null);
    const [fdataLoading, setFdataLoading] = useState(false);
    const [fDataRefresh, setFDataRefresh] = useState(false);
    const [flogoFileName, setFlogoFileName] = useState('');
    const [flogoImagePath, setFlogoImagePath] = useState('');

    const [copyrightData, setCopyrightData] = useState([]);
    const [copyrightId, setCopyrightId] = useState(null);
    const [copyrightPopup, setCopyrightPopup] = useState(false);
    const [copyLoading, setCopyLoading] = useState(false);
    const [copyDataRefresh, setCopyDataRefresh] = useState(false);

    const [youtubeData, setYoutubeData] = useState([]);
    const [youtubeId, setYoutubeId] = useState(null);
    const [youtubePopup, setYoutubePopup] = useState(false);
    const [youtubeLoading, setYoutubeLoading] = useState(false);
    const [youtubeDataRefresh, setYoutubeDataRefresh] = useState(false);

    const [toast, setToast] = useState({ message: '', type: '', visible: false });

    const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 }, setValue: setValueForm1 } = useForm();
    const { register: registerForm2, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 }, setValue: setValueForm2 } = useForm();
    const { register: registerForm3, handleSubmit: handleSubmitForm3, setValue: setValueForm3 } = useForm();
    const { register: registerForm4, handleSubmit: handleSubmitForm4, setValue: setValueForm4, watch } = useForm({defaultValues: {status: false,},}); 


    const memoizedGetHLogoId = useMemo(() => getHLogoId, [getHLogoId]);
    const memoizedGetFLogoId = useMemo(() => getFLogoId, [getFLogoId]);
    const memoizedGetCopyId = useMemo(() => copyrightId, [copyrightId]);
    const memoizedGetYoutubeId = useMemo(() => youtubeId, [youtubeId]);


    const handleEditHLogo = async (idget) => {
        setGetHLogoId(idget)
        setShowPopupHLogo(true);
    }
    const handleCloseHLogo = async () => {
        setShowPopupHLogo(false);
    }
    const handleCategoryFileChange=(e)=>{
        if (e.target.files.length > 0) {
            let filename = e.target.files[0].name;
            let fileFull = e.target.files[0];
            setLogoHead(fileFull);
            setCategoryFileName(filename);
            setBorderRedCat(false);
        }
    }
    useEffect(() => {
        const fetchHLogoData = async () => {
        try {
            const response = await getlogoHead('/headerlogo');
            setHLogodata(response);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        };
        fetchHLogoData();
    }, []); 
    useEffect(() => {
        if (!memoizedGetHLogoId) return;
        const fetchDataById = async () => {
            try {
            const response = await logoHeadGetById(`/headerlogo/${getHLogoId}`);
            setValueForm1("title", response?.title || '');
            setValueForm1("logolink", response?.logolink || '');
            const imageUrl1 = `${Config.baseURL}/${response?.logohead.path}`;
            setFirstImagePath(imageUrl1);
            const responseImage1 = await fetch(imageUrl1);
            const imageBlob1 = await responseImage1.blob();
            const file1 = new File([imageBlob1], `${response?.logohead.filename}`, { type: imageBlob1.type });
            setLogoHead(file1);
            setCategoryFileName('')
            } catch (error) {
            console.error('Failed to fetch data by ID:', error);
            }
        };
        fetchDataById();
    }, [memoizedGetHLogoId, dataRefresh]);
    const onSubmitHlogo = async (data) => {
        setLoading(true);
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("logolink", data.logolink);
            if (logohead) {
                formData.append("logohead", logohead);
            }
            try {
                await logoHeadUpdate(`/headerlogo/${getHLogoId}`, formData);
                setToast({ message: 'gallery Updated successfully!', type: 'success', visible: true });
                setLoading(false);
                setDataRefresh(prev => !prev);
            } catch (error) {
                console.error("Error:", error);
                setToast({ message: 'An error occurred while adding the gallery.efwefwe', type: 'error', visible: true });
            } finally {
                setLoading(false);
                setShowPopupHLogo(false)
            } 
    };

    const handleEditFLogo = async (idgets) => {
        setGetFLogoId(idgets)
        setShowPopupFLogo(true);
    }
    const handleCloseFLogo = async () => {
        setShowPopupFLogo(false);
    }
    const handleFootFileChange=(e)=>{
        if (e.target.files.length > 0) {
            let footfilename = e.target.files[0].name;
            let footfileFull = e.target.files[0];
            setLogoFoot(footfileFull);
            setFlogoFileName(footfilename);
            setBorderRedCat(false);
        }
    }
    useEffect(() => {
        const fetchFLogoData = async () => {
        try {
            const fresponse = await getlogoFoot('/footerlogo');
            setFLogodata(fresponse);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        };
        fetchFLogoData();
    }, []); 
    useEffect(() => {
        if (!memoizedGetFLogoId) return;
        const fetchfDataById = async () => {
            try {
            const response = await logoFootGetById(`/footerlogo/${getFLogoId}`);
            setValueForm2("title", response?.title || '');
            setValueForm2("logolink", response?.logolink || '');
            const imageflogopath = `${Config.baseURL}/${response?.logofoot.path}`;
            setFlogoImagePath(imageflogopath);
            const responseImage1 = await fetch(imageflogopath);
            const imageBlob1 = await responseImage1.blob();
            const footfile1 = new File([imageBlob1], `${response?.logofoot.filename}`, { type: imageBlob1.type });
            setLogoFoot(footfile1);
            setFlogoFileName('')
            } catch (error) {
            console.error('Failed to fetch data by ID:', error);
            }
        };
        fetchfDataById();
    }, [memoizedGetFLogoId, fDataRefresh]);
    const onSubmitFlogo = async (data) => {
        setFdataLoading(true);
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("logolink", data.logolink);
        if (logoFoot) {
            formData.append("logofoot", logoFoot);
        }
        try {
            await logoFootUpdate(`/footerlogo/${getFLogoId}`, formData);
            setToast({ message: 'gallery Updated successfully!', type: 'success', visible: true });
            setFdataLoading(false);
            setFDataRefresh(prev => !prev);
        } catch (error) {
            console.error("Error:", error);
            setToast({ message: 'An error occurred while adding the gallery.efwefwe', type: 'error', visible: true });
        } finally {
            setFdataLoading(false);
            setShowPopupFLogo(false)
        } 
    };

    const handleEditCopy = async (gtcopyId) => {
        setCopyrightId(gtcopyId);
        setCopyrightPopup(true);
    }
    const handleCloseCopyPopup = async () => {
        setCopyrightPopup(false)
    }
    useEffect(() => {
        const copyrightData = async () => {
            try {
                const apiResponse = await getCopyright('/copyright');
                setCopyrightData(apiResponse);
            } catch(error) {
                 console.error('Copyright data not fetch', error)
            }
        };
        copyrightData();
    }, []);
    useEffect(() => {
        if (!memoizedGetCopyId) return;
        const copyrightDataId = async () => {
            try {
                const apiResponse = await getCopyrightById(`/copyright/${copyrightId}`);
                setValueForm3("copy", apiResponse?.copy || '');
            } catch(error) {
                 console.error('Copyright data not fetch', error)
            }
        };
        copyrightDataId();
    }, [copyrightId, copyDataRefresh]);
    const onSubmitCopyright = async (data) => {
        setCopyLoading(true);
        const formDataCopy = new FormData();
        formDataCopy.append("copy", data.copy);
        try {
            await updateCopyrightById(`/copyright/${copyrightId}`, formDataCopy);
            setToast({ message: 'gallery Updated successfully!', type: 'success', visible: true });
            setCopyLoading(false);
            setCopyDataRefresh(prev => !prev);
        } catch (error) {
            console.error("Error:", error);
            setToast({ message: 'An error occurred while update data', type: 'error', visible: true });
        } finally {
            setCopyLoading(false);
            setCopyrightPopup(false)
        } 
    };


    useEffect(() => {
        if (statusData !== undefined) {
            setValueForm4("status", statusData);
        }
    }, [statusData, setValueForm4]);

    const handleEditYoutube = async (youtub) => {
        setYoutubeId(youtub);
        setYoutubePopup(true);
    }
    const handleCloseYoutubePopup = async () => {
        setYoutubePopup(false)
    }
    useEffect(() => {
        const youtubeData = async () => {
            try {
                const apiResponse = await getYoutubeLink('/youtubelink');
                setYoutubeData(apiResponse);
            } catch(error) {
                 console.error('Youtube link not fetch', error)
            }
        };
        youtubeData();
    }, []);
    useEffect(() => {
        if (!memoizedGetYoutubeId) return;
        const youtubeDataId = async () => {
            try {
                const apiResponse = await getYoutubeLinkById(`/youtubelink/${youtubeId}`);
                setValueForm4("youtubelink", apiResponse?.youtubelink || '');
                setValueForm4("status", apiResponse?.status || '');
            } catch(error) {
                 console.error('Youtube link not fetch', error)
            }
        };
        youtubeDataId();
    }, [youtubeId, youtubeDataRefresh]);
    const onSubmitYoutube = async (data) => {
        setYoutubeLoading(true);
        const formDataYoutube = new FormData();
        formDataYoutube.append("youtubelink", data.youtubelink);
        formDataYoutube.append("status", data.status);
        try {
            await updateYoutubeLinkById(`/youtubelink/${youtubeId}`, formDataYoutube);
            setToast({ message: 'Youtube link updated successfully!', type: 'success', visible: true });
            setYoutubeLoading(false);
            setYoutubeDataRefresh(prev => !prev);
        } catch (error) {
            console.error("Error:", error);
            setToast({ message: 'An error occurred while update data', type: 'error', visible: true });
        } finally {
            setYoutubeLoading(false);
            setYoutubePopup(false)
        } 
    };


    return (
        <ProtectedRoute>
        <Div className='custom-container'>
            <Div className="custom-row">
                <Div className="custom-col-12">
                    <Div className="custom-section-title">
                        <h4>Site Logo & Copyright</h4>
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
        <Div className="addStoryform">
            <Div className="addStoryformcol3">
                <Div className="inputfielgridfull">
                    <h3 className="secondrytitle">Header logo</h3>
                </Div>
                <Div className="inputgroupgroup">
                    { hLogodata && hLogodata.map((item, ind) => (
                    <Div className="inputfielgridfull" key={ind}>
                        <Div className="inputfieldwrap">
                            <Div className='fileuploadewrp' onClick={() => handleEditHLogo(item._id)} >
                                <label>
                                    <span className="formbold-drop-file">If you can change the logo</span>
                                    <span className="formbold-or"></span>
                                    <span className="formbold-browse">Click here</span>
                                </label>
                            </Div>
                        </Div>
                    </Div>
                    ))}
                </Div>
                { showPopupHLogo && (
                <Div style={popupStylefull}>
                    <Div style={popupStylefullinner}>
                        <form onSubmit={handleSubmitForm1(onSubmitHlogo)} className="inputgroupgroup">
                            <Div className="inputfielgridfull">
                                <Div className="inputfieldwrap">
                                    <label>Logo image<em>*</em></label>
                                    <Div className='fileuploadewrp'>
                                        <label htmlFor="categoryfile" style={borderRedCat && borderRedCat ? { borderColor: 'red',backgroundColor: '#fff2f2'} : {}}>
                                            <span className="formbold-drop-file">{categoryFileName && categoryFileName ? categoryFileName : <img src={firstImagePath} alt="thumb" width={100} height={47} /> }</span>
                                            <span className="formbold-or">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                                            <span className="formbold-browse">Browse</span>
                                        </label>
                                        <input type="file" name="categoryfile" id="categoryfile" onChange={handleCategoryFileChange} />
                                    </Div>
                                </Div>
                            </Div>
                            <Div className="inputfielgrid">
                                <Div className="inputfieldwrap">
                                    <label>Logo link</label>
                                    <input className="inputfield" type="text" {...registerForm1("logolink")} />
                                </Div>
                            </Div>
                            <Div className="inputfielgrid">
                                <Div className="inputfieldwrap">
                                    <label>Logo alt <em>*</em></label>
                                    <input className="inputfield" type="text" {...registerForm1("title", { required: 'This field is required' })} />
                                    {errorsForm1.title && <span className="error-message">{errorsForm1.title.message}</span>}
                                </Div>
                            </Div>
                            <Div className="inputfielgridfull">
                                <button type="submit" className='buttonst' disabled={loading}>{loading && loading ? 'Loading...' : 'Submit Now'}</button>
                                <button type="button" className='cancelbtn' onClick={() => handleCloseHLogo()}>Cancel</button>
                            </Div>
                        </form>
                    </Div>
                </Div>
                )}
            </Div>
            <Div className="addStoryformcol3 formcol3center">
                <Div className="inputfielgridfull">
                    <h3 className="secondrytitle">Footer logo</h3>
                </Div>
                <Div className="inputgroupgroup">
                   { fLogodata && fLogodata.map((fitem, indf) => (
                    <Div className="inputfielgridfull" key={indf}>
                        <Div className="inputfieldwrap">
                            <Div className='fileuploadewrp' onClick={() => handleEditFLogo(fitem._id)}>
                                <label>
                                    <span className="formbold-drop-file">If you can change the logo</span>
                                    <span className="formbold-or"></span>
                                    <span className="formbold-browse">Click here</span>
                                </label>
                            </Div>
                        </Div>
                    </Div>
                   ))}
                </Div>
                { showPopupFLogo && (
                <Div style={popupStylefull}>
                    <Div style={popupStylefullinner}>
                        <form onSubmit={handleSubmitForm2(onSubmitFlogo)} className="inputgroupgroup">
                            <Div className="inputfielgridfull">
                                <Div className="inputfieldwrap">
                                    <label>Logo image<em>*</em></label>
                                    <Div className='fileuploadewrp'>
                                        <label htmlFor="flogopathfile" style={borderRedCat && borderRedCat ? { borderColor: 'red',backgroundColor: '#fff2f2'} : {}}>
                                            <span className="formbold-drop-file">{flogoFileName && flogoFileName ? flogoFileName : <img src={flogoImagePath} alt="thumb" width={100} height={47} /> }</span>
                                            <span className="formbold-or">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                                            <span className="formbold-browse">Browse</span>
                                        </label>
                                        <input type="file" name="flogopathfile" id="flogopathfile" onChange={handleFootFileChange} />
                                    </Div>
                                </Div>
                            </Div>
                            <Div className="inputfielgrid">
                                <Div className="inputfieldwrap">
                                    <label>Logo link</label>
                                    <input className="inputfield" type="text" {...registerForm2("logolink")} />
                                </Div>
                            </Div>
                            <Div className="inputfielgrid">
                                <Div className="inputfieldwrap">
                                    <label>Logo alt <em>*</em></label>
                                    <input className="inputfield" type="text" {...registerForm2("title", { required: 'This field is required' })} />
                                    {errorsForm2.title && <span className="error-message">{errorsForm2.title.message}</span>}
                                </Div>
                            </Div>
                            <Div className="inputfielgridfull">
                                <button type="submit" className='buttonst' disabled={fdataLoading}>{fdataLoading && fdataLoading ? 'Loading...' : 'Submit Now'}</button>
                                <button type="button" className='cancelbtn' onClick={() => handleCloseFLogo()}>Cancel</button>
                            </Div>
                        </form>
                    </Div>
                </Div>
                )}
            </Div>
            <Div className="addStoryformcol3">
                <Div className="inputfielgridfull">
                    <h3 className="secondrytitle">Copyright here</h3>
                </Div>
                <Div className="inputgroupgroup">
                    {copyrightData && copyrightData.map((itemcopy, ind) => (
                    <Div className="inputfielgridfull" key={ind}>
                        <Div className="inputfieldwrap">
                            <Div className='fileuploadewrp' onClick={() => handleEditCopy(itemcopy._id)}>
                                <label>
                                    <span className="formbold-drop-file">Change here copyright</span>
                                    <span className="formbold-or"></span>
                                    <span className="formbold-browse">Click here</span>
                                </label>
                            </Div>
                        </Div>
                    </Div>
                    ))}
                </Div>
                { copyrightPopup && (
                <Div style={popupStylefull}>
                    <Div style={popupStylefullinner}>
                        <form onSubmit={handleSubmitForm3(onSubmitCopyright)} className="inputgroupgroup">
                            <Div className="inputfielgridfull">
                                <Div className="inputfieldwrap">
                                    <label>Copyright Text</label>
                                    <textarea className="inputfield" {...registerForm3("copy")} rows="3" style={{resize:'none'}}></textarea>
                                </Div>
                            </Div>
                            <Div className="inputfielgridfull">
                                <button type="submit" className='buttonst' disabled={copyLoading}>{copyLoading && copyLoading ? 'Loading...' : 'Submit Now'}</button>
                                <button type="button" className='cancelbtn' onClick={() => handleCloseCopyPopup()}>Cancel</button>
                            </Div>
                        </form>
                    </Div>
                </Div>
                )}
            </Div>
            <Div className="addStoryformcol3">
                <Div className="inputfielgridfull">
                    <h3 className="secondrytitle">Youtube Link</h3>
                </Div>
                <Div className="inputgroupgroup">
                    {youtubeData && youtubeData.map((itemlink, ind) => (
                    <Div className="inputfielgridfull" key={ind}>
                        <Div className="inputfieldwrap">
                            <Div className='fileuploadewrp' onClick={() => handleEditYoutube(itemlink._id)}>
                                <label>
                                    <span className="formbold-drop-file">Change here youtube link</span>
                                    <span className="formbold-or"></span>
                                    <span className="formbold-browse">Click here</span>
                                </label>
                            </Div>
                        </Div>
                    </Div>
                    ))}
                </Div>
                { youtubePopup && (
                <Div style={popupStylefull}>
                    <Div style={popupStylefullinner}>
                        <form onSubmit={handleSubmitForm4(onSubmitYoutube)} className="inputgroupgroup">
                            <Div className="inputfielgridfull">
                                <Div className="inputfieldwrap">
                                    <label>Youtube link</label>
                                    <textarea className="inputfield" {...registerForm4("youtubelink")} rows="3" style={{resize:'none'}}></textarea>
                                </Div>
                            </Div>
                            <Div className="inputfielgridfull">
                                <Div className="inputfieldwrap">
                                    <span className="chkboxbtn-label">Status</span>
                                    <label htmlFor="chkboxbtnstatus" className="chkboxbtn">
                                    <input 
                                    className="inputfield"
                                    type="checkbox" 
                                    id="chkboxbtnstatus" 
                                    name="status"
                                    {...registerForm4("status")}
                                    checked={watch("status")}
                                    onChange={(e) => setValueForm4("status", e.target.checked)}
                                    />
                                    </label>
                                </Div>
                            </Div>
                            <Div className="inputfielgridfull">
                                <button type="submit" className='buttonst' disabled={youtubeLoading}>{youtubeLoading && youtubeLoading ? 'Loading...' : 'Submit Now'}</button>
                                <button type="button" className='cancelbtn' onClick={() => handleCloseYoutubePopup()}>Cancel</button>
                            </Div>
                        </form>
                    </Div>
                </Div>
                )}
            </Div>
        </Div>

        </ProtectedRoute>
    );
}

  const popupStylefull = {
    position: 'fixed',
    backgroundColor: 'rgb(0 0 0 / 64%)',
    padding: '20px',
    zIndex: '9999',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    overflowY: 'auto',
    display: 'flex',
  };
  const popupStylefullinner = {
    maxWidth: '767px',
    margin: 'auto auto',
    backgroundColor: '#ffffff',
    padding: '20px',
    width: '100%',
    minHeight: '200px',
  }
export default SiteLogo;
