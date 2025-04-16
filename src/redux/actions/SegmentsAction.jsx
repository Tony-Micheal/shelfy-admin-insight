
import { useGetDataWithToken } from "../../hooks/useGetData";
import { usePatchData } from "../../hooks/usePatchData";
import { usePostData } from "../../hooks/usePostData";
import { CREATE_SEGMENT, DELETE_SEGMENT, GET_ALL_SEGMENTS, GET_SEGMENT_DETAILS, UPDATE_SEGMENT } from './../type';

 const getAllSegmentsAction = (page, limit, searchTerm = '') => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/segments?page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
        dispatch({
            type: GET_ALL_SEGMENTS,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: GET_ALL_SEGMENTS,
            payload: e.response
        })
    }
}

const getSegmentDetailsAction = (id) => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/segments/edit?id=${id}`);
        dispatch({
            type: GET_SEGMENT_DETAILS,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: GET_SEGMENT_DETAILS,
            payload: e.response
        })
    }
}

const updateSegmentAction = (id) => async (dispatch) => {
    try {
        const response = await usePatchData(`/segments/update?segment=${id}`,data);
        dispatch({
            type: UPDATE_SEGMENT,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: UPDATE_SEGMENT,
            payload: e.response
        })
    }
}
const createSegmentAction = (data) => async (dispatch) => {
    try {
        const response = await usePostData(`/segments/store`,data);
        dispatch({
            type: CREATE_SEGMENT,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: CREATE_SEGMENT,
            payload: e.response
        })
    }
}

const deleteSegmentAction = (id) => async (dispatch) => {
    try {
        const response = await usePostData(`/segments/delete?segment=${id}`);
        dispatch({
            type: DELETE_SEGMENT,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: DELETE_SEGMENT,
            payload: e.response
        })
    }
}

export { getAllSegmentsAction,getSegmentDetailsAction,updateSegmentAction,createSegmentAction,deleteSegmentAction }
