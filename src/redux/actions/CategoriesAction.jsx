
import { useGetData, useGetDataWithToken } from "../../hooks/useGetData";
import { usePostData, usePostDataWithDifferentFormat } from '../../hooks/usePostData';
import { CREATE_CATEGORY, GET_ALL_CATEGORIES, GET_CATEGORY_DETAILS, UPDATE_CATEGORY } from '../type';

const getAllCategoriesAction = (page = 1, limit = 5, searchTerm = '') => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/productCategory?page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: {
                data: response?.data || { alldata: [] },
                pagination: response?.pagination || { last_page: 1 }
            },
            loading: false
        });
        return response;
    }
    catch (e) {
        console.error('Error in getAllCategoriesAction:', e);
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: { 
                data: { alldata: [] }, 
                pagination: { last_page: 1 } 
            },
            loading: false
        });
        return null;
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
        return response;
    }
    catch (e) {
        console.error('Error in getCategoryDetailsAction:', e);
        dispatch({
            type: GET_CATEGORY_DETAILS,
            payload: e.response,
            loading: false
        });
        return null;
    }
};

const updateCategoryAction = (data) => async (dispatch) => {
    try {
        // Check if data is FormData (for image upload)
        const isFormData = data instanceof FormData;
        const response = isFormData 
            ? await usePostDataWithDifferentFormat(`/productCategory`, data)
            : await usePostData(`/productCategory`, data);
            
        dispatch({
            type: UPDATE_CATEGORY,
            payload: response,
            loading: true
        });
        return response;
    }
    catch (e) {
        console.error('Error in updateCategoryAction:', e);
        dispatch({
            type: UPDATE_CATEGORY,
            payload: e.response,
            loading: false
        });
        throw e;
    }
};

const createCategoryAction = (data) => async (dispatch) => {
    try {
        console.log('Creating category with data:', data);
        // Check if data is FormData (for image upload)
        const isFormData = data instanceof FormData;
        const response = isFormData 
            ? await usePostDataWithDifferentFormat(`/productCategory`, data)
            : await usePostData(`/productCategory`, data);
        
        console.log('Category creation response:', response);
            
        dispatch({
            type: CREATE_CATEGORY,
            payload: response,
            loading: false
        });
        
        return response;
    }
    catch (e) {
        console.error('Error in createCategoryAction:', e);
        dispatch({
            type: CREATE_CATEGORY,
            payload: e.response,
            loading: false
        });
        throw e;
    }
};

export { getAllCategoriesAction, getCategoryDetailsAction, updateCategoryAction, createCategoryAction };
