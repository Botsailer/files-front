import React from "react";
import Styles from "./sidepanel.module.css";
import { GrUserManager, GrStorage } from "react-icons/gr";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";
import { SiFiles } from "react-icons/si";
function Sidepanel({changeTab}) {

const logout = () =>{
  localStorage.clear()
             sessionStorage.clear()
             window.location="/"
}

  return (
    <div className={Styles.sidebar}>
      <div className={Styles.logo}>
        <h2 className=" text-center font-extrabold m-auto text-2xl text-fuchsia-600 " onClick={()=>{changeTab()}} >Files-util</h2>
      </div>
        <div className={Styles.menuitems}>
          <div className={`${Styles.menuicons}`} onClick={() => changeTab("1")}>
            <GrUserManager />
            <span className=" text-center font-extrabold">USER-MANAGEMENT</span>
          </div>


          <div className={Styles.menuicons} onClick={() => changeTab("2")}>
            <SiFiles />
            <span>Files-Logs</span>
          </div>

          <div className={Styles.menuicons} onClick={() => changeTab("3")}>
            <HiOutlineBellAlert />
            <span>Alert-Users</span>
          </div>
        </div>
      <div onClick={logout} style={{ alignSelf: "flex-start", fontSize: "1.6rem", display: "flex", gap: "10px", alignItems: "center" }}>
        <div><IoLogOut /></div>
        <span>Logout</span>
      </div>
    </div>
  );
}

export default Sidepanel;
