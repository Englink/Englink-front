import React from 'react';
import title from '../../images/title.png'

const FullScreenImage = () => {
    return (
        <div className="relative">
            <img
                src={title}
                alt="Full Screen Image"
                className="w-full h-[500px] object-scale-down"
            />
        </div>
    );
};

export default FullScreenImage;