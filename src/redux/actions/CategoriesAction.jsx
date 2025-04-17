
import { useGetData, useGetDataWithToken } from "../../hooks/useGetData";
import { usePostData } from '../../hooks/usePostData';
import { CREATE_CATEGORY, GET_ALL_CATEGORIES, GET_CATEGORY_DETAILS, UPDATE_CATEGORY } from '../type';

const getAllCategoriesAction = (page, limit, searchTerm = '') => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/productCategory?page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: response,
            loading: true
        });
    }
    catch (e) {
        console.error('Error in getAllCategoriesAction:', e);
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: { data: [] },  // Ensure we always have a data array property
            loading: false
        });
    }
};

const getCategoryDetailsAction = (id) => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/productCategory/show?id=${id}`);
        dispatch({
            type: GET_CATEGORY_DETAILS,
            payload: response,
            loading: true
        });
    }
    catch (e) {
        console.error('Error in getCategoryDetailsAction:', e);
        dispatch({
            type: GET_CATEGORY_DETAILS,
            payload: e.response,
            loading: false
        });
    }
};

const updateCategoryAction = (data) => async (dispatch) => {
    try {
        const response = await usePostData(`/productCategory/update`, data);
        dispatch({
            type: UPDATE_CATEGORY,
            payload: response,
            loading: true
        });
    }
    catch (e) {
        console.error('Error in updateCategoryAction:', e);
        dispatch({
            type: UPDATE_CATEGORY,
            payload: e.response,
            loading: false
        });
    }
};

const createCategoryAction = (data) => async (dispatch) => {
    try {
        const response = await usePostData(`/productCategory/create`, data);
        dispatch({
            type: CREATE_CATEGORY,
            payload: response,
            loading: true
        });
    }
    catch (e) {
        console.error('Error in createCategoryAction:', e);
        dispatch({
            type: CREATE_CATEGORY,
            payload: e.response,
            loading: false
        });
    }
};

export { getAllCategoriesAction, getCategoryDetailsAction, updateCategoryAction, createCategoryAction };
