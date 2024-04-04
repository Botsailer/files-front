import React from 'react';
import './mainmenu.css';
import ResizableComponent from '../ResizableComponent/ResizableComponent';
import { Link } from 'react-router-dom';
function MainMenu() {
    return (
        <div className=' w-screen h-screen flex items-center justify-center'>
            <div className='absolute w-screen h-screen bg-no-repeat bg-center bg-cover brightness-50' style={{backgroundImage: "url('/bgfornoti.jpg')"}}></div>
            <ResizableComponent SL_Title={
                <span className=' text-7xl text-center'>Welcome to File Utils</span>
            } Pwidth='70vw' Pheight='80vh'
            title={ "WELCOME TO FILES-UTILS"}
            child={ 
                <div className='h-full'>
                <ul className=" flex flex-col overflow-hidden justify-center items-center" id='menu'>
                    <Link to="/landing"><li>Start New</li></Link>
                   <Link to="/Login"> <li>Continue</li> </Link>
                   <Link to="/services"> <li>Options</li></Link>
                   <Link to="/credits"><li>Credits</li></Link>
                </ul>
            </div>
            }/>
        </div>
    );
}
export default MainMenu;