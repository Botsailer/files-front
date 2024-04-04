import React,{useState} from 'react';
import Styles from './cardView.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { urlforback } from '../url';
const UserCard = ({ user,handleDelete  }) => {
  const [isShow, setShow] = useState(false)
  const [username,setUsername] =  useState('')
  const [Gmail,setGmail]=useState('')
  const [premium,setPremium] = useState(false)


  const handleupdate = async (user) =>{
    
    const updatedFields = {};

    if (username !== null) {
      updatedFields.username = username;
    }
  
    if (Gmail !== null) {
      updatedFields.gmail = Gmail;
    }
  
    if (premium !== null) {
      updatedFields.premium = premium;
    }

    try{
      setShow(false)
    await  axios.post(`${urlforback}api/adminupdateusers`,{ userid: user, body: updatedFields,token: localStorage.getItem('token') }).then((res)=>{
        if(res.status ===201){
          toast.success(res.data);}})
          .catch((e)=> {console.log(e)})}
    catch(e){
      console.log(e)
    }
  }
  return (
    <div className={Styles['user-card']}>
      <div className={Styles['user-card__content']}>
        <h2 className={Styles['user-card__title']}>{user.username}</h2>
        <p className={Styles['user-card__description']}>
          Email: {user.email} <br />
          Premium Member?: {user.premium ? 'Yes' : 'No'} <br />
          Type: {user.type} <br />
          File Uploded: {user.fu} <br />
          Verified: {user.isVerified ? 'Yes' : 'No'}
        </p>
        <div className={Styles['user-card__links']}>
        <Button variant="outlined" color="success" className={Styles['user-card__link']} onClick={()=> setShow(true) }>
  Edit
</Button>
      
          <Button variant="outlined" color="error" className={Styles['user-card__link']} onClick={() => handleDelete(user._id)} >
  Delete
</Button>
        </div>
        {isShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => {
              setShow(false);
            }}
            className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-me_background p-6 rounded transform transition-all">
            <h2 className="text-lg font-semibold mb-4 text-common_accent">Update Profile for user <span style={{color:"greenyellow"}}>{user.username}</span></h2>
            <p className="text-white">Please enter the following details</p>
            <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Name" className="border border-gray-300 rounded-md p-2 mt-2 w-full" />
            <input type="email" onChange={(e)=>setGmail(e.target.value)} placeholder="Gmail" className="border border-gray-300 rounded-md p-2 mt-2 w-full" />
            <select  defaultValue={user.premium ? true : false} onChange={(e) => setPremium(e.target.value === 'Yes' ? true : false)} className="border border-gray-300 rounded-md p-2 mt-2 w-full">
           <option  disabled >Premium Status</option>
          <option value="No">No</option>
        <option value="Yes">Yes</option></select>
        {(Gmail||username)&&
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={(e) => { e.preventDefault(); handleupdate(user._id); }}
            >
              Update
            </button>
 } </div>
        </div>)}
      </div>
    </div>
  );
};

const UserList = ({ users,handleDelete }) => {
  return (
  
    <div className={Styles['user-list']}>
      {users.map((user) => (
        <UserCard key={user._id} user={user} handleDelete={handleDelete} />
      ))}
    </div>
   
  );
};

export default UserList;