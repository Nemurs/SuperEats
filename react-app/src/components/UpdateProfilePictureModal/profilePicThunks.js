import { authenticate } from "../../store/session";

export const createProfilePicThunk = (payload) => async (dispatch) => {
    const response = await fetch(`/api/users/${payload.get("user_id")}/images`, {
        method: "POST",
        body: payload
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
