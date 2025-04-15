
import React from 'react'
import { GET_ALL_PRODUCTS } from './../../type';
import { useGetData, useGetDataWithToken } from "../../../hooks/useGetData";

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

export { getAllProductsAction }
