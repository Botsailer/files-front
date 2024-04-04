import React, { useState, useEffect } from 'react';
import Styles from './admin.module.css';
import axios from "axios";
import { toast } from 'react-toastify';
import T403 from '../error403/T403'
import UserList  from '../../components/cardview';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { urlforback } from '../../url';


const Admins = () => {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  const [users, setUsers] = useState([]);
  const url = `${urlforback}api`;
  const token = window.localStorage.getItem('token');
  const [wtr,setwtr]  = useState();
  useEffect(() => {
    if (!token) {
      setInterval(() => { window.location.href = "/" }, 2000);
      toast.error("Token is missing, try logging in");
      return;
    }

    const fetchData = async () => {
      handleOpen()
      try {
        const response = await axios.post(`${url}/fetchallusers`, { "token": token })
        .catch((error)=>{
          toast.error(error.response.data.error);
          if(error.response.data.error==="User Not Found!"){localStorage.clear()}
          if (error.response.status === 403) {
            setwtr("hello")
          }
          toast.error(error.response.data);
          handleClose();
        });
        setUsers(response.data.data);
        handleClose();}
      catch(e)
      {console.log(e)}
     }
    fetchData();
}, []);

  const handleDelete = async (id) => {
    await axios.post(`${url}/removeuser`, { "id": id, "token": token }).then((res)=>{
      console.log(res);

    }).catch((e)=>{
      console.log(e)
    });
    setUsers(users.filter(user => user._id !== id));
    toast.info("user has been removed");
  };

  return (
    <>
    <div id={Styles.body}>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={null}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {wtr ? <T403/> : (
     <UserList users={users} handleDelete={handleDelete}/>
      )}
    </div>
    </>
  );
}

export default Admins;
