import axios from 'axios';

const deleteStudentUser = async () => {
  try {
    const response = await axios.delete('http://localhost:3003/api/students/deletion', {withCredentials: true});

    if (response.status === 200) {
      console.log('user deleted successfully')
      alert('User deleted successfully');
    } else {
      console.error('Failed to delete user');
    }
  } catch {
    console.log('Error deleting user');
  }
};

export default deleteStudentUser;