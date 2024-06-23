import axios from 'axios';

const DeleteUserImage = async () => {
  try {
    const response = await axios.delete('http://localhost:3003/api/students/delete-image',{
        withCredentials: true
      });

    if (response.status === 200) {
      console.log('user image deleted successfully')
      return true
    } 
  } catch (error) {
    console.error(`Error deleting user image: ${error}`);
    return false
  }
};

export default DeleteUserImage;