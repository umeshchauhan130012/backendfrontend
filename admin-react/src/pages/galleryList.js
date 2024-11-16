import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import ProtectedRoute from '../components/protectedRouts';
import Toast from '../components/toast';
import { useNavigate } from 'react-router-dom';
import { getAllGallery, storyDelete } from '../api/api';
import Div from '../components/div';


const GalleryList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false); 
    const [selectedRow, setSelectedRow] = useState(null);  
    const [loading, setLoading] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(false); 
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
            navigate(`/dashboard/gallery-edit?id=${row}`);
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
          selector: (row) => row.title,
          sortable: true,
          reorder: true,
        },
        {
          id: 2,
          name: "Image",
          selector: (row) => (
            <img 
              src={row.filefirst && row.filefirst.path ? `http://localhost:8080/${row.filefirst.path}` : '/user.png'}
              alt={row.alt} 
              style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} 
            />
          ),
          reorder: true,
        },
        {
          id: 3,
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
          const response = await getAllGallery('/gallery');
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
          await storyDelete(`/gallery/${data}`); 
          setToast({ message: 'Story deleted successfully done!', type: 'success', visible: true });
          setDataRefresh(prev => !prev);
      } catch (err) { 
          console.log(err.response?.data?.message || err.message); 
      } finally {
          setLoading(false);  
          setShowPopup(false);  
          setSelectedRow(null);  
      }  
  };


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
                    title={'All Stories'}
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
export default GalleryList;
