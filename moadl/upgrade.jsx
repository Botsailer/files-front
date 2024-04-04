import React, { useState } from 'react';

import upgradetopriz from '../logic/upgrader.js';


const upgradetopri  = ()=>{
  if(!localStorage.getItem('token')&& !localStorage.getItem('IsLogged')){
    window.location='/'

  }
  upgradetopriz()
}
const UpgradeModel = ({ isOpen, setIsOpen }) => {
  console.log(isOpen)
  return isOpen?(<>
    <div className="fixed   top-0 left-0 h-screen w-screen flex z-20 justify-center items-center bg-black bg-opacity-80" onClick={()=>setIsOpen(false)}>
      <div className="bg-white p-5 rounded-lg shadow-lg shadow-emerald-300/30 max-w-max w-full">
        <h2 className="text-2xl text-center font-bold mb-4">Upgrade to Premium</h2>
        <div className="flex justify-around gap-4 mb-5">
          <div className="text-center p-3 rounded-lg shadow-md shadow-gray-300 bg-gray-200">
            <h3 className="text-lg font-bold mb-2">Free</h3>
            <ul className="list-disc  list-inside">
              <li >Basic Features</li>
              <li >Limited Access</li>
            <li>Temp Upload Limit 100mb and 60min time limit</li>  
            <li >1 Gb Cloud Storage</li>
            </ul>
          </div>
          <div className="text-center p-3 rounded-lg shadow-md shadow-gray-300 bg-green-100">
            <h3 className="text-lg font-bold mb-2">Premium</h3>
           
            <ul className="list-disc list-inside">
              <li className='m-auto'>All Features</li>
              <li className='m-auto'>Scaleable Access</li>
              <li>Priority Support</li>
              <li>Temp Upload Limit 500mb and 1DAY time limit</li>
              <li>10 Gb Cloud Storage</li>
              <li>Peer 2 Peer file share usage</li>
              <li>Can upload File Privately upto 5GB</li>
            <li>And  many more... Join Now</li>
            </ul>
            
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" onClick={upgradetopri} >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
    </> ):null
};

export default UpgradeModel;