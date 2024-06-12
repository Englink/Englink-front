import axios from "axios";
import profile from '../images/profile.png'

const onSubmit = async (data) => {
    try {
        const payload = {
            userDetails: {
                name: data.name,
                email: data.email,
                password: data.password,
                age: data.age,
                gender: data.gender,
                image: '',
                role: "student"
            }
        };

        const response = await axios.post('http://localhost:3003/api/students/register', payload);

        if (response.status === 201) {
            console.log(payload)
            window.location.href = '/main';
            alert('ההרשמה הצליחה');

        } else {
            console.error('נכשל בתהליך ההרשמה');
        }
    } catch (error) {
        console.error('שגיאה במהלך ההרשמה:', error);
        alert('שגיאה במהלך ההרשמה')
    }
};

export default onSubmit;