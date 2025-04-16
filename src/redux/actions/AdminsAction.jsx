
import { useGetDataWithToken } from "../../hooks/useGetData";
import { usePatchData } from "../../hooks/usePatchData";
import { usePostData } from "../../hooks/usePostData";
import { CREATE_ADMIN, DELETE_ADMIN, GET_ADMIN_DETAILS, GET_ALL_ADMINS, UPDATE_ADMIN, UPDATE_PRODUCT } from '../type';

 const getAllAdminsAction = (page, limit, searchTerm = '') => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/admins?page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
        dispatch({
            type: GET_ALL_ADMINS,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: GET_ALL_ADMINS,
            payload: e.response
        })
    }
}

const getAdminDetailsAction = (id) => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/admins/show?id=${id}`);
        dispatch({
            type: GET_ADMIN_DETAILS,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: GET_ADMIN_DETAILS,
            payload: e.response
        })
    }
}

const updateAdminAction = (data) => async (dispatch) => {
    try {
        const response = await usePatchData(`/admins/update`,data);
        dispatch({
            type: UPDATE_ADMIN,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: UPDATE_ADMIN,
            payload: e.response
        })
    }
}
const createAdminAction = (data) => async (dispatch) => {
    try {
        const response = await usePostData(`/admins/store`,data);
        dispatch({
            type: CREATE_ADMIN,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: CREATE_ADMIN,
            payload: e.response
        })
    }
}

const deleteAdminAction = (id) => async (dispatch) => {
    try {
        const response = await usePostData(`/admins/store`,id);
        dispatch({
            type: DELETE_ADMIN,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: DELETE_ADMIN,
            payload: e.response
        })
    }
}

export { getAllAdminsAction,getAdminDetailsAction,updateAdminAction,createAdminAction,deleteAdminAction }
