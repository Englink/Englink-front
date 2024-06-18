import React from 'react';
import title from '../../images/ראשי.png'

const FullScreenImage = () => {
    return (
        <div className="relative mb-0"> {/* Change the margin-bottom here */}
            <img
                src={title}
                alt="Full Screen Image"
                className=" w-full h-[90vh] object-cover mb-0" // Add mb-0 here
            />
        </div>
    );
};

export default FullScreenImage;