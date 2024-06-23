import axios from 'axios';

const UpdateImage = async (selectedFile) => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`http://localhost:3003/api/students/update-image`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('user image deleted successfully')
        return response
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
  };

export default UpdateImage;