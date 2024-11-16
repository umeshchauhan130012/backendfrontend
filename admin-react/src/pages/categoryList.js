import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import moment from 'moment';
import ProtectedRoute from '../components/protectedRouts';
import Toast from '../components/toast';
import { deleteCategory, getAllCategory } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Div from '../components/div';

const CategoryList = () => {
const navigate = useNavigate();
const [showPopup, setShowPopup] = useState(false); 
const [selectedRow, setSelectedRow] = useState(null);
const [loading, setLoading] = useState(false);
const [dataRefresh, setDataRefresh] = useState(false);
const [data, setData] = useState([]);
const [toast, setToast] = useState({ message: '', type: '', visible: false });

    const confirmDelete = () => {
    deleteApiCall(selectedRow);
    setShowPopup(false); 
    setSelectedRow(null); 
    };

    const cancelDelete = () => {
    setShowPopup(false);
    setSelectedRow(null);
    };

    const handleEdit = (row) => {
      if (row && row) {
          navigate(`/dashboard/category-edit?id=${row}`);
      } else {
          console.error('Invalid row data');
      }
    };

    const handleDelete = (row) => {
    setSelectedRow(row); 
    setShowPopup(true); 
    };

    const columns = [
        {
        id: 1,
        name: "Title",
        selector: (row) => row.catname,
        sortable: true,
        reorder: true,
        },
        {
        id: 2,
        name: "Tag Slug",
        selector: (row) => row.catslug,
        reorder: true,
        },
        {
        id: 3,
        name: "Visible At home",
        selector: (row) => row.catathome ? 'true' : 'false',
        reorder: true,
        },
        {
        id: 4,
        name: "Status",
        selector: (row) => row.catstatus,
        reorder: true,
        },
        {
        id: 5,
        name: "Runtime (m)",
        selector: (row) => moment(row.uploadDate).format('DD-MM-YYYY'),
        sortable: true,
        reorder: true,
        },
        {
        id: 6,
        name: "Actions",
        selector: (row) => (
            <>
              <button type="button" className='editbtn-icon' onClick={() => handleEdit(row._id)}><i className='fa fa-pencil'></i></button>
              <button type="button" className='deletebtn-icon' onClick={() => handleDelete(row._id)}><i className='fa fa-trash'></i></button>
            </>
          ),
          ignoreRowClick: true,
          allowoverflow: true,
        },
      ];
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllCategory('/category');
           setData(response);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
      fetchData();
    }, [dataRefresh]); 


    const deleteApiCall = async (data) => {
        setLoading(true);
        try {
            console.log(data);
            await deleteCategory(`/category/${data}`); 
            setToast({ message: 'Tag deleted successfully done!', type: 'success', visible: true });
            setDataRefresh(prev => !prev);
        } catch (err) {
            console.log(err.response?.data?.message || err.message); 
        } finally {
            setLoading(false);  
            setShowPopup(false);  
            setSelectedRow(null);  
        }  
    };

    //console.log(data);

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
            <Div className={'custom-container'}>
              <Div className={'custom-row'}>
                <Div className={'custom-col-12'}>
                  <Div className={'customtable-style'}>
                    <DataTable
                        title={'All Category'}
                        columns={columns}
                        data={data.slice().reverse()}
                        defaultSortFieldId={1}
                        pagination
                    />
                    {showPopup && (
                        <Div style={popupStyle}>
                        <p>Are you sure you want to delete?</p>
                        <button onClick={confirmDelete} disabled={loading}>Yes</button>
                        <button onClick={cancelDelete} disabled={loading}>No</button>
                        </Div>
                    )}
                  </Div>
                </Div>
              </Div>
            </Div>
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

export default CategoryList;
