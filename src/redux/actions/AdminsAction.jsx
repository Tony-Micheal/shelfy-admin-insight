
import { useGetDataWithToken } from "../../hooks/useGetData";
import { GET_ALL_ADMINS } from '../type';

export const getAllAdminsAction = (page, limit, searchTerm = '') => async (dispatch) => {
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
