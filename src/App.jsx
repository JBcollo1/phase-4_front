import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './Navbar';
import List from './pages/novels/novellist';
import Noveldetail from './pages/novels/noveldetail';
import AddNovel from './pages/novels/addnovels';
import Appc from './pages/user/novelcollection';

function App() {
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/novels/list')
      .then(res => res.json())
      .then(data => setNovels(data.novels)) 
      .catch(error => console.error('Error fetching novels', error));
  }, []); 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/novellist' element={<List novels={novels} />} />
        <Route path='/login' element={<Login />} />

        <Route path='/signup' element={<SignUp />} />

        
        <Route path='/novellist/:title' element={<Noveldetail novels = {novels}/>} />
        <Route path='/addnovel' element={<AddNovel />} />
        <Route path='/appc' element={<Appc />} />




      </Routes>
    </>
  );
}

export default App;

