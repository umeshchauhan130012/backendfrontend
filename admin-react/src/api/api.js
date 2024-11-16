import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// check response 401 and send login page
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken'); 
      window.location.href = '/'; 
    }
    return Promise.reject(error); 
  }
);
// Login POST request
export const loginApi = async (endpoint, payload) => {
  try {
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
// add tags
export const addTags = async (endpoint, payload) => {
  try {
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
// Update tags
export const updateTags = async (endpoint, payload) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.patch(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
// Get by id Tags
export const getByIdTags = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Get All Tags
export const getAllTags = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Delete Tags
export const deleteTags = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// get social details
export const socialUpdats = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// add category
export const addCategory = async (endpoint, payload) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
// get category list
export const getAllCategory = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Update Category
export const updateCategory = async (endpoint, payload) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.patch(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
// Get by id Category
export const getByIdCategory = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Delete category
export const deleteCategory = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//story post
export const storyPost = async (endpoint, payload) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    apiClient.defaults.headers['Content-Type'] = `multipart/form-data`;
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
//story Update
export const storyUpdate = async (endpoint, payload) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    apiClient.defaults.headers['Content-Type'] = `multipart/form-data`;
    const response = await apiClient.patch(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data66666:', error);
    throw error;
  }
};
// Get by id Story
export const storyGetById = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//get All story
export const getAllStory = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Delete Tags
export const storyDelete = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;  
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//gallery post
export const galleryPost = async (endpoint, payload) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    apiClient.defaults.headers['Content-Type'] = `multipart/form-data`;
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
//gallery Update
export const galleryUpdate = async (endpoint, payload) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    apiClient.defaults.headers['Content-Type'] = `multipart/form-data`;
    const response = await apiClient.patch(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data66666:', error);
    throw error;
  }
};
// Get by id gallery
export const galleryGetById = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//get All story
export const getAllGallery = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Delete Tags
export const galleryDelete = async (endpoint) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;  
  }
  try {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Send SMS
// export const sendSMS = async (endpoint, payload) => {
//   try {
//     const response = await apiClient.post(endpoint, payload);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
// // Get SMS
// export const getMessages = async (endpoint) => {
//   try {
//     const response = await apiClient.get(endpoint);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
// // Get all SMS User
// export const getMessagesUser = async (endpoint) => {
//   try {
//     const response = await apiClient.get(endpoint);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
// // Get all SMS
// export const getMessagesAll = async (endpoint) => {
//   try {
//     const response = await apiClient.get(endpoint);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Add other methods (PUT, DELETE) as needed
