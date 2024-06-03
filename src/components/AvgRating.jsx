import React, { useEffect, useState } from 'react';
import GetReviews from "../data/GetReviews.jsx";
import StarRatings from 'react-star-ratings';

const StarRating = ({ teacherId }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await GetReviews(teacherId);
                if (response && response) {
                    setReviews(response);
                    calculateAverageRating(response);
                } else {
                    console.error('Invalid response from server');
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [teacherId]);

    const calculateAverageRating = (comments) => {
        if (!comments || comments.length === 0) {
            setAverageRating(0);
            return;
        }

        const totalStars = comments.reduce((total, review) => total + review.stars, 0);
        const avgRating = totalStars / comments.length;
        const adjustedRating = Math.round(avgRating * 2) / 2;
        setAverageRating(adjustedRating);
    };

    return (
        <div className="flex justify-center">
            <StarRatings
                rating={averageRating}
                starRatedColor="gold"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="2px"
            />
        </div>
    );
};

export default StarRating;