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
                image: data.image,
                phone: data.phone,
                role: "teacher"
            },

        };


        const response = await axios.post('http://localhost:3003/api/teachers/register', payload);
        console.log(payload);

        if (response.status === 201) {
            alert('ההרשמה הצליחה');
            window.location.href = '/login';
        } else {
            console.error('נכשל בתהליך ההרשמה');
        }
    } catch (error) {
        console.log(data)
        // console.error('שגיאה במהלך ההרשמה:', error);
        alert('שגיאה במהלך ההרשמה:', error)
    }
};

export default onSubmit;