import React from 'react';
import profile from "../images/profile.png";

function StudentsReviews({ reviews }) {
    console.log('e',reviews)
    if (!reviews) {
        return null;
    }

    return (
        <div className="flex justify-between items-center mt-20 rounded-lg p-4 w-full">
            <div className="flex-grow border-2 p-4 rounded-lg bg-white">
                <h1 className="text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-2 mb-4 text-center">פידבקים על מורה:</h1>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">תמונה</th>
                            <th className="px-4 py-2">תלמיד</th>
                            <th className="px-4 py-2">תאריך</th>
                            <th className="px-4 py-2">תגובה</th>
                            <th className="px-4 py-2">דירוג</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => {
                            const studentImage = review.studentId.image ? `http://localhost:3003/${review.studentId.image}` : profile;

                            return (
                                <React.Fragment key={review._id}>
                                    <tr>
                                        <td className="border-r border-gray-300 px-4 py-2">
                                            <img src={studentImage} alt={review.studentId.name} className="h-12 w-12 rounded-full object-cover" />
                                        </td>
                                        <td className="border-r border-gray-300 px-4 py-2">{review.studentId.name}</td>
                                        <td className="border-r border-gray-300 px-4 py-2">{new Date(review.commentDate).toLocaleDateString('he-IL')}</td>
                                        <td className="border-r border-gray-300 px-4 py-2">{review.comment}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center">
                                                <span className="mr-1">{review.stars}</span>
                                                <svg className="h-5 w-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                    {index !== reviews.length - 1 && (
                                        <tr>
                                            <td colSpan="5" className="border-b border-gray-300 py-2"></td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentsReviews;
