
import { CREATE_CATEGORY, GET_ALL_CATEGORIES } from "../type";
import { GET_CATEGORY_DETAILS, UPDATE_CATEGORY } from './../type';

const initial = {
    allCates: { data: { alldata: [] }, pagination: { last_page: 1 } }, // Initialize with proper structure
    CateDetails: [],
    updateCate: [],
    createCate: [],
    loading: true,
};

const CategoriesReducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCates: action.payload || initial.allCates, // Use initial structure if payload is undefined
                loading: false
            };
        case GET_CATEGORY_DETAILS:
            return {
                ...state,
                CateDetails: action.payload,
                loading: false
            };
        case UPDATE_CATEGORY:
            return {
                ...state,
                updateCate: action.payload,
                loading: false
            };
        case CREATE_CATEGORY:
            return {
                ...state,
                createCate: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default CategoriesReducer;
