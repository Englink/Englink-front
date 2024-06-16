import React from 'react';
import title from '../../images/title.png'
<style>

</style>

const FullScreenImage = () => {
    return (
        <div className="relative">
            <img
                src={title}
                alt="Full Screen Image"
                className="w-3/4 h-[500px] object-cover m-auto"
                style={{ objectPosition: '0 -150px' }}

            />
        </div>
    );
};

export default FullScreenImage;