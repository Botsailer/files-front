import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Sidepanel from "./parts/sidepanel";
import SalesChart from "../../components/charts/customerschart";
import UserManagement from "../usermanagement/usermanagemet";
import { RiUserAddLine, RiStarLine, RiUploadLine } from "react-icons/ri";
import { MdReport } from "react-icons/md";
import { toast } from "react-toastify";
import T403 from "../error403/T403";
import axios from "axios";
import AdminListFiles from "../admin/ListAllFiles";
import ContactForm from "../admin/Alert";
import DOPieChart from "../../components/charts/storagedo";
import { urlforback } from "../../url";
const Home = () => {
  const user = window.sessionStorage.getItem("user");
  const id = window.sessionStorage.getItem("id");
  const [usedSpace,setusedSpace] = useState();
  const [tab, settab] = useState("0");
  const [wtr, setwtr] = useState();

  useEffect(() => {
    const url =   `${urlforback}api`;
    const token = localStorage.getItem("token");

      
    if (!token) {
      setInterval(() => {
        window.location.href = "/";
      }, 2000);
      toast.error("Token is missing, try logging in");
      return;
    }

    const fetchData = async () => {
      try {
await 
axios.get(`${url}/checksizedo`).then((res) => {
console.log(res.data);
 setusedSpace(res.data.usedSpace)
}).catch(err=>{console.log(err)})







        await axios
          .post(`${url}/fetchallusers`, { token: token })
          .catch((error) => {
            toast.error(error.response.data.error);
            if (error.response.data.error === "User Not Found!") {
              alert("intruder maybe");
            }
            if (error.response.status === 403) {
              setwtr("hello");
            }
            toast.error(error.response.data);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const changeTab = (newTab) => {
    settab(newTab);
  };

  const alerts = [
    {
      id: 1,
      message: "Captain JackSparrow just joined",
      icon: <RiUserAddLine />,
    },
    {
      id: 2,
      message: "RObin subscribed to premium Status",
      icon: <RiStarLine />,
    },
    {
      id: 3,
      message: "Mr. jinwoo user uploaded a file",
      icon: <RiUploadLine />,
    },
    {
      id: 4,
      message: "Captain JackSparrow just joined",
      icon: <RiUserAddLine />,
    },
    {
      id: 5,
      message: "Shivani Reported File Id 5847512584125 as Virus",
      icon: <MdReport />,
    },
    {
      id: 6,
      message: "Mr. jinwoo user uploaded a file",
      icon: <RiUploadLine />,
    },
  ];

  if (!user) {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    console.log("user not found");
    window.localStorage.removeItem("IsLogged");
  }
  return (
    <>
      {wtr ? (
        <T403 />
      ) : (
        <div className={styles.body}>
          <div className={styles.over}>
            <Sidepanel changeTab={changeTab} />
            <div className="overflow-y-scroll no-scrollbar  max-h-100vh p-4 border-l-2 overflow-x-hidden">
              {tab === "1" ? (
                <div className="h-full">
                  <UserManagement />
                </div>
              ) : tab === "2" ? (
                <div>
                  <AdminListFiles />
                </div>
              ) : tab === "3" ? (
                <>
                  <ContactForm/>
                </>
              ) : (
                <>
                  <div className=" pt-9">
                    <SalesChart changeTab={changeTab} />
                    <div className=" flex justify-center h-96 mt-7 ">
                    <div>
                    <DOPieChart totalStorage={250}  usedStorage={ parseFloat(usedSpace) } />
                    </div>
                    <div className="place-items-center justify-center align-middle h-[100%] w-1/2" >
                    <p className=" text-6xl  text-center mt-auto font-bold py-8">{usedSpace}/250 GB</p>
                    </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="pt-9 mt-5 mr-72 w-[98%] h-[95%] max-h-screen ">
              {" "}
              <h2 className="text-center text-slate-900 font-extrabold text-2xl mb-4">
                Alerts!
              </h2>{" "}
              <div className=" bg-slate-50 p-4 rounded-2xl">
              <ul className="space-y-5">
                {" "}
                <div className=" bg-slate-100 space-x-1 space-y-4 ">
                {alerts.map((alert) => (
                  <li
                    key={alert.id}
                    className="flex items-center px-4 py-2  rounded-md  hover:bg-purple-300 transition-colors duration-300"
                  >
                    {" "}
                    <span className="mr-2">{alert.icon}</span>{" "}
                    <span>{alert.message}</span>{" "}
                  </li>
                ))}{" "}
                </div>
              </ul>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
