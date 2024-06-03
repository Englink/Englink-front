import React from 'react';
import { BeatLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
    return (
        <>
            {loading && (
                <div className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                    <BeatLoader color="#36d7b7" />
                </div>
            )}
        </>
    );
};

export default Spinner;
