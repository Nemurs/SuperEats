// Actions
// const INSERT_ALL_BUSINESSES = "cart/INSERT_ALL_BUSINESSES";
const INSERT_ONE_ITEM = "cart/INSERT_ONE_ITEM";
const CLEAR_ITEMS = "cart/CLEAR_ITEMS";

// const loadAllBusinesses = (businesses) => ({
//     type: INSERT_ALL_BUSINESSES,
//     businesses,
// });

export const insertOneItem = (item) => ({
    type: INSERT_ONE_ITEM,
    item,
});

export const clearItems = () => ({
    type: CLEAR_ITEMS
});

// //Thunks
// export const loadAllBusinessesThunk = () => async (dispatch) => {
//     const response = await fetch("/api/item");
//     if (response.ok) {
//         const data = await response.json();
//         if (data.errors) {
//             return;
//         }

//         dispatch(loadAllBusinesses(data));
//     }
// };

//Reducer
const initialState = {};
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case INSERT_ONE_ITEM:
            console.log(state)
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
        case CLEAR_ITEMS:
            newState = {};
            return newState;
        default:
            return state;
    }
}
