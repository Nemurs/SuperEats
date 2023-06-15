import { authenticate } from "../../store/session";

export const createProfilePicThunk = (userId, url) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/images`, {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            url,
            "preview": true,
            "user_id":userId
        }),
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

export const deleteProfilePicThunk = (userId, picId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/images/${picId}`, {
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
