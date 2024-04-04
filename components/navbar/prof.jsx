import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SvgIcon from '@mui/material/SvgIcon';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { urlforback } from '../../url';


export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isActive, setIsActive] = useState(false);
  const [isShow,setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [Gmail, setGmail] = useState("");
  const toggleMenu = ()=>{
      setIsActive(!isActive)
  }
  const handleupdate = async () =>{
   const requestBody = {};
    if(username){
      requestBody.username = username;
    }
    
    if(Gmail) {
      requestBody.gmail = Gmail;
    }
     await axios.put(`${urlforback}api/updateuser`,
        requestBody
  ,
    {
      headers: {'Authorization': localStorage.getItem('token')}})
      .then((res)=>{
        console.log(res)
        if(res.status === 201){
          console.log(res.data);
          toast.success(res.data);
      }})
      
      .catch((e)=>{
       console.log(e);
         if(e.response.status === 500){
           toast.error("cant upodate user")
         }
        
      })
      setShow(false)
    }







  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <SvgIcon>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.4}
    stroke="white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
    />
  </svg>
</SvgIcon>
      
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={ () => {
                 if (!isShow){
                     setShow(true);handleClose()};
                 }}>Profile</MenuItem>
        <MenuItem onClick={()=>{
             localStorage.clear()
             sessionStorage.clear()
             window.location="/"
        }}>Logout</MenuItem>
    </Menu>
    {isShow && (
        <div className="fixed inset-0  z-50 flex items-center justify-center">
          <div
            onClick={() => {
              setShow(false);
            }}
            className="fixed inset-0 bg-black  opacity-80"></div>
            <div className="bg-wh_background p-6 rounded transform transition-all">
            <h2 className="text-lg font-semibold mb-4 text-aqua">Update Profile</h2>
            <p className="text-white">Please enter the following details</p>
            <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Name" className="border border-gray-300 rounded-md p-2 mt-2 w-full text-black font-bold" />
            <input type="email" placeholder="Gmail" className="border border-gray-300 rounded-md p-2 mt-2 w-full" />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleupdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    
    </div>
  );
}