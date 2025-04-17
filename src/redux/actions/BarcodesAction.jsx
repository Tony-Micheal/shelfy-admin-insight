
import React from 'react'
import { useGetData, useGetDataWithToken } from "../../../hooks/useGetData";
import { usePostData } from '../../../hooks/usePostData';
import useDeleteData from './../../../hooks/useDeleteData';
import { DELETE_BARCODE, GET_ALL_BARCODES, GET_BARCODE_DETAILS, UPDATE_BARCODE } from './../type';

const getAllBarcodesAction = (page, limit, searchTerm = '') => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/barcodes?page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
        dispatch({
            type: GET_ALL_BARCODES,
            payload: response,
            loading: true
        })
    }
    catch (e) {
        dispatch({
            type: GET_ALL_BARCODES,
            payload: e.response
        })
    }
}

const getBarcodesDetailsAction = (id) => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/barcodes/show?id=${id}`);
        dispatch({
            type: GET_BARCODE_DETAILS,
            payload: response,
            loading: true
        })
    }
    catch (e) {
        dispatch({
            type: GET_BARCODE_DETAILS,
            payload: e.response
        })
    }
}

const updateBarcodesAction = (data) => async (dispatch) => {
    try {
        const response = await usePostData(`/barcodes/update`,data);
        dispatch({
            type: UPDATE_BARCODE,
            payload: response,
            loading: true
        })
    }
    catch (e) {
        dispatch({
            type: UPDATE_BARCODE,
            payload: e.response
        })
    }
}

const deleteBarcodesAction = (data) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/barcodes/delete`,data);
        dispatch({
            type: DELETE_BARCODE,
            payload: response,
            loading: true
        })
    }
    catch (e) {
        dispatch({
            type: DELETE_BARCODE,
            payload: e.response
        })
    }
}


export { getAllBarcodesAction,getBarcodesDetailsAction,updateBarcodesAction,deleteBarcodesAction }
