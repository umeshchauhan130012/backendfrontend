import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import TagsAdd from './pages/tagsAdd';
import AddStory from './pages/storyAdd';
import ListStory from './pages/storyList';
import TagList from './pages/tagList';
import TagEdit from './pages/tagEdit';
import CategoryAdd from './pages/categoryAdd';
import CategoryList from './pages/categoryList';
import CategoryEdit from './pages/categoryEdit';
import StoryEdit from './pages/storyEdit';
import GalleryAdd from './pages/galleryAdd';
import GalleryEdit from './pages/galleryEdit';
import GalleryList from './pages/galleryList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard /> }/>
        <Route path="/dashboard/category-add" element={<CategoryAdd />} />
        <Route path="/dashboard/category-list" element={<CategoryList />} />
        <Route path="/dashboard/category-edit" element={<CategoryEdit />} />
        <Route path="/dashboard/tag-add" element={<TagsAdd />} />
        <Route path="/dashboard/tag-edit" element={<TagEdit />} />
        <Route path="dashboard/tag-list" element={<TagList />} />
        <Route path="/dashboard/story-add" element={<AddStory />} />
        <Route path="/dashboard/story-list" element={<ListStory />} />
        <Route path="/dashboard/story-edit" element={<StoryEdit />} />
        <Route path="/dashboard/gallery-add" element={<GalleryAdd />} />
        <Route path="/dashboard/gallery-list" element={<GalleryList />} />
        <Route path="/dashboard/gallery-edit" element={<GalleryEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
