import React from 'react';
import LearnLink from '../../images/LearnLink.png';

const FullScreenImage = () => {
    return (
        <div className="relative">
            <img
                src={LearnLink}
                alt="Full Screen Image"
                className="w-full h-[500px] object-scale-down"
            />
        </div>
    );
};

export default FullScreenImage;