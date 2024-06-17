import React from 'react';
import title from '../../images/title.png'
<style>

</style>

const FullScreenImage = () => {
    return (
        <div className="m-auto max-w-7xl ">
            <img
                src={title}
                alt="Full Screen Image"
                className="w-[75vw] h-[500px] object-cover m-auto"
                style={{ objectPosition: '0 -150px' }}

            />
        </div>
    );
};

export default FullScreenImage;