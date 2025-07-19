import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
      <>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard" element={<Dashboard /> }/> */}
          </Routes>
        <Footer />
      </>
  );
}

export default App;
