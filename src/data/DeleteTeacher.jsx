import axios from 'axios';

const deleteUser = async () => {
  try {
    const response = await axios.delete('http://localhost:3003/api/teachers/deletion');

    if (response.status === 200) {
      console.log('user deleted successfully')
      localStorage.removeItem("userInfo");
    } else {
      console.error('Failed to delete user');
    }
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
  }
};

export default deleteUser;