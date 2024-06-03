import axios from 'axios';

const updateUserDetails = async (userDetails) => {
    const formData = new FormData();
    Object.keys(userDetails).forEach((key) => {
        formData.append(key, userDetails[key]);
    });

    try {
        const response = await axios.put(
            'http://localhost:3003/api/students/updating-user-details',
            formData,
            { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default updateUserDetails;