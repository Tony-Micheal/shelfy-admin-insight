
import React from 'react'
import { DELETE_INSTRUCTION, GET_ALL_PRODUCTS, GET_PRODUCTS_DETAILS, UPDATE_PRODUCT } from './../../type';
import { useGetData, useGetDataWithToken } from "../../../hooks/useGetData";
import { usePostData } from '../../../hooks/usePostData';
import useDeleteData from './../../../hooks/useDeleteData';

const getAllProductsAction = (page, limit, searchTerm = '') => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/products?page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response,
            loading: true
        })
    }
    catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: e.response
        })
    }
}

const getProductDetailsAction = (id) => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/products/show?id=${id}`);
        dispatch({
            type: GET_PRODUCTS_DETAILS,
            payload: response,
            loading: true
        })
    }
    catch (e) {
        dispatch({
            type: GET_PRODUCTS_DETAILS,
            payload: e.response
        })
    }
}

const updateProductAction = (data) => async (dispatch) => {
    try {
        const response = await usePostData(`/products/update`,data);
        dispatch({
            type: UPDATE_PRODUCT,
            payload: response,
            loading: true
        })
    }
    catch (e) {
        dispatch({
            type: UPDATE_PRODUCT,
            payload: e.response
        })
    }
}

const deleteInstructionAction = (data) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/products/delete/instruction`,data);
        dispatch({
            type: DELETE_INSTRUCTION,
            payload: response,
            loading: true
        })
    }
    catch (e) {
        dispatch({
            type: DELETE_INSTRUCTION,
            payload: e.response
        })
    }
}
export { getAllProductsAction,getProductDetailsAction,updateProductAction,deleteInstructionAction }
