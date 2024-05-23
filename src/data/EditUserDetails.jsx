import axios from 'axios';

const updateUserDetails = async (userDetails) => {
    try {
        const response = await axios.put(
            'http://localhost:3003/api/students/updating-user-details',
            { userDetails },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default updateUserDetails;