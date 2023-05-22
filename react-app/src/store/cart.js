// Actions
// const INSERT_ALL_BUSINESSES = "cart/INSERT_ALL_BUSINESSES";
const INSERT_ONE_ITEM = "cart/INSERT_ONE_ITEM";
const CLEAR_ALL_ITEMS = "cart/CLEAR_ALL_ITEMS";
const CLEAR_ONE_CART = "cart/CLEAR_ONE_CART";

// const loadAllBusinesses = (businesses) => ({
//     type: INSERT_ALL_BUSINESSES,
//     businesses,
// });

export const insertOneItem = (item) => ({
    type: INSERT_ONE_ITEM,
    item,
});

export const clearItems = () => ({
    type: CLEAR_ALL_ITEMS
});

export const clearCart = (businessId) => ({
    type: CLEAR_ONE_CART,
    businessId
});

// //Thunks
export const orderItems = (userId, businessId, itemIds) => async (dispatch) => {
	const response = await fetch("/api/order", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            "user_id": userId,
            "business_id": businessId,
            "item_ids": itemIds
        }),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(clearCart(businessId));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const deleteOrder = (cartId) => async (dispatch) => {
	const response = await fetch(`/api/order/cart/${cartId}`, {
		method: "DELETE",
	});

	if (response.ok) {
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

export const deleteItem = (orderId) => async (dispatch) => {
	const response = await fetch(`/api/order/${orderId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		return true;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

//Reducer
const initialState = {};
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case INSERT_ONE_ITEM:
            // console.log(state)
            newState = {...state};
            const business_id = action.item.business_id;
            const item_id = action.item.id;
            if (newState[business_id]){
                newState[business_id][item_id] = {...action.item};
            }  else {
                let normalized_item = {};
                normalized_item[item_id] = {...action.item};
                newState[business_id] = normalized_item;
            }
            console.log(newState);
            return newState;
        case CLEAR_ONE_CART:
            newState = {...state};
            delete newState[action.businessId];
            return newState;
        case CLEAR_ALL_ITEMS:
            newState = {};
            return newState;
        default:
            return state;
    }
}
