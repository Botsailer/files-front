import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { urlforback } from "../../url";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [Verifyed, setVerifyed] = useState(false);
  const [Error  , setError ] =  useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };


const sendmail = async ()=>{
 await axios.post(`${urlforback}api/sendmailfromadmin`,{
    des:{
        "subject" : subject,
        "mailbody":message
    },to : email
 }).then((res)=>{
    toast.success("sent mail  successfully!");
 }).catch((er) =>{(toast.error("something went wrong!"))})
}



  const verifydet = () => {
    const axiosurl = `${urlforback}api/user/`;
    if (email || name) {
      try {
        if (name) {
          axios
            .get(`${axiosurl}${name}`)
            .then((res) => {
              if (res.data) {
                setEmail(res.data.email);
                console.log(email)
                setVerifyed(true);
              }
            })
            .catch((err) => {
                setError(true)
                console.error(err)});
        } else if (email) {
          axios
            .get(`${axiosurl}${email}`)
            .then((res) => {
                console.log(res.data)
              if (res.data.username) {
                setName(res.data.username);
                console.log(name)
                setVerifyed(true);
              }
            })
            .catch((err) =>  {
                setError(true)
                console.error(err)});
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const clearfileds = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="flex mt-14 max-h-screen flex-row ">
      <div className="">
        <h2 className="text-center font-serif font-semibold text-4xl">
          Alert Or Mail existing users
        </h2>
        <div className="h-[80vh]">
          <img className="h-full" src="contax.svg" alt="" />
        </div>
      </div>
      <div className="flex flex-col h-full w-full ">
        <form className="h-full mt-[20%]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              User By Name
            </label>
            <div className="flex">
              <input
                className={`shadow ${Error? "bg-red-900":null} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name ? (
                <button
                  onClick={verifydet}
                  className="bg-green-200 inline-block"
                >
                  Verify
                </button>
              ) : null}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              User By Email
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email ? (
                <button
                  onClick={verifydet}
                  className="bg-green-200 inline-block"
                >
                  Verify
                </button>
              ) : null}
            </div>
          </div>
          {Verifyed?<>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="subject"
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="5"
              placeholder="Write your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
            onClick={sendmail}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              Send Message
            </button>
            <button
              onClick={(e) => clearfileds(e)}
              className="  bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              Clear
            </button>
          </div>
          </>:<strong> Waiting for verification</strong>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
