
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getProductDetailsAction } from '../../../redux/actions/products/ProductsAction';

const EditProductHook = (id) => {
  const dispatch = useDispatch();
  const [loading,setLoading]=useState();

  // Function to retrieve products from page 1
  const getData = async () => {
    setLoading(true);
    await dispatch(getProductDetailsAction(id));
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData();
  }, []);

  const res = useSelector(state => state.ProductsReducer.productDetails);
  
  let product = [];

  try {
    if (res) {
      console.log(res);
      if (res.data) {
        product = res.data;
        console.log(product);
      }
    }
  } catch (e) {
    console.error(e);
  }




  return [product,loading];
};

export default EditProductHook;
