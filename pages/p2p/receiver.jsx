import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import ResizableComponent from "../../components/ResizableComponent/ResizableComponent";
import NotFoundPage from "../tempfiledownload/Filemissing";

const ReceiverPage = () => {
  const [peerId, setPeerId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const peerRef = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      setPeerId(id);
      console.log("My peer ID:", id);

      const urlParams = new URLSearchParams(window.location.search);
      const senderPeerId = urlParams.get('peerId');
      if (senderPeerId) {
        const conn = peer.connect(senderPeerId);
        conn.on("open", () => {
          console.log("Connection established with sender.");
          setConnected(true);
        });

        conn.on("data", (data) => {
          console.log("Received data:", data);

          const blob = new Blob([data.file], { type: data.type });
          blob.name = data.name;
          setReceivedFiles((prevFiles) => [...prevFiles, blob]);
          console.log(`Received file: ${data.name}`);
        });
      }
     
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <ResizableComponent
        title="Received Files"
        child={
          <ReceivedFilesList
            receivedFiles={receivedFiles}
            handleDownload={handleDownload}
          />
        }
      />
    </div>
  );
};

const ReceivedFilesList = ({ receivedFiles, handleDownload }) => {
  return (
    <div>
      {receivedFiles.map((file, index) => (
        <div key={index} className="flex items-center justify-between h-full pb-150px border-b-teal-950">
          <p>{file.name} ({(file.size / 1024).toFixed(2)} KB)</p>
          <button
            onClick={() => handleDownload(file)}
            className=" m-4 text-red-500 "
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReceiverPage;
