import axios from "axios";

const onSubmit = async (data) => {
    try {
        const payload = {
            userDetails: {
                name: data.name,
                email: data.email,
                password: data.password,
                age: data.age,
                gender: data.gender,
                role: "student"
            }
        };

        const response = await axios.post('http://localhost:3003/api/students/register', payload);

        if (response.status === 201) {
            console.log(payload)
            alert('ההרשמה הצליחה');
        } else {
            console.error('נכשל בתהליך ההרשמה');
        }
    } catch (error) {
        console.error('שגיאה במהלך ההרשמה:', error);
    }
};

export default onSubmit;