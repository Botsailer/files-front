import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Error404 from './pages/error404/error404';
import Home from './pages/home/home';
import { ToastContainer } from 'react-toastify';
import Signupg from './pages/Signup';
import axios from 'axios';
import UsrServDashboard from './pages/userdashboard/UsrServServices';
import UploaderD from './pages/Uploader/uploader.jsx'
import Landing from './pages/landing/land';
import Uploadtodo from './pages/do/Uploadtodo.js';
import Uploader from './pages/TempUploader/uploader.jsx';
import UserDashboard from './pages/userdashboard/userDashboard';
import DownloadTempFile from './pages/tempfiledownload/DownloadTempFile.jsx';
import SenderPage from './pages/p2p/Sender.jsx';
import ReceiverPage from './pages/p2p/receiver.jsx';
import MainMenu from './components/mainmenu/MainMenu.js';
import PaymentSuccess from './pages/payment/sucess.jsx';
import PaymentFailure from './pages/payment/failure.jsx';
import { urlforback } from './url.js';

function App() {
  const url = `${urlforback}api`;
  const [isLogged, setIsLogged] = useState(!!window.localStorage.getItem("IsLogged"));
  const token = window.localStorage.getItem('token');

 useEffect(  () => {
    if(token && isLogged) {
    axios.post(`${url}/verifytoken`, { 'token': token })
        .then((d) => {
          window.sessionStorage.setItem('user', d.data.username);
          window.sessionStorage.setItem('id', d.data.id);
          window.localStorage.setItem('IsLogged', true);
          setIsLogged(true);
        })
        .catch((e) => {
          window.localStorage.removeItem('IsLogged');
          window.localStorage.removeItem('token');
          setIsLogged(false);
        console.log(e)
        });
    }
  }, []);

  return (
    <div>
   


      <ToastContainer className={'hide-scrolbar'} theme='dark' />
      <BrowserRouter>
        <Routes>
          <Route  index element={<MainMenu/>}/>
          <Route path="/login" element={!isLogged ? <Signupg /> : <Navigate to="/dashboard" />} />
          <Route path="*" element={<Error404 />} />
          <Route path='/uploader' element={<Uploader/>}/>
          <Route path='/demo' element={<UploaderD/>}/>
          <Route path='/landing' element={<Landing/>}></Route>
        <Route path='/services' element={<UsrServDashboard/>} />
        <Route path='/uploadtodo' element={<Uploadtodo/>}> </Route>
        <Route path='/dashboard' element={<UserDashboard/>}/>
      <Route path='/p2psender/?' element={<SenderPage/>}/>
      <Route path='/p2preceiver/?' element={<ReceiverPage/>}/>
      <Route path='/paysuc' element={<PaymentSuccess/>}/> 
      <Route path='/payfail' element={<PaymentFailure/>}/>  
      <Route path='/admin' element = {<Home/>}/>
        <Route path="/DownloadTempFile/:filename?" element={<DownloadTempFile/>}/>  </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;