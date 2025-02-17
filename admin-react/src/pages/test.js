import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/protectedRouts'
import Toast from '../components/toast';
import { addMenu, deleteSingleMenu, getAllMenu, getSingleMenuId } from '../api/api';
import Div from '../components/div';

function generateRandomId() {
  return Math.floor(Math.random() * 1000000); 
}

function AddMenuPage() {
const [menuItems, setMenuItems] = useState([]);
const [toast, setToast] = useState({ message: '', type: '', visible: false });
const [loading, setLoading] = useState(false);
const [form, setForm] = useState({name: "", url: "", order: "", parentId: "",});
const [nextId, setNextId] = useState(() => generateRandomId());
const [menuDataList, setMenuDataList] = useState();
const [dataRefresh, setDataRefresh] = useState(false);
const [showPopup, setShowPopup] = useState(false); 
const [selectedRow, setSelectedRow] = useState(null);
const [loadingSecond, setLoadingSecond] = useState(false);
const [getMenuId, setGetMenuId] = useState(null);
const [menuDataGet, setMenuDataGet] = useState([]);
const [showPopupMenu, setShowPopupMenu] = useState(false); 
const [updateform, setUpdateForm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const updateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({ ...updateform, [name]: value });
  };

  // const updateInputChange = (event, index = null) => {
  //   const { name, value } = event.target;
  
  //   if (index !== null) {
  //     setUpdateForm((prevData) => {
  //       const updatedChildren = [...prevData.children];
  //       updatedChildren[index] = {
  //         ...updatedChildren[index],
  //         [name]: value,
  //       };
  //       return { ...prevData, children: updatedChildren };
  //     });
  //   } else {
  //     setUpdateForm((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   }
  // };


  const confirmDelete = () => {
    menuDeleteApiCall(selectedRow);
    setShowPopup(false); 
    setSelectedRow(null); 
    };

  const cancelDelete = () => {
    setShowPopup(false);
    setSelectedRow(null);
    };

  const addMenuItem = () => {
    if (form.name && form.url) {
      const newMenuItem = {
        id: nextId, 
        name: form.name,
        url: form.url,
        order: form.order,
        parentId: form.parentId ? parseInt(form.parentId) : null,
        children: [], 
      };

      let updatedMenuItems;

      if (newMenuItem.parentId) {
        updatedMenuItems = addChildToParent(menuItems, newMenuItem);
      } else {
        updatedMenuItems = [...menuItems, newMenuItem];
      }

      setMenuItems(updatedMenuItems);
      setNextId(nextId + 1);
      console.log("Menu Items as Object:", {
        count: updatedMenuItems.length,
        items: updatedMenuItems,
      });
      console.log("Menu Items as Array:", updatedMenuItems);
      setForm({ name: "", url: "", order: "", parentId: "" });
    } else {
      setToast({ message: 'Please fill out both fields! Name and Url.', type: 'error', visible: true });
    }
  };

  const addChildToParent = (items, newChild) => {
    return items.map((item) => {
      if (item.id === newChild.parentId) {
        return { ...item, children: [...item.children, newChild] };
      } else if (item.children && item.children.length > 0) {
        return { ...item, children: addChildToParent(item.children, newChild) };
      }
      return item;
    });
  };

  const getParentOptions = (items, prefix = "") => {
    let options = [];
    for (let item of items) {
      options.push({
        id: item.id,
        name: `${prefix}${item.name}`,
      });
      if (item.children && item.children.length > 0) {
        options = [...options, ...getParentOptions(item.children, `${prefix}-- `)];
      }
    }
    return options;
  };

  const renderMenuItems = (items) => {
    return items.map((item) => (
      <li key={item.id}>
        {item.name}
        {item.children && item.children.length > 0 && (
          <ul>{renderMenuItems(item.children)}</ul>
        )}
      </li>
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMenu('/menuitem');
          setMenuDataList(response);
      } catch (error) {
          console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [dataRefresh]); 


  const handleFinalSubmit = async () => {
      if (!menuItems || menuItems.length === 0) {
        setToast({
          message: 'No menu items to submit!',
          type: 'error',
          visible: true,
        });
        return;
      }
      setLoading(true);
      try {
          await addMenu('/menuitem', menuItems); 
          setToast({ message: 'Menu submited successfully done!', type: 'success', visible: true });
          setDataRefresh(prev => !prev);
          setMenuItems([]);
      } catch (err) {
          setToast({ message: 'Sorry something went worng!', type: 'error', visible: true }); 
      } finally {
          setLoading(false);
      }  
  };

  const handleMenuEdit = async (idget) => {
      setGetMenuId(idget);
      setShowPopupMenu(true);
  }

  const cancelEdit = async () => {
    setGetMenuId(null);
    setShowPopupMenu(false);
  }

  const handleMenuDelete = async (del) => {
    setSelectedRow(del); 
    setShowPopup(true); 
  }

  const menuDeleteApiCall = async (data) => {
    setLoadingSecond(true);
    try {
        console.log(data);
        await deleteSingleMenu(`/menuitem/${data}`); 
        setToast({ message: 'Tag deleted successfully done!', type: 'success', visible: true });
        setDataRefresh(prev => !prev);
    } catch (err) {
        console.log(err.response?.data?.message || err.message); 
    } finally {
        setLoadingSecond(false);  
        setShowPopup(false);  
        setSelectedRow(null);  
    }  
  };

  useEffect(() => {
    if (getMenuId !== null) {
      const fetchDataById = async () => {
          try {
          const response = await getSingleMenuId(`/menuitem/${getMenuId}`);
            setMenuDataGet(response);
          } catch (error) {
          console.error('Failed to fetch data by ID:', error);
          }
      };
      fetchDataById();
    }
  }, [getMenuId]);

  const updateEdit = () => {
    console.log("Form submitted with updated data:", updateform);
    // Add logic here to save the updated data, e.g., API call or state update
  };
  // console.log(menuDataList);
 
  console.log(menuDataGet);

  useEffect(() => {
    if (menuItems.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [menuItems]);

  return (
    <ProtectedRoute>
      {toast.visible && (
          <Toast 
          message={toast.message} 
          type={toast.type} 
          duration={3000} 
          onClose={() => setToast({ ...toast, visible: false })} 
          />
      )}
      <Div className="custom-container">
        <Div className="custom-row">
          <Div className="custom-col-12">
            <Div className="custom-section-title">
              <h4>Add Menu</h4>
            </Div>
          </Div>
        </Div>
      </Div>
      <Div className="custom-fullform-wrapper">
        <Div className="formbithout-sectionm">
          <Div className="formbithout-section">
            <Div className="inputfielgridsingle">
              <Div className="inputfieldwrap">
                <label>Item Name<em>*</em></label>
                <input
                  className="inputfield"
                  type="text"
                  name="name"
                  placeholder="Menu Item Name"
                  value={form.name}
                  onChange={handleInputChange}
                  style={{ marginRight: "10px" }}
                />
              </Div>
              <Div className="inputfieldwrap">
                <label>Url<em>*</em></label>
                <input
                  className="inputfield"
                  type="text"
                  name="url"
                  placeholder="Menu Item URL"
                  value={form.url}
                  onChange={handleInputChange}
                />
              </Div>
              <Div className="inputfieldwrap">
                <label>Add Child</label>
                <select
                  className="cms-all-selector"
                  name="parentId"
                  value={form.parentId}
                  onChange={handleInputChange}
                >
                  <option value="">No Parent</option>
                  {getParentOptions(menuItems).map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Div>
              <Div className="inputfieldwrapindex">
                <label>Index</label>
                <input
                  className="inputfield"
                  type="text"
                  name="order"
                  value={form.order}
                  onChange={handleInputChange}
                />
              </Div>
              <Div className="inputfieldwrapend">
                <label>Actions</label>
                <Div className="action-contain">
                  <span className="fa fa-plus" onClick={addMenuItem}></span>
                </Div>
              </Div>
            </Div>
          </Div>
          <Div className='all-menuitems'>
            <h2>Menu Items:</h2>
            {menuItems.length === 0 ? (
              <p>No menu items added yet.</p>
            ) : (
              <ul className='menuitems-lavel'>{renderMenuItems(menuItems)}</ul>
            )}
          </Div>
          <Div className="buttonwrape">
            <button type="button" onClick={handleFinalSubmit} disabled={loading} className="buttonst">Submit Now</button>
          </Div>
          <Div className='all-menuitems'>
            <ul className='menuitems-lavel'>
                {
                menuDataList && [...menuDataList].sort((a, b) => a.order - b.order).map((menuItemVal, Ind) => {
                  return (
                  <li key={Ind}>
                    <Div className='menumainwrp'>
                    {menuItemVal.name} <b>-- link:</b> {menuItemVal.url} <b>-- Order:</b> {menuItemVal.order} 
                    </Div>
                    <Div className='menueditbtn'>
                      <button type="button" className='editbtn-icon' onClick={() => handleMenuEdit(menuItemVal._id)}><i className='fa fa-pencil'></i></button>
                      <button type="button" className='deletebtn-icon' onClick={() => handleMenuDelete(menuItemVal._id)}><i className='fa fa-trash'></i></button>
                    </Div>
                    {menuItemVal.children && menuItemVal.children.length > 0 && (
                      <ul>
                        {
                        menuItemVal.children.sort((c, d) => c.order - d.order).map((menuInItemVal, Indvl)=>{
                          return (
                            <li key={Indvl}>
                              {menuInItemVal.name} <b>-- link:</b> {menuInItemVal.url} <b>-- Order:</b> {menuInItemVal.order}
                              {menuInItemVal.children && menuInItemVal.children.length > 0 && (
                                <ul>
                                  {
                                    menuInItemVal.children.sort((c, d) => c.order - d.order).map((menuinInItemVal, inIndvl)=>{
                                      return (
                                        <li key={inIndvl}>
                                          {menuinInItemVal.name} <b>-- link:</b> {menuinInItemVal.url} <b>-- Order:</b> {menuinInItemVal.order}
                                        </li>
                                      )
                                    })
                                  }
                                </ul>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                  )
                })
                }
            </ul>
          </Div>
        </Div>
      </Div>
      {showPopup && (
        <Div style={popupStyle}>
          <p>Are you sure you want to delete?</p>
          <button onClick={confirmDelete} disabled={loadingSecond}>Yes</button>
          <button onClick={cancelDelete} disabled={loadingSecond}>No</button>
        </Div>
      )}
      {showPopupMenu && (
      <Div style={popupStylefull}>
        <Div style={popupStylefullinner}>
          <Div className="formbithout-popup">
            <Div className="inputfielgridout">
              <Div className="inputfielgridsingle">
                <Div className="inputfieldwrap">
                  <label>Item Name<em>*</em></label>
                  <input
                    className="inputfield"
                    type="text"
                    name="name"
                    placeholder="Menu Item Name"
                    defaultValue={menuDataGet.name}
                    onChange={updateInputChange}
                    style={{ marginRight: "10px" }}
                  />
                </Div>
                <Div className="inputfieldwrap">
                  <label>Url<em>*</em></label>
                  <input
                    className="inputfield"
                    type="text"
                    name="url"
                    placeholder="Menu Item URL"
                    defaultValue={menuDataGet.url}
                    onChange={updateInputChange}
                  />
                </Div>
                <Div className="inputfieldwrapindex">
                  <label>Index</label>
                  <input
                    className="inputfield"
                    type="number"
                    name="order"
                    defaultValue={menuDataGet.order}
                    onChange={updateInputChange}
                  />
                </Div>
              </Div>
              {menuDataGet.children && menuDataGet.children.length > 0 && (
                <Div className="inputfielgridsinglewpmain">
                  {menuDataGet.children.map((childInp, ind) => (
                    <Div className="inputfielgridsinglewp" key={ind}>
                      <Div className="inputfielgridsingle">
                        <Div className="inputfieldwrap">
                          <label>Item Name<em>*</em></label>
                          <input
                            className="inputfield"
                            type="text"
                            name="name"
                            placeholder="Menu Item Name"
                            defaultValue={childInp.name}
                            onChange={updateInputChange}
                          />
                        </Div>
                        <Div className="inputfieldwrap">
                          <label>Url<em>*</em></label>
                          <input
                            className="inputfield"
                            type="text"
                            name="name"
                            placeholder="Menu Item Name"
                            defaultValue={childInp.url}
                            onChange={updateInputChange}
                          />
                        </Div>
                        <Div className="inputfieldwrapindex">
                          <label>Index</label>
                          <input
                            className="inputfield"
                            type="number"
                            name="name"
                            placeholder="Menu Item Name"
                            defaultValue={childInp.order}
                            onChange={updateInputChange}
                          />
                        </Div>
                      </Div>
                    </Div>
                  ))}
                </Div>
              )}
            </Div>
            <Div className='btngrp'>
              <button onClick={updateEdit} disabled="" className='successbtn'>Update</button>
              <button onClick={cancelEdit} disabled="" className='cancelbtn'>Cancel</button>
            </Div>
          </Div>
        </Div>
      </Div>
      )}

    </ProtectedRoute>
  );
}
const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffffff',
  padding: '20px',
  boxShadow: '0px 0px 11px -3px rgb(127 127 127)',
  zIndex: '1000',
  textAlign: 'center',
  borderRadius: '10px'
};
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
export default AddMenuPage;