import axios from 'axios';

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3003/api/students/${id}`);

    if (response.status === 200) {
      console.log(`User with id ${id} was successfully deleted.`);
      alert(`User with id ${id} was successfully deleted.`);
    } else {
      console.error(`Failed to delete user with id ${id}.`);
    }
  } catch (error) {
    console.error(`Error occurred while deleting user with id ${id}:`, error);
  }
};

export default deleteUser;