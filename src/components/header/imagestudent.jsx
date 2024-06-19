import React from 'react';
import title from '../../images/title.jpeg'

const FullScreenImage = () => {
    return (
        <div className="relative"> {/* Change the margin-bottom here */}
            <img
                src={title}
                alt="Full Screen Image"
                className=" w-full h-[400px] object-cover max-w-3xl m-auto" // Add mb-0 here
            />
        </div>
    );
};

export default FullScreenImage;