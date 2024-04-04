import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTriangleExclamation } from "react-icons/fa6";
import './uploadtodo.css';
import { toast } from 'react-toastify';
import { urlforback } from '../../url';

function Uploadtodo() {

const [Cantupload,setCantupload] = useState(false)
useEffect(() => {
  const fetchData = async () => {
    document.title = "Upload To Digital OCEN";
    const  id = sessionStorage.getItem('id');
    if (!id) {
      window.location.href = '/';
      return;
    }
    try {
     await axios.get(`${urlforback}api/myups/`+id).then((res)=>{
     if(res.data >= 10) {
      setCantupload(true)
     return  console.log(res.data);
     }})
   .catch((err)=>console.log(err));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, [])

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

 
  const handleFileChange = (event) => {
    setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
  };

  const handleUpload = async () => {
  
    if (selectedFiles.length === 0) {
      console.error('Please select a file to upload.');
      return;
    }
  
    try {
      setIsUploading(true);
      await Promise.all(selectedFiles.map(async (uploadFile) => {
        if(uploadFile.size  >  524288000){
          return toast.error("Cant upload more than 500mb")
        }

        const formData = new FormData();
        formData.append('files', uploadFile);
        formData.append('filename', uploadFile.name);
        formData.append('userid', sessionStorage.getItem('id'));
        formData.append ( 'size' , uploadFile.size );
  
        const response = await axios.post(
          `${urlforback}api/uploadtodo`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressevent) => {
              const progressCom = Math.round((progressevent.loaded / progressevent.total) * 100);
              setProgress(progressCom);
            },
          }
        );
        console.log(response.data);
      }));
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    if (selectedFiles.length > 0 || selectedFiles) {
      setIsUploading(true);
      handleUpload();
    }
    else{
      alert("file selection fail")
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };


  const handleDrop = (e) => {
    e.preventDefault();
    setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(e.dataTransfer.files)]);
  };

if(Cantupload){
  return <>
    <div className="flex flex-col bg-gray-700 h-screen w-screen align-middle justify-center items-center">
    <div><FaTriangleExclamation className=' size-24 text-red-500 ' /></div>
      <h3 className=' font-extrabold text-3xl text-blue-500' >You don't have exceeded upload files Limit consider deleting some files.</h3>
    </div>
  </>
}


  return (
    <>
    <div className=' h-screen w-screen brightness-50 bg-gradient-to-r from-amber-500/80 to-pink-500/80'></div>
    <div id="uploadertodo">
        <div className=' absolute top-0 left-0 -z-10 h-full w-full bg-black/15'></div>
      <div className="title w-full items-center justify-center">
        <h2 className='text-center'>UPLOAD To External DB</h2>
        <span className="close">&#9737;</span>
      </div>
      <div className="dropzone" id='dropzone' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
         <input
          id="fileInput"
          type="file"
          multiple          
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <p style={{fontSize:"1.4rem",color:"#ffff00",fontFamily:"fantasy",userSelect:"none"}}>
          Drag and drop files here or{' '}
          <label htmlFor="fileInput"  className="text-green-200 cursor-pointer">click to select files</label></p></div>
      <div className="list ">
        <ul className='overflow-y-auto h-60'>


        {selectedFiles.map((file, index) => (
              <li key={index}>
                {file.name}
                <button className='cancel' onClick={() => handleRemoveFile(index)}>  &#10005;</button>
              </li>
            ))}
        </ul>
      </div>
      {isUploading && (
      <div className="progress">
        <div className="bar" style={{width: `${progress}%`}}></div>
        <div className="tip">{progress}%</div>
      </div>
      )}
      {selectedFiles.length > 0 && (<>
      <div className="actions">
        <button className=' brightness-75 hover:brightness-100' onClick={handleUploadClick}>Upload</button>
        </div>
       <div>
        <button onClick={()=>{
          setSelectedFiles([])
        }} >clear list</button>
       </div>
        </>
      )}
    </div>
    </>
  );
}


export default Uploadtodo;