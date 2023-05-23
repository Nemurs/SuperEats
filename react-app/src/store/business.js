// Actions
const LOAD_ALL_BUSINESSES = "business/LOAD_ALL_BUSINESSES";
const LOAD_ONE_BUSINESS = "business/LOAD_ONE_BUSINESS";

const loadAllBusinesses = (businesses) => ({
    type: LOAD_ALL_BUSINESSES,
    businesses,
});

const loadOneBusiness = (business) => ({
    type: LOAD_ONE_BUSINESS,
    business,
});

//Thunks
export const loadAllBusinessesThunk = () => async (dispatch) => {
    const response = await fetch("/api/business");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(loadAllBusinesses(data));
    }
};

export const loadOneBusinessThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/business/${businessId}`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(loadOneBusiness(data));
    }
};

//Reducer
const initialState = {};
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_ALL_BUSINESSES:
            newState = {...state};
            newState["allBusinesses"] = {};
            action.businesses.Businesses.forEach((business) => {
                newState["allBusinesses"] = {...newState["allBusinesses"], ...{[business.id] : business}};
            });
            return newState;
        case LOAD_ONE_BUSINESS:
            newState = {...state};
            newState["singleBusiness"] = {};
            const id = action.business.Business.id
            newState["singleBusiness"] =  {...action.business.Business}
            return newState;
        default:
            return state;
    }
}
