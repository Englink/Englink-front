import React from 'react';
import classMeatImage from './ClassMeat.png';

const FullScreenImage = () => {
    return (
        <div className="relative  w-164 h-98">
            <img
                src={classMeatImage}
                alt="Full Screen Image"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default FullScreenImage;