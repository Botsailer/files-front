import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import { toast } from "react-toastify";

const SenderPage = () => {
  const [peerId, setPeerId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [files, setFiles] = useState([]);
  const [transferring, setTransferring] = useState(false);
  const [receiverConnections, setReceiverConnections] = useState([]);

  const [uploadProgress, setUploadProgress] = useState({});
  const peerRef = useRef(null);

  useEffect(() => {
    setConnected(false);
    const peer = new Peer();
    
    peerRef.current = peer;

    peer.on("open", (id) => {
      setPeerId(id);
      console.log("My peer ID:", id);
    });

    peer.on("connection", (conn) => {
      setReceiverConnections((prevConnections) => [...prevConnections, conn]);
      setConnected(true);
      alert("Connected to receiver!");
      conn.on("data", (data) => {
        console.log("Received data:", data);
      });
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const initiateFileTransfer = () => {
    if (!files.length) {
      console.error("Please select at least one file.");
      return;
    }

    if (receiverConnections.length === 0) {
      console.error("No receiver connections established.");
      return;
    }

    setTransferring(true);

    files.forEach((file) => {
      console.log(`Sending file: ${file.name}`);

      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileData = {
          name: file.name,
          type: file.type,
          file: fileReader.result,
        };

        receiverConnections.forEach((conn) => {
          conn.send(fileData);
        });
        console.log(`File ${file.name} sent successfully.`);
      };

      fileReader.onprogress = (event) => {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: progress,
        }));
      };

      fileReader.readAsArrayBuffer(file);
    });

    setTransferring(false);
  };

  const renderConnectionStatus = () => {
    if (!connected) {
      return <p>Waiting for receiver to connect...</p>;
    }
    return <p className="text-green-500">Connected to receiver.</p>;
  };

  const FileItem = ({ file, progress }) => {
    return (
      <div className="border text-center font-serif font-extrabold p-2 rounded">
        <p>{file.name}</p>
        <div className="h-2 bg-gray-300 rounded">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="max-w-full h-full p-8 bg-stone-700 backdrop:blur-xl rounded-lg shadow-md ">
        <h1
          className={`text-4xl font-bold mb-4  text-center ${
            connected ? "text-green-600 " : "text-red-500"
          } `}
        >
          Sender
        </h1>
        {peerId && (
          <>
            <p className="m-8 text-center text-slate-300">
              Your peer ID: {peerId}
            </p>
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/p2preceiver?peerId=${peerId}&host=peerjs-server.hellowebbooks.com&port=443`
                );
                toast.success("copied");
              }}
              className="bg-black h-16 align-middle p-8 items-center justify-center text-teal-300 text-center"
            >
              <div>
                {" "}
                {`${window.location.origin}/p2preceiver?peerId=${peerId}&host=peerjs-server.hellowebbooks.com&port=443`}
              </div>
            </div>
            {files && (
              <div className="overflow-y-scroll no-scrollbar">
                <div className="m-4 text-green-400 grid max-h-96 h-auto  grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <FileItem
                      key={index}
                      file={file}
                      progress={uploadProgress[file.name] || 0}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {(connected && (
          <>
            <div className="m-4 text-fuchsia-200">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <button
                onClick={initiateFileTransfer}
                className="m-auto align-middle bg-blue-500 text-center text-white font-bold py-2 px-4 rounded"
              >
                Send Files
              </button>
            </div>

            {renderConnectionStatus()}
          </>
        )) || <>Waiting for receiver</>}
      </div>
    </div>
  );
};

export default SenderPage;
