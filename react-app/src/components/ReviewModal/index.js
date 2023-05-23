import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal.js";
import { useHistory } from "react-router-dom";
// import { createNewReviewThunk, loadAllReviewsThunk } from "../../store/singleSpotReviews.js";
// import { loadOneThunk } from "../../store/singleSpot.js";
import { authenticate } from "../../store/session";
import StarRatingInput from "../StarRatingInput";
import CloseModalButton from "../CloseModalButton";
import "./ReviewModal.css";

const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/review/${reviewId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        await dispatch(authenticate());
        return true;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            console.log(data.errors)
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

const ReviewModal = ({ order, business, cartId, isEdit, review }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [reviewText, setReviewText] = useState(isEdit ? review.reviewText : "");
    const [rating, setRating] = useState(isEdit ? review.rating : 0);
    const [error, setError] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [touched, setTouched] = useState({});
    const [submitState, setSubmitState] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitState(true);

        if (isEdit) {

        } else {
            // let res = await dispatch(createNewReviewThunk());

            // if (!res.ok) {
            //     console.log(await res.json());
            // } else {
            //     await dispatch(authenticate());
            //     closeModal();
            // }
        }

    };

    const onChange = (number) => {
        setRating(number);
    };

    useEffect(() => {
        let newErrors = {};

        if (reviewText.length < 10 || reviewText.length > 255) {
            newErrors.review = "Review must be between 10 and 255 characters";
            setDisabled(true);
        }
        else delete newErrors.review;

        if (rating < 1 || rating > 5) {
            newErrors.rating = "Rating must be between 1 and 5 stars";
            setDisabled(true);
        }
        else delete newErrors.rating;

        setError(newErrors)

        return () => setError({});
    }, [reviewText, rating])

    useEffect(() => {
        if (reviewText.length > 10 && rating > 0 && !error.rating && !error.review) setDisabled(false);
    }, [error])



    const deleteReviewClick = async (e) => {
        e.preventDefault();
        if (await dispatch(deleteReviewThunk(review.id))){
            closeModal();
        }

        // history.push(`/orders`);

        return;
    }

    return (
        <>
            <CloseModalButton />
            <div className="review-modal">
                <h1>How did you like <span>{order.businessName}</span>?</h1>
                <form onSubmit={handleSubmit}>
                    <div className="star-rating">
                        <div className="star-rating-input"
                            onBlur={() => setTouched({ ...touched, 'rating': true })}
                        >
                            <StarRatingInput
                                disabled={false}
                                onChange={onChange}
                                rating={rating}
                                iconSize={"large"}
                            />
                        </div>
                        {((touched.rating || submitState) && error.rating) && <p className="form-error">{error.rating}</p>}
                    </div>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        name='reviewText'
                        placeholder='Leave your review here...'
                        rows='10'
                        onBlur={() => setTouched({ ...touched, 'review': true })}
                    ></textarea>
                    {((touched.review || submitState) && error.review) && <p className="form-error">{error.review}</p>}

                    <div className="review-modal-buttons">
                        <button disabled={disabled} type="submit" className={"black-button-square background-green"}>Submit</button>
                        {isEdit ? <button className={"black-button-square background-red"} onClick={deleteReviewClick}>Delete Review</button> : <></>}
                    </div>
                </form>
            </div>
        </>
    );
}

export default ReviewModal;
