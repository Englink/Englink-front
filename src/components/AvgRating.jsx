// StarRating.jsx
import React, { useEffect, useState } from 'react';
import GetReviews from "../data/GetReviews.jsx";
import StarRatings from 'react-star-ratings';

const StarRating = ({ teacherId, onAverageCalculated }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log(teacherId)
                const response = await GetReviews(teacherId);
                if (response) {
                    setReviews(response);
                    calculateAverageRating(response);
                } else {
                    console.error('Invalid response from server');
                }
            } catch (error) {
                console.log("error from get reviews", error);
            }
        };

        fetchReviews();
    }, [teacherId]);

    const calculateAverageRating = (comments) => {
        if (!comments || comments.length === 0) {
            setAverageRating(0);
            // onAverageCalculated(0); // Notify parent about the rating
            return;
        }

        const totalStars = comments.reduce((total, review) => total + review.stars, 0);
        const avgRating = totalStars / comments.length;
        const adjustedRating = Math.round(avgRating * 2) / 2;
        setAverageRating(adjustedRating);
        onAverageCalculated(adjustedRating); // Notify parent about the rating
    };

    return (
        <div className="flex justify-center mb-5">
            <div className="stars-container"> {/* כיתת CSS מיוחדת לכוכבים */}
                <StarRatings
                    rating={averageRating}
                    starRatedColor="gold"
                    numberOfStars={5}
                    name='rating'
                    starDimension="20px"
                    starSpacing="2px"
                />
            </div>
        </div>
    );
};

export default StarRating;
