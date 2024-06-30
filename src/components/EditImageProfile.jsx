// EditImageProfile.jsx
import React from 'react';
import { FaTrashAlt, FaFileUpload } from 'react-icons/fa';
import profile from '../images/profile.png';

function EditImageProfile({ userImage, handleDeleteImage, handleFileChange }) {

  return (
    <>
      <img className="w-48 h-48 rounded-full object-cover mb-4 shadow-lg border-4 border-purple" src={userImage} alt='profile' />
      <div className='flex items-center justify-center gap-x-5'>
        {userImage !== profile && (
          <button
            onClick={handleDeleteImage}
            className="flex items-center justify-center p-3 bg-red-500 rounded-lg text-white font-semibold shadow-md hover:bg-red-700"
          >
            <FaTrashAlt className='text-lg' /> 
          </button>
        )}
        <div className="flex flex-col items-center">
          <label htmlFor="image-upload" className="cursor-pointer text-sm font-medium text-gray-700 bg-blue p-3 rounded-lg hover:bg-blue-700">
            <FaFileUpload className='text-white text-lg'/>
          </label>
          <input type="file" id="image-upload" name="image" onChange={handleFileChange} className="hidden" />
        </div>
      </div>
    </>
  );
}

export default EditImageProfile;
