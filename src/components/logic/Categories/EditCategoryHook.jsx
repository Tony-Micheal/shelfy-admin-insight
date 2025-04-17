import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const EditCategoryHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {id}=useParams();
    console.log(id);
  
    // Function to retrieve categories with pagination
    // const getData = async (page = 1, search = '') => {
    //   setLoading(true);
    //   await dispatch(getAllCategoriesAction(page, 5, search));
    //   setLoading(false);
    // };
  return [id];
}

export default EditCategoryHook
