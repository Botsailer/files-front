import React, { useState, useEffect } from 'react';
const T403 = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const username = sessionStorage.getItem('user')
  useEffect(() => {
    const errorText = `
      <p><span>ERROR CODE</span>: "<i>HTTP 403 Forbidden</i>"</p>
      <p><span>ERROR DESCRIPTION</span>: "<i>Access Denied. You Do Not Have The Permission To Access This Page On This Server</i>"</p>
      <p><span>ERROR POSSIBLY CAUSED BY</span>: [<b>... (list of causes) ...</b>]</p>
    `;

    const typeEffect = () => {
      let i = 0;
      const intervalId = setInterval(() => {
        i++;
        setErrorMessage(errorText.slice(0, i) + '|');
        if (i === errorText.length) {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, 10);
    };

    setIsTyping(true);
    typeEffect();

    return () => clearInterval(typeEffect);
  }, []);

  return (
    <div className=" flex p-0 m-0 h-screen  w-screen  items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="text-center  w-3/4 bg-gray-900 text-white rounded-lg shadow-lg px-8 py-12">
        <h1 className="text-5xl font-bold mb-4">403</h1>
        {isTyping ? (
          <p className="text-lg animate-pulse">{errorMessage}</p>
        ) : (
          <>
            <p className="text-lg mb-4">
              Access Denied. You Do Not Have The Permission To Access This Page
              On This Server.
            </p>
            <p className="text-gray-400">
            execute access forbidden, read access forbidden, write access forbidden, ssl required, ssl 128 required, ip address rejected, client certificate required, site access denied, too many users, invalid configuration, password change, mapper denied access, client certificate revoked, directory listing denied, client access licenses exceeded, client certificate is untrusted or invalid, client certificate has expired or is not yet valid, passport logon failed, source access denied, infinite depth is denied, too many requests from the same client ip
            </p>
          </>
        )}
        <p className="text-gray-400 mt-6">Have a nice day sir {username}.</p>
      </div>
    </div>
  );
};

export default T403;