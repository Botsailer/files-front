
import { FaCloudUploadAlt } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { BiSolidCustomize } from "react-icons/bi";

const Features = () => {
    return (
        <>
       <div className=" bg-[#020912]">
       <h1 className="text-blue-400 font-extrabold text-center text-5xl p-8 m-auto">Our feature</h1>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
       
          <div className="grid gap-5 sm:grid-cols-2 ">
            <div className="px-12 text-center sm:px-0 m-8" data-content="features">
              <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-blue-50 sm:w-12 sm:h-12 bg-editable">
                <svg className="w-8 h-8 text-blue-600 sm:w-10 sm:h-10" stroke="currentColor" viewBox="0 0 52 52">
                  <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                </svg>
              </div>
              <h6 className=" m-8 text-sm font-bold leading-5 tracking-wider text-green-100 uppercase" data-subcontent="feature-title">Enhanced Security</h6>
              <div className="m-2 text-blue-400 text-xl" data-subcontent="feature-content"> Our file manager uses advanced encryption technology to ensure the security and privacy of your files, giving you peace of mind while sharing important documents with others.</div>
            </div>
            <div className="px-12 m-8 text-center sm:px-0" data-content="features">
              <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-blue-50 sm:w-12 sm:h-12 bg-editable">
              <FaCloudUploadAlt />
              </div>
              <h6 className="m-8 text-sm font-bold leading-5 tracking-wider text-green-100 uppercase" data-subcontent="feature-title">Secure and private sharing</h6>
              <div className="mb-2 text-blue-400 text-xl" data-subcontent="feature-content"> With our file manager, you can share files with others securely and privately, ensuring that your important documents always remain confidential.</div>
            </div>
            <div className="px-12 text-center m-8 sm:px-0" data-content="features">
              <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-blue-50 sm:w-12 sm:h-12 bg-editable">
              <GrStorage />
              </div>
              <h6 className="m-8 text-sm font-bold leading-5 tracking-wider text-green-100 uppercase" data-subcontent="feature-title">Secure and private sharing</h6>
              <div className="m-2 text-blue-400 text-xl" data-subcontent="feature-content"> Our file manager not only allows users to easily upload and store files, but also offers a secure and private sharing feature. Users can securely share files with each other without worrying about their privacy being compromised. With end-to-end encryption, your files will only be accessible by the intended</div>
            </div>
            <div className="px-12 text-center m-8 sm:px-0" data-content="features">
              <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-blue-50 sm:w-12 sm:h-12 bg-editable">
              <BiSolidCustomize />
              </div>
              <h6 className="m-8 text-sm font-bold leading-5 tracking-wider text-green-100 uppercase" data-subcontent="feature-title">Customizable sharing options</h6>
              <div className="m-2 text-blue-400 text-xl" data-subcontent="feature-content"> With File manager, users have the ability to choose who they want to share their files with and set different access levels for each person. This customizable sharing feature ensures that sensitive files are kept secure while still allowing collaboration between authorized individuals.</div>
            </div>
          </div>
        </div>
    </div>
    </>);};

export default Features;