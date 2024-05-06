
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

 const onSubmit = async (data) => {
    try {
        const payload = {
            userDetails: {
                email: data.email,
                password: data.password,
                desc: data.description
            },
            isStudent: true
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    דואל
                </label>
                <input {...register("email", { required: true })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`} id="email" type="email" placeholder="דואר אלקטרוני" />
                {errors.email && <p className="text-red-500 text-xs italic">שדה זה הינו חובה</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    סיסמה
                </label>
                <input {...register("password", { required: true })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`} id="password" type="password" placeholder="*************" />
                {errors.password && <p className="text-red-500 text-xs italic">שדה זה הינו חובה</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    כתובת URL לתמונה
                </label>
                <input {...register("image", { required: false })} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`} id="text" type="text" placeholder="כתובת URL לתמונה" />
                {errors.image && <p className="text-red-500 text-xs italic">שדה זה הינו חובה</p>}
            </div>

            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    הרשמה
                </button>
            </div>
        </form>
    );
};

export default SignUpPage;
